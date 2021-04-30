import React from "react";
import Pedido from "./Pedido";
import CargarUnPedido from "./CargarUnPedido";
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
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class UnPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: {},
      pedidos: [],
      producto: {},
      productos: [],
      unPedido: {},
      nuevaListaPedido: [],
      modal: false,
      editable: false,
      mesero: "",
      seleccionado: {},
      verTabla: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {
    this.listadoPedidos();
  }

  // componentWillMount() {
  //   this.getNuevaLista()
  // }

  listadoPedidos = () => {
    fetch(`http://localhost:8383/pedidos`)
      .then((res) => res.json())
      .then((pds) => this.setState({ pedidos: pds, pedido: {} }));
    console.log("listaPedidos", this.state.verTabla);
  };

  actualizarAlEliminar = (unPedido) => {
    var listaActualizada = this.state.pedidos.filter(
      (item) => unPedido !== item
    );
    this.setState({ pedidos: listaActualizada, unPedido: {} });
  };

  eliminarPedido(id) {
    this.props.eliminarPedido(id);
  }

  seleccionar = (unPedido) => {
    this.setState({ unPedido: unPedido });
  };

  ModalHeaderStrong = () => {
    return (
      <ModalHeader editable={this.state.editable} toggle={this.toggle}>
        <strong>Nuevo</strong>UnPedidoRow
      </ModalHeader>
    );
  };
  listadoBusqueda = (busqueda) => {
    if (busqueda) {
      fetch(`http://localhost:8383/pedidos` + busqueda)
        .then((res) => res.json())
        .then((pdds) => this.setState({ unPedido: pdds}));
    }
  };

  pedidoMesero(mesero) {
    var listaActualizada = this.state.pedidos.filter(
      (item) => mesero == item.mesero
    );
    this.setState({ pedidos: listaActualizada });
  }
  handleSubmit = (e) => {
    var busqueda;
    if (this.state.mesero === "") {
      this.listadoBusqueda(busqueda);
    }
    if (this.state.mesero !== "") {
      busqueda = '?busqueda=mesero=="' + this.state.mesero + '"';
      this.listadoBusqueda(busqueda);
    }
    e.preventDefault(e);
  };

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
  pedidoSeleccionado = (unCliente) => {};

  render(props) {
    const verTabla = this.state.verTabla;
    let tabla;
    // if (verTabla) {
      tabla = (
        <Table responsive bordered size="sm">
          <thead>
            <tr>
              <th>Código</th>
              <th>Mesero</th>
              <th>Sección</th>
              {/* <th>Menú/codigo</th> */}
              <th>Cantidad</th>
              <th>Precio p/un.</th>
              <th>Importe</th>
              <th>Pagado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </Table>
      );
    // }
    return (
      <Container fluid>
        <div className="row">{tabla}</div>
        <Button color="success" onClick={this.toggle}>
          Nuevo unPedido
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <this.ModalHeaderStrong></this.ModalHeaderStrong>
          <CargarUnPedido
            listadoPedidos={this.listadoPedidos}
            unPedido={this.state.unPedido}
            pedidos={this.state.pedidos}
            listadoProductos={this.listadoProductos}
            producto={this.state.producto}
            productos={this.state.productos}
            verTabla={this.state.verTabla}
          />
        </Modal>

        <Row>&nbsp;</Row>
        {/* <div id="pedido">{listado}</div> */}
      </Container>
    );
  }

  renderRows() {
    var unPedido = this.state.seleccionado;
    console.log("renderRows", unPedido);
    return (
      <Pedido
        key={unPedido.id}
        pedido={unPedido}
        pedidoSeleccionado={this.pedidoSeleccionado}
      />
    );
  }
}

export default UnPedido;
