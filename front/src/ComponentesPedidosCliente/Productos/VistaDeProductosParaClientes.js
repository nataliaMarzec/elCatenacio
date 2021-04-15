import React from "react";
import Producto from "./Producto";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  FormGroup,
  Label,
  Col,
  Row,
  ModalHeader,
  Table,
} from "reactstrap";

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
    var listaPedidos = this.state.productos;
    return listaPedidos.map((producto, index) => (
      <div className="container">
        <CardBody>
          <Table responsive bordered size="sm">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Habilitado</th>
              </tr>
            </thead>
            <tbody>{this.renderRows(producto, index)}</tbody>
          </Table>
        </CardBody>
      </div>
    ));
  }

  cardPedido = (producto, index) => {
    return (
      <Row>
        <div key={index}>
          {/* <Col xs="12" md="12"> */}
          <Row className="col-md-4">
            <Col>
              <Card className="border-warning">
                <Card style={{ border: "1px solid red" }}>
                  <CardImg top src={logo} />
                  <CardBody>
                    <CardSubtitle>Cargar imagen</CardSubtitle>
                    <CardText></CardText>
                  </CardBody>
                </Card>
                <CardBody>
                  <FormGroup>
                    <Label>Codigo</Label>
                  </FormGroup>
                  <FormGroup>
                    <Label>Descripción</Label>
                  </FormGroup>
                  <FormGroup>
                    <Label>Precio $</Label>
                  </FormGroup>
                  <FormGroup>
                    <Label>Habilitado</Label>
                  </FormGroup>
                  <tbody>{this.renderRows(producto, index)}</tbody>
                  <Button type="submit" color="success" outline>
                    <i className="fa fa-dot-circle-o"></i> Comprar
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* </Col> */}
        </div>
      </Row>
    );
  };

  renderRows(producto, index) {
    var pedidosLista = this.state.productos;
    var listaActualizada = pedidosLista.filter((item) => producto == item);
    console.log("renderRows", listaActualizada);
    return (
      <Producto key={index} producto={producto} productos={listaActualizada} />
    );
  }
}

export default VistaDeProductosParaClientes;
