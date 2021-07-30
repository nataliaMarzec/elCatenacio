import React from "react";
import { Button, Input } from "reactstrap";

class PedidoItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaItems: props.listaItems,
      unItem: props.unItem,
      precio: props.precio,
      id: props.id,
      descripcion: props.descripcion,
      importe: null,
      cantidad: null,
      productoId: props.productoId,
      pedido: props.pedido,
      index: props.key
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    this.setState({ listaItems: this.state.listaItems, index: this.props.key })

  }
 

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido });
    }
    if (nextProps.pedidoId !== this.props.pedidoId) {
      this.setState({ pedidoId: nextProps.pedidoId });
    }
    if (nextProps.listaItems !== this.props.listaItems) {
      this.setState({ listaItems: this.props.listaItems });
    }
    if (nextProps.unItem !== this.props.unItem) {
      this.setState({ unItem: nextProps.unItem });
    }
    if (nextProps.productoId !== this.props.productoId) {
      this.setState({ productoId: this.props.productoId });
    }
    if (nextProps.precio !== this.props.precio) {
      this.setState({ precio: this.props.precio });
    }
    if (nextProps.descripcion !== this.props.descripcion) {
      this.setState({ descripcion: this.props.descripcion });
    }
    if (nextProps.importe !== this.props.importe) {
      this.setState({ importe: this.props.importe });
    }
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: this.props.productos });
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto });
    }
    if (nextProps.key !== this.props.key) {
      this.setState({ index: nextProps.key });
    }
  }

  searchFun(e) {
    if (e.target.value.length !== 0) {
      let enteredValue = e.target.value.toLowerCase();
      let presentValue = this.props.options.filter(function (data) {
        return data.name.indexOf(enteredValue) > -1;
      });
      this.setState({ productos: presentValue });
    } else {
      this.setState({ productos: this.state.productos });
    }
  }

  handleChange(e) {
    let unItem = this.state.unItem
    var nuevoItem = Object.assign({}, this.state.unItem);
    nuevoItem[e.target.name] = e.target.value;
    unItem = nuevoItem
    this.setState({ unItem: unItem}
    ,() => console.log("nuevoItem/key", this.state.unItem, nuevoItem)
    );
    this.props.calcular(unItem)
  };



  render() {
    return (
      <tr key={this.props.key}>
        <td>{this.state.unItem.descripcion}</td>
        <td>
          <input
            key="cantidad"
            id={this.props.key}
            style={{ backgroundColor: "#eee363" }}
            type="number"
            id="cantidad"
            name="cantidad"
            min={1}
            value={this.state.unItem.cantidad}
            onChange={this.handleChange}
            className="form-control"
          ></input>
        </td>
      </tr>
    );
  }
}

export default PedidoItems;
