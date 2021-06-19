import React from "react";
import { Button, Input } from "reactstrap";

class PedidoItemsEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: props.toggle,
      items: props.items,
      item:props.item,
      // cantidad: 1,
      precio: props.precio,
      id: props.id,
      descripcion: props.descripcion,
      productoId: props.productoId,
      importe: props.precio,
      total: props.importe,
      pedido: props.pedido,
    };
    this.handleChange = this.handleChange.bind(this);
  }



  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido });
      // console.log("PEDIDO PROPS-------", this.props.pedido);
    }
    if (nextProps.pedidoId !== this.props.pedidoId) {
      this.setState({ pedidoId: nextProps.pedidoId });
      console.log("Pedido id PROPS-------", this.props.pedidoId);
    }
    if (nextProps.items !== this.props.items) {
      this.setState({ items: this.props.items });
      // console.log("Items props", this.props.items, nextProps.items.values());
    }
    if (nextProps.item !== this.props.item) {
      this.setState({ item: nextProps.item });
    }
    if (nextProps.productoId !== this.props.productoId) {
      this.setState({ productoId: this.props.productoId });
      // console.log("productoId", this.props.productoId);
    }
    if (nextProps.cantidad !== this.props.cantidad) {
      this.setState({ cantidad: this.props.cantidad });
      // console.log("cantidad---", this.props.cantidad);
    }
    if (nextProps.precio !== this.props.precio) {
      this.setState({ precio: this.props.precio });
      // console.log("precio---", this.props.precio);
    }
    if (nextProps.id !== this.props.id) {
      this.setState({ id: this.props.id });
      // console.log("id---", this.props.id);
    }
    if (nextProps.descripcion !== this.props.descripcion) {
      this.setState({ descripcion: this.props.descripcion });
      // console.log("precio---", this.props.precio);
    }
    if (nextProps.importe !== this.props.importe) {
      this.setState({ importe: this.props.importe });
      // console.log("importe---", this.props.importe);
    }
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: this.props.productos });
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto });
    }
  }
  

  handleChange = (e) => {
    var nuevoItem = Object.assign({}, this.state.item);
    console.log("nuevoItem", nuevoItem);
    nuevoItem[e.target.name] = e.target.value;
    console.log("nuevoItem2", nuevoItem);
    this.setState(
      { item: nuevoItem},
      // () => this.calcular(),
      // this.props.envioDeEstadoCantidad(
      //   this.state.id,
      //   this.state.descripcion,
      //   this.state.productoId,
      //   nuevoItem.cantidad
      // )
    );
    // this.setState({ importe: this.state.item.importe });
    console.log(
      "item",
      this.props.item,
    
      // nuevoImporte
    );
    // console.log("evento", `${e.target.name}:${e.target.value}`);
  };

  render() {
    // return this.props.items.map((unItem, index) => {
    return (
      <tr key={this.props.index}>
        {/* <td>{this.props.codigo}</td> */}
        <td>
        {/* <input
          key="productoId"
          type="text"
          id="productoId"
          name="productoId"
          value={this.state.productoId}
          // onChange={this.handleChange}
          className="form-control" */}
          {"hola"}
        </td>
        <td><input
          key="descripcion"
          type="text"
          id="descripcion"
          name="descripcion"
          value={this.state.item.descripcion}
          // onChange={this.handleChange}
          className="form-control"
          autoComplete="true"
        /></td>
        <td>
          <input
            key="cantidad"
            id="i-cantidad"
            style={{ backgroundColor: "#eee363" }}
            type="number"
            id="cantidad"
            name="cantidad"
            // defaultValue={1}
            min={1}
            value={this.state.item.cantidad}
            onChange={this.handleChange}
            className="form-control"
          ></input>
        </td>
        {/* <td>${this.state.item.importe || this.state.importe}</td> */}
        {/* <td>
          {this.props.children(this.settearProductoAItem)}
        </td> */}
      </tr>
    );
  }
}

export default PedidoItemsEditar;
