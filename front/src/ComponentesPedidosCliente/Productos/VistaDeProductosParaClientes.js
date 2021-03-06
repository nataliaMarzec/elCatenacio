import React from "react";
import VistaDeProductosParaClientesCard from "./VistaDeProductosParaClientesCard";
import { Button, Col, Container, Row } from "reactstrap";

import logo from "../../assets/img/brand/logo.svg";

class VistaDeProductosParaClientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      producto: {},
      productos: [],
      modal: false,
      editable: false,
      seleccionado: {},
    };
    // this.seleccionar = this.seleccionar.bind(this);
    this.actualizarAlEliminar = this.actualizarAlEliminar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.listadoProductos = this.listadoProductos.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    this.listadoProductos();
  }

  listadoProductos = () => {
    fetch(`http://localhost:8383/productos`)
      .then((res) => res.json())
      .then((pds) => this.setState({ productos: pds, producto: {} }));
  };

  actualizarAlEliminar = (unProducto) => {
    var listaActualizada = this.state.productos.filter(
      (item) => unProducto !== item
    );
    this.setState({ productos: listaActualizada, producto: {} });
  };

  eliminarProducto(id) {
    this.props.eliminarProducto(id);
  }

  seleccionar = (unProducto) => {
    this.setState({ producto: unProducto });
  };


  render() {
    var listaProductos = this.state.productos;
    if(listaProductos.length){
    return listaProductos.map((producto, index) => (
      <div>
     
            {/* <Row className="col-md-4"> */}
            <ul>{this.renderRows(producto, index)}</ul>
            {/* <Button type="submit" color="success" outline>
                    <i className="fa fa-dot-circle-o"></i> Comprar
                  </Button>
            */}
     </div>
    ));
          }else{
            return(
            <div className="container">
            <div className="jumbotron mt-5">
              <div className="col-sm-8 mx-auto">
                <h1 className="text-center">No hay productos para mostrar</h1>
              </div>
            </div>
          </div>
            )
          }
  }

  renderRows(producto, index) {
    var productosLista = this.state.productos;
    var listaActualizada = productosLista.filter((item) => producto == item);
    console.log("renderRows", listaActualizada);
    return (
      <VistaDeProductosParaClientesCard
        key={index}
        producto={producto}
        productos={listaActualizada}
      />
    );
  }
}

export default VistaDeProductosParaClientes;
