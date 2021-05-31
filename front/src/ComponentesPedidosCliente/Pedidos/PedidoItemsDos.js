import React from "react";
import { Button, Input, Label } from "reactstrap";

class PedidoItemsDos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: props.toggle,
      cantidad: props.cantidad,
      importe: props.importe,
      descripciones: props.descripciones,
      precio: props.precio,
      items: props.items,
      item: props.item,
    };
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
      // console.log(
      //   "pedidos props",
      //   this.props.pedidos,
      //   nextProps.pedidos.values()
      // );
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido });
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
      console.log("precio---", this.props.precio);
    }
    if (nextProps.importe !== this.props.importe) {
      this.setState({ importe: this.props.importe });
      console.log("importe---", this.props.importe);
    }
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: this.props.productos });
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto });
    }
  }

  updateObservacionesItem = (productoId) => {
    fetch("http://localhost:8383/itemObservaciones/" + productoId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.item),
    })
      .then((res) => this.props.listadoItemsPedido)
      .then((res) => this.setState({ item: { ...this.state.item } }));
  };

  guardar(productoId) {
    this.updateObservacionesItem(productoId);
  }

  handleChange = (e) => {
    var nuevoItem = Object.assign({}, this.state.item);
    nuevoItem[e.target.name] = e.target.value;
    this.setState({ item: nuevoItem });
  };

  event = (e) => {
    e.preventDefault();
  };

  getImporte() {
    this.props.getImporte();
  }
  render = () => {
    return (
      <tr key={this.props.index}>
        <td key="observaciones" onSubmit={this.event}>
          <input
            style={{ backgroundColor: "#F5C765" }}
            type="text"
            id={this.state.item.observaciones}
            name="observaciones"
            placeholder="observaciones"
            // required
            value={this.state.item.observaciones}
            onChange={this.handleChange.bind(this)}
            className="form-control"
          ></input>
        </td>
        <td>${this.state.item.importe}</td>
        <td>
          {"  "}
          <Button
            color="info"
            size="btn-xs"
            onClick={() => this.guardar(this.props.productoId)}
          >
            <i className="fa fa-dot-circle-o">{""}</i>
          </Button>
        </td>
      </tr>
    );
  };
}

export default PedidoItemsDos;
