import React from "react";

class Pago extends React.Component {
  render() {
    return (
      <tr key={this.props.pago.id}>
        <td>{this.props.pago.clienteId_pago}</td>
        <td>{this.props.pago.fechaPago}</td>
        <td>{this.props.pago.importePago}</td>
        <td> pago</td>
        <td> - </td>
        <td> - </td>
       
        <td>{this.props.pago.importePago}</td>
        
      </tr>
    );
  }
}
export default Pago;
