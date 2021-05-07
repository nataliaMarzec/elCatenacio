import React from "react";
import Pedido from "./Pedido";
import CargarPedido from "./CargarPedido";
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

class Pedidos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: {},
      pedidos: [],
      producto: {},
      productos: [],
      modal: false,
      editable: false,
      menus: [],
      unPedido: {},
      cantidad: [],
      importeTotal: [],
      descripcion: [],
      precioUnitario: [],
      items:[]
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentWillReceiveProps(props) {
    this.setState({ producto: props.producto });
    this.setState({ productos: props.productos });
    // this.setState({menus:props.menus})
    console.log("reciveV", props.producto);
  }

  componentDidMount() {
    this.listadoPedidos();
  }

  componentWillMount() {
    this.listadoProductos();
  }

  listadoPedidos = () => {
    fetch(`http://localhost:8383/pedidosTodos`)
      .then((res) => res.json())
      .then((pds) =>
        this.setState({
          pedidos: pds,
          pedido: {},
          // items:this.state.pedido.ItemsPedido,
        })
      );
      console.log("listado pedidoItems__________",this.state.pedidos)
  };

  listadoProductos = () => {
    fetch(`http://localhost:8383/productos`)
      .then((res) => res.json())
      .then((prods) =>
        this.setState({
          productos: prods,
          producto: {},
          menus: prods.descripcion,
          descripcion: "",
        })
      );
  };

  actualizarAlEliminar = (unPedido) => {
    var listaActualizada = this.state.pedidos.filter(
      (item) => unPedido !== item
    );
    this.setState({ pedidos: listaActualizada, pedido: {} });
  };

  eliminarPedido(id) {
    this.props.eliminarPedido(id);
  }

  seleccionar = (unPedido) => {
    this.setState({ pedido: unPedido });
  };

  ModalHeaderStrong = () => {
    return (
      <ModalHeader editable={this.state.editable} toggle={this.toggle}>
        <strong>Nuevo</strong>Pedido
      </ModalHeader>
    );
  };

  render(props) {
    return (
      <div className="container">
        <div></div>
        <Row>&nbsp;</Row>
        <Container fluid>
          <Button color="success" onClick={this.toggle}>
            Nuevo pedido
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <this.ModalHeaderStrong></this.ModalHeaderStrong>
            <CargarPedido
              listadoPedidos={this.listadoPedidos}
              pedido={this.state.pedido}
              pedidos={this.state.pedidos}
              listadoClientes={this.listadoProductos}
              producto={this.state.producto}
              productos={this.state.productos}
              menus={this.state.menus}
            />
          </Modal>

          <Row>&nbsp;</Row>
        </Container>
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardBody>
                  <Table responsive bordered size="sm">
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Mesero</th>
                        <th>Sección</th>
                        <th>Cantidad</th>
                        <th>Precio p/un.</th>
                        <th>Importe</th>
                        <th>descripcion</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  renderRows() {
    let pedidos = this.state.pedidos;
    let productos = this.state.productos;
    let menus = this.state.menus;
    return !pedidos
      ? console.log("NULL", null, productos, menus)
      : pedidos.map((unPedido, index) => {
          return (
            <Pedido
              key={index}
              pedido={unPedido}
              unPedido={this.state.unPedido}
              pedidos={this.state.pedidos}
              productos={this.state.productos}
              producto={this.state.producto}
              selector={this.seleccionar}
              actualizarAlEliminar={this.actualizarAlEliminar}
              eliminarPedido={this.eliminarPedido.bind(this)}
              toggle={this.toggle}
            />
          );
        });
  }
}

export default Pedidos;
