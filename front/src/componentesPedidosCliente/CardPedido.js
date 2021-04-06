import React from "react";
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
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import asado from "../assets/img/brand/asado.jpg";
class CardPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: props.pedido || {},
      pedidos: props.pedidos || [],
      modal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  estadoInicial = () => {
    this.setState({
      pedido: {
        codigo: "",
        descripcion: "",
        precio: "",
      },
    });
  };

  componentDidMount() {
    this.listadoPedidos();
  }

  listadoPedidos = () => {
    fetch(`http://localhost:8383/pedidos`)
      .then((res) => res.json())
      .then((pds) => this.setState({ pedidos: pds, pedido: {} }));
  };

  handleSubmit(event) {
    event.preventDefault(event);
    const id = this.state.pedido.id;
    if (id) {
      this.editarPedido(id);
    } else {
      this.crearPedido();
    }
  }

  crearPedido = () => {
    fetch("http://localhost:8383/pedidos/nuevo", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.pedido),
    })
      .then((res) => this.props.listadoPedidos())
      .then((res) => this.estadoInicial());
  };

  editarPedido = (id) => {
    fetch("http://localhost:8383/pedidos/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.pedido),
    })
      .then(this.props.listadoPedidos())
      .then(this.estadoInicial());
  };

  render() {
    return (
      <Col xs="12" md="12">
        {/* <Form className="form-vertical"> */}
          <Row></Row>
          <Col xs="12" sm="6" md="4">
            <Card className="border-warning">
              <Card style={{ border: "1px solid red" }}>
                <CardImg
                  // top height="150px" src={asado}
                  type="img"
                  id="img"
                  name="img"
                  placeholder="Agrega una imagen..."
                  required={false}
                  value={this.state.pedido.img}
                  onChange={this.handleChange}
                />
                <CardBody>
                  <CardSubtitle>Imagen</CardSubtitle>
                  <CardText></CardText>
                </CardBody>
              </Card>

              <CardBody>
                <FormGroup row>
                  <Col md="3">
                    <Label for="codigo">Código</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="codigo"
                      name="codigo"
                      placeholder="Completa Código..."
                      required={true}
                      value={this.state.pedido.codigo}
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label for="descripcion">Descripción</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="descripcion"
                      name="descripcion"
                      placeholder="Completa Descripción..."
                      value={this.state.pedido.descripcion}
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label for="precio">Precio</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="precio"
                      name="precio"
                      placeholder="Completa precio..."
                      // required
                      value={this.state.pedido.precio}
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <div className="card-header-actions">
                    <AppSwitch
                      type="checkbox"
                      className={"float-right mb-0"}
                      label
                      color={"info"}
                      // defaultChecked
                      size={"sm"}
                      name="habilitado"
                      checked={this.state.pedido.habilitado}
                      onChange={this.handleChange}
                    />
                  </div>
                </FormGroup>
              </CardBody>
        
               
                <FormGroup>
                  <Button
                    color="danger"
                    size="lg"
                    className="btn-pill"
                    type="submit"
                    color="success"
                    outline
                    onClick={this.handleSubmit}
                  >
                    Crear tarjeta
                  </Button>
                </FormGroup>
              
            </Card>
          </Col>
        {/* </Form> */}
      </Col>
    );
  }
  handleChange(e) {
    var nuevoPedido = Object.assign({}, this.state.pedido);
    nuevoPedido[e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ pedido: nuevoPedido });
    console.log(
      "evenEditar",
      nuevoPedido,
      this.state.pedido.id,
      this.state.pedido.codigo,
      this.state.pedido.precio,
      this.state.pedido.descripcion
    );
  }
}

export default CardPedido;
