import React from "react";
import { Button, Row } from "reactstrap";

class PedidoListaRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: this.props.toggle,
      items: props.items,
      item: props.item,
      producto: props.unProducto,
      pedido: props.unPedido,
    };
    this.eliminarPedido = this.eliminarPedido.bind(this);
    this.seleccionarPedido = this.seleccionarPedido.bind(this);
  }

  eliminarPedido = (id) => {
    // var answer = window.confirm(
    //   "¿ELIMINAR  " + this.props.pedido.nombre + " ?"
    // );
    // if (answer) {
    fetch("http://localhost:8383/pedidos/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.props.actualizarAlEliminar(this.props.pedido));
    // }
  };

  seleccionarPedido() {
    this.props.selector(this.props.pedido);
    console.log("seleccionar___", this.props.pedido);
    this.props.toggle();
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
    }
    if (nextProps.unPedido !== this.props.unPedido) {
      this.setState({ unPedido: nextProps.unPedido });
    }
    if (nextProps.unProducto !== this.props.unProducto) {
      this.setState({ unProducto: nextProps.unProducto });
    }
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }
    if (nextProps.item !== this.props.item) {
      this.setState({ item: nextProps.item });
    }
    if (nextProps.listaProductos !== this.props.listaProductos) {
      this.setState({ listaProductos: nextProps.listaProductos });
    }
  }



  render = () => {
    let items = this.state.items
    let listaProductos = items.map((i,index) => <tr key={index}>
      {i.productoId}</tr>)
    let listaCantidad = items.map((i,index) => <tr key={index}>
      {i.cantidad}</tr>)
    let listaObservaciones = items.map((i,index)=> <tr key={index}>
      {i.observaciones}</tr>)
    let listaImporte = items.map((i,index) => <tr key={index}>
      ${i.importe}</tr>)

    console.log("mapRow", listaImporte)
    return (
      <tr>
        <td key="id">{this.props.unPedido.id}</td>
        {/* <td>{this.props.pedido.Fecha}</td>
        <td>{this.props.pedido.Hora}</td>
        <td>{this.props.pedido.responsableDeMesa}</td> */}
        <td key="seccion">{this.props.unPedido.seccion}</td>
        <td key="observacionesPedido">{this.props.unPedido.observaciones}</td>
        <td key="producto">{listaProductos}</td>
        <td key="cantidad">{listaCantidad}</td>
        <td key="observaciones">{listaObservaciones}</td>
        <td key="importe">{listaImporte}</td>
        <td key="importeTotal">{}</td>
        {Boolean(this.props.pedidos.length) && (    
          <td>
          <Button
            color="danger"
            size="btn-xs"
            onClick={() => this.eliminarPedido(this.props.pedido.id)}
          >
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            onClick={this.seleccionarPedido}
          >
            <i className="fa fa-dot-circle-o">{""}</i>
          </Button>

        </td>
        )}
      </tr>
    );
  };
}

export default PedidoListaRow;
