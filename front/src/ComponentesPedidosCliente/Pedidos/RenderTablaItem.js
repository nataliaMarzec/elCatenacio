import React, { useState } from "react";
import Pedido from "./Pedido";
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
  ModalBody,
  ModalFooter,
  Row,
  Container,
  Table,
} from "reactstrap";

import { AppSwitch } from "@coreui/react";
import { Multiselect } from "multiselect-react-dropdown";
// import MultSelect from "./MultSelect";
// import MultiSelect from "./MultiSelect"
import PedidoItems from "./PedidoItems";
// import logo from "../assets/img/brand/logo.svg";
class RenderTablaItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: props.pedido || {},
      pedidos: props.pedidos || [],
      productos: props.productos || [],
      producto: props.producto || {},
      listaProductosEnPedido: props.listaProductosEnPedido,
      cliente: props.cliente || {},
      modal: false,
      codigo: "",
      descripcion: "",
      productoId: props.productoId,
      items: props.items || [],
      id: "",
      selectedValues: props.selectedValues || [],
    };
  }

  estadoInicial = () => {
    this.setState({
      pedido: {
        clienteId_pedido: null,
        codigoPedido: "",
        mesero: "",
        seccion: "",
        ItemsPedido: [
          {
            cantidad: 1,
            importeTotal: 0,
            montoCobrado: 0,
            pagado: "no",
            Productos: {
              descripcion: "",
              precioUnitario: 0,
            },
          },
        ],
      },
    });
  };
  componentWillReceiveProps(props) {
    this.setState({ items: props.items });
    this.setState({ productos: props.productos });
    this.setState({ producto: props.producto });
    this.setState({ selectedValues: props.selectedValues });
  }
  componentDidMount() {
    this.props.listadoItemsPedido();
    console.log("will items---", this.props);
  }
  render() {
    var listaProductosEnPedido = this.props.listaProductosEnPedido;
    var listaItems = this.state.items;


    console.log("items tabla", listaItems);
    
    if (listaItems.length) {
      return listaItems.map((item, index) => (
      
        <div className="container-fluid">
          <Container style={{ backgroundColor: "#f1f1f1" }}>
            {/* <h3>Cargar item</h3> */}
            <body></body>
            <Row>
              <Col class="col-lg-12">
                <div className="animated fadeIn">
                  <Row>
                    <Col xs="12" lg="12">
                      {/* <Card> */}
                        {/* <CardBody> */}
                          <Table responsive bordered size="sm">
                            <thead>
                              <tr>
                                <th>Código</th>
                                <th>Cantidad</th>
                                <th>Productos</th>
                                <th>Importe</th>
                                <th>Observaciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.renderItems(
                                item,
                                index,
                                item.productoId,
                                listaProductosEnPedido
                              )}
                            </tbody>
                          </Table>
                        {/* </CardBody> */}
                      {/* </Card> */}
                    </Col>
                  </Row>
                </div>
                {/* <Card fluid>
                <CardHeader>Detalles pedido</CardHeader>
                <CardBody> */}
                {/* </CardBody> */}
                {/* <Form class="row">
                  <FormGroup >
                   <Col className="col-md-4">
                   <Label>hola</Label>
                    <Input></Input>
                   </Col>
                    
                  </FormGroup>
                </Form> */}
                {/* </Card> */}
              </Col>
              <Col class="col-lg-4">{/* <h1>chau</h1> */}</Col>
              {/* <Col class="col-lg-4">
              <h1>hola</h1>
            </Col> */}
            </Row>
          </Container>
        </div>
      )
      );
    } else {
      return (
        <div className="container">
          <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">No hay items para mostrar</h1>
            </div>
          </div>
        </div>
      );
    }
  }
  renderItems(item, index, productoId, listaProductosEnPedido) {
    var itemsLista = this.state.items;
    // var listaActualizada = itemsLista.map((item) => item == item);
    if (listaProductosEnPedido.length) {
      var producto = listaProductosEnPedido.find((p) => p.id == productoId);
      console.log("renderRows", item.cantidad);
      var cantidad = item.cantidad;
      var precio = producto.precio;
    //   return !itemsLista
    //     ? console.log("NULL__pedidos", null, itemsLista)
    //     : itemsLista.map((item) => {
            return (
              <PedidoItems
                key={index}
                item={item}
                items={itemsLista}
                // items={listaActualizada}
                productoId={productoId}
                descripcion={producto.descripcion}
                importe={cantidad * precio}
                // listadoItemsPedido={this.props.listadoItemsPedido}
              />
            );
        //   });
    }
  }
}
export default RenderTablaItem;
