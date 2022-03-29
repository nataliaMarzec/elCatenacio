import React from "react";
import VistaDeProductosParaClientesCard from "./VistaDeProductosParaClientesCard";
import CardSeleccionadoModalRow from "./CardSeleccionadoModalRow";
import {
  Button, Card, CardColumns, CardBody, CardHeader, CardFooter,
  Col, Container, Row, Carousel,
  CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption,
  Modal, ModalHeader, ModalBody, ModalFooter, Label
} from "reactstrap";

import logo from "../../assets/img/brand/logo.svg";


class VistaDeProductosParaClientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      producto: {},
      productos: [],
      modal: false,
      editable: false,
      seleccionado: {},
      productosClientes: [],
      itemCliente: {
        descripcion: null, precioUnitario: null,
        observaciones: null,
        cantidad: 1, importeTotal: null
      },
      listaItemsCliente: [],
      cantidad: 1,
      observaciones: "",
      imagen:props.imagen,
      vista:props.vista,
      imagenCargada:props.imagenCargada
    };
    // this.seleccionar = this.seleccionar.bind(this);
    this.actualizarAlEliminar = this.actualizarAlEliminar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.seleccionar = this.seleccionar.bind(this)
    this.agregarAMiCarrito = this.agregarAMiCarrito.bind(this)
    this.listadoProductos = this.listadoProductos.bind(this);
    this.comprar=this.comprar.bind(this)
    this.crearPedido=this.crearPedido.bind(this)
    this.settearPedidoYProductoAItem=this.settearPedidoYProductoAItem.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      itemCliente:{cantidad:1}
    });
  }


  componentWillMount() {
    this.listadoProductos();
    this.setState({ itemCliente: this.state.itemCliente, listaItemsCliente: [] },
      console.log("willItemCliente", this.state.listaItemsCliente))
  }

  listadoProductos = () => {
    fetch(`http://localhost:8383/productos/habilitados`)
      .then((res) => res.json())
      .then((pds) => this.setState({ productos: pds, producto: {} }
        , () => console.log("habilitados", this.state.productos)));
  };

  componentDidUpdate(nextProps){
   if(nextProps.vista != this.props.vista){
      this.setState({vista:nextProps.vista}
        ,()=>console.log("vista",this.state.vista))
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
  crearPedido() {
    // let idPedido = this.state.idPedido
    // let nombre = this.state.nombre
    // let observaciones = this.state.unPedido.observaciones;
    // let fecha = this.state.fecha;
    // let hora = this.state.hora
    // let horaFormato = moment(hora).format('HH-mm');
    let listaItemsCliente = this.state.listaItemsCliente
    // console.log("nombreResponsable",fecha,this.state.pedidos.map(function(p){return p.fecha}))
    fetch(`http://localhost:8383/pedidos/cliente/`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.pedido),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ idPedido: res.id,Pedido: res }, console.log("listaitems", listaItemsCliente)))
      .then((res) => listaItemsCliente.map(i => this.settearPedidoYProductoAItem(this.state.idPedido,
        i.descripcion, i.cantidad, i.importe, i.observaciones)))
      .catch(function (error) {
        console.log(error);
      });

  }
  settearPedidoYProductoAItem = (id, descripcion, cantidad, importe, observaciones) => {
    console.log("setterarCliente",id, descripcion)
    fetch(
      `http://localhost:8383/pedidos/items/pedido/${id}/producto/${descripcion}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cantidad, importe, observaciones}),
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
  comprar() {
    console.log("comprar")
    this.crearPedido()
    this.setState({listaItemsCliente:[]})
  }
  //probar
  salir(event){
    this.props.history.push(`/`);
    event.preventDefault(event)
  }

  render() {
    console.log("itemsCLientesRenderP", this.state.listaItemsClientes)
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
        <div className="app flex-row mt-5 ">
          <Row>
            <Col xs="8">
              <Container>
                <Row>
                  {this.renderRows()}
                </Row>
              </Container>
            </Col>
            <Col>
              <Card classname="col-md-6 col-lg-10">
                {/* {this.state.listaItemsCliente.length>0 && */}
                <CardHeader>¡Hola @user!</CardHeader>
                <CardBody>Tus productos:
                  {this.state.listaItemsCliente.map((i, index) => {
                    return (
                      <div>
                        <CardBody>
                            <Col >Producto:{i.descripcion}</Col>
                            <Col>Cantidad: {i.cantidad}</Col>
                            <Col >Aclaración: {i.observaciones} </Col>
                          <CardFooter><Button>Editar</Button></CardFooter>
                        </CardBody>
                      </div>
                    )
                  })}
                </CardBody>
                <CardFooter><Button onClick={this.comprar}>Comprar</Button></CardFooter>
                {/* } */}
              </Card>
            </Col>
          </Row>
          <div><Button onClick={this.salir}>Volver</Button></div>
        </div>
      </React.Fragment>
    )

  }
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

export default VistaDeProductosParaClientes;
