import { calendarFormat } from "moment";
import { func } from "prop-types";
import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardImg,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    CardFooter,
    CardColumns,
    Col,
    Container,
    Label,
    Row,
} from "reactstrap";
import CardGroup from "reactstrap/lib/CardGroup";

class VistaDePedidosParaParrillaRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedidoParrilla: props.pedidoParrilla,
            pedidos: props.pedidos,
            itemsParrilla: props.itemsParrilla,
            item: props.item,
            productos: props.productos,
            observaciones: "",
            backgroundColor: { backgroundColor: "#FDFFFE" },
            color: "#FDFFFE",

        };
        this.updateListo = this.updateListo.bind(this)
        this.actualizarPedidoParrilla = this.actualizarPedidoParrilla.bind(this)

    }

    getInitialState() {
        return { color: "#FDFFFE", itemsParrilla: [], pedidoParrilla: {} };
    }

    componentWillUpdate(nextProps) {
        if (nextProps.pedidoParrilla != this.props.pedidoParrilla) {
            this.setState({ pedidoParrilla: nextProps.pedidoParrilla },
                () => console.log("pedidoupdate", this.state.pedidoParrilla))
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.pedidos !== this.props.pedidos) {
            this.setState({ pedidos: this.props.pedidos });
        }
        if (nextProps.pedidoParrilla !== this.props.pedidoParrilla) {
            this.setState({ pedidoParrilla: nextProps.pedidoParrilla });
        }
        if (nextProps.itemsParrilla !== this.props.itemsParrilla) {
            this.setState({ itemsParrilla: nextProps.itemsParrilla });
        }
        if (nextProps.item !== this.props.item) {
            this.setState({ item: this.props.item });
        }
        if (nextProps.productos !== this.props.productos) {
            this.setState({ productos: nextProps.productos });
        }
        if (nextProps.producto !== this.props.producto) {
            this.setState({ producto: nextProps.producto });
        }
    }

    todoListoPedidoPreparadoParrilla = (id) => {
        fetch(`http://localhost:8383/pedidos/preparadoParrilla/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => this.setState({
                pedidoParrilla: res
                , itemsParrilla: this.state.itemsParrilla
            }))
            .then((res) => this.actualizarPedidoParrilla(this.state.item, this.state.pedidoParrilla.id))
            .then(this.props.listadoPedidos)
            .catch(function (error) {
                console.log(error, "error......", id);
            });
    };

    actualizarPedidoParrilla = (item, id) => {
        var listaActualizada = this.props.itemsParrilla.filter(i => item != i && i.pedidoId != id);
        var listaActualizadaPedidos = this.props.pedidos.filter(p => p.id != id)
        this.setState({
            itemsParrilla: listaActualizada, item: {}, pedidos: listaActualizadaPedidos,
            pedidoParrilla: {}
        });
    };

    updateListo(codigo, listo) {
        fetch(`http://localhost:8383/itemsPedido/${codigo}/listo/${listo}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ listo }),
        })
            .then((res) => res.json())
            .then((res) => this.setState({ item: { listoParrilla: res.listo } }))
            .then(this.props.listadoItemsPedido)
    };

    getComponent(event) {
        let arg1 = event.target.getAttribute('data-arg1');
        console.log('hola!', event.currentTarget.innerText);
        if (event.currentTarget.innerText == "Listo") {
            this.updateListo(arg1, true)
            event.currentTarget.style.backgroundColor = '#92F7B5';
            event.currentTarget.innerText = "Deshacer"
            event.persist(event)
        } else {
            if (event.currentTarget.innerText === "Deshacer") {
                this.updateListo(arg1, false)
                event.currentTarget.style.backgroundColor = "#FDFFFE";
                event.currentTarget.innerText = "Listo"
                event.persist(event)
            }
        }
        event.persist(event)
    }

    render = () => {
        var style = { backgroundColor: this.state.color }
        let botonTexto = document.innerText;
        botonTexto = "Listo"
        let itemsParrilla = this.props.itemsParrilla
        return (
            <Card className="border-info">
                <CardHeader className="border-warning">
                    Nro pedidoCocina: &nbsp; {this.props.pedidoParrilla.id}</CardHeader>
                <CardBody>
                    {itemsParrilla.map((i, index) => {
                        return (
                            <div key={i.codigo} id={i.codigo} data-arg1={i.codigo} style={style} onChange={this.getComponent.bind(this)}>
                                <Col >Producto: {i.productoId}</Col>
                                <Col>Cantidad: {i.cantidad}</Col>
                                <Col >Observaciones: {i.observaciones} </Col>
                                <Button key={i.codigo} id={i.codigo}
                                    className="btn #e65100 orange darken-4"
                                    style={style}
                                    data-arg1={i.codigo}
                                    onClick={this.getComponent.bind(this)}
                                >{botonTexto}
                                </Button>
                            </div>
                        )
                    })}
                </CardBody>
                <CardFooter>
                    <Button
                        className="btn #e65100 orange darken-4"
                        onClick={() => this.todoListoPedidoPreparadoParrilla(this.props.pedidoParrilla.id)}
                    >
                        <i className="fa fa-dot-circle-o">{""} Todo listo</i>
                    </Button>
                </CardFooter>
            </Card>
        )
    };
}

export default VistaDePedidosParaParrillaRow;
