import React, { useContext, createContext } from "react";
import WrapperConsumer, { ContextUsuario } from "../../../componentesSesion/Context/ContextUsuario";

import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    ModalBody,
    ModalFooter,
    Row,
    Card,
    CardHeader
} from "reactstrap";

class CargarPedidoDeResponsable extends React.Component {
    static contextType = createContext(ContextUsuario)

    constructor(props) {
        super(props);
        this.state = {
            responsable: props.responsable || {},
            responsables: props.responsables || [],
            usuario: props.usuario || {},
            usuarios: props.usuarios || [],
            mesa: props.mesa || {},
            mesas: props.mesas || [],
            seccion: ["Carpa", "Abierta"],
            itemsPedido: props.itemsPedido || [],
            itemPedido: props.item || {},
            modal: false,

        };
    }

    estadoInicial = () => {
        this.setState({
            responsable: {
                nombre: "",
                direccion: "",
                telefono: "",

            },
            usuario: {
                username: "",
                email: "",
                password: "",
                rol: "RESPONSABLE",
            },
            mesa: {
                id_mesa: null,
                cantidadPersonas: 0,
                habilitada: false,
            },
            item: {

            }
        });
    };

    componentDidMount() {
        this.props.listadoResponsables();
        this.props.listadoUsuarios()
        this.props.listadoMesas();
        this.props.listadoItemsPedido();
    }

    handleSubmit = (event) => {
        const id = this.state.responsable.id_responsable;
        // if (id) {
        //     console.log("onSubmit-id", id)
        //     this.editarResponsable(id);
        // } else {
        this.crearMesa(id);
        // }
        event.preventDefault(event);
    };


    crearMesa = (id) => {
        fetch("http://localhost:8383/mesas/" + id, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.responsable, this.state.usuario),
        })
            .then(this.props.listadoResponsables)
            .then(this.props.listadoUsuarios)
            .then(this.estadoInicial())
            .catch(err => console.log("error", err), this.estadoInicial())

    };


    editarResponsable = (id) => {
        fetch("http://localhost:8383/responsable/" + id, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.usuario, this.state.responsable),
        })
            .then(this.props.listadoUsuarios)
            .then(this.props.listadoResponsables)
            .then(this.estadoInicial())
            .catch(err => console.log("error", err), this.estadoInicial())

    };

    listadoBusqueda = (busqueda) => {
        if (busqueda != null) {
            fetch(`http://localhost:8383/mesas` + busqueda)
                .then((res) => res.json())
                .then((res) => this.setState({ mesas: res }));
        }
        if (busqueda == null) {
            fetch(`http://localhost:8383/mesas`)
                .then((res) => res.json())
                .then((res) => this.setState({ mesas: res }));
        }
    };

    limpiarTabla = () => {
        document.getElementById("id_mesa").value = "";
        this.props.listadoMesas();
    };

    handleSubmit = (e) => {
        var busqueda;
        if (this.state.id_mesa === "") {
            this.listadoBusqueda(busqueda);
        }
        if (this.state.id_mesa !== "") {
            busqueda = '?busqueda=id_mesa=="' + this.state.id_mesa + '"';
            this.listadoBusqueda(busqueda);
        }
        e.preventDefault(e);
    };


    render() {
        let mesas = this.state.mesas.filter(m => m.habilitada == true)
        var listaMesas = mesas.map((m, index) => {
            return (
                <div key={index}>
                    <option value={m.id_mesa} />
                </div>
            );
        });
        console.log("listaMesas", listaMesas);
        return (
            <Col xs="12" md="12">
                <ModalBody>
                    <Form className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                                <Label for="id_mesa">Nro mesa</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <div className="animated fadeIn">
                                    {/* {Boolean(
            this.state.responsables.length ? */}
                                    <Row>
                                        <Col xs="12" lg="12">
                                            <Card>
                                                {/* <CardHeader>
                                                    <i className="fa fa-align-justify"></i>Pedidos de mesa
                                                </CardHeader> */}
                                                <CardHeader>
                                                    <Form onSubmit={this.handleSubmit} id="formulario">
                                                        <FormGroup row>
                                                            <Col xs="12" md="9">
                                                                <Input
                                                                    type="text"
                                                                    id="mesa"
                                                                    name="mesa"
                                                                    placeholder="Elegir mesa"
                                                                    onChange={this.handleChange}
                                                                    list="listaMesas"
                                                                />
                                                            </Col>
                                                            <datalist id="listaMesas">{listaMesas}</datalist>
                                                        </FormGroup>
                                                        <div className="row">
                                                            <div className="input-field col s12 m12">
                                                                <Button
                                                                    type="button"
                                                                    style={{ margin: "2px" }}
                                                                    color="info"
                                                                    outline
                                                                    onClick={() =>
                                                                        this.verDetallesMesa(this.state.id_mesa)
                                                                    }
                                                                >
                                                                    <i className="fa fa-dot-circle-o"></i>Ver detalles
                                                                    de Mesa
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    style={{ margin: "2px" }}
                                                                    color="success"
                                                                    outline
                                                                    onClick={this.limpiarTabla}
                                                                >
                                                                    <i className="fa fa-dot-circle-o"></i>Ver Mesas de hoy
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </CardHeader>

                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label for="seccion">Sección</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="seccion"
                                    name="seccion"
                                    placeholder="Completa sección..."
                                    required
                                    value={this.state.seccion}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label for="observaciones">Nro&nbsp;observaciones</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="observaciones"
                                    name="observaciones"
                                    placeholder="Completa observaciones..."
                                    required={false}
                                    value={this.state.itemsPedido.observaciones}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        {/* <FormGroup row>
                            <Col md="3">
                                <Label for="username">UserName</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Completa UserName..."
                                    required
                                    value={this.state.usuario.username}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label for="email">Email</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Completa Email..."
                                    // required={true}
                                    value={this.state.usuario.email}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label for="email">Password</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Completa password..."
                                    // required={true}
                                    value={this.state.usuario.password}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </FormGroup> */}
                        <Button
                            type="submit"
                            color="success"
                            outline
                            onClick={this.handleSubmit}
                        >
                            <i className="fa fa-dot-circle-o"></i> Guardar responsable
                        </Button>
                    </Form>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Col>
        );
    }

    handleChange = (e) => {
        var nuevoUsuario = Object.assign({}, this.state.usuario);
        var nuevoResponsable = Object.assign({}, this.state.responsable);
        var nuevaMesa = Object.assign({}, this.state.mesa);
        nuevoUsuario[e.target.name] = e.target.value;
        nuevoResponsable[e.target.name] = e.target.value;
        nuevaMesa[e.target.name] = e.target.value;
        this.setState({
            usuario: nuevoUsuario, responsable: nuevoResponsable,
            usuarios: this.state.usuarios, responsables: this.state.responsables,
            mesas: this.state.mesas, mesa: nuevaMesa
        });
    };



}

export default WrapperConsumer(CargarPedidoDeResponsable)
