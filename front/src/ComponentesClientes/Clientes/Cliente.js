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
    //   "¿ELIMINAR  " + this.props.usuario.nombre + " ?"
    // );
    // if (answer) {
      fetch("http://localhost:8383/cliente/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(this.props.actualizarAlEliminar(this.props.usuario));
    // }
  };

  eliminarUsuario= (id) => {
      fetch("http://localhost:8383/usuario/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(this.props.actualizarAlEliminar(this.props.usuario));
  };

  seleccionarCliente() {
    this.props.selector(this.props.usuario);
    console.log("seleccionar___", this.props.usuario);
    this.props.toggle();
  }

  agregarVenta = () => {
    this.props.clienteSeleccionado(this.props.usuario);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.usuarios !== this.props.usuarios) {
      this.setState({ usuarios: this.props.usuarios });
    }
    if (nextProps.usuario !== this.props.usuario) {
      this.setState({ usuario: nextProps.usuario });
    }
  }

  render = () => {
    return (
      <tr>
        <td>{this.props.usuario.id_cliente || this.props.usuario.id_usuario}</td>
        <td>{this.props.usuario.nombre}</td>
        <td>{this.props.usuario.direccion}</td>
        <td>{this.props.usuario.telefono}</td>
        <td>{this.props.usuario.username}</td>
        <td>{this.props.usuario.email}</td>
        <td>{this.props.usuario.rol}</td>
        <td>{this.props.usuario.registrado == true ? "si" : "no"}</td>
        <td>
          <Button
            color="danger"
            size="btn-xs"
            onClick={() => this.eliminarCliente(this.props.usuario.id_cliente)}
          >
            {/* <Col xs="10" sm="8" md="4" xl="1"> */}
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            color="info"
            size="btn-xs"
            onClick={this.seleccionarCliente}
          >
            <i className="fa fa-dot-circle-o font-1xl d-block mt-1">{""}</i>
          </Button>
         
        </td>
      </tr>
    );
  };
}

export default Cliente;
