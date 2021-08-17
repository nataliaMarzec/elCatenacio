import React from "react";
import Producto from "./Producto";
import CargarProducto from "./CargarProducto";
import {
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  Col,
  Card,
  CardBody,
} from "reactstrap";

class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      producto: {},
      productos: [],
      categorias: [{ id: 1, name: "Cocina" }, { id: 2, name: "Parrilla" }],
      modal: false,
      editable: false,
      titulo: "Nuevo",
      mostrarTabla: false,
    };
    this.listadoProductos = this.listadoProductos.bind(this)
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {
    this.listadoProductos();
    this.setState({categorias:this.state.categorias,categoria:this.state.categoria})
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

  ModalHeaderStrong = () => {
    return (
      <ModalHeader editable={this.state.editable} toggle={this.toggle}>
        <strong>Nuevo</strong>Producto
      </ModalHeader>
    );
  };

  //   onEditable() {
  //     this.setState({
  //       editable: !this.state.editable,
  //     });
  //     this.setState({titulo:"Modificar"})
  //   }

  //     ModalHeaderStrong = () => {
  //     var titulo = this.state.titulo;
  //       return (
  //         <ModalHeader onEditable={this.onEditable} toggle={this.toggle}>
  //           <strong>{titulo}</strong>Producto
  //         </ModalHeader>
  //       );
  //   };

  render(props) {
    let mostrarTabla = this.state.mostrarTabla;
    return (
      <div className="container">
        <div></div>
        <Row>&nbsp;</Row>
        <Container fluid>
          <Button color="success" onClick={this.toggle}>
            Nuevo producto
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <this.ModalHeaderStrong></this.ModalHeaderStrong>
            <CargarProducto
              listadoProductos={this.listadoProductos}
              productos={this.state.productos}
              producto={this.state.producto}
              categorias={this.state.categorias}
              toggle={this.toogle}
            />
          </Modal>

          <Row>&nbsp;</Row>
        </Container>
        <div className="animated fadeIn">
          {/* {Boolean(
            this.state.productos.length>1 && ( */}
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardBody>
                  <Table responsive bordered size="sm">
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Descripcion</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Habilitado</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* )
          )} */}
        </div>
      </div>
    );
  }

  renderRows() {
    let productos = this.state.productos;
    return !productos
      ? console.log("NULL", null)
      : productos.map((unProducto, index) => {
        return (
          <Producto
            key={index}
            producto={unProducto}
            productos={this.state.productos}
            selector={this.seleccionar}
            actualizarAlEliminar={this.actualizarAlEliminar}
            eliminarProducto={this.eliminarProducto.bind(this)}
            toggle={this.toggle}
          />
        );
      });
  }
}

export default Productos;
