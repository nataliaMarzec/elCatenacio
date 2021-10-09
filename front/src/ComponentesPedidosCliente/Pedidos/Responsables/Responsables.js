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
            modal: false,
            editable: false,
            nombre: "",
        };
        this.listadoResponsables = this.listadoResponsables.bind(this)
    }

    
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
        // this.props.context.estadoInicial()
    };

    verDetallesResponsable(nombre) {
        var listaActualizada = this.state.responsables.filter(
            (item) => nombre == item.nombre
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
        this.listadoUsuarios()
        // this.props.context.estadoInicial()
        console.log("listadoResponsables",this.props.context.usuario);
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
                (resps) => this.setState({ responsables: resps, responsable: {} }),
                console.log("ResponsableEnviado", this.state.responsables)
            );
    };

    limpiarTabla = () => {
        document.getElementById("nombre").value = "";
        this.listadoResponsables();
    };

    handleSubmit = (e) => {
        var busqueda;
        if (this.state.nombre === "") {
            this.listadoBusqueda(busqueda);
        }
        if (this.state.nombre !== "") {
            busqueda = '?busqueda=nombre=="' + this.state.nombre + '"';
            this.listadoBusqueda(busqueda);
        }
        e.preventDefault(e);
    };

    actualizarAlEliminar = (unResponsable) => {
        var listaActualizada = this.state.responsables.filter(
            (item) => unResponsable !== item
        );
        this.setState({ responsables: listaActualizada, responsable: {} });
    };

    eliminarResponsable(id) {
        this.props.eliminarResponsable(id);
    }

    seleccionar = (unResponsable) => {
        this.setState({ responsable: unResponsable });
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
        var listaNombres = this.state.responsables.map((responsable,index) => {
            return (
                <div key={index}>
                    <option value={responsable.nombre} />
                </div>
            );
        });
        console.log("listaNombres", listaNombres);
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
                            responsable={this.state.responsable}
                            responsables={this.state.responsables}
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
                                                    id="nombre"
                                                    name="nombre"
                                                    placeholder="Elegir nombre"
                                                    onChange={this.handleChange}
                                                    list="responsable"
                                                />
                                            </Col>
                                            <datalist id="responsable">{listaNombres}</datalist>
                                        </FormGroup>
                                        <div className="row">
                                            <div className="input-field col s12 m12">
                                                <Button
                                                    type="button"
                                                    style={{ margin: "2px" }}
                                                    color="info"
                                                    outline
                                                    onClick={() =>
                                                        this.verDetallesResponsable(this.state.nombre)
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
        let responsables = this.state.responsables;
        // let usuarios = this.props.context.usuarios
        // let filter = usuarios.filter(u=>u.rol == "RESPONSABLE")
        return !responsables
            ? console.log("NULL", null)
            : responsables.map((unResponsable, index) => {
                return (
                    <ResponsableRow
                        key={index}
                        index={index}
                        responsable={unResponsable}
                        responsables={responsables}
                        selector={this.seleccionar}
                        responsableSeleccionado={this.responsableSeleccionado}
                        actualizarAlEliminar={this.actualizarAlEliminar}
                        eliminarResponsable={this.eliminarResponsable.bind(this)}
                        toggle={this.toggle}
                    />
                );
            });
    }
}

export default WrapperConsumer(Responsables)
