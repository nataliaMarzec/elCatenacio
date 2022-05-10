import React, { createContext } from "react";
import WrapperConsumer, { ContextUsuario } from "./../../componentesSesion/Context/ContextUsuario";
import VistaDeProductosParaClientesCard from "./VistaDeProductosParaClientesCard";
import CardSeleccionadoModalRow from "./CardSeleccionadoModalRow";
import {
  Button, Card, CardColumns, CardBody, CardHeader, CardFooter, CardText,
  FormGroup, Input,
  Col, Container, Row, Carousel,
  CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption,
  Modal, ModalHeader, ModalBody, ModalFooter, Label
} from "reactstrap";
import logo from "../../assets/img/brand/logo.svg";
var moment = require('moment');


class VistaDeProductosParaClientes extends React.Component {
  static contextType = createContext(ContextUsuario)

  constructor(props) {
    super(props);
    this.state = {
      producto: {},
      productos: [],
      modal: false,
      editable: false,
      seleccionado: {},
      productosClientes: [],
      clientes: [],
      cliente: {},
      itemCliente: {
        descripcion: null, precioUnitario: null,
        observaciones: null,
        cantidad: 1, importeTotal: null
      },
      listaItemsCliente: [],
      cantidad: 1,
      observaciones: "",
      imagen: props.imagen,
      vista: props.vista,
      imagenCargada: props.imagenCargada,
      usuarios: [],
      usuario: {},
      pedidoCliente: { observaciones: "", modalidad: "Delivery" },
      pedidosCliente: [],
      idPedidoCliente: null,
      fecha: new Date().toString(),
      hora: new Date(),
    };
    // this.seleccionar = this.seleccionar.bind(this);
    this.actualizarAlEliminar = this.actualizarAlEliminar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.seleccionar = this.seleccionar.bind(this)
    this.agregarAMiCarrito = this.agregarAMiCarrito.bind(this)
    this.listadoProductos = this.listadoProductos.bind(this);
    this.comprar = this.comprar.bind(this)
    this.crearPedidoCliente = this.crearPedidoCliente.bind(this)
    this.settearPedidoYProductoAItem = this.settearPedidoYProductoAItem.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      itemCliente: { cantidad: 1 }
    });
  }


  componentWillMount() {
    this.listadoProductos();
    this.listadoUsuarios();
    this.listadoClientes();
    this.setState({ itemCliente: this.state.itemCliente, listaItemsCliente: [] },
      console.log("willItemCliente", this.state.listaItemsCliente))
  }

  listadoProductos = () => {
    fetch(`http://localhost:8383/productos/habilitados`)
      .then((res) => res.json())
      .then((pds) => this.setState({ productos: pds, producto: {} }
        , () => console.log("habilitados", this.state.productos)));
  };

  listadoUsuarios = () => {
    fetch(`http://localhost:8383/usuarios`)
      .then((res) => res.json())
      .then(
        (res) => this.props.context.setStateUsuarios(res),
        console.log("Usuarios", this.props.context.usuarios)
      );
  }

  listadoClientes = () => {
    fetch(`http://localhost:8383/clientes`)
      .then((res) => res.json())
      .then(
        (cltes) => this.setState({ clientes: cltes, cliente: {} }),
      );
  };

  componentDidUpdate(nextProps) {
    if (nextProps.vista != this.props.vista) {
      this.setState({ vista: nextProps.vista }
        , () => console.log("vista", this.state.vista))
    }
  }

  agregarAMiCarrito = (selectedItem, producto) => {
    this.setState((state, props) => {
      const row = {
        descripcion: producto.descripcion, precioUnitario: producto.precioUnitario,
        observaciones: selectedItem.observaciones, cantidad: selectedItem.cantidad,
      };
      // this.state.itemsCliente.push(row)
      return { itemCliente: row, listaItemsCliente: [...this.state.listaItemsCliente, row] };
    }, console.log("listaItemsClienteHAR", this.state.listaItemsCliente));

    this.toggle()

  };
  // crearPedido() {
  //   // let idPedido = this.state.idPedido
  //   // let nombre = this.state.nombre
  //   // let observaciones = this.state.unPedido.observaciones;
  //   // let fecha = this.state.fecha;
  //   // let hora = this.state.hora
  //   // let horaFormato = moment(hora).format('HH-mm');
  //   let listaItemsCliente = this.state.listaItemsCliente
  //   // console.log("nombreResponsable",fecha,this.state.pedidos.map(function(p){return p.fecha}))
  //   fetch(`http://localhost:8383/pedidos/cliente/`, {
  //     method: "put",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(this.state.pedido),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => this.setState({ idPedido: res.id, pedidoCliente: res }, console.log("listaitems", listaItemsCliente)))
  //     .then((res) => listaItemsCliente.map(i => this.settearPedidoYProductoAItem(this.state.idPedido,
  //       i.descripcion, i.cantidad, i.importe, i.observaciones)))
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  // }
  crearPedidoCliente() {
    let idPedidoCliente = this.state.idPedidoCliente
    let username = this.props.context.usuario.username
    let usuario = this.props.context.usuarios.find(u => u.username == this.props.context.usuario.usernameOrEmail
      || u.email == this.props.context.usuario.usernameOrEmail)
    console.log("crearCOmprar ", usuario)
    // let seccion = this.state.unPedidoCliente.seccion;
    // let modalidad=this.state.unPedidoCliente.modalidad
    let observaciones = this.state.pedidoCliente.observaciones;
    let fecha = this.state.fecha;
    let hora = this.state.hora
    let horaFormato = moment(hora).format('HH-mm');
    let listaItemsCliente = this.state.listaItemsCliente
    // console.log("nombreResponsable",fecha, this.state.pedidos.map(function (p) { return p.fecha }))
    fetch(`http://localhost:8383/pedidos/nuevo/cliente/${usuario.username}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ observaciones, fecha, hora }),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ idPedidoCliente: res.id, pedidoCliente: res, clienteId: res.clienteId }, console.log("listaitems", listaItemsCliente)))
      .then((res) => listaItemsCliente.map(i => this.settearPedidoYProductoAItem(this.state.idPedidoCliente,
        i.descripcion, i.cantidad, i.importe, i.observaciones, i.listoCocina, i.listoParrilla)))
      .catch(function (error) {
        console.log(error);
      });

  }
  settearPedidoYProductoAItem = (id, descripcion, cantidad, importe, observaciones) => {
    console.log("setterarCliente", id, descripcion)
    fetch(
      `http://localhost:8383/pedidos/items/pedido/${id}/producto/${descripcion}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cantidad, importe, observaciones }),
      }
    )
      .then((res) =>
        this.setState({
          pedidoId: id,
        }), () => console.log("SettearItems", cantidad, importe, observaciones))
      .catch(function (error) {
        console.log(error, "error......", id);
      });
  };
  actualizarAlEliminar = (unProducto) => {
    var listaActualizada = this.state.productos.filter(
      (item) => unProducto !== item
    );
    this.setState({ productos: listaActualizada, producto: {} });
  };

  eliminarProducto(id) {
    this.props.eliminarProducto(id);
  }

  seleccionar(unProducto) {
    this.setState({ producto: unProducto });
  };
  //falta agregar clienteId
  cambiarDireccion(idCliente) {
    // var idCliente=this.state.clienteId
    fetch(
      `http://localhost:8383/cliente/direccion/${idCliente}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.cliente),
      }
    )
      .then((res) =>
        this.setState({
          cliente: res,
        }), () => console.log("clienteDIRECCION", this.state.cliente))
      .catch(function (error) {
        console.log(error, "error......");
      });
  }
  comprar() {
    console.log("comprar")
    this.crearPedidoCliente()
    this.setState({ listaItemsCliente: [] })
  }
  //probar
  salir(event) {
    this.props.history.push(`/`);
    event.preventDefault(event)
  }

  render() {
    const { context: { usuario, onChangeLogin } } = this.props;
    var usuarioC = this.props.context.usuarios.find(u=>u.username == usuario.usernameOrEmail
      || u.email == usuario.usernameOrEmail)
    var cliente = this.state.clientes.find(c => c.id_cliente == usuarioC.clienteId)
    console.log("CLientesRenderP", usuarioC)
    return (

      <React.Fragment>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Mi producto</ModalHeader>
          <ModalBody>
            <CardSeleccionadoModalRow style={{ color: "info" }}
              producto={this.state.producto}
              productos={this.state.productos}
              itemCliente={this.state.itemCliente}
              itemsCliente={this.state.listaItemsCliente}
              cantidad={this.state.cantidad}
              observaciones={this.state.observaciones}
              productosClientes={this.state.productosClientes}
              toggle={this.toggle}
              agregarAMiCarrito={this.agregarAMiCarrito}
              imagen={this.state.imagen}
              vista={this.state.vista}
              imagenCargada={this.state.imagenCargada}
            // foto={this.state.vista}
            >
            </CardSeleccionadoModalRow>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/* <Label className="ml-3 "><b>Mi direcciÓn es {cliente.direccion}</b></Label> */}
        {/* <CardHeader >Dirección 
          <FormGroup className="ml-1 mr-1">

            <Label className="ml-3 "><b>direccion</b></Label>
            <Input
              key="direccion"
              style={{ border: "1px solid grey" }}
              type="text"
              id="direccion"
              name="direccion"
              value={this.state.cliente.direccion}
              onChange={this.handleChangeCliente}
              className="form-control">
            </Input>

          </FormGroup>
          <Button >Cambiar</Button>
        </CardHeader> */}
        <div className="app flex-row  ">

          <Row>


            <Col xs="8">
              <Container>
                <Row>
                  {this.renderRows()}
                </Row>
              </Container>
            </Col>
            <Col>
              <Card classname="col-md-6 col-lg-10 mb-3">

                <CardHeader >¡Hola @{this.props.context.usuario.usernameOrEmail}!</CardHeader>
                <React.Fragment>
                  {this.state.listaItemsCliente.length > 0 &&
                    <Card>
                      <CardBody>
                        {this.state.listaItemsCliente.map((i, index) => {
                          return (
                            <div>
                              <CardBody>
                                <CardHeader>Tus productos:</CardHeader>
                                <Col >Producto:{i.descripcion}</Col>
                                <Col>Cantidad: {i.cantidad}</Col>
                                <Col >Aclaración: {i.observaciones} </Col>
                                <CardFooter><Button>Descartar</Button></CardFooter>
                              </CardBody>
                            </div>
                          )
                        })}
                        {/* <CardText>
                          <FormGroup className="ml-1 mr-1">

                            <Label className="ml-3 "><b>¿Quieres detallar algo?</b></Label>
                            <Input
                              key="observaciones"
                              style={{ border: "1px solid grey" }}
                              type="text"
                              id="observaciones"
                              name="observaciones"
                              min={1}
                              value={this.state.pedidoCliente.observaciones}
                              onChange={this.handleChange}
                              className="form-control">
                            </Input>

                          </FormGroup></CardText> */}
                      </CardBody>
                      <CardFooter><Button onClick={this.comprar}>Comprar</Button></CardFooter>
                    </Card>
                  }
                </React.Fragment>
              </Card>
            </Col>
          </Row>

        </div>
        <div><Button onClick={this.salir}>Volver</Button></div>
      </React.Fragment>

    )

  }

  // handleChange(e) {
  //   var nuevoPedido = Object.assign({}, this.state.pedidoCliente);
  //   nuevoPedido[e.target.name] = e.target.value;
  //   this.setState({ pedidoCliente: { observaciones: nuevoPedido } }
  //     , () => console.log("nuevoPedidoCLIENTE", this.state.pedidoCliente, nuevoPedido)
  //   );
  // };

  handleChange(e) {
    let unPedido = this.state.pedidoCliente
    var nuevoPedido = Object.assign({}, this.state.pedidoCliente);
    nuevoPedido[e.target.name] = e.target.value;
    unPedido = nuevoPedido
    this.setState({ pedidoCliente: { observaciones: unPedido } }
      , () => console.log("nuevoPedido/key", this.state.pedidoCliente, nuevoPedido)
    );
    // this.props.calcular(unPedido)
  };
  handleChangeCliente(e) {
    var nuevoCliente = Object.assign({}, this.state.pedidoCliente);
    nuevoCliente[e.target.name] = e.target.value;
    this.setState({ cliente:nuevoCliente }
      , () => console.log("nuevoCliente/key", this.state.cliente, nuevoCliente)
    );
  };
  renderCarousel() {

  }

  renderRows() {
    var productosLista = this.state.productos;
    if (productosLista.length > 0) {
      return productosLista.map((p, index) => {
        return (
          <div className="col-sm-6">
            <VistaDeProductosParaClientesCard
              key={index}
              producto={p}
              productos={this.state.productos}
              productosClientes={this.state.productosClientes}
              toggle={this.toggle}
              selector={this.seleccionar}
            />
          </div>
        );
      });
    }
    else {
      return (
        <div className="container">
          <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">No hay productos para mostrar</h1>
            </div>
          </div>
        </div>
      )
    }
  }



}
export default WrapperConsumer(VistaDeProductosParaClientes)

