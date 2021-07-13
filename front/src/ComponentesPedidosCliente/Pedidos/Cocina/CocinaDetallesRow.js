import React from "react";
import { Button } from "reactstrap";

class CocinaDetallesRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedido:{},
            pedidos:props.pedidos
        };
        this.listo = this.listo.bind(this);
        // this.seleccionarPedido = this.seleccionarPedido.bind(this);
    }
  
    listo = (id) => {
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
  



    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.pedidos !== this.props.pedidos) {
            this.setState({ pedidos: this.props.pedidos }, () => console.log("pedidosprops", this.props.pedidos));
        }
        if (nextProps.pedido !== this.props.pedido) {
            this.setState({ pedido: nextProps.pedido }, () => console.log("pedidoprops", this.props.pedido));
        }
        if (nextProps.items !== this.props.items) {
            this.setState({ items: nextProps.items }, () => console.log("itesmprops", this.props.items));
        }
        if (nextProps.item !== this.props.item) {
            this.setState({ item: nextProps.item }, () => console.log("itemprops", this.props.item));
        }
    }

   

    render = () => {
        let items = this.props.items
        let listaProductos = items.map((i, index) => <tr key={index}>
            {i.productoId}</tr>)
        let listaCantidad = items.map((i, index) => <tr key={index}>
            {i.cantidad}</tr>)
        let listaObservaciones = items.map((i, index) => <tr key={index}>
            {i.observaciones}</tr>)
        return (
            <tr>
                <td key="id">{this.props.pedido.id}</td>
                <td key="productoId">{listaProductos}</td>
                <td key="cantidad">{listaCantidad}</td>
                <td key="observaciones">{listaObservaciones}</td>
                <td></td>
                <React.Fragment>
                {this.props.pedido.entregado === false &&
                    <td>
                        <Button
                            className="btn #e65100 orange darken-4"
                            onClick={()=>this.listo(this.props.pedido.id)}
                        >
                            <i className="fa fa-dot-circle-o">{""} Listo</i>
                        </Button>
                    </td>
                }
                </React.Fragment>

            </tr>
        );
    };
}

export default CocinaDetallesRow;
