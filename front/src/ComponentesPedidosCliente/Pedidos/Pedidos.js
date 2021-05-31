import React, { useState } from "react";

import {
  Table,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Button,
  CardFooter,
  CardText,
  Collapse,
} from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";
import PedidoItems from "./PedidoItems";
import PedidoItemsDos from "./PedidoItemsDos";
import TablaPedido from "./TablaPedido";
// import './styles.css'
class Pedidos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: props.pedido,
      pedidos: [],
      producto: {},
      productos: [],
      modal: false,
      editable: false,
      unPedido: {},
      cantidad: 1,
      descripcion: {},
      descripciones: [],
      precioUnitario: [],
      selectedValues: null,
      nuevosProductos: [],
      items: [],
      item: {},
      productoId: "",
      selector: {},
      importe: props.importe,
      mostrarTabla: false,
      idPedido: 0,
      codigo: "",
      pedidoId: 1,
      seccion: props.seccion,
      importeTotal: null,
      observaciones:props.observaciones,
      cantidad:props.cantidad,
      id: {},
    };
    this.listadoItemsPedido = this.listadoItemsPedido.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

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
            importe: 0,
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

  componentWillReceiveProps(props) {
    this.setState({ producto: props.producto });
    this.setState({ productos: props.productos });
    this.setState({ pedido: props.pedido });
    this.setState({ seccion: props.seccion }, () =>
      console.log("seccion", props.seccion)
    );
    this.setState({ importe: props.importe });
    this.setState({observaciones:this.state.observaciones})
    this.setState({ cantidad: props.cantidad});


  }

  componentDidMount() {
    this.listadoItemsPedido();
    // this.setState({codigoPedido:this.state.codigoPedido})
    this.setState({seccion:this.state.seccion},console.log("didMount",this.state.seccion))
    this.setState({observaciones:this.state.observaciones})
    this.setState({ cantidad:this.state.cantidad});


  }
  componentWillMount() {
    this.listadoPedidos();
    this.listadoProductos();

  }

  listadoPedidos = () => {
    fetch(`http://localhost:8383/pedidos`)
      .then((res) => res.json())
      .then((pds) =>
        this.setState({
          pedidos: pds,
          pedido: {},
        })
      );
  };

  listadoProductos = () => {
    fetch(`http://localhost:8383/productos`)
      .then((res) => res.json())
      .then((pds) =>
        this.setState({
          productos: pds,
          producto: {},
        })
      );
  };
  listadoItemsPedido = () => {
    fetch(`http://localhost:8383/itemsTodos`)
      .then((res) => res.json())
      .then((its) =>
        this.setState({
          items: its,
          item: {},
        })
      );
  };

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

  seleccionarItem(unItem) {
    this.setState({ item: unItem });
    // console.log("seleccionar", this.state.item);
  }

  
  handleAddRow = (descripcion) => {
    this.setState((prevState, props) => {
      const observaciones={observaciones:this.state.item.observaciones}
      // const row = {content: "hello this is a new row!" };
      // this.setState({cantidad:this.state.cantidad})
      return { items: [...prevState.items,observaciones] };
    });
  };

  handleRemoveRow = () => {
    this.setState((prevState, props) => {
      return { rows: prevState.rows.slice(1) };
    });
  };

  settingDescripciones = (selectedValues, SelectedItem) => {
    // this.setState(
    //   { selectedValues: selectedValues },
    //   this.handleAddRow(SelectedItem.descripcion)
    // );
    this.setState(
      { selectedValues: selectedValues },
      this.getProductoAItem(SelectedItem.descripcion)
    );
  };

  onRemove = (selectedValues, SelectedItem) => {
    this.setState(
      { selectedValues, SelectedItem },
      console.log("onRemove", selectedValues, SelectedItem)
    );
  };

  getProductoAItem = (descripcion) => {
    fetch("http://localhost:8383/itemsPedidos/" + descripcion, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => this.listadoItemsPedido())
      .then((res) =>
        this.setState(
          {
            productoId: this.state.producto.id,
            nuevosProductos: descripcion,
          },
          console.log("guardarDescripcion", this.state.nuevosProductos)
        )
      )
      .then((res) => this.estadoInicial());
  };



  event = (event) => {
    event.preventDefault();
  };

  guardar(codigo, items, pedidoId) {
    var items = items;
    console.log("guardar", items, pedidoId);
  }

  crearPedidoConPedidoId = (codigo, pedidoId) => {
    fetch(`http://localhost:8383/itemParaPedido/${codigo}/${pedidoId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => this.listadoItemsPedido())
      .then(this.listadoPedidos())
      .then((res) =>
        this.setState(
          {
            item: { ...this.state.item, codigo: codigo, pedidoId: pedidoId },
          },
          console.log("codigo,pedidoId", codigo, pedidoId)
        )
      );
  };

  handleChange(event) {
    var nuevoItem = Object.assign({}, this.state.item);
    nuevoItem[event.target.name] =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ item: nuevoItem });
  }

  sumar = () => {
    //items con el mismo productoId
    let importes = this.state.items.map((i) => i.importe);
    let total = importes.reduce((a, b) => a + b, 0);
    // this.setState(
    //   { importeTotal: total },
    //   console.log("importetotal", this.state.importeTotal)
    // );
    console.log("importetotal", this.state.importeTotal);

    return total;
  };

  settearPedidoYProductoAItem = (id, descripcion) => {
    fetch(`/pedidos/items/pedido/${id}/producto/${descripcion}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.item),
    })
      .then(
        this.setState(
          {
            items: this.state.items,
            item: this.state.item,
            pedidoId: id,
          },
          console.log("crearItem", this.state.item)
        )
      )
      .then((res) => this.listadoItemsPedido());
  };

  // crearPedido = () => {
  crearPedido = (seccion, codigoPedido) => {
    console.log("state",seccion)
    fetch("http://localhost:8383/pedidos/nuevo", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(this.state.pedido),
      body: JSON.stringify({seccion,codigoPedido}),
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState(
          {
            id: res.id,
            idPedido: res.id,
            seccion: res.seccion,
            codigoPedido: res.codigoPedido,
          },
          // { id: res.id, idPedido: res.id, seccion: res.seccion },
          () => console.log("seccion-codigo", res.seccion,res.codigoPedido)
        )
      )
      .then(this.listadoPedidos())
      .catch(function (error) {
        console.log(error);
      });
  };

  getImporte() {
    return this.state.importe;
  }

  uniqueCodigo(id) {
    var hoy = new Date();
    hoy.toLocaleDateString();
    var id = id;
    var codigo = + id;
    // var codigo = +hoy + "/" + id;
    // var codigo = + hoy + Math.floor(Math.random() * 100);
    this.setState({ codigoPedido: codigo });
    console.log("uniqueCodigo",this.state.codigoPedido,codigo);
    return codigo;
    // return "/" ? "/" + codigo : codigo;
  }

  guardar = (idPedido) => {
    this.toggle();
    var modal = this.state.modal;
    if (modal == false) {
      // this.crearPedido(seccion,codigoPedido);
      this.setState({ seccion:this.state.seccion,codigoPedido: this.state.codigoPedido }, () =>
        this.uniqueCodigo(idPedido)
      );
    }
  };
  guardarPedido = (seccion, codigoPedido) => {
    this.crearPedido(seccion, codigoPedido);
  };

  render() {
    let seccion= this.state.seccion
    let hoy = new Date();
    let codigoPedido = this.state.codigoPedido;
    // let seccion = this.state.seccion
    var listaProductosEnPedido = this.state.productos.map((p) => ({
      name: p.descripcion + "",
      id: p.id,
      precio: "$" + p.precioUnitario,
      descripcion: p.descripcion,
      precioUnitario: p.precioUnitario,
    }));
    console.log("listaProductosEnPedido$$",seccion);
    //sacar los div y integra <React.Fragment/> para poder retornar varios componentes
    return (
      <div className="container">
        <Row className="align-items-center">
          <Col col="2" className="mb-3 mb-xl-0 text-center">
            <Button
              style={{
                marginRight: "1rem",
                backgroundColor: "#63c2de",
                color: "#5c6873",
              }}
              size="lg"
              onClick={() => this.guardar(this.state.idPedido)}
            >
              Nuevo pedido
            </Button>

            <Button
              style={{
                marginRight: "1rem",
                backgroundColor: "#4dbd74",
                color: "#5c6873",
              }}
              size="lg"
            >
              Editar pedido
            </Button>
          </Col>
        </Row>
        <Collapse
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <CardHeader style={{ backgroundColor: "#eedc0a" }}>
            <Row>
              <Col className="col-lg-10">Pedido </Col>
              <CardText align="left">Pedido n°:{this.state.idPedido} </CardText>
            </Row>
          </CardHeader>
          <div className="animated fadeIn">
            <Container style={{ backgroundColor: "#f1f1f1" }}>
              <Card>
                <CardHeader>
                  <Row>
                    <Col>Detalles de pedido</Col>
                    <Col align="left">Fecha:{hoy.toLocaleDateString()}</Col>
                  </Row>
                </CardHeader>
                <TablaPedido
                  pedidos={this.state.pedidos}
                  pedido={this.state.pedido}
                  items={this.state.items}
                  pedidoId={this.state.pedidoId}
                  listadoItemsPedido={this.listadoItemsPedido}
                  listaProductosEnPedido={listaProductosEnPedido}
                  listadoPedidos={this.listadoPedidos}
                  listadoProductos={this.listadoProductos}
                  obtenerId={this.obtenerId}
                  crearPedido={this.crearPedido}
                  codigoPedido={codigoPedido}
                  toggle={this.toggle}
                ></TablaPedido>

                <CardBody>
                  <Row>
                    &nbsp;
                    <FormGroup onSubmit={this.event}>
                      <Multiselect
                        id="descripcion"
                        options={listaProductosEnPedido}
                        selectedValues={this.state.selectedValues}
                        onSelect={this.settingDescripciones}
                        groupBy="precio"
                        closeIcon="circle2"
                        hidePlaceholder={true}
                        loading={false}
                        // onRemove={this.onRemove}
                        placeholder="Seleccione un producto"
                        displayValue="name"
                        emptyRecordMsg="No hay más productos para seleccionar"
                      />
                    </FormGroup>
                  </Row>
                </CardBody>

                <Container style={{ backgroundColor: "#f1f1f1" }}>
                  <Row>
                    <Col class="col-lg-4">
                      <Table style={{ backgroundColor: "#eee363" }}>
                        <thead>
                          <tr>
                            <th>Código</th>
                            <th>Productos</th>
                            <th>Cantidad</th>
                            <th>importe</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderItems(listaProductosEnPedido)}
                        </tbody>
                      </Table>

                      {/* )} */}
                    </Col>
                    <Col class="col-lg-4">
                      <Table
                        style={{ backgroundColor: "#F5C765" }}
                        importe={this.state.importe}
                      >
                        <thead>
                          <tr>
                            <th>Observaciones</th>
                            <th>Importe</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderItemsDos(listaProductosEnPedido)}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <CardFooter>
                    <CardText align="right" style={{ marginRight: "3rem" }}>
                      <b>Importe total $:</b>
                      {this.sumar()}
                    </CardText>
                  </CardFooter>
                  <CardFooter>
                    <CardText align="left">Observaciones:</CardText>
                  </CardFooter>
                </Container>
                <CardFooter>
                  <Row>
                    <Col xs="12" md="6">
                      <Button
                        color="success"
                        size="lg"
                        block
                        onClick={() => this.guardarPedido(this.state.seccion,this.state.codigoPedido)}
                      >
                        Confirmar
                      </Button>
                    </Col>
                    <Col xs="12" md="6">
                      <Button color="primary" size="lg" block>
                        Guardar pedido
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Container>
          </div>
        </Collapse>
      </div>
    );
  }

  handleEvent = (e) => {
    console.log("evento++++++++++", e);
  };

  renderItems(listaProductosEnPedido) {
    let items = this.state.items;
    const id = this.state.id;
    let productos = this.state.productos;
    if (listaProductosEnPedido.length) {
      return items.map((unItem, index) => {
        const pid = id;
        unItem.pedidoId = pid;
        console.log("importe+++++++++++++", this.state.importe);
        // if (unItem.cantidad == null) {
        //   unItem.cantidad = 1;
        // }
        const producto = listaProductosEnPedido.find(
          (p) => p.id == unItem.productoId
        );
        // if (unItem.importe == null) {
        //   unItem.importe =producto.precioUnitario;
        // }
        console.log("cantidad", this.state.cantidad);
        return (
          <PedidoItems
            pedidoId={unItem.pedidoId}
            handleEvent={this.handleEvent}
            key={index}
            item={unItem}
            items={items}
            pedido={this.state.pedido}
            productos={productos}
            productoId={unItem.productoId}
            descripcion={producto.descripcion}
            precio={producto.precioUnitario}
            cantidad={unItem.cantidad}
            importe={unItem.importe}
            codigo={unItem.codigo}
            selector={this.seleccionarItem}
            listadoPedidos={this.listadoPedidos}
            listadoProductos={this.listadoProductos}
            listadoItemsPedido={this.listadoItemsPedido}
            estadoInicial={this.estadoInicial}
            actualizarAlEliminar={this.actualizarAlEliminar}
            eliminarPedido={this.eliminarPedido.bind(this)}
            toggle={this.toggle}
          />
        );
      });
    }
  }
  importe() {
    return this.state.importe;
  }

  renderItemsDos(listaProductosEnPedido) {
    const { importe } = this.props;
    let items = this.state.items;

    if (listaProductosEnPedido.length) {
      return items.map((unItem, index) => {
        const producto = listaProductosEnPedido.find(
          (p) => p.id == unItem.productoId
        );
        return (
          <PedidoItemsDos
            key={index}
            item={unItem}
            items={this.state.items}
            productos={this.state.productos}
            productoId={unItem.productoId}
            pedidos={this.state.pedidos}
            pedido={this.state.pedido}
            descripcion={producto.descripcion}
            importe={importe}
            getImporte={this.getImporte}
            // importe={unItem.importe || producto.precioUnitario}
            selector={this.seleccionarItem}
            listadoPedidos={this.listadoPedidos}
            listadoProductos={this.listadoProductos}
            listadoItemsPedido={this.listadoItemsPedido}
            estadoInicial={this.estadoInicial}
            actualizarAlEliminar={this.actualizarAlEliminar}
            eliminarPedido={this.eliminarPedido.bind(this)}
            toggle={this.toggle}
          />
        );
      });
    }
  }
}

export default Pedidos;
