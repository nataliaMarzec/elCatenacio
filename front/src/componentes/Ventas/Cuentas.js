import React from "react";
import Ventas from "./VentasLista";
import Venta from "./Venta";
import CargarVenta from "./CargarVenta";
import Clientes from "../Clientes/ClientesLista";
import Articulos from "../Articulos/ArticulosLista";

class Cuentas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionado: {},
      venta: {},
      ventas: [],
      clientes: props.clientes,
      articulos: props.articulos,
      pagosCliente: [],
      modal: false,
      editable: false,
      cuit: "",
      ventasACliente: [],
      pagosDeCliente: [],
    };
    this.calcularValoresArticulo=this.calcularValoresArticulo.bind(this)
    this.totalDeuda=this.totalDeuda.bind(this);

  }

  calcularValoresArticulo = ({ cantidad, precioVenta }) => {
    const importe = cantidad * precioVenta;
    return { importe };
  };

  deudaTotal() {
    var total = 0;
    var saldoCobrado = 0;
    this.state.ventasACliente.forEach((ventas) => {
      total += parseFloat(ventas.importeTotal);
      saldoCobrado += parseFloat(ventas.saldoCobrado);
    });

    return (total - saldoCobrado).toFixed(2);
  }

  pagoDelCliente = () => {
    var total = 0;
    this.state.pagosDeCliente.forEach((pago) => {
      total += parseFloat(pago.importePago);
      console.log("pagos total", total);
    });

    return total.toFixed(2);
  };

  totalDeuda = () => {
    var total = this.deudaTotal() - this.pagoDelCliente();
    return total.toFixed(2);
  };

}

export default Cuentas;
