import React from "react";
import { Button} from "reactstrap";

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
      console.log("pedidos props", this.props.pedidos, nextProps.pedidos.values());
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido });
    }
  }

  render = () => {
    return (
      <tr>
        <td>{this.props.pedido.codigo}</td>
        <td>{this.props.pedido.descripcion}</td>
        <td>{this.props.pedido.precio}</td>
        <td>{this.props.pedido.habilitado? "si":"no"}</td>

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
