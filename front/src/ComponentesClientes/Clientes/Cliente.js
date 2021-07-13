import React from "react";
import { Button } from "reactstrap";

class Cliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: this.props.toggle,
    };
    this.eliminarCliente = this.eliminarCliente.bind(this);
    this.seleccionarCliente = this.seleccionarCliente.bind(this);
  }

  eliminarCliente = (id) => {
    // var answer = window.confirm(
    //   "¿ELIMINAR  " + this.props.cliente.nombre + " ?"
    // );
    // if (answer) {
      fetch("http://localhost:8383/clientes/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(this.props.actualizarAlEliminar(this.props.cliente));
    // }
  };

  seleccionarCliente() {
    this.props.selector(this.props.cliente);
    console.log("seleccionar___", this.props.cliente);
    this.props.toggle();
  }

  agregarVenta = () => {
    this.props.clienteSeleccionado(this.props.cliente);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.clientes !== this.props.clientes) {
      this.setState({ clientes: this.props.clientes });
    }
    if (nextProps.cliente !== this.props.cliente) {
      this.setState({ cliente: nextProps.cliente });
    }
  }

  render = () => {
    return (
      <tr>
        <td>{this.props.cliente.id_cliente}</td>
        <td>{this.props.cliente.dni}</td>
        <td>{this.props.cliente.nombre}</td>
        <td>{this.props.cliente.apellido}</td>
        <td>{this.props.cliente.direccion}</td>
        <td>{this.props.cliente.telefono}</td>
        <td>{this.props.cliente.email}</td>
        <td>
          <Button
            color="danger"
            size="btn-xs"
            onClick={() => this.eliminarCliente(this.props.cliente.id_cliente)}
          >
            {/* <Col xs="10" sm="8" md="4" xl="1"> */}
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            className="btn #e65100 orange darken-4"
            onClick={this.seleccionarCliente}
          >
            <i className="fa fa-dot-circle-o">{""} Editar</i>
          </Button>
         
        </td>
      </tr>
    );
  };
}

export default Cliente;
