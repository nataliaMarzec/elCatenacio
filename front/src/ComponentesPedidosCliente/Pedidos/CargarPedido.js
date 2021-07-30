import React, { useState } from "react";
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
  Table
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
      items: props.items,
      item: props.item,
      itemsDePedido:[],
      listaProductosEnPedido: props.listaProductosEnPedido,
      cliente: props.cliente || {},
      modal: false,
      codigo: "",
      descripcion: "",
      id: "",
      selecionado:{}
    };
  }

  estadoInicial = () => {
    this.setState({
      pedido: {
        clienteId: null,
        codigoPedido: "",
        mesero: "",
        seccion: "",
        ItemsPedido: [
          {
            cantidad: 1,
            importeTotal: 0,
            observaciones: "",
            Productos: {
              descripcion: "",
              precioUnitario: 0,
            },
          },
        ],
      },
    });
  };

  // estadoInicial = () => {
  //   this.setState({
  //     pedido: {
  //       codigoPedido: "",
  //       mesero: "",
  //       seccion: "",
  //     },
  //   });
  // };

  

  componentWillMount() {
    this.props.listadoPedidos();
    this.props.listadoItemsPedido();
    this.props.listadoProductos();
    // this.props.seleccionar;
  }

 
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido }
        // ,console.log("nextProps",nextProps.pedido)
        );
    }
  }



  handleSubmit = (e) => {
    // const id = this.state.pedido.id;
    // if (id) {
    //   this.editarPedido(id);
    // } else {
    this.crearPedido();
    // }
    e.preventDefault(e);
  };

  crearPedido = () => {
    fetch("http://localhost:8383/pedidos/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.pedido),
    })
      .then((res) => this.props.listadoPedidos())
      .then((res) => this.estadoInicial());
    // console.log("CREARRRR", this.state.pedido);
  };

  getPrecio = () => {
    var precio = this.state.pedido.precioUnitario;
    return precio;
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
        .then((prods) => this.setState({ id: pedidoId, items: prods }));
    }
  };
  componentDidUpdate(prevProps){
    if(prevProps.pedido !== this.state.pedido){
    this.setState({pedido:prevProps.pedido,itemsDePedido:prevProps.pedido.ItemsPedido},()=>this.forceUpdate(),
      // console.log("itemsPedido",this.state.pedido,this.state.itemsDePedido)
      )
    }
  }


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
    let descripciones = this.state.productos.map(p => p.descripcion)
    // let listaCantidad=this.state.pedido.ItemsPedido.map(i=>i.observaciones)
    // let items=this.state.pedidos.map((unPedido, index) => {
    //   this.state.items.filter(i => i.pedidoId == unPedido.id)
    // })
    // let listaProductos = items.map((i, index) => <tr key={index}>
    //   {i.productoId}</tr>)
    // let listaCantidad = items.map((i, index) => <tr key={index}>
    //   {i.cantidad}</tr>)
    // let listaObservaciones = items.map((i, index) => <tr key={index}>
    //   {i.observaciones}</tr>)
    // let listaImporte = items.map((i, index) => <tr key={index}>
    //   ${i.importe}</tr>)
    // console.log("PEDIDO CARGAR",this.state.pedido,this.state.itemsPedido)
    return (
      <Col xs="12" md="12">
        <ModalBody>
          <Col xs="12" md="12">
            {/* <Form className="form-vertical"> */}

            <Row></Row>
            <Col max-width="%100">
              <Card className="border-warning">
                {/* <Card style={{ border: "1px solid red" }}>
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
                </Card> */}

                <CardBody>
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
                        required={true}
                        value={this.state.pedido.seccion}
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
                      <Label for="observaciones">Observaciones</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="observaciones"
                        name="observaciones"
                        placeholder="Observaciones..."
                        value={this.state.pedido.observaciones}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  {/* <FormGroup row>
                    <Col md="3">
                      <Label for="producto">Producto</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="producto"
                        name="producto"
                        placeholder="Producto..."
                        // required
                        value={this.state.item.productoId}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup> */}
                  <Table>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Observaciones</th>
                        <th>Importe</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td key="producto">{listaProductos}</td>
                        <td key="cantidad">{listaCantidad}</td>
                        <td key="observaciones">{listaObservaciones}</td>
                        <td key="importe">{listaImporte}</td> */}
                      </tr>
                    </tbody>
                    <Form onSubmit={this.handleSubmitDescripcion} id="formulario">

                      <FormGroup row>
                        <Col md="3">
                          <Label for="descripcion">Descripción</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="descripcion"
                            name="descripcion"
                            placeholder="Elegir descripcion"
                            onChange={this.handleChangeProducto}
                            list="producto"
                          />
                        </Col>
                        <datalist id="producto">{descripciones}</datalist>
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
                          value={this.state.pedido.precio}
                          onChange={this.handleChangeProducto}
                        />
                      </Col>
                    </FormGroup>
                  </Table>
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
    // console.log("item handle change", this.state.pedido.ItemsPedido);
    // console.log("productos", this.state.productos);
  };

  handleChangeProducto = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

}

export default CargarPedido;
