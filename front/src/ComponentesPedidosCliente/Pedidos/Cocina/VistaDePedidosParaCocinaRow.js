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

class VistaDePedidosParaCocinaRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedido: { backgroundColor: "#FDFFFE" },
            pedidos: props.pedidos,
            items: props.items,
            item: props.item,
            productos: props.productos,
            observaciones: "",
            backgroundColor: { backgroundColor: "#FDFFFE" },
            color: "#FDFFFE",
        };
        this.updateListo = this.updateListo.bind(this)
    }

    getInitialState() {
        return { color: "#FDFFFE", item: { listo: false } };
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.pedidos !== this.props.pedidos) {
            this.setState({ pedidos: this.props.pedidos });
        }
        if (nextProps.pedido !== this.props.pedido) {
            this.setState({ pedido: nextProps.pedido });
        }
        if (nextProps.items !== this.props.items) {
            this.setState({ items: nextProps.items });
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


    todoListo = (id) => {
        fetch("http://localhost:8383/pedidos/preparado/" + id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => this.setState({ pedidos: this.props.pedidos, pedido: res }))
            .then((res) => this.updateItemsListos(id))
            .then((res) => this.actualizarPedido(this.state.pedido))
            .then(this.props.listadoPedidos)
    };


    actualizarPedido = (unPedido) => {
        var listaActualizada = this.props.pedidos.filter(
            (pedido) => unPedido !== pedido);
        this.setState({ pedidos: listaActualizada, pedido: {} });
    };

    updateItemsListos(id) {
        console.log("idListos", id)
        fetch(`http://localhost:8383/itemsPedido/listos/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.item),
        })
            .then((res) => res.json())
            .then(this.props.listadoItemsPedido)
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
            .then((res) => this.setState({ item: { listo: res.listo } }))
            .then(this.props.listadoItemsPedido)
    };



    getComponent(event) {
        let arg1 = event.target.getAttribute('data-arg1');
        // let arg2 = event.target.getAttribute('data-arg2')
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

    //agregar a los items atributo "listo"

    render = () => {
        var style = { backgroundColor: this.state.color }

        let botonTexto = document.innerText;
        botonTexto = "Listo"
        let items = this.props.items
        let item = this.props.item
        let productos = this.props.productos
        let codigo = this.state.codigo
        let itemsLista = items.map((i, index) => {
            let pedido = this.props.pedidos.find(ped => ped.id === i.pedidoId)
            let producto = this.props.productos.find(p => p.id == i.productoId
                && pedido.id == i.pedidoId)

            return (

                        <Card key={i.codigo} id={i.codigo} data-arg1={i.codigo} style={style} onChange={this.getComponent.bind(this)}>
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
                        </Card>
                   
            )
        })
        return (
            <Container>
                <CardColumns>
                <Card className="border-info" >
                    <CardHeader className="border-warning" >
                        Nro pedido: &nbsp; {this.props.pedido.id}</CardHeader>
                    {/* <CardGroup> */}
                    <Card>
                        {itemsLista}
                        <Button
                            className="btn #e65100 orange darken-4"

                            onClick={() => this.todoListo(this.props.pedido.id)}
                        >
                            <i className="fa fa-dot-circle-o">{""} Todo listo</i>
                        </Button>
                    </Card>
                    {/* </CardGroup> */}
                </Card>
                </CardColumns>
              
            </Container>
        );
    };
}

export default VistaDePedidosParaCocinaRow;
