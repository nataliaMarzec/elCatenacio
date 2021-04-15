import React from "react";
import { Button, Col } from "reactstrap";
class Cliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  eliminarVenta = (id) => {
    fetch("http://localhost:8383/ventas/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.props.actualizarAlEliminar(this.props.venta));
  };

  editar() {
    this.props.editarVentaFetch(this.props.venta);
    this.props.toggle();
  }

  seleccionarVenta() {
    this.props.selector(this.props.venta);
    console.log("seleccionar___", this.props.venta);
    this.props.toggle();
  }

  editCliente = () => {
    this.props.editarCliente(this.props.venta);
    this.props.toogle();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ventas !== this.props.ventas) {
      this.setState({ ventas: this.props.ventas });
    }
    if (nextProps.clientes !== this.props.clientes) {
      this.setState({ clientes: this.props.clientes });
      console.log("receiveProps clientesv", { clientes: this.props.clientes });
    }
    if (nextProps.cliente !== this.props.cliente) {
      this.setState({ cliente: this.props.cliente });
    }
  }

  render = () => {
    return (
      <tr>
        <td>{this.props.venta.id}</td>
        <td>{this.props.cuit}</td>
        <td>{this.props.venta.nroVenta}</td>
        <td>{this.props.venta.fecha}</td>
        <td>{this.props.venta.cliente}</td>
        <td>{this.props.venta.tipoDePago}</td>
        <td>{this.props.venta.facturado ? "si" : "no"}</td>
        <td>{this.props.venta.importeTotal}</td>
        <td>{this.props.venta.saldoCobrado}</td>
        <td>{this.props.venta.montoSinCobrar}</td>
        <td></td>
        <td>
          &nbsp;&nbsp;
        
          <Button
            color="danger"
            size="btn-xs"
            onClick={() => this.eliminarVenta(this.props.venta.id)}
          >
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            className="btn #e65100 orange darken-4"
            onClick={this.seleccionarVenta}
          >
            <i className="fa fa-dot-circle-o">{""} Editar</i>
          </Button>
        </td>
      </tr>
    );
  };
}

export default Cliente;
