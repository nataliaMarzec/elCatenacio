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
// import logo from "../assets/img/brand/logo.svg";
class CargarPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: props.pedido || {},
      pedidos: props.pedidos || [],
      productos: props.productos || [],
      producto: props.producto || {},
      cliente: props.cliente || {},
      modal: false,
      codigo: "",
      menus: props.menus || [],
      descripcion: "",
      items:[],
      id:"",
    };
    this.onSeleccion = this.onSeleccion.bind(this);
  }

  estadoInicial = () => {
    this.setState({
      pedido: {
        codigoPedido: "",
        mesero: "",
        seccion: "",
      },
    });
  };

  estadoInicialProducto = () => {
    this.setState({
      producto: {
        codigo: "",
        descripcion: "",
        precio: 0,
      },
    });
  };

  componentDidMount() {
    this.listadoProductos();
  }

  // componentWillMount() {
  //   this.props.getDescripciones();
  //   console.log("descripciones",this.state.menus)
  // }

  listadoProductos = () => {
    fetch(`http://localhost:8383/productos`)
      .then((res) => res.json())
      .then(
        (prods) => this.setState({ productos: prods, producto: {}, menus: [] }),
        console.log("productoEnviado", this.state.productos, this.state.menus)
      );
  };
  

 


  onSeleccion(e) {
    let { name, value } = e.target;
    let productos = [...this.state.productos];
    let indice = productos.findIndex((el) => el.descripcion == name);
    productos[indice].check = !productos[indice].check;
    this.setState({
      productos: [...productos],
    });
  }

  getPrecio = () => {
    var precio = this.state.pedido.precioUnitario;
    return precio;
  };

  handleSubmit = (e) => {
    const id = this.state.pedido.id;
    if (id) {
      this.editarPedido(id);
    } else {
      this.crearPedido();  
    }
    e.preventDefault(e);
  };

  handleSubmitProducto = (e) => {
    var busqueda;
    if (this.state.codigoPedido === "") {
      this.listadoBusqueda(busqueda);
    }
    if (this.state.codigoPedido !== "") {
      busqueda = '?busqueda=codigo=="' + this.state.codigoPedido + '"';
      this.listadoBusqueda(busqueda);
    }
    e.preventDefault(e);
  };
  handleSubmitDescripcion = (e) => {
    var busqueda;
    if (this.state.descripcion === "") {
      this.listadoBusquedaDescripcion(busqueda);
    }
    if (this.state.descripcion !== "") {
      busqueda = '?busqueda=descripcion=="' + this.state.descripcion + '"';
      this.listadoBusquedaDescripcion(busqueda);
    }
    e.preventDefault(e);
  };

  listadoBusqueda = (busqueda) => {
    if (busqueda) {
      fetch(`http://localhost:8383/productos` + busqueda)
        .then((res) => res.json())
        .then((prods) => this.setState({ productos: prods }));
    }
  };
  buscarItemsPorPedidoId = (pedidoId) => {
    if (pedidoId) {
      fetch(`http://localhost:8383/itemsDePedido` + pedidoId)
        .then((res) => res.json())
        .then((prods) => this.setState({id:pedidoId,items:prods }));
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
      .then((res) => this.estadoInicial());
      console.log("CREARRRR",this.state.pedido)
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
    var listaDescripciones = this.state.productos.map((producto) => {
      return (
        <div>
          <options value={producto.descripcion} key={producto.descripcion} />
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
                  {/* <Form onSubmit={this.handleSubmitProducto} id="formulario">
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
                          onChange={this.handleChangeProducto}
                          value={this.state.producto.descripcion}
                          list="producto"
                        />
                      </Col>
                      <datalist id="descripcion">{listaDescripciones}</datalist>
                    </FormGroup>
                  </Form> */}
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
    this.setState({ pedido: nuevoPedido });
    console.log("item handle change",this.state.pedido.ItemsPedido)
  };

  handleChangeProducto = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
}

export default CargarPedido;
