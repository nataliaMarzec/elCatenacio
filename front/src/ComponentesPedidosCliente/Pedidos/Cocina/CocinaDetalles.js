import React from "react";
import CocinaDetallesController from "./CocinaDetallesController";

class CocinaDetalles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionado: {},
      pedido: {},
      pedidos: [],
      productos:[],
      producto:{},
      item: {},
      items: []

    };
  }

  componentWillMount() {
    this.listadoPedidos();
    this.listadoProductos();
    this.listadoItemsPedido();
  }

  listadoPedidos = () => {
    fetch(`http://localhost:8383/pedidos`)
      .then((res) => res.json())
      .then((pds) =>
        this.setState({
          pedidos: pds,
          pedido: {},
        })
      );
  };

  listadoProductos = () => {
    fetch(`http://localhost:8383/productos`)
      .then((res) => res.json())
      .then((pds) =>
        this.setState({
          productos: pds,
          producto: {},
        })
      );
  };

  listadoItemsPedido = () => {
    fetch(`http://localhost:8383/itemsTodos`)
      .then((res) => res.json())
      .then((its) =>
        this.setState({
          items: its,
          item: {},
        })
      );
  };


  listadoBusqueda = (busqueda) => {
    if (busqueda != null) {
      fetch(`http://localhost:8383/pedidos` + busqueda)
        .then((res) => res.json())
        .then((pddos) => this.setState({ pedidos: pddos }));
    }
    if (busqueda == null) {
      fetch(`http://localhost:8383/pedidos`)
        .then((res) => res.json())
        .then((pddos) => this.setState({ pedidos: pddos }));
    }
  };




  render() {
    // console.log("cocina", this.state.pedidos);
    return (
      <div>
        <CocinaDetallesController
          pedidos={this.state.pedidos}
          items={this.state.items}
          item={this.state.item}
          productos={this.state.productos}
          producto={this.state.producto}
          listadoPedidos={this.listadoPedidos}
          listadoItemsPedido={this.listadoItemsPedido}
          listadoProductos={this.listadoProductos}
        ></CocinaDetallesController>
      </div>
    );
  }

  // Button value="Cancel" formnovalidate='true' 

}

export default CocinaDetalles;
