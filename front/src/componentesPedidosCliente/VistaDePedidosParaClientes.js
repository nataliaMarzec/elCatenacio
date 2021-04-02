import React from "react";
import Pedido from "./Pedido";
import CargarPedido from "./CargarPedido";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardFooter,
  CardSubtitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Modal,
  ModalHeader,
  Container,
  CardHeader,
  Table,
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import logo from "../assets/img/brand/logo.svg";
import data from "./data";
const {getCodigo,getPrecio} = require("./CargarPedido");


class VistaDePedidosParaClientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: {},
      pedidos: [],
      modal: false,
      editable: false,
      data: [],
      codigo:"",
      descripcion:"",
      precio:"",
      seleccionado:{},
      
    };
    this.seleccionar = this.seleccionar.bind(this);
    this.actualizarAlEliminar = this.actualizarAlEliminar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.listadoPedidos = this.listadoPedidos.bind(this);
    this.estadoInicial = this.estadoInicial.bind(this);
    this.generarFila = this.generarFila.bind(this);
    
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
  verDetallesPedido(id) {
    var listaActualizada = this.state.pedidos.filter(
      (item) => id == item.id
    );
    this.setState({ pedidos: listaActualizada });
  }

  listadoBusqueda = (busqueda) => {
    if (busqueda != null) {
      fetch(`http://localhost:8383/pedidos` + busqueda)
        .then((res) => res.json())
        .then((pdds) => this.setState({ pedidos: pdds }));
    }
    if (busqueda == null) {
      fetch(`http://localhost:8282/pedidos`)
        .then((res) => res.json())
        .then((pdds) => this.setState({ pedidos: pdds }));
    }
  };
  estadoInicial = () => {
    this.setState({
      codigo: "",
      descripcion: "",
      precio: "",
      habilitado: "",
    });
  };

  verDetallesPedido(codigo) {
    var listaActualizada = this.state.pedidos.find(
      (item) => codigo == item.codigo
    );
    console.log("listaActualizada", listaActualizada);
    this.setState({
      pedido: listaActualizada,
      codigo: codigo,
    });
    return listaActualizada;
  }

  handleSubmitPedido = (event) => {
    console.log("submit",event)
    var busqueda;
    if (this.state.codigo === "") {
      this.listadoBusqueda(busqueda);
    }
    if (this.state.codigo !== "") {
      busqueda = '?busqueda=codigo=="' + this.state.codigo + '"';
      this.listadoBusqueda(busqueda);
    }
    event.preventDefault(event);
  };

  generarFila(unPedido) {
    var pedido = this.state.pedido;
    this.setState({ pedido: unPedido });
    var myArray = this.state.pedidos.slice();
    myArray.push({ ...this.state.pedido });
    this.setState({ pedidos: myArray });
    console.log(myArray, " --array handler  ", this.state.pedidos.values());
  }

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
      <ModalHeader editable={this.state.editable} toggle={this.toggle}>
        <strong>Nuevo</strong>Pedido
      </ModalHeader>
    );
  };

  render(props) {
    var listaPedidos = this.state.pedidos;
   
    return listaPedidos.map((card, pedido, index) => (
      <div className="container">
      <this.cardPedido
        key={index}
        value={pedido}
        codigo={pedido.precio}
        descripcion={pedido.descripcion}
        precio={pedido.precio}
        pedido={this.state.pedido}
        pedidos={this.state.pedidos}
        listadoPedidos={this.listadoPedidos}
      ></this.cardPedido>
      </div>
    ));
  }

  pedidoSeleccionado = (unPedido) => {};
  cardPedido = () => {
    var pedido=this.state.pedido;
    return (
      <div className="container">
        <Col xs="12" md="12">
          <Row></Row>
          <Col xs="12" sm="6" md="4">
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
                <Label>
                  Codigo
                </Label>
                <Label>
                  {this.state.pedido.codigo}
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  Descripción
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  Precio $
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  Habilitado
                </Label>
              </FormGroup>
               <tbody>{this.unPedido}</tbody>

            <Button
              type="submit"
              color="success"
              outline
            >
              <i className="fa fa-dot-circle-o"></i> Comprar
            </Button>
              </CardBody>
            </Card>

           
          </Col>
        </Col>
      </div>
    );
  };
  unPedido = () => {
    // var codigo = this.state.codigo;
    var unPedido = this.state.pedido;
    if (unPedido) {
      return (
        <Pedido
          // codigo={codigo}
          unPedido={unPedido}
          pedidoSeleccionado={this.pedidoSeleccionado(unPedido)}
          seleccionado={this.state.seleccionado}
          pedidos={this.state.pedidos}
          idPedido={(unPedido) => unPedido.id}
        />
      );
    }
    if (!unPedido) {
      return console.log("NULL", null, unPedido);
    }
  };

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

export default VistaDePedidosParaClientes;
