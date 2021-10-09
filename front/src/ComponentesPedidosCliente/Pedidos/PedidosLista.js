import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import PedidosListaRow from "./PedidosListaRow";
import CargarPedido from "./CargarPedido";
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
import CardColumns from "reactstrap/lib/CardColumns";
registerLocale('es', es)
var moment = require('moment');
class PedidosLista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seleccionado: {},
            pedido: {},
            pedidos: [],
            items: [],
            item: {},
            ventasACliente: [],
            pagosDeCliente: [],
            modal: false,
            editable: false,
            id: "",
            startDate: new Date()
        };
        this.seleccionar = this.seleccionar.bind(this)
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    componentWillMount() {
        this.listadoPedidos();
        this.listadoProductos();
        this.listadoItemsPedido();
    }

    verDetallePedido(id) {
        var listaActualizada = this.state.pedidos.filter(
            (pedido) => id == pedido.id
        );
        this.setState({ pedidos: listaActualizada });
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };


    listadoBusqueda = (busqueda) => {
        if (busqueda != null) {
            fetch(`http://localhost:8383/pedidos` + busqueda)
                .then((res) => res.json())
                .then((pddos) => this.setState({ pedidos: pddos }));
        }
        if (busqueda == null) {
            fetch(`http://localhost:8383/pedidos`)
                .then((res) => res.json())
                .then((pddos) => this.setState({ pedidos: pddos }));
        }
    };
    listadoPedidos = () => {
        fetch("http://localhost:8383/pedidos")
            .then((res) => res.json())
            .then((res) => this.setState({ pedidos: res, pedido: {} }),

        );
    };
    listadoProductos = () => {
        fetch(`http://localhost:8383/productos`)
            .then((res) => res.json())
            .then((pds) =>
                this.setState({
                    productos: pds,
                    producto: {},
                })
            );
    };

    listadoItemsPedido = () => {
        fetch(`http://localhost:8383/itemsTodos`)
            .then((res) => res.json())
            .then((its) =>
                this.setState({
                    items: its,
                    item: {},
                })
            );
    };


    limpiarTabla = () => {
        document.getElementById("id").value = "";
        this.listadoPedidos();
    };

    handleSubmit = (e) => {
        var busqueda;
        if (this.state.id === "") {
            this.listadoBusqueda(busqueda);
        }
        if (this.state.id !== "") {
            busqueda = '?busqueda=id=="' + this.state.id + '"';
            this.listadoBusqueda(busqueda);
        }
        e.preventDefault(e);
    };

    actualizarAlEliminar = (unPedido) => {
        var listaActualizada = this.state.pedidos.filter(
            (pedido) => unPedido !== pedido
        );
        this.setState({ pedidos: listaActualizada, pedido: {} });
    };

    eliminarPedido(id) {
        this.props.eliminarPedido(id);
    }

    seleccionar = (unPedido) => {
        this.setState({ pedido: unPedido });
    };


    ModalHeaderStrong = (editable) => {
        if (editable) {
            return (
                <ModalHeader editable={false} toggle={this.toggle}>
                    <strong>Nuevo</strong>Pedido
                </ModalHeader>
            );
        }
        return (
            <ModalHeader editable={true} toggle={this.toggle}>
                <strong>Modificar</strong>Pedido
            </ModalHeader>
        );
    };

    setStartDate(startDate) {
        this.setState({ startDate })
    }

    render(props) {
        if (this.state.pedidos.length > 0) {
            var listaIdsPedidos = this.state.pedidos.map((pedido) => {
                return (
                    <div>
                        <option value={pedido.id} />
                    </div>
                );
            });
            // console.log("listaIdsPedidos", this.state.pedido);

            return (
                <div className="container">
                    <div></div>
                    <Row>&nbsp;</Row>
                    <Container fluid>
                        <Button color="success" onClick={this.toggle}>
                            Nuevo pedido
                        </Button>
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                        >
                            <this.ModalHeaderStrong></this.ModalHeaderStrong>
                            <CargarPedido
                                pedido={this.state.pedido}
                                pedidos={this.state.pedidos}
                                listadoPedidos={this.listadoPedidos}
                                listadoProductos={this.listadoProductos}
                                listadoItemsPedido={this.listadoItemsPedido}
                                seleccionar={this.seleccionar}
                            />
                        </Modal>
                        <Row>&nbsp;</Row>
                    </Container>
                    <div className="animated fadeIn">
                        {/* {Boolean(
            this.state.pedidos.length ? */}
                        <Row>
                            <Col xs="12" lg="12">
                                <Card>
                                    <CardHeader style={{ backgroundColor: "#0972F9" }}>
                                        <i className="fa fa-align-justify"></i> Pedidos Lista

                                    </CardHeader>
                                    <CardHeader style={{ backgroundColor: "#7E98BB" }}>


                                        <Form onSubmit={this.handleSubmit} id="formulario">
                                            <Row>
                                                <CardColumns>
                                                    <DatePicker
                                                        className="border rounded ml-1 shadow-lg p-2 mb-1 rounded" key="data-pickers"
                                                        selected={this.state.startDate}
                                                        // onSelect={props.handleDateSelect}
                                                        onChange={(date) => this.setStartDate(date)}
                                                        locale="es"
                                                        dateFormat="dd/MM/yyyy"
                                                        // timeInputLabel="Hora:"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        yearDropdownItemNumber={15}
                                                    // showTimeInput
                                                    // highlightDates={highlightWithRanges}

                                                    />
                                                    <FormGroup row>
                                                        <Col xs="12" md="9">
                                                            <Input
                                                                className="border rounded ml-1 shadow-lg p-3 mb-1 rounded"
                                                                type="number"
                                                                id="id"
                                                                name="id"
                                                                placeholder="Elegir id"
                                                                onChange={this.handleChange}
                                                                list="pedido"
                                                            />
                                                        </Col>
                                                        <datalist id="pedido">{listaIdsPedidos}</datalist>
                                                    </FormGroup>
                                                </CardColumns>
                                            </Row>
                                            {/* <div className="row"> */}
                                            <div className="input-field col s12 m12">
                                                <Button
                                                    type="button"
                                                    style={{ margin: "2px" }}
                                                    color="info"
                                                    outline
                                                    onClick={() =>
                                                        this.verDetallePedido(this.state.id)
                                                    }
                                                >
                                                    <i className="fa fa-dot-circle-o"></i>Ver detalles
                                                    de pedido
                                                </Button>
                                                <Button
                                                    type="button"
                                                    style={{ margin: "2px" }}
                                                    color="success"
                                                    outline
                                                    onClick={this.limpiarTabla}
                                                >
                                                    <i className="fa fa-dot-circle-o"></i>Ver pedidos
                                                </Button>
                                            </div>
                                            {/* </div> */}
                                        </Form>
                                    </CardHeader>
                                    <CardBody>
                                        {this.state.pedidos.filter(p => p.fecha == moment(this.state.startDate).format('DD/MM/yyyy')).length > 0 &&
                                            <Table responsive bordered size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        {/* <th>Fecha</th>
                            <th>Hora</th>
                            <th>Responsable de mesa</th> */}
                                                        <th>Sección</th>
                                                        <th>Observaciones</th>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                        <th>Observaciones</th>
                                                        <th>Importe</th>
                                                        <th></th>
                                                        {/* <th>Importe total</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>{this.renderRows()}</tbody>
                                            </Table>}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        } else {
            return <p>No hay pedidos para mostrar</p>
        }
    }

    renderRows() {
        let items = this.state.items;
        let pedidos = this.state.pedidos;
        let productos = this.state.productos;
        return !items
            ? console.log("NULL", null)
            : pedidos.filter(p => p.fecha == moment(this.state.startDate).format('DD/MM/yyyy')).map((unPedido, index) => {
                let itemsLista = items.filter(i => i.pedidoId == unPedido.id)
                return (
                    <PedidosListaRow
                        key={index}
                        index={index}
                        items={itemsLista}
                        item={this.state.item}
                        pedidos={pedidos}
                        pedido={unPedido}
                        selector={this.seleccionar}
                        actualizarAlEliminar={this.actualizarAlEliminar}
                        eliminarPedido={this.eliminarPedido.bind(this)}
                        toggle={this.toggle}
                    />
                );
            });
    }
}

export default PedidosLista;
