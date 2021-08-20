import React from "react";
import CocinaDetallesController from "./CocinaDetallesController";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import {
  Table, TabContent, TabPane, Nav, NavItem, NavLink,
  Card, Button, CardColumns, CardText, Container, Row, Col
} from 'reactstrap';

class CocinaDetalles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionado: {},
      pedido: {},
      pedidos: [],
      productos: [],
      producto: {},
      item: {},
      items: [],
      itemsPreparados: [],
      pedidoCompleto: false,
      date: new Date()
    };
    this.onChangeDate = this.onChangeDate.bind(this)
    this.handleDateSelect = this.handleDateSelect.bind(this)
  }

  componentWillMount() {
    this.listadoPedidos();
    this.listadoProductos();
    this.listadoItemsPedido();
    this.setState({date:this.state.date})
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

  onChangeDate(fecha){
    this.setState({ date: fecha },
      () => console.log("date", this.state.date))
  }

  handleDateSelect = () => {
    this.setState({ date: this.state.date },
      () => console.log("date", this.state.date))
  }

  render() {
    console.log("cocina", this.state.date);
    return (
      <div>
        {/* <Row>
          <DatePicker
          //  className="row border offset-sm-3 rounded mr-3 shadow-lg p-3 mb-3 bg-body rounded" key="padre"
           selected={this.state.date}
          //  onSelect = {this.handleDateSelect }  
           onChange={this.onChangeDate}
            />
        </Row> */}
        <CocinaDetallesController
          pedidos={this.state.pedidos}
          items={this.state.items}
          item={this.state.item}
          productos={this.state.productos}
          producto={this.state.producto}
          itemsPreparados={this.state.itemsPreparados}
          pedidoCompleto={this.state.pedidoCompleto}
          date={this.state.date}
          onChangeDate={this.onChangeDate}
          handleDateSelect={this.handleDateSelect}
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
