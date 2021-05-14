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
  Table
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
      items:props.items || [],
      id: "",
      options: [
        { value: 1, label: "h" },
        { value: 2, label: "c" },
      ],
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
  componentWillReceiveProps(props){
      this.setState({items:props.items})
  }
  componentDidMount() {
    this.props.listadoItemsPedido();
    console.log("will items---",this.props)
  }
  render() {
    var listaItems = this.state.items;
    console.log("items tabla", listaItems);
    if (listaItems.length) {
    return listaItems.map((item, index) => (
        <div className="container">
      <Container fluid style={{ backgroundColor: "#f1f1f1" }}>
        <h3>Cargar item</h3>
        <body></body>
        <Row>
          <Col class="col-lg-12">
            <div className="animated fadeIn">
              <Row>
                <Col xs="12" lg="12">
                  <Card>
                    <CardBody>
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
                        <tbody>{this.renderItems(item, index)}</tbody>
                      </Table>
                    </CardBody>
                  </Card>
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
          <Col class="col-lg-4">
            <h1>chau</h1>
          </Col>
          {/* <Col class="col-lg-4">
              <h1>hola</h1>
            </Col> */}
        </Row>
      </Container>
      </div>
    ));
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
  renderItems(item, index) {
    var itemsLista = this.state.items;
    var listaActualizada = itemsLista.filter((item) => item == item);
    console.log("renderRows", listaActualizada);
    return <PedidoItems key={index} item={item} items={listaActualizada} />;
  }
}
export default RenderTablaItem;
