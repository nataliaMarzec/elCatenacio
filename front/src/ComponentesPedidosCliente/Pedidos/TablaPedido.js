import React, { useState } from "react";
import Pedido from "./Pedido";
import { Table, CardHeader } from "reactstrap";

class TablaPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido:{},
      pedidos:[],
      productos: props.productos || [],
      producto: props.producto || {},
      cliente: props.cliente || {},
      modal: false,
      codigo: "",
      descripcion: "",
      productoId: props.productoId,
      items: props.items || [],
      responsablesDeMesa: [],
      responsable: {},
      nombre: "",
      seleccionado: {},
    };
  }

  estadoInicial = () => {
    this.setState({
      pedido: {
        clienteId: null,
        codigoPedido: "",
        mesero: "",
        seccion: "",
        ItemsPedido: [
          {
            cantidad: 1,
            importeTotal: 0,
            Productos: {
              descripcion: "",
              precioUnitario: 0,
            },
          },
        ],
      },
    });
  };

  componentWillMount() {
    this.props.listadoPedidos();
    this.props.listadoItemsPedido();
    this.props.listadoProductos();
    this.listadoResponsablesDeMesa();
  }

  listadoResponsablesDeMesa = () => {
    fetch(`http://localhost:8383/responsables`)
      .then((res) => res.json())
      .then(
        (resps) => this.setState({ responsablesDeMesa: resps, responsable: {} })
      );
  };

  render() {
    let pedidos = this.state.pedidos;
    // if (pedidos) {
    return (
      //   <div className="container-fluid">

      <Table
        responsive
        bordered
        size="sm"
        style={{ backgroundColor: "#eee363" }}
      >
        <thead>
          <tr>
            <th>Código</th>
            <th>Mesero</th>
            <th>Sección</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>{this.unPedido(pedidos)}</tbody>
      </Table>
    );
    // } else {
    //   return (
    //     <div className="container">
    //         <div className="col-sm-8 mx-auto">
    //           <CardHeader className="text-center">No hay pedidos para mostrar</CardHeader>
    //         </div>
    //     </div>
    //   );
    // }
  }

  unPedido = (pedidos) => {
    const {crearPedido}=this.props;
    var unPedido = this.state.seleccionado;
    return (
      <Pedido
        pedido={unPedido}
        pedidos={pedidos}
        crearPedido={crearPedido}
        seleccionado={this.state.seleccionado}
        listadoPedidos={this.props.listadoPedidos}
      />
    );
  };

}
export default TablaPedido;
