import { calendarFormat } from "moment";
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
            pedido: {backgroundColor: "#FDFFFE"},
            pedidos: props.pedidos,
            items: props.items,
            codigo:"",
            backgroundColor:{ backgroundColor: "#FDFFFE" }
        };
        // 92F7B5
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
            this.setState({ item: nextProps.item });
        }
    }

     
    todoListo = (id) => {
        console.log("id",id)
        fetch("http://localhost:8383/pedidos/entregado/" + id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },

        })
        .then((res) => res.json())
        .then((res) => this.setState({pedidos:this.props.pedidos,pedido:res}))
        .then((res)=>this.actualizarPedido(this.state.pedido))
        .then(this.props.listadoPedidos)
    };

    actualizarPedido = (unPedido) => {
        var listaActualizada = this.props.pedidos.filter(
          (pedido) => unPedido !== pedido);
        this.setState({ pedidos: listaActualizada, pedido: {} });
      };
  

    onChange =(e)=>{
    // console.log("codigo",this.state.codigo)
    //  let elementos=document.getElementById("fondo")
    //  let boton=document.getElementById("boton")
    //  if(this.state.codigo !==null){
    //  if(boton.innerText==="Listo"){
    //  elementos.style.backgroundColor="#92F7B5"
    //  boton.innerText="Deshacer"
    //  boton.style.backgroundColor="#92F7B5"
    //  this.setState({item:{backgroundColor:"#92F7B5"}})
    //  }else{
    //      if(boton.innerHTML==="Deshacer"){
    //         elementos.style.backgroundColor="#FDFFFE"
    //         boton.innerText="Listo"
    //         boton.style.backgroundColor="#92F7B5"
    //         this.setState({pedido:{backgroundColor:"#FDFFFE"}})
    //      }
    //  }
    // }

    }
 
 

    render = () => {
        let botonTexto=document.innerText;
        botonTexto="Listo"
        let items = this.props.items

        let itemsLista = items.map((i, index) => {
            // let tbodyElement = document.createElement("contenido");
            // let boton=document.createElement("button");
            // boton.innerText = "eliminar"
            // tbodyElement.appendChild(boton)
           
            return (
                <Col>
                    <tbody>
                        <Card name="fondo" id="fondo" style={{backgroundColor:"#FDFFFE"}} onChange={this.onChange}>
                            <td name="fondo" id="fondo">Producto: {i.productoId}</td>
                            <td name="fondo" id="fondo">Cantidad: {i.cantidad}</td>
                            <td name="fondo" id="fondo">Observaciones: {i.observaciones} </td>
                            {/* <Button name="boton" id="boton"
                            className="btn #e65100 orange darken-4"
                            onClick={this.onChange}
                        >{botonTexto}
                        </Button> */}
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
                            onClick={()=>this.todoListo(this.props.pedido.id)}
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
