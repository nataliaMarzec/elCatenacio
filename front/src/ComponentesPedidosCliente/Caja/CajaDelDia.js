import React, { createContext } from "react";
import CajaDelDiaRow from "./CajaDelDiaRow";
import CargarCajaDelDia from "./CargarCajaDelDia";
import WrapperConsumer, { ContextUsuario } from "../../componentesSesion/Context/ContextUsuario";
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

class CajaDelDia extends React.Component {
    static contextType = createContext(ContextUsuario)

    constructor(props) {
        super(props);
        this.state = {
            caja: {},
            ventas: [],
            seleccionado: {},
            responsable: {},
            responsables: [],
            usuario: {},
            usuarios: [],
            modal: false,
            editable: false,

        };
        this.listadoResponsables = this.listadoResponsables.bind(this)
        this.listadoUsuarios = this.listadoUsuarios.bind(this)
        this.listadoMesas = this.listadoMesas.bind(this)
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };


    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };

    componentDidMount() {
        this.listadoMesas();
        this.listadoResponsables();
        this.listadoUsuarios()
    }

    listadoMesas = () => {
        fetch(`http://localhost:8383/ventas`)
            .then((res) => res.json())
            .then(
                (res) => this.setState({ ventas: res, caja: {} }),
                console.log("Usuarios", this.state.ventas)
            );
    }

    listadoUsuarios = () => {
        fetch(`http://localhost:8383/usuarios`)
            .then((res) => res.json())
            .then(
                (res) => this.props.context.setStateUsuarios(res),
                console.log("Usuarios", this.props.context.usuarios)
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
                (res) => this.setState({ usuarios: res }),
                console.log("Usuarios", this.props.context.usuarios, this.state.usuarios)
            )
    }


    actualizarAlEliminar = (unaMesa) => {
        var listadoMesas = this.state.ventas.filter(
            (item) => unaMesa !== item
        );

        this.setState({
            ventas: listadoMesas

        });
    };

    seleccionar = (unaMesa) => {
        this.setState({ caja: unaMesa });
    };


    ModalHeaderStrong = (editable) => {
        if (editable) {
            return (
                <ModalHeader editable={"false"} toggle={this.toggle}>
                    <strong>Nueva</strong>Mesa
                </ModalHeader>
            );
        }
        return (
            <ModalHeader editable={true} toggle={this.toggle}>
                <strong>Modificar</strong>Mesa
            </ModalHeader>
        );
    };
    render(props) {
        return (
            <div className="container">
                <div></div>
                <Row>&nbsp;</Row>
                <Container fluid>
                    <Button color="success" onClick={this.toggle}>
                        Nueva Mesa
                    </Button>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        {/* <this.ModalHeaderStrong></this.ModalHeaderStrong> */}
                        <CargarCajaDelDia
                            listadoMesas={this.listadoMesas}
                            listadoResponsables={this.listadoResponsables}
                            listadoUsuarios={this.listadoUsuarios}
                            caja={this.state.caja}
                            ventas={this.state.ventas}
                            responsable={this.state.responsable}
                            responsables={this.state.responsables}
                            usuario={this.state.usuario}
                            usuarios={this.state.usuarios}
                        />
                    </Modal>
                    <Row>&nbsp;</Row>
                </Container>
                <div className="animated fadeIn">

                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> CajaDelDia Lista
                                </CardHeader>
                                <CardBody>
                                    <Table responsive bordered size="sm">
                                        <thead>
                                            <tr>
                                                <th>Id caja</th>
                                                {/* <th>Nro pedido</th> */}
                                                {/* <th>Id responsable</th> */}
                                                <th>cantidad personas</th>
                                                <th>habilitada</th>
                                            
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
        let ventas=this.state.ventas
        let responsables=this.state.responsables
        console.log("ROW ventas", this.state.ventas)
        return (
            <React.Fragment>{
                ventas.map((unaMesa, index) => {
                    var responsable = responsables.find(r => r.id_responsable == unaMesa.responsableId)

                    {/* if (responsable) {
                        let listaResponsables = responsables.filter(r => r.id_responsable == unaMesa.responsableId) */}
                        return (
                            <CajaDelDiaRow
                                key={index}
                                index={index}
                                caja={unaMesa}
                                ventas={ventas}
                                responsables={responsables}
                                responsable={responsable}
                                selector={this.seleccionar}
                                actualizarAlEliminar={this.actualizarAlEliminar}
                                toggle={this.toggle}
                            />
                        )
                })
                }
            </React.Fragment>
        )
    }

}

export default WrapperConsumer(CajaDelDia)
