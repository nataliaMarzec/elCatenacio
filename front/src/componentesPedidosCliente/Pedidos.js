import React from "react";
import Pedido from "./Pedido";
import CargarPedido from "./CargarPedido";
import CardPedido from "./CardPedido";
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
      modal: false,
      editable: false,
    };
    this.seleccionar = this.seleccionar.bind(this);
    this.actualizarAlEliminar = this.actualizarAlEliminar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.listadoPedidos = this.listadoPedidos.bind(this);
    this.estadoInicial = this.estadoInicial.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    this.listadoPedidos();
  }

  listadoPedidos = () => {
    fetch(`http://localhost:8383/pedidos`)
      .then((res) => res.json())
      .then((pds) => this.setState({ pedidos: pds, pedido: {} }));
  };

  estadoInicial = () => {
    this.setState({
      pedido: {
        codigo: "",
        descripcion: "",
        precio: "",
        habilitado:"",
      },
    });
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

  editarPedidoFetch(id) {
    this.props.editarPedido(id);
    this.toogle();
  }
  editarPedido = (unPedido) => {
    this.setState({ pedido: unPedido });
  };

  ModalHeaderStrong = () => {
    return (
      <ModalHeader
        editable={this.state.editable}
        toggle={this.toggle}
      >
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
              estadoInicial={this.estadoInicial}
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
                        <th>codigo</th>
                        <th>descripcion</th>
                        <th>precio</th>
                        <th>habilitado</th>
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
    return !pedidos
      ? console.log("NULL", null)
      : pedidos.map((unPedido, index) => {
          return (
            <Pedido
              key={index}
              pedido={unPedido}
              pedidos={this.state.pedidos}
              selector={this.seleccionar}
              actualizarAlEliminar={this.actualizarAlEliminar}
              eliminarPedido={this.eliminarPedido.bind(this)}
              editarPedido={this.editarPedido}
              toggle={this.toggle}
              editarPedidoFetch={this.editarPedidoFetch.bind(this)}
            />
          );
        });
  }
}

export default Pedidos;
