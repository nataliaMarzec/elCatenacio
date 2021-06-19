import React from "react";
import { Button, Input } from "reactstrap";

class PedidoItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: props.toggle,
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
    this.setState({ listaItems: this.state.listaItems, index: this.props.key },
       () => console.log("key", this.state.index))

  }
 
  listaItems() {
    return this.state.listaItems;
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
      // console.log("Pedido id PROPS-------", this.props.pedidoId);
    }
    if (nextProps.listaItems !== this.props.listaItems) {
      this.setState({ listaItems: this.props.listaItems });
      console.log("Items props", this.props.listaItems, nextProps.listaItems.values());
    }
    if (nextProps.unItem !== this.props.unItem) {
      this.setState({ unItem: nextProps.unItem });
    }
    if (nextProps.productoId !== this.props.productoId) {
      this.setState({ productoId: this.props.productoId });
      // console.log("productoId", this.props.productoId);
    }
    // if (nextProps.cantidad !== this.props.cantidad) {
    //   this.setState({ cantidad: this.props.cantidad });
    //   // console.log("cantidad---", this.props.cantidad);
    // }
    if (nextProps.precio !== this.props.precio) {
      this.setState({ precio: this.props.precio });
      // console.log("precio---", this.props.precio);
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
    this.setState({ unItem: unItem, index: this.props.key }
    ,() => console.log("nuevoItem/key", this.state.unItem, nuevoItem, this.props.key)
    );
    this.props.calcular(unItem)
    // console.log("evento", `${e.target.name}:${e.target.value}`);
  };


  // handleChange = (e) => {
  //   var nuevoItem = Object.assign({}, this.state.item);
  //   console.log("nuevoItem", nuevoItem);
  //   nuevoItem[e.target.name] = e.target.value;
  //   console.log("nuevoItem2", nuevoItem);
  //   this.setState(
  //     { item: nuevoItem,cantidad:nuevoItem.cantidad},
  //     // () => this.calcular(),
  //     this.props.envioDeEstadoCantidad(
  //       this.state.descripcion,
  //       nuevoItem.cantidad
  //     )
  //   );
  //   // this.setState({ importe: this.state.item.importe });
  //   console.log(
  //     "itemhandle",
  //     nuevoItem.cantidad,
  //   );
  //   // console.log("evento", `${e.target.name}:${e.target.value}`);
  // };

  render() {
    // return this.props.items.map((unItem, index) => {
    return (
      <tr key={this.props.key}>
        <td>{this.state.codigo}</td>
        {/* <td>{this.props.key}</td> */}
        <td>{this.state.unItem.descripcion}</td>
        <td>
          <input
            key="cantidad"
            id={this.props.key}
            style={{ backgroundColor: "#eee363" }}
            type="number"
            id="cantidad"
            name="cantidad"
            // defaultValue={1}
            min={1}
            value={this.state.unItem.cantidad}
            onChange={this.handleChange}
            className="form-control"
          ></input>
        </td>
        {/* <td>
          {this.props.children(this.settearProductoAItem)}
        </td> */}
      </tr>
    );
  }
}

export default PedidoItems;
