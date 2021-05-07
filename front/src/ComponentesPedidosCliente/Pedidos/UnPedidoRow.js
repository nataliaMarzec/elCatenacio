import React from "react";
import { Button } from "reactstrap";

class UnPedidoRow extends React.Component {
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
    }).then(this.props.actualizarAlEliminar(this.props.unPedido));
  };

  editar() {
    this.props.editarPedidoFetch(this.props.unPedido);
    this.props.toggle();
  }

  seleccionarPedido() {
    this.props.selector(this.props.unPedido);
    console.log("seleccionar___", this.props.unPedido);
    console.log("productoS____",this.props.producto)
    this.props.toggle();
  }

  agregarVenta = () => {
    this.props.pedidoseleccionado(this.props.unPedido);
  };

  editCliente = () => {
    this.props.editarCliente(this.props.unPedido);
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
    // if (nextProps.unPedido !== this.props.unPedido) {
    //   this.setState({ unPedido: nextProps.unPedido });
    // }
    if (nextProps.unPedido !== this.props.unPedido) {
      this.setState({ unPedido: nextProps.unPedido });
    }
  }

  render = () => {
    return (
      <tr>
        <td>{this.props.unPedido.codigoPedido}</td>
        <td>{this.props.unPedido.mesero}</td>
        <td>{this.props.unPedido.seccion}</td>
        <td>{this.props.unPedido.cantidad}</td>
        <td>{this.props.unPedido.precioUnitario}</td>
        <td>{this.props.unPedido.importeTotal}</td>
        <td>{this.props.unPedido.pagado}</td>
        {/* <td>{this.props.unPedido.habilitado? "si":"no"}</td> */}
        <td>
          <Button
            color="danger"
            size="btn-xs"
            onClick={() => this.eliminarPedido(this.props.unPedido.id)}
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

export default UnPedidoRow;
