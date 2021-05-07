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
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
// import logo from "../assets/img/brand/logo.svg";
class CargarUnPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: props.pedido || {},
      pedidos: props.pedidos || [],
      descripcion: props.descripcion || {},
      productos: props.productos || [],
      producto: props.producto || {},
      cliente: props.cliente || {},
      modal: false,
      mesero: "",
      verTabla:props.verTabla,
    };
  }

  estadoInicial = () => {
    this.setState({
      pedido: {
        codigoPedido: "",
        mesero: "",
        seccion: "",
        cantidad: "",
        precioUnitario: "",
        importeTotal: "",
        montoCobrado: "",
        pagado: "",
      },
    });
  };


  componentDidMount() {
    this.unPedido();
  }

  unPedido = () => {
    fetch(`http://localhost:8383/unPedido`)
      .then((res) => res.json())
      .then(
        (prods) => this.setState({ nuevaListaPedido: prods,pedido: {} }),
        console.log("productoEnviado", this.state.productos)
      );
  };

  pedidoMesero(mesero) {
    var listaActualizada = this.state.pedidos.filter(
      (item) => mesero == item.mesero
    );
    this.setState({pedidos: listaActualizada });
  }
  getPrecio = () => {
    var precio = this.state.pedido.precioUnitario;
    return precio;
  };

  handleSubmit = (e) => {
      var busqueda;
    const id = this.state.pedido.id;
    if (id) {
      this.editarPedido(id);
    } else {
      this.crearPedido();
    
      if (this.state.mesero !== "") {
        busqueda = '?busqueda=codigo=="' + this.state.mesero + '"';
        this.listadoBusqueda(busqueda);
        
      }
    }
    e.preventDefault(e);
    this.setState({verTabla:true });
  };
  pedidoMeseros = mesero => {
      fetch(`http://localhost:8888/clientes/busqueda` + mesero)
        .then(res => res.json())
        .then(pedido =>
          this.setState({
            seleccionado: pedido,
            verTabla: true,
          }))    
  };

  

  handleSubmitProducto = (e) => {
    var busqueda;
    if (this.state.codigoPedido === "") {
      this.listadoBusqueda(busqueda);
    }
    if (this.state.codigoPedido !== "") {
      busqueda = '?busqueda=mesero=="' + this.state.mesero + '"';
      this.listadoBusqueda(busqueda);
    }
    e.preventDefault(e);
  };

  listadoBusqueda = (busqueda) => {
    if (busqueda) {
      fetch(`http://localhost:8383/pedidos` + busqueda)
        .then((res) => res.json())
        .then((pdds) => this.setState({ unPedido: pdds }));
    }
  };

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
      .then((res) => this.estadoInicial())
  };

  // agregarProductoAPedidos = (id) =>{
  //   fetch(`http://localhost:8383/pedidos/producto/` +id, {
  //     method: "PUT",
  //     body: JSON.stringify(this.state.producto),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   })
  // }

  editarPedido = (id) => {
    fetch("http://localhost:8383/pedidos/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.pedido),
    })
      .then(this.props.listadoPedidos)
      .then(this.estadoInicial());
  };

  render() {
    var listaProductos = this.state.productos.map((producto) => {
      return (
        <div>
          <option value={producto.codigo} />
        </div>
      );
    });
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
                      <Label for="codigoPedido">Código</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="number"
                        id="codigoPedido"
                        name="codigoPedido"
                        placeholder="Código..."
                        required={true}
                        value={this.state.pedido.codigoPedido}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  {/* <FormGroup row>
                    <Col md="3">
                      <Label for="descripcion">Producto</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        placeholder="Elegir descripcion..."
                        required={true}
                        value={this.state.descripcion}
                        onChange={this.handleChangeProducto}
                      />
                    </Col>
                  </FormGroup> */}
                  <FormGroup row>
                    <Col md="3">
                      <Label for="mesero">Mesero</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="mesero"
                        name="mesero"
                        placeholder="Mesero..."
                        value={this.state.pedido.mesero}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label for="seccion">Sección</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="seccion"
                        name="seccion"
                        placeholder="Sección..."
                        // required
                        value={this.state.pedido.seccion}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <Form onSubmit={this.handleSubmitProducto} id="formulario">
                    <FormGroup row>
                    <Col md="3">
                      <Label for="codigo">Elegir codigo producto</Label>
                    </Col>
                      <Col xs="12" md="9">
                        <Input
                          type="number"
                          id="codigo"
                          name="codigo"
                          placeholder="Elegir codigo"
                          onChange={this.handleChangeProducto}
                          list="producto"
                        />
                      </Col>
                      <datalist id="producto">{listaProductos}</datalist>
                    </FormGroup>
                    <div className="row">
                      <div className="input-field col s12 m12">
                        {/* <Button
                          type="button"
                          style={{ margin: "2px" }}
                          color="success"
                          outline
                          onClick={this.limpiarTabla}
                        >
                          <i className="fa fa-dot-circle-o"></i>Ver clientes
                        </Button> */}
                      </div>
                    </div>
                  </Form>

                  <FormGroup row>
                    <Col md="3">
                      <Label for="cantidad">Cantidad</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="cantidad"
                        name="cantidad"
                        placeholder="Cantidad..."
                        // required
                        value={this.state.pedido.cantidad}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label for="precioUnitario">Precio p/un.</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="precioUnitario"
                        name="precioUnitario"
                        placeholder="Precio p/un. ..."
                        // required
                        value={this.state.producto.precio}
                        onChange={this.handleChangeProducto}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label for="importeTotal">Importe</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="importeTotal"
                        name="importeTotal"
                        placeholder="$..."
                        // required
                        value={this.state.pedido.importeTotal}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label for="pagado">Pagado</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="pagado"
                        name="pagado"
                        placeholder="Pagado..."
                        // required
                        value={this.state.pedido.pagado}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  {/* <FormGroup>
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
                  </FormGroup> */}
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

  handleChange = (e) => {
    var nuevoPedido = Object.assign({}, this.state.pedido);
    nuevoPedido[e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ pedido: nuevoPedido});
  };

  handleChangeProducto = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
}

export default CargarUnPedido;
