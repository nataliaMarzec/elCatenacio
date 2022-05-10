import React from "react";
import { Button } from "reactstrap";

class Cliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: this.props.toggle,
    };
    this.seleccionarCliente = this.seleccionarCliente.bind(this);
    this.eliminarUsuario=this.eliminarUsuario.bind(this)
  }



  eliminarUsuario = (id) => {
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
    }).then(this.props.actualizarAlEliminar(this.props.cliente,this.props.usuario));
      // }
  };

  seleccionarCliente(usuario,cliente) {
    this.props.selector(usuario,cliente);
    console.log("seleccionar___", usuario,cliente);
    this.props.toggle();
  }

  agregarVenta = () => {
    this.props.clienteSeleccionado(this.props.usuario);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.usuarios !== this.props.usuarios) {
      this.setState({ usuarios: nextProps.usuarios });
    }
    if (nextProps.usuario !== this.props.usuario) {
      this.setState({ usuario: nextProps.usuario },
        () => console.log("unUsuario", this.props.usuario)
        );
    }
    if (nextProps.clientes !== this.props.clientes) {
      this.setState({ clientes: nextProps.clientes });
    }
    if (nextProps.cliente !== this.props.cliente) {
      this.setState({ cliente: nextProps.cliente },
        // () => console.log("unClienteProps", this.props.cliente)
        );
    }
  }

  render = () => {
    return (
      <tr>
        {/* <td>{this.props.usuario.id_cliente || this.props.usuario.id_usuario}</td> */}
        <td>{this.props.cliente.nombre}</td>
        <td>{this.props.cliente.direccion}</td>
        <td>{this.props.cliente.telefono}</td>
        <td>{this.props.usuario.username}</td>
        <td>{this.props.usuario.email}</td>
        {/* <td>{this.props.usuario.password}</td> */}
        {/* <td>{this.props.usuario.registrado == true ? "si" : "no"}</td> */}
        <td>
          <Button
            color="danger"
            size="btn-xs"
            onClick={() => this.eliminarUsuario(this.props.cliente.id_cliente)}
          >
            {/* <Col xs="10" sm="8" md="4" xl="1"> */}
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            color="info"
            size="btn-xs"
            onClick={()=>this.seleccionarCliente(this.props.usuario,this.props.cliente)}
          >
            <i className="fa fa-dot-circle-o font-1xl d-block mt-1">{""}</i>
          </Button>

        </td>
      </tr>
    );
  };
}

export default Cliente;
