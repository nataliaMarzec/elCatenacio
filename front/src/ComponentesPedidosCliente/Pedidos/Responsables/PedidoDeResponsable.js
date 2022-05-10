import React ,{createContext} from "react";
import PedidoDeResponsableRow from "./PedidoDeResponsableRow";
import CargarPedidoDeResponsable from "./CargarPedidoDeResponsable";
import WrapperConsumer,{ContextUsuario} from "../../../componentesSesion/Context/ContextUsuario";
import {
    Table,
    Container,
    Row,
    Button,
    Modal,
    ModalHeader,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Input,
    Label,
    ModalBody,
    ModalFooter
} from "reactstrap";

class PedidoDeResponsable extends React.Component {
    static contextType = createContext(ContextUsuario)

    constructor(props) {
        super(props);
        this.state = {
            seleccionado: {},
            responsable: {},
            responsables: [],
            usuario:{},
            usuarios:[],
            mesa:{},
            mesas:[],
            modal: false,
            editable: false,
            id_mesa: "",
        };
        this.listadoResponsables = this.listadoResponsables.bind(this)
        this.listadoUsuarios=this.listadoUsuarios.bind(this)
        this.listadoMesas=this.listadoMesas.bind(this)
        this.listadoItemsPedido=this.listadoItemsPedido.bind(this)
    }

    
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    verDetallesResponsable(numero) {
        var listaActualizada = this.state.mesas.filter(
            (item) => numero == item.id_mesa
        );
        this.setState({ responsables: listaActualizada });
    }


    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };

    componentDidMount() {
        this.listadoResponsables();
        this.listadoUsuarios();
        this.listadoMesas();
    }

    listadoUsuarios = () => {
        fetch(`http://localhost:8383/usuarios`)
            .then((res) => res.json())
            .then(
                (res) => this.props.context.setStateUsuarios(res),
                console.log("Usuarios", this.props.context.usuarios)
            );
    }

    listadoMesas = () => {
        fetch(`http://localhost:8383/mesas`)
            .then((res) => res.json())
            .then(
                (res) => this.setState({mesas:res,mesa:{}}),
                console.log("Usuarios", this.state.mesas)
            );
    }


    listadoItemsPedido = () => {
        fetch(`http://localhost:8383/itemsPedido`)
            .then((res) => res.json())
            .then(
                (res) => this.setState({itemsPedido:res,item:{}}),
                console.log("ItemsMesa", this.state.itemsPedido)
            );
    }

    listadoResponsables = () => {
        fetch(`http://localhost:8383/responsables`)
            .then((res) => res.json())
            .then(
                (res) => this.setState({ responsables: res, responsable: {} }),
                console.log("ResponsableEnviado", this.state.responsables)
            );
    };



   

    listadoUsuarios = () => {
        fetch(`http://localhost:8383/usuarios`)
          .then((res) => res.json())
          .then(
            (res) => this.setState({usuarios:res}),
            console.log("Usuarios", this.props.context.usuarios,this.state.usuarios)
          )
      }


    actualizarAlEliminar = (unResponsable, unUsuario) => {
        var listadoResponsables = this.state.responsables.filter(
          (item) => unResponsable !== item
        );
        var listadoUsuarios = this.state.usuarios.filter(
            (item) => unUsuario != item
          )
          this.setState({
            responsables: listadoResponsables, usuarios: listadoUsuarios,
            usuario: {}, responsable: {}
          });
      };
  
    seleccionar = (unUsuario, unResponsable) => {
        this.setState({ usuario: unUsuario, responsable: unResponsable});
      };

    
    ModalHeaderStrong = (editable) => {
        if (editable) {
            return (
                <ModalHeader editable={"false"} toggle={this.toggle}>
                    <strong>Nuevo</strong>Responsable
                </ModalHeader>
            );
        }
        return (
            <ModalHeader editable={true} toggle={this.toggle}>
                <strong>Modificar</strong>Responsable
            </ModalHeader>
        );
    };
    render(props) {
    
        return (
            <div className="container">
                <div></div>
                <Row>&nbsp;</Row>
                <Row>Bienvenid@ {this.props.context.usuario.username} </Row>
                <Row>Crea un pedido</Row>

                <Container fluid>
                    {/* <Button color="success" onClick={this.toggle}>
                        Crea un pedido
                    </Button>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <this.ModalHeaderStrong></this.ModalHeaderStrong> */}
                        <CargarPedidoDeResponsable
                            listadoResponsables={this.listadoResponsables}
                            listadoUsuarios={this.listadoUsuarios}
                            listadoMesas={this.listadoMesas}
                            listadoItemsPedido={this.listadoItemsPedido}
                            itemsPedido={this.state.itemsPedido}
                            item={this.state.item}
                            responsable={this.state.responsable}
                            responsables={this.state.responsables}
                            usuario={this.state.usuario}
                            usuarios={this.state.usuarios}
                            mesas={this.state.mesas}
                            mesa={this.state.mesa}
                        />
                    {/* </Modal>
                    <Row>&nbsp;</Row>
                    <Col xs="12" md="12">
        <ModalBody> */}
        {/* </ModalBody>
        <ModalFooter></ModalFooter>
      </Col> */}
                </Container>
                
            </div>
        );
    }

    renderRows() {
        let responsables = this.state.responsables
        let usuarios = this.state.usuarios.filter(u => u.rol == "RESPONSABLE")
        console.log("ROW responsables", this.state.responsables)
        return (
          <React.Fragment>{
            usuarios.map((unUsuario, index) => {
              var responsable = responsables.find(r => r.id_responsable == unUsuario.responsableId)
    
              if (responsable) {
                let listaResponsables = responsables.filter(r => r.id_responsable == unUsuario.responsableId)
                return (
                  <PedidoDeResponsableRow
                    key={index}
                    index={index}
                    usuario={unUsuario}
                    usuarios={usuarios}
                    responsables={listaResponsables}
                    responsable={responsable}
                    selector={this.seleccionar}
                    actualizarAlEliminar={this.actualizarAlEliminar}
                    toggle={this.toggle}
                  />
    
                )
              }
              else {
                return
              }
            })}
          </React.Fragment>
        )
      }
  
}

export default WrapperConsumer(PedidoDeResponsable)
