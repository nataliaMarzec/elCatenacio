import React ,{createContext} from "react";
import ResponsableRow from "./ResponsableRow";
import CargarResponsable from "./CargarResponsable";
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
} from "reactstrap";

class Responsables extends React.Component {
    static contextType = createContext(ContextUsuario)

    constructor(props) {
        super(props);
        this.state = {
            seleccionado: {},
            responsable: {},
            responsables: [],
            usuario:{},
            usuarios:[],
            modal: false,
            editable: false,
            nombre: "",
        };
        this.listadoResponsables = this.listadoResponsables.bind(this)
        this.listadoUsuarios=this.listadoUsuarios.bind(this)
    }

    
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    // verDetallesResponsable(nombre) {
    //     var listaActualizada = this.state.responsables.filter(
    //         (item) => nombre == item.nombre
    //     );
    //     this.setState({ responsables: listaActualizada });
    // }

  verDetallesResponsable(username) {
    let data1 = this.state.usuarios.filter(u => u.rol == "RESPONSABLE")
    let data2 = this.state.responsables
    var usuario = data1.find(
      (u) => username == u.username
    )
    if (usuario) {
      var listaActualizada = data2.filter(r => r.id_responsable == usuario.responsableId)
      this.setState({responsables: listaActualizada },
        () => console.log("LISTAaCTUALIZADA", listaActualizada, this.state.responsables));
    }
  }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };

    componentDidMount() {
        this.listadoResponsables();
        this.listadoUsuarios()
    }

    listadoUsuarios = () => {
        fetch(`http://localhost:8383/usuarios`)
            .then((res) => res.json())
            .then(
                (res) => this.props.context.setStateUsuarios(res),
                console.log("Usuarios", this.props.context.usuarios)
            );
    }

    listadoBusqueda = (busqueda) => {
        if (busqueda != null) {
            fetch(`http://localhost:8383/responsables` + busqueda)
                .then((res) => res.json())
                .then((resps) => this.setState({ responsables: resps }));
        }
        if (busqueda == null) {
            fetch(`http://localhost:8383/responsables`)
                .then((res) => res.json())
                .then((resps) => this.setState({ responsables: resps }));
        }
    };

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

    limpiarTabla = () => {
        document.getElementById("username").value = "";
        this.listadoResponsables();
    };

    handleSubmit = (e) => {
        var busqueda;
        if (this.state.username === "") {
            this.listadoBusqueda(busqueda);
        }
        if (this.state.username !== "") {
            busqueda = '?busqueda=username=="' + this.state.username + '"';
            this.listadoBusqueda(busqueda);
        }
        e.preventDefault(e);
    };

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
        let usuarios = this.state.usuarios.filter(u => u.rol == "RESPONSABLE")
        var listaUserNames = usuarios.map((u,index) => {
            return (
                <div key={index}>
                    <option value={u.username} />
                </div>
            );
        });
        console.log("listaUserNames", listaUserNames);
        return (
            <div className="container">
                <div></div>
                <Row>&nbsp;</Row>
                <Container fluid>
                    <Button color="success" onClick={this.toggle}>
                        Nuevo responsable
                    </Button>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <this.ModalHeaderStrong></this.ModalHeaderStrong>
                        <CargarResponsable
                            listadoResponsables={this.listadoResponsables}
                            listadoUsuarios={this.listadoUsuarios}
                            responsable={this.state.responsable}
                            responsables={this.state.responsables}
                            usuario={this.state.usuario}
                            usuarios={this.state.usuarios}
                        />
                    </Modal>
                    <Row>&nbsp;</Row>
                </Container>
                <div className="animated fadeIn">
                    {/* {Boolean(
            this.state.responsables.length ? */}
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Responsables Lista
                                </CardHeader>
                                <CardHeader>
                                    <Form onSubmit={this.handleSubmit} id="formulario">
                                        <FormGroup row>
                                            <Col xs="12" md="9">
                                                <Input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    placeholder="Elegir username"
                                                    onChange={this.handleChange}
                                                    list="nuevaLista"
                                                />
                                            </Col>
                                            <datalist id="nuevaLista">{listaUserNames}</datalist>
                                        </FormGroup>
                                        <div className="row">
                                            <div className="input-field col s12 m12">
                                                <Button
                                                    type="button"
                                                    style={{ margin: "2px" }}
                                                    color="info"
                                                    outline
                                                    onClick={() =>
                                                        this.verDetallesResponsable(this.state.username)
                                                    }
                                                >
                                                    <i className="fa fa-dot-circle-o"></i>Ver detalles
                                                    de responsable
                                                </Button>
                                                <Button
                                                    type="button"
                                                    style={{ margin: "2px" }}
                                                    color="success"
                                                    outline
                                                    onClick={this.limpiarTabla}
                                                >
                                                    <i className="fa fa-dot-circle-o"></i>Ver responsables
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive bordered size="sm">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Dirección</th>
                                                <th>Teléfono</th>
                                                <th>UserName</th>
                                                <th>Email</th>
                                                <th>Rol</th>
                                            </tr>
                                        </thead>
                                        <tbody>{this.renderRows()}</tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
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
                  <ResponsableRow
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

export default WrapperConsumer(Responsables)
