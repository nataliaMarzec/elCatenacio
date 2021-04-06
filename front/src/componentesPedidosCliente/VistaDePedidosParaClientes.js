import React from "react";
import Pedido from "./Pedido";
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
import { AppSwitch } from "@coreui/react";
import logo from "../assets/img/brand/logo.svg";


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
    this.unPedido=this.unPedido.bind(this)
    
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
      cliente:{
      codigo: "",
      descripcion: "",
      precio: "",
      habilitado: "",
      }
    });
  };

  verDetallesPedido(codigo) {
    var listaActualizada = this.state.pedidos.filter(
      (item) => codigo == item.codigo
    );
    console.log("listaActualizada", listaActualizada);
    this.setState({
      pedido: listaActualizada,
      codigo: codigo,
    });
    return listaActualizada;
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

  // render(props) {
  //   var listaPedidos = this.state.pedidos;
  //   console.log(listaPedidos,"listapEDIDOS RENDER")
  //   return listaPedidos.map((pedido,index) => (
  //     <div className="container">
  //     <this.cardPedido
  //       key={index}
  //       pedido={pedido}
  //       pedidos={this.state.pedidos}
  //       listadoPedidos={this.listadoPedidos}
  //       unPedido={this.unPedido(pedido)}
  //       // onSubmit={this.pedidoSeleccionado(pedido)}
  //     ></this.cardPedido>
  //     </div>
  //   ));
    
  // }

  render(){
    var listaPedidos = this.state.pedidos;
    console.log(listaPedidos,"listapEDIDOS RENDER")
    return listaPedidos.map((pedido,index) => (
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
      <tbody>{this.renderRows(pedido,index)}</tbody>
    </Table>
  </CardBody>
  </div>
    ));
  }

  pedidoSeleccionado = (unPedido) => {};
  cardPedido=(pedido)=>{
    return (
      <Row>
      <div key={pedido.id}>
        {/* <Col xs="12" md="12"> */}
          <Row className="col-md-4">
          <Col >
            <Card className="border-warning" >
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
               <tbody>{this.unPedido(pedido)}</tbody>
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
          </Row>
        {/* </Col> */}
       
      </div>
      </Row>
    );
  };
  unPedido(unPedido){
    // var unPedido = this.state.pedido;
    if (unPedido) {

      console.log("un pedido row________",unPedido.codigo)
      return (
        <Pedido
          key={unPedido.id}
          pedido={unPedido}
          // pedidoSeleccionado={this.pedidoSeleccionado(unPedido)}
          // seleccionado={this.state.seleccionado}
          pedidos={this.state.pedidos}
        />
      );
    }
    if (!unPedido) {
      return console.log("NULL", null, unPedido);
    }
  };

  renderRows(pedido,index) {
    var pedidosLista=this.state.pedidos;
    var listaActualizada = pedidosLista.filter(
      (item) => pedido == item
    );
    console.log("renderRows",listaActualizada)
          return (
            <Pedido
              key={index}
              pedido={pedido}
              pedidos={listaActualizada}
            />
          
        )
        
  }
}

export default VistaDePedidosParaClientes;
