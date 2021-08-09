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
    CardGroup,
    Col,
    Container,
    Label,
    Row,
} from "reactstrap";

class VistaDePedidosParaCocinaRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedidoCocina: props.pedidoCocina,
            pedidos: props.pedidos,
            itemsCocina: props.itemsCocina,
            item: props.item,
            productos: props.productos,
            observaciones: "",
            backgroundColor: { backgroundColor: "#FDFFFE" },
            color: "#FDFFFE",
        };
        this.updateListo = this.updateListo.bind(this)
        this.actualizarPedidoCocina = this.actualizarPedidoCocina.bind(this)
    }

    getInitialState() {
        return { color: "#FDFFFE", itemsCocina: [], pedidoCocina: {}};
    }
   
    componentWillUpdate(nextProps){
        if(nextProps.pedidoCocina != this.props.pedidoCocina){
           this.setState({pedidoCocina:nextProps.pedidoCocina},
               ()=>console.log("pedidoupdate",this.state.pedidoCocina))
        }
       }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.pedidos !== this.props.pedidos) {
            this.setState({ pedidos: this.props.pedidos });
        }
        if (nextProps.pedidoCocina !== this.props.pedidoCocina) {
            this.setState({ pedidoCocina: nextProps.pedidoCocina });
        }
        if (nextProps.itemsCocina !== this.props.itemsCocina) {
            this.setState({ itemsCocina: nextProps.itemsCocina }
                // , () => console.log("propsItemsCOC", nextProps.itemsCocina, this.state.itemsCocina)
            );
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

    todoListoPedidoPreparadoCocina = (id) => {
        fetch(`http://localhost:8383/pedidos/preparadoCocina/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => this.setState({
                pedidoCocina: res
                , itemsCocina: this.state.itemsCocina
            }))
            .then((res) => this.actualizarPedidoCocina(this.state.item, this.state.pedidoCocina))
            .then(this.props.listadoPedidos)
            .catch(function (error) {
                console.log(error, "error......", id);
            });
        // .then(this.props.listadoPedidos)
    };

    actualizarPedidoCocina = (item, id, pedido) => {
        var listaActualizada = this.props.itemsCocina.filter(i => item != i && i.pedidoId != id);
        var listaActualizadaPedidos = this.props.pedidos.filter(p => p.id != id)
        this.setState({
            itemsCocina: listaActualizada, item: {}, pedidos: listaActualizadaPedidos,
            pedidoCocina: {}
        });
    };

    getItemsCocina(id) {
        console.log("getListos", this.props.itemsCocina)
        fetch(`http://localhost:8383/itemsPedido/listos/cocina/${id}`, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => this.setState({ itemsCocina: res, pedidoCocina: { preparadoCocina: true } },
                () => this.forceUpdate()
            ))
            .catch(function (error) {
                console.log(error, "error......", id);
            })
    };


    updateListo(codigo, listoCocina) {
        fetch(`http://localhost:8383/itemsPedido/${codigo}/listoCocina/${listoCocina}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ listoCocina }),
        })
            .then((res) => res.json())
            .then((res) => this.setState({ item: { listoCocina: res.listoCocina } }))
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
            // event.persist(event)
        } else {
            if (event.currentTarget.innerText === "Deshacer") {
                this.updateListo(arg1, false)
                event.currentTarget.style.backgroundColor = "#FDFFFE";
                event.currentTarget.innerText = "Listo"
                // event.persist(event)

            }
        }
        // event.persist(event)
    }
    getEvent(e) {
        e.preventDefault(e)
    }
    //agregar a los itemsCocina atributo "listo"

    render = () => {
        var style = { backgroundColor: this.state.color }
        let botonTexto = document.innerText;
        botonTexto = "Listo"
        let itemsCocina = this.props.itemsCocina
        let pedidoPreparado=this.state.pedidoCocina.preparadoCocina
        
        // if (pedidoPreparado === false) {
        //     console.log("reow pedidoCocina",pedidoPreparado === false)
        return (
            
            //     <div className="col-sm-6 bg-light mt-3" >
            // <div className="row border offset-sm-3 rounded mr-3 shadow-lg p-3 mb-5 bg-body rounded" key="uebaEmpresa" >


            // <div className="row border offset-sm-1">
          
        

                <Card className="border-info">
                    <CardHeader className="border-warning">
                        Nro pedidoCocina: &nbsp; {this.props.pedidoCocina.id}</CardHeader>
                    <CardBody>

                        {itemsCocina.map((i, index) => {
                            return (
                                // <React.Fragment>{pedidoCocina.preparadoCocina === false && i &&
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
                            onClick={() => this.todoListoPedidoPreparadoCocina(this.props.pedidoCocina.id)}
                        >
                            <i className="fa fa-dot-circle-o">{""} Todo listo</i>
                        </Button>
                    </CardFooter>

                </Card>
             
            // </div>


        )
       
    };

}

export default VistaDePedidosParaCocinaRow;
