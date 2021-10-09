
import React from "react";
import { Button, Col } from "reactstrap";

class VentasAUnClienteRows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: this.props.toggle,
      cliente:props.cliente,
      pagosDeCliente: [],
    };
    
    this.seleccionarCliente = this.seleccionarCliente.bind(this);
  }



  editar() {
    this.props.editarClienteFetch(this.props.cliente);
    this.props.toggle();
  }

  seleccionarCliente() {
    this.props.selector(this.props.cliente);
    console.log("seleccionar___", this.props.cliente.cuit);
    this.props.toggle();
  }



  editCliente = () => {
    this.props.editarCliente(this.props.cliente);
    this.props.toogle();
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
        <td>{this.props.cliente.id}</td>
        <td>{this.props.cliente.cuit}</td>
        <td>{this.props.cliente.nombre}</td>
        <td>{this.props.cliente.apellido}</td>
        <td>{this.props.cliente.razonSocial}</td>
        <td>{this.props.cliente.telefono}</td>
        <td>{this.props.cliente.email}</td>
        
        <td>
          &nbsp;&nbsp;
          <Button
            className="btn #e65100 orange darken-4"
            onClick={this.seleccionarCliente}
          >
            <i className="fa fa-dot-circle-o">{""} Editar</i>
          </Button>
          &nbsp;&nbsp;

        &nbsp;&nbsp;
    
      
        </td>
      </tr>
    );
  };
}

export default VentasAUnClienteRows;
