import React from "react";
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
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import logo from "../assets/img/brand/logo.svg";
class CargarPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: props.pedido || {},
      pedidos: props.pedidos || [],
      modal: false,
      codigo: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCodigo = this.getCodigo.bind(this);
    this.getDescripcion = this.getDescripcion.bind(this);
    this.getPrecio = this.getPrecio.bind(this);
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

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    this.props.listadoPedidos();
    console.log("didMount-cargarCliente");
  }
  verDetallesPedido(id) {
    var listaActualizada = this.state.pedidos.filter((item) => id == item.id);
    this.setState({ pedidos: listaActualizada });
  }

  handleSubmit(event) {
    event.preventDefault(event);
    const id = this.state.pedido.id;
    // const codigo=this.state.pedido.codigo,
    // const descripcion=this.state.pedido.descripcion,
    // const precio=this.state.pedido.precio,
    if (id) {
      this.editarPedido(id);
    } else {
      this.crearPedido();
      this.getCodigo();
      this.getDescripcion();
      this.getPrecio();
      // this.verDetallesPedido();
      // console.log(this.verDetallesPedido(),"detallaes pedido")
      // this.agregarCard(codigo,descripcion,precio);
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

   getCodigo (){
    var codigo = this.state.pedido.codigo;
    return codigo;
  }
  getDescripcion() {
    var descripcion = this.state.pedido.descripcion;
    return descripcion;
  }
  getPrecio=() =>{
    var precio = this.state.pedido.precio;
    return precio;
  }


  agregarCard = (codigo, descripcion, precio) => {
    const nuevaCard = {
      pedido: {
        codigo: codigo,
        descripcion: descripcion,
        precio: precio,
      },
    };
    this.setState({ pedidos: [...this.state.pedidos, nuevaCard] });
  };

  render() {
    return (
      <Col xs="12" md="12">
        <ModalBody>
          <Col xs="12" md="12">
            {/* <Form className="form-vertical"> */}

            <Row></Row>
            <Col max-width="%100">
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
                    <CardSubtitle>Cargar imagen</CardSubtitle>
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
                  <FormGroup>
                  <tbody>
            <tr className="#1b5e20 green darken-4">
                  <th>Deuda</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th>{this.getPrecio() || 0}</th>
                  <th> </th>
                </tr>
            </tbody>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
            <Button
              color="danger"
              size="lg"
              className="btn-pill"
              type="submit"
              onClick={this.handleSubmit}
            >
              Guardar pedido
            </Button>

            {/* </Form> */}
          </Col>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Col>
    );
  }

  handleChange(e) {
    var nuevoPedido = Object.assign({}, this.state.pedido);
    nuevoPedido[e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ pedido: nuevoPedido });
    this.setState({ codigo: nuevoPedido.codigo });
    console.log(
      "evenEditar",
      nuevoPedido.codigo,
      this.state.pedido.id,
      this.state.pedido.codigo,
      this.state.pedido.precio,
      this.state.pedido.descripcion
    );
  }
}

export default CargarPedido;
// module.exports = {getCodigo,getDescripcion,getPrecio}
