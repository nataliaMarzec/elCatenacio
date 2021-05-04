import React from "react";
import { Button } from "reactstrap";

class Pedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: this.props.toggle,
    };
    this.eliminarPedido = this.eliminarPedido.bind(this);
    this.seleccionarPedido = this.seleccionarPedido.bind(this);
  }

  eliminarPedido = (id) => {
    fetch("http://localhost:8383/pedidos/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.props.actualizarAlEliminar(this.props.pedido));
  };

  editar() {
    this.props.editarPedidoFetch(this.props.pedido);
    this.props.toggle();
  }

  seleccionarPedido() {
    this.props.selector(this.props.pedido);
    console.log("seleccionar___", this.props.pedido);
    console.log("productoS____",this.props.producto)
    this.props.toggle();
  }

  agregarVenta = () => {
    this.props.pedidoseleccionado(this.props.pedido);
  };

  editCliente = () => {
    this.props.editarCliente(this.props.pedido);
    this.props.toogle();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
      console.log(
        "pedidos props",
        this.props.pedidos,
        nextProps.pedidos.values()
      );
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido });
    }
    if (nextProps.nuevaListaPedido !== this.props.nuevaListaPedido) {
      this.setState({ nuevaListaPedido: this.props.nuevaListaPedido });
      console.log(
        "nuevaListaPEDIDO props",
        this.props.nuevaListaPedido,
        nextProps.nuevaListaPedido.values()
      );
    }
    // if (nextProps.menus !== this.props.menus) {
    //   this.setState({ menus: this.props.menus });
    //   console.log(
    //     "Menus props",
    //     this.props.menus,
    //     nextProps.menus.values()
    //   );
    // }
    // if (nextProps.producto !== this.props.producto) {
    //   this.setState({ producto: nextProps.producto });
    //   console.log(
    //     "producto prop",
    //     this.props.producto
    //   );
    // }
  }

  render = () => {
    return (
      <tr>
        <td>{this.props.pedido.codigoPedido}</td>
        <td>{this.props.pedido.mesero}</td>
        <td>{this.props.pedido.seccion}</td>
        <td>{this.props.pedido.cantidad}</td>
        <td>{this.props.pedido.precioUnitario}</td>
        <td>{this.props.pedido.importeTotal}</td>
        <td>{this.props.pedido.pagado}</td>
        {/* <td>{this.props.pedido.habilitado? "si":"no"}</td> */}
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
            className="btn #e65100 orange darken-4"
            onClick={this.seleccionarPedido}
          >
            <i className="fa fa-dot-circle-o">{""} Editar</i>
          </Button>
        </td>
      </tr>
    );
  };
}

export default Pedido;
