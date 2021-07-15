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
            listo:false,
        };
        // 92F7B5
    }

    getInitialState() {
        return { color: "#FDFFFE",listo:false };
    }

    changeColor(productoId) {
        let productos = this.props.productos
        let producto = productos.find((p) => p.id == productoId)
        let descripcion = producto.descripcion
        console.log("+++", producto, "++", productoId, "++", descripcion)
        if (descripcion) {
            this.setState({ color: "#92F7B5", descripcion: descripcion }
                , () => console.log("descripcion", descripcion, this.state.descripcion));
        }
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
            this.setState({ productos: nextProps.productos }
                , () => console.log("propsPRODS", nextProps.productos));
        }
        if (nextProps.producto !== this.props.producto) {
            this.setState({ producto: nextProps.producto });
        }
    }


    todoListo = (id) => {
        console.log("id", id)
        fetch("http://localhost:8383/pedidos/entregado/" + id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },

        })
            .then((res) => res.json())
            .then((res) => this.setState({ pedidos: this.props.pedidos, pedido: res }))
            .then((res) => this.actualizarPedido(this.state.pedido))
            .then(this.props.listadoPedidos)
    };

    actualizarPedido = (unPedido) => {
        var listaActualizada = this.props.pedidos.filter(
            (pedido) => unPedido !== pedido);
        this.setState({ pedidos: listaActualizada, pedido: {} });
    };


    onChange = (e) => {
        let arg1 = e.target.getAttribute('data-arg1');
        let arg2 = e.target.getAttribute('data-arg2');
        let elementos = document.getElementById(arg2)
        let boton = document.getElementById(arg1)
      
        console.log("codigo",arg1,arg2)
        if (boton.innerText === "Listo") {
            let elementos = document.getElementById(arg2)
            let boton = document.getElementById(arg1)
            // elementos.style.backgroundColor = "#92F7B5"
            boton.innerText = "Deshacer"
            boton.style.backgroundColor = "#92F7B5"
            // this.setState({ item: { backgroundColor: "#92F7B5" } })
        } else {
            if (boton.innerHTML === "Deshacer") {
                let elementos = document.getElementById(arg2)
                let boton = document.getElementById(arg1)
                // elementos.style.backgroundColor = "#FDFFFE"
                boton.innerText = "Listo"
                boton.style.backgroundColor = "#92F7B5"
                // this.setState({ pedido: { backgroundColor: "#FDFFFE" } })
            }
        }
        // }
    }


       getComponent(event){
        let arg1 = event.target.getAttribute('data-arg1');
        let arg2=event.target.getAttribute('data-arg2')
        console.log('li item clicked!',arg1,arg2,this.state.listo);

        if (event.currentTarget.innerText==="Listo" && arg1) {
        event.currentTarget.style.backgroundColor = '#92F7B5';
          event.currentTarget.innerText="Deshacer"
          this.setState({listo:true})  

        }else{
            if(event.currentTarget.innerText==="Deshacer" && arg1){
                event.currentTarget.style.backgroundColor = "#FDFFFE";
                event.currentTarget.innerText="Listo"
                this.setState({color:"#FDFFFE",listo:false})
            }

        }
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
            let pedido=this.props.pedidos.find(ped=>ped.id === i.pedidoId)             
             let producto=this.props.productos.find(p=>p.id==i.productoId
                 && pedido.id ==i.pedidoId) 

            //  let descripcion=producto.descripcion 
            console.log("+++",producto)       
            // let tbodyElement = document.createElement("contenido");
            // let boton=document.createElement("button");
            // boton.innerText = "eliminar"
            // tbodyElement.appendChild(boton)

            return (
                <Col>
                    <tbody id="fondo">
                        <Card key={i.codigo} id={i.codigo} data-arg1={i.codigo} style={style} onChange={this.getComponent.bind(this)}>
                            <td >Producto: {i.productoId}</td>
                            <td >Cantidad: {i.cantidad}</td>
                            <td >Observaciones: {i.observaciones} </td>
                            <Button key={i.codigo} id={i.codigo}
                                className="btn #e65100 orange darken-4"
                                style={style}
                                data-arg1={i.codigo}
                                onClick={this.getComponent.bind(this)}
                            >{botonTexto}
                            </Button>
                        </Card>
                    </tbody>
                </Col>
            )
        })
        return (
            <Container>
                {/* <CardColumns> */}
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
                {/* </CardColumns> */}
            </Container>
        );
    };
}

export default VistaDePedidosParaCocinaRow;
