import React from "react";
// import { Redirect, Route, Switch } from "react-router-dom";
// import * as router from "react-router-dom";
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
  Form,
  Input
} from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";
import PedidoItems from "./PedidoItems";
import PedidoItemsDos from "./PedidoItemsDos";
import PedidoItemsEditar from "./EditarRows/PedidoItemsEditar";
import PedidoItemsDosEditar from "./EditarRows/PedidoItemsDosEditar";
import TablaPedido from "./TablaPedido";
import PlantillaPedido from "./PlantillaPedido";
import { func } from "prop-types";
// import './styles.css'
var moment = require('moment');
class Pedidos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: props.pedido,
      pedidos: [],
      producto: props.producto,
      productos: [],
      // listaProductosEnPedido:[this.props.productos.map((p) => ({
      //   name: p.descripcion + "",
      //   id: p.id,
      //   precio: "$" + p.precioUnitario,
      //   descripcion: p.descripcion,
      //   precioUnitario: p.precioUnitario,
      //   cantidad: 0,
      //   importe: 0,
      // }))],
      modal: false,
      editable: false,
      unPedido: {},
      unResponsable: { nombre: "" },
      precioUnitario: [],
      selectedValues: null,
      SelectedItem: null,
      options: [],
      items: [],
      unItem: {
        descripcion: null,
        cantidad: null, importe: null
      },
      itemsPedido: [],
      unPedido: { seccion: "", observaciones: "" },
      productoId: props.productoId,
      selector: {},
      mostrarTabla: false,
      idPedido: null,
      codigo: "",
      pedidoId: null,
      secciones: [
        { id: 1, name: "Abierta" },
        { id: 2, name: "Carpa" },
        { id: 3, name: "" },
      ],
      seccion: "",
      nombreResponsable: null,
      responsablesDeMesa: [],
      responsable: {},
      nombre: "",
      // fecha: new Date().toLocaleDateString(),
      fecha: new Date().toString(),
      hora: new Date(),
      importeTotal: null,
      cantidad: null,
      observaciones: props.observaciones,
      importe: null,
      total: props.total,
      idItem: 0,
      id: props.id,
      productoIdDos: null,
      nuevaListaDescripciones: [],
      listaItems: [],
      nuevoItem: {},
      itemsObjects: [],
      idPedido: null,
      descripcion: null,
      nuevaListaItems: [],
      confirmar: false,
      valueSeccion: props.valueSeccion,
      idSeccion: props.idSeccion,
      refSeccion: React.createRef(),
      limpiar: props.limpiar,
      event: null,
      verPlantilla: false,
      itemsSeleccionado: 0,
      encontrado: false,
      vistaPrevia: false


    };
    this.listadoPedidos = this.listadoPedidos.bind(this)
    this.listadoItemsPedido = this.listadoItemsPedido.bind(this);
    this.listadoResponsables = this.listadoResponsables.bind(this)
    this.listaProductosEnPedido = this.listaProductosEnPedido.bind(this);
    this.envioDePedido = this.envioDePedido.bind(this);
    this.envioDeEstadoObservaciones =
      this.envioDeEstadoObservaciones.bind(this);
    this.envioDeEstadoResponsable = this.envioDeEstadoResponsable.bind(this)
    this.crearPedido = this.crearPedido.bind(this);
    this.settearPedidoYProductoAItem =
      this.settearPedidoYProductoAItem.bind(this);
    this.handleRemoveRow = this.handleRemoveRow.bind(this);
    this.seleccionarItem = this.seleccionarItem.bind(this)
    this.calcular = this.calcular.bind(this)
    this.multiselectRef = React.createRef();
    this.vistaPrevia = this.vistaPrevia.bind(this)
    this.actualizarEstadosAlGuardar = this.actualizarEstadosAlGuardar.bind(this)
    this.selectedItems = this.selectedItems.bind(this)
    this.resetValues = this.resetValues.bind(this)
    this.selectedItems = this.selectedItems.bind(this)
    this.botonPrueba = this.botonPrueba.bind(this)
    // this.verPlantilla=this.verPlantilla(this)
    // this.limpiar=this.limpiar.bind(this)
  }

  estadoInicial = () => {
    this.setState({
      pedido: {
        clienteId: null,
        codigoPedido: "",
        fecha: new Date().toLocaleDateString(),
        ItemsPedido: [],
      },
    });
    this.setState({
      // cantidad:1,
      seccion: "",
      observaciones: null,
      Productos: {
        descripcion: "",
        precioUnitario: 0,
      },
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  getCollapse = (idPedido, boolean) => {
    this.toggle();
    var modal = this.state.modal;
    this.setState({ editable: boolean })

    if (modal == false && boolean.value == false) {
      this.setState({ editable: false, itemsPedido: [], vistaPrevia: false }
        , () => console.log("NOboolean", this.state.editable, boolean.value))
      // this.setState({ codigoPedido: this.state.codigoPedido }, () =>
      //   this.uniqueCodigo(idPedido)
      // );
    }
    if (modal == false && boolean.value == true) {
      this.setState({ editable: true }
        , () => console.log("SIboolean", this.state.editable, boolean))
      // this.setState({ codigoPedido: this.state.codigoPedido }, () =>
      //   this.uniqueCodigo(idPedido)
      // );
    }
  };


  // componentDidMount() {
  //   this.state.refSeccion.current.focus();
  // }

  componentWillReceiveProps(props) {
    this.setState({ producto: props.producto });
    this.setState({ productos: props.productos }, () => console.log("Productos++++", props.productos));
    this.setState({ pedido: props.pedido });
    // this.setState({ seccion: props.seccion });
    this.setState({ importe: props.importe });
    this.setState({ observaciones: props.observaciones });
    this.setState({ cantidad: props.cantidad });
    this.setState({ productoId: props.productoId });
    this.setState({ descripcion: props.descripcion });
    this.setState({ id: props.id });
    // this.setState({ refSeccion: props.refSeccion })
  }

  componentWillMount() {
    this.listadoPedidos();
    this.listadoProductos();
    this.listadoItemsPedido();
    this.listaProductosEnPedido();

    // this.setState({ options: this.listaProductosEnPedido() })
    this.setState((currentState) => ({ cantidad: currentState.cantidad }));
    this.setState({
      secciones: this.state.secciones, idPedido: this.state.idPedido
      , SelectedItem: {}, selectedValues: [], listaItems: [], unPedido: {}
    }
      // , () => console.log("willsecciones", this.state.secciones)
    )
    this.setState({
      confirmar: false, fecha: this.state.fecha, hora: this.state.hora,
      verPlantilla: this.state.verPlantilla
    }
      , () => console.log("confirmarwillverPlantilla", this.state.verPlantilla))
    // this.setState((currentState) => ({ listaItems: currentState.listaItems }
    //   // , () => console.log("listaItemswill", currentState.listaItems)
    // )
    // )
  }
  // componentDidUpdate(nextState) {
  //   let optionsN = this.state.productos.map((p) => ({
  //     name: p.descripcion + "",
  //     id: p.id,
  //     precio: "$" + p.precioUnitario,
  //     descripcion: p.descripcion,
  //     precioUnitario: p.precioUnitario,
  //     cantidad: 0,
  //     importe: 0,
  //   }))
  //   if(nextState.options !=this.state.options){
  //   this.setState({options:optionsN})

  //   }
  //   return this.state.options
  // }

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
  listadoResponsables = () => {
    fetch(`http://localhost:8383/responsables`)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          responsablesDeMesa: res,
          responsable: {},
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

  listaProductosEnPedido() {
    let listaProductosEnPedido =
      this.state.productos.map((p) => ({
        name: p.descripcion + "",
        id: p.id,
        precio: "$" + p.precioUnitario,
        descripcion: p.descripcion,
        precioUnitario: p.precioUnitario,
        cantidad: 0,
        importe: 0,
      }));

    return listaProductosEnPedido
  }

  // componentDidMount() {
  //   this.timerID = setInterval(
  //     () => this.tick(),
  //     1000
  //   );
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }


  // tick() {
  //   this.setState({
  //     hora: new Date()
  //   });
  // }



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



  handleAddRow = (SelectedItem) => {
    this.setState((prevState, props) => {
      const row = {
        descripcion: SelectedItem.descripcion, cantidad: 1,
        importe: SelectedItem.precioUnitario, observaciones: ""

      };
      return { unItem: row, listaItems: [...this.state.listaItems, row] };
    }
      , () => console.log("listaItemsADD", this.state.listaItems, SelectedItem)
    );
  };

  settingDescripciones = (selectedValues, SelectedItem) => {
    let nuevaListaDescripciones = this.state.nuevaListaDescripciones;
    this.setState(
      { selectedValues: selectedValues, SelectedItem: SelectedItem },
      this.handleAddRow(SelectedItem),
      // this.resetValues(),
      nuevaListaDescripciones.push(SelectedItem.descripcion),
    );
    // console.log("nuevaListaDescripciones", nuevaListaDescripciones);
  };
  handleRemoveRow = (unItem) => {
    // var SelectedItem = this.state.SelectedItem
    var selectedValues = this.state.selectedValues
    let listaItems = this.state.listaItems
    this.selectedItems()
    this.setState({ selectedValues: selectedValues })
    var listaActualizadaSeleccionados = selectedValues.filter(
      (item) => unItem.descripcion !== item.name,
    );
    selectedValues = listaActualizadaSeleccionados

    this.setState({ listaItems: listaItems }, () => this.forceUpdate()
      , () => console.log("listaItems", this.state.listaItems))
    var listaActualizada = this.state.listaItems.filter(
      (item) => unItem !== item
    );
    listaItems = listaActualizada
    console.log("listaActualizada", this.state.listaItems)
    this.setState({ listaItems: listaItems, unItem: {} }
      , () => console.log("nuevaLista", this.state.listaItems))
    this.setState({ selectedValues: selectedValues, SelectedItem: {} })
    this.state.nuevaListaDescripciones.pop(1)
    this.resetValues();
  };

  getOptions() {
    let options =
      this.multiselectRef.current.props.options.values
    console.log("options", options)
    return options
  }

  resetValues() {
    this.multiselectRef.current.resetSelectedValues();
  }

  selectedItems() {
    this.multiselectRef.current.getSelectedItems();
  }

  onRemove = (selectedValues, SelectedItem) => {
    let listaItems = this.state.listaItems
    this.setState({ SelectedItem: SelectedItem }
    );
    this.setState({ listaItems: listaItems }, () => this.forceUpdate())
    var listaActualizada = listaItems.filter(
      (item) => SelectedItem.name !== item.descripcion
    );
    listaItems = listaActualizada
    this.setState({ listaItems: listaItems, unItem: {} })
    this.state.nuevaListaDescripciones.pop(SelectedItem.descripcion)
    // if(this.state.vistaPrevia==false){
    //   this.vistaPrevia(false)
    //   this.setState({ SelectedItem: SelectedItem })
    //   this.resetValues()
    // }
  };

  event = (event) => {
    event.preventDefault();
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
    let importes = this.state.listaItems.map((i) => i.importe);
    let total = importes.reduce((a, b) => a + b, 0);
    let importeTotal = this.state.importeTotal
    importeTotal = total
    console.log("importetotal", this.state.importeTotal);

    return importeTotal;
  };


  uniqueCodigo(id) {
    var hoy = new Date();
    hoy.toLocaleDateString();
    var id = id;
    var codigo = +id;
    // var codigo = +hoy + "/" + id;
    // var codigo = + hoy + Math.floor(Math.random() * 100);
    this.setState({ codigoPedido: codigo });
    // console.log("uniqueCodigo", this.state.codigoPedido, codigo);
    return codigo;
    // return "/" ? "/" + codigo : codigo;
  }

  idItem = () => {
    let idItem = this.state.idItem
    idItem++
    return idItem
  }

  handleChangeObservaciones = (e) => {
    let unPedido = this.state.unPedido
    var nuevoPedido = Object.assign({}, this.state.unPedido);
    nuevoPedido[e.target.name] = e.target.value;
    unPedido = nuevoPedido
    this.setState({ unPedido: unPedido });
  }

  handleSubmit = (e) => {
    var busqueda;
    if (this.state.id === "") {
      this.listadoBusqueda(busqueda);
    }
    if (this.state.id !== "") {
      busqueda = '?busqueda=id=="' + this.state.id + '"';
      this.listadoBusqueda(busqueda);
    }
    e.preventDefault(e);
  };
  //agregar responsableid
  crearPedido() {
    let idPedido = this.state.idPedido
    let nombre = this.state.nombre
    let seccion = this.state.unPedido.seccion;
    let observaciones = this.state.unPedido.observaciones;
    let fecha = this.state.fecha;
    let hora = this.state.hora
    let horaFormato = moment(hora).format('HH-mm');
    let listaItems = this.state.listaItems
    console.log("nombreResponsable", idPedido)
    fetch(`http://localhost:8383/pedidos/nuevo/${nombre}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seccion, observaciones, fecha, hora }),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ idPedido: res.id, pedido: res }))
      .then((res) => listaItems.map(i => this.settearPedidoYProductoAItem(this.state.idPedido,
        i.descripcion, i.cantidad, i.importe, i.observaciones)))
      .catch(function (error) {
        console.log(error);
      });

  }
  settearPedidoYProductoAItem = (id, descripcion, cantidad, importe, observaciones) => {
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
        }))
      .catch(function (error) {
        console.log(error, "error......", id);
      });
  };


  signOut(e) {
    e.preventDefault();
    this.props.history.push("./Editar/EditarPedido");
    // console.log("propsSigout", this.props);
  }


  render() {
    let editable = this.state.editable;
    let nuevaListaDescripciones = this.state.nuevaListaDescripciones;
    let codigoPedido = this.state.codigoPedido;
    let listaItems = this.state.listaItems
    console.log("listaProductosEnPedido$$", this.state.responsablesDeMesa);
    // var listaIdsPedidos = this.state.pedidos.map((pedido) => {
    //   return (
    //     <div>
    //       <option value={pedido.id} />
    //     </div>
    //   );
    // });
    // console.log("listaIdsPedidos", listaIdsPedidos);
    return (
      <div className="container">
        <Row className="align-items-center">
          <Col col="2" className="mb-3 mb-xl-0 text-center">
            <React.Fragment> {this.state.vistaPrevia === false &&
              <div>
                <Button
                  style={{
                    marginRight: "1rem",
                    backgroundColor: "#63c2de",
                    color: "#5c6873",
                  }}
                  size="lg"
                  onClick={() => this.getCollapse(this.state.idPedido, false)}
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
                  onClick={() => this.getCollapse(this.state.idPedido, true)}
                // href="./Editar/EditarPedido"
                // name="EditarPedido"
                // render={(props) => <EditarPedido {...props} />}
                >
                  Editar pedido
                </Button>
              </div>}
            </React.Fragment>
            <React.Fragment>
              {/* {this.state.modal == false &&
                this.state.pedido != undefined && this.state.pedidoId != undefined && */}
              {listaItems.length > 0 && this.state.vistaPrevia == true &&
                <PlantillaPedido
                  encontrarItemsIdPedido={this.encontrarItemsIdPedido}
                  unPedido={this.state.unPedido}
                  verPlantilla={this.state.verPlantilla}
                  listaItems={this.state.listaItems}
                  unPedido={this.state.unPedido}
                  fecha={this.state.fecha}
                  hora={this.state.hora}
                  nombre={this.state.nombre}
                  nuevaListaDescripciones={this.state.nuevaListaDescripciones}
                  vistaPrevia={this.vistaPrevia}
                  crearPedido={this.crearPedido}
                  actualizarEstadosAlGuardar={this.actualizarEstadosAlGuardar}
                  selectedItems={this.selectedItems}
                  resetValues={this.resetValues}
                  botonPrueba={this.botonPrueba}
                  selectedValues={this.state.selectedValues}
                  ref={this.multiselectRef}
                >
                </PlantillaPedido>}
            </React.Fragment>
          </Col>
        </Row>
        <React.Fragment>{this.state.vistaPrevia == false && (
          <Collapse
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          > <React.Fragment>{this.state.editable == false &&
            <CardHeader align="left" style={{ backgroundColor: "#eedc0a" }}>
              <h4>Nuevo pedido</h4>
            </CardHeader>
          }
            </React.Fragment>
            <React.Fragment>
              {this.state.editable == true &&
                <CardHeader align="left" style={{ backgroundColor: "#eedc0a" }}>
                  <h4>Editar pedido</h4>
                </CardHeader>
              }
            </React.Fragment>
            <div className="animated fadeIn">
              <Container style={{ backgroundColor: "#f1f1f1" }}>
                <Card>
                  <CardHeader>
                    <Row>
                      {/* aca iba listaIdsPedidos buscador */}
                      <Col align="left"><b>Fecha: </b>{moment(this.state.fecha).format('DD-MM-YYYY')}{"    "}
                        <b>Hora:</b>{this.state.hora.toLocaleTimeString()}.</Col>
                    </Row>
                  </CardHeader>
                  <TablaPedido
                    editable={this.state.editable}
                    envioDePedido={this.envioDePedido}
                    envioDeEstadoResponsable={this.envioDeEstadoResponsable}
                    pedidos={this.state.pedidos}
                    pedido={this.state.pedido}
                    unPedido={this.state.unPedido}
                    responsablesDeMesa={this.state.responsablesDeMesa}
                    responsable={this.state.responsable}
                    nombre={this.state.nombre}
                    secciones={this.state.secciones}
                    items={this.state.items}
                    itemsPedido={this.state.itemsPedido}
                    pedidoId={this.state.pedidoId}
                    listadoItemsPedido={this.listadoItemsPedido}
                    // listaProductosEnPedido={listaProductosEnPedido}
                    listadoPedidos={this.listadoPedidos}
                    listadoProductos={this.listadoProductos}
                    listadoResponsables={this.listadoResponsables}
                    obtenerId={this.obtenerId}
                    codigoPedido={codigoPedido}
                    confirmar={this.state.confirmar}
                    toggle={this.toggle}
                  ></TablaPedido>
                  <React.Fragment>{editable == false && (
                    <CardBody>
                      <Row>
                        &nbsp;
                        <FormGroup onSubmit={this.event}>
                          <Multiselect
                            id="descripcion"
                            options={this.listaProductosEnPedido()}
                            ref={this.multiselectRef}
                            selectedValues={this.state.selectedValues}
                            SelectedItem={this.state.SelectedItem}
                            onSelect={this.settingDescripciones}
                            onRemove={this.onRemove}
                            groupBy="precio"
                            closeIcon="circle2"
                            hidePlaceholder={true}
                            loading={false}
                            placeholder="Seleccione un producto"
                            displayValue="name"
                            emptyRecordMsg="No hay más productos para seleccionar"
                            style={{
                              chips: { background: "#9D1212" },
                              searchBox: {
                                background: "white",
                                borderBottom: "1px solid #9D1212",
                                borderRadius: "10px",
                                // "border": "none",
                              },
                            }}
                          />
                          {/* <div className="column">
                          {React.cloneElement(this.props.children, {
                            selectedItem: this.state.selectedItem,
                          })}
                        </div> */}

                        </FormGroup>
                      </Row>
                    </CardBody>
                  )}</React.Fragment>

                  <React.Fragment>
                    {nuevaListaDescripciones.length > 0 && editable == false && (
                      <Container style={{ backgroundColor: "#f1f1f1" }}>
                        <Row>
                          <Col class="col-lg-4">
                            <Table style={{ backgroundColor: "#eee363" }}>
                              <thead>
                                <tr>
                                  <th>Productos</th>
                                  <th>Cantidad</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.renderItems(listaItems, this.state.SelectedItem)}
                              </tbody>
                            </Table>
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
                                {this.renderItemsDos(listaItems)}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <CardFooter>
                          <CardText align="right" style={{ marginRight: "3rem" }}>
                            <b> Importe total $ </b>
                            {this.sumar()}
                          </CardText>
                        </CardFooter>
                        <CardFooter>
                          <CardText align="left">Observaciones: <Input
                            key="observaciones"
                            style={{ backgroundColor: "#eee363" }}
                            type="textarea"
                            id="observaciones"
                            name="observaciones"
                            placeholder="Observaciones generales"
                            value={this.state.unPedido.observaciones}
                            onChange={this.handleChangeObservaciones}
                            className="form-control"
                          ></Input></CardText>
                        </CardFooter>
                      </Container>
                    )}
                    {nuevaListaDescripciones == 0 && editable == false && (
                      <div>
                        <Container>
                          <Row className="align-items-center">
                            <CardText>Por favor seleccione productos</CardText>
                          </Row>
                        </Container>
                      </div>
                    )}
                  </React.Fragment>

                  <React.Fragment>
                    {editable == true && (
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
                                {this.renderItemsUnoEditable(
                                  this.state.SelectedItem
                                )}
                              </tbody>

                            </Table>
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
                                {this.renderItemsDosEditable()}
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
                          <CardText align="left">Observaciones: <input
                            key="observaciones"
                            style={{ backgroundColor: "#eee363" }}
                            type="textarea"
                            id="observaciones"
                            name="observaciones"
                            placeholder="Observaciones generales"
                            value={this.state.unPedido.observaciones}
                            onChange={this.handleChangeObservaciones}
                            className="form-control"
                          ></input></CardText>
                        </CardFooter>
                      </Container>
                    )}
                  </React.Fragment>

                  <CardFooter>
                    <Row>
                      <Col xs="12" md="6" onSubmit={this.event}>
                        <Button
                          color="success"
                          size="lg"
                          block
                          onClick={() => this.confirmarPedido(this.state.idPedido)
                          }
                        >
                          Confirmar
                        </Button>
                      </Col>
                      <Col xs="12" md="6">
                        {/* <Button
                        activeClassName="button-confirmar"
                        path="./Pedido"
                        name="Pedido"
                        // render={(props) => <Pedido {...props} />}
                      >
                        Confirmar props
                      </Button> */}
                        <React.Fragment>{this.state.listaItems.length > 0 &&
                          <Button color="primary" size="lg" block
                            onClick={() => this.vistaPrevia(true)}
                          >
                            Vista previa
                          </Button>
                        }
                        </React.Fragment>

                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Container>
            </div>

          </Collapse>
        )}
        </React.Fragment>
      </div>
    );
  }



  verDetallesItems(pedidoId) {
    var listaActualizada = this.state.items.filter(
      (item) => pedidoId == item.pedidoId
    );
    this.setState({ items: listaActualizada }, () => console.log("detallesItems", this.state.items));
  }

  actualizarEstadosAlCrear() {
    this.setState({
      listaItems: [], nuevaListaDescripciones: [], modal: true, confirmar: true,
      idPedido: this.state.idPedido, selectedValues: [], verPlantilla: true
    }, () => console.log("listaItemsCOnfirmar", this.state.confirmar)
    );
  }

  actualizarEstadosAlGuardar() {
   this.botonPrueba()

  }
  botonPrueba() {
    this.setState({
      listaItems: [], unPedido: {}, nuevaListaDescripciones: [], selectedValues: [],
    }, () => console.log("botonPrueba---", this.state)
    );


  }
  vistaPrevia(boolean) {
    this.setState({
      vistaPrevia: boolean
    });


    // }

  }

  confirmarPedido(idPedido) {
    this.crearPedido();
    this.setState({
      listaItems: [], nuevaListaDescripciones: [], modal: true, confirmar: true,
      idPedido: this.state.idPedido, selectedValues: [], verPlantilla: true
    }, () => console.log("listaItemsCOnfirmar", this.state.confirmar)
    );
    this.getCollapse();
    // this.verPlantilla();
    this.verDetallesItems(idPedido)
    // this.limpiarSeccion(this.state.unPedido)
    // this.confirmar();
  }




  envioDePedido(estadoSeccion) {
    this.setState({ unPedido: { seccion: estadoSeccion } },
      () => console.log("envioSeccion", estadoSeccion, this.state.seccion));
  }

  envioDeEstadoResponsable(estadoResponsable) {
    this.setState({ nombre: estadoResponsable }
      , () => console.log("estadoRespPedid", estadoResponsable, this.state.nombre))
  }
  seleccionarItem(unItem) {
    this.setState({ item: unItem }, () => console.log("seleccionar", this.state.item))

  }

  envioDeEstadoObservaciones(nuevoItem) {
    this.setState(function (state, props) {
      return {

        listaItems: state.listaItems.forEach(function (i) {
          if (i.descripcion === nuevoItem.descripcion) {
            // i.descripcion = nuevoItem.descripcion
            i.observaciones = nuevoItem.observaciones;
          }
          console.log("nuevaLista", state.listaItems, nuevoItem.observaciones);
        }
        ),
        listaItems: state.listaItems,
        unItem: {
          observaciones: state.unItem.observaciones,
          // descripcion: state.unItem.descripcion,

        },
      };
    }, () => console.log("nuevaLista2", this.state.listaItems))

  }

  calcular = (nuevoItem) => {
    this.setState(function (state, props) {
      var total = 0;
      return {
        listaItems: state.listaItems.forEach(function (i) {
          if (i.descripcion === nuevoItem.descripcion) {
            i.descripcion = nuevoItem.descripcion
            i.cantidad = nuevoItem.cantidad;
            total = (i.cantidad * nuevoItem.importe);
            i.importe = total;
          }
          console.log("nuevaLista", state.listaItems, nuevoItem.importe);
        }
        ),
        listaItems: state.listaItems,
        unItem: {
          importe: total,
          descripcion: state.unItem.descripcion,

        },
      };
    }, () => console.log("nuevaLista2", this.state.listaItems))
  }


  renderItems(listaItems, SelectedItem) {
    let nuevaListaDescripciones = this.state.nuevaListaDescripciones;
    const id = this.state.id;
    let productos = this.state.productos;
    // let listaItems = this.state.listaItems;
    // let item = this.state.unItem;
    // let cantidad = this.state.unItem.cantidad
    let idItem = this.state.idItem

    if (listaItems) {
      // if (Selecteditem) {
      return listaItems.map((unItem, unIndex) => {

        // item = unItem
        // let idParaItem = this.idItem()

        // let cantidad=nuevoItem.cantidad
        // cantidad=1

        // const pid = id;
        // unItem.pedidoId = pid;
        // if (unItem.importe == null) {
        //   unItem.importe =producto.precioUnitario;
        // }
        console.log("renderUNO", listaItems);
        return (
          <PedidoItems
            // id={id}
            // pedidoId={unItem.pedidoId}
            nuevaListaDescripciones={this.state.nuevaListaDescripciones}
            envioDePedido={this.envioDePedido}
            envioDeEstadoCantidad={this.envioDeEstadoCantidad}
            envioDeEstadoImporte={this.envioDeEstadoImporte}
            settearPedidoYProductoAItem={this.settearPedidoYProductoAItem}
            // handleEvent={this.handleEvent}
            key={unIndex}
            index={unIndex}
            unItem={unItem}
            listaItems={listaItems}
            pedido={this.state.pedido}
            productos={productos}
            productoId={unItem.productoId}
            // productoId={SelectedItem.id}
            descripcion={SelectedItem.descripcion}
            precio={SelectedItem.precioUnitario}
            // cantidad={cantidad}
            importe={unItem.importe}
            seleccionarItem={this.seleccionarItem}
            codigo={unItem.codigo}
            selector={this.seleccionarItem}
            calcular={this.calcular}
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
    // else{
    //  return( <div><b>No hay items</b></div>)
    // }
  }
  importe() {
    return this.state.importe;
  }




  renderItemsDos(listaItems) {
    let nuevaListaDescripciones = this.state.nuevaListaDescripciones;
    // let items = this.state.items;
    // let SelectedItem = this.state.SelectedItem;
    // let listaItems = this.state.listaItems;

    if (listaItems) {

      return listaItems.map((unItem, index) => {
        // const producto = listaProductosEnPedido.find(
        //   (p) => p.descripcion == SelectedItem
        // );
        console.log("renderDos", listaItems)
        return (
          <PedidoItemsDos
            envioDeEstadoObservaciones={this.envioDeEstadoObservaciones}
            handleRemoveRow={this.handleRemoveRow}
            key={index}
            unItem={unItem}
            listaItems={listaItems}
            productos={this.state.productos}
            productoId={unItem.productoId}
            importe={unItem.importe}
            selector={this.seleccionarItem}
            listadoPedidos={this.listadoPedidos}
            listadoProductos={this.listadoProductos}
            listadoItemsPedido={this.listadoItemsPedido}
          />
        );
      });
    }

  }

  renderItemsUnoEditable(listaProductosEnPedido) {
    let items = this.state.items;
    return !items
      ? console.log("NULL", null)
      : items.map((unItem, index) => {
        return (
          <div>{console.log("itemsUno", items)}</div>
          // <PedidoItemsEditar
          //   key={index}
          //   items={this.state.items}
          //   unItem={unItem}
          //   productos={this.state.productos}
          //   productoId={unItem.productoId}
          //   importe={this.state.item.importe}
          //   selector={this.seleccionarItem}
          //   listadoPedidos={this.listadoPedidos}
          //   listadoProductos={this.listadoProductos}
          //   listadoItemsPedido={this.listadoItemsPedido}
          // />
        );
      });
  }

  renderItemsDosEditable(listaProductosEnPedido) {
    let nuevaListaDescripciones = this.state.nuevaListaDescripciones;
    let items = this.state.items;
    let SelectedItem = this.state.SelectedItem;
    let listaItems = this.state.listaItems;

    return (
      <div>hola render dos editable</div>


    );
  }

  renderRows(pedido) {

    return (
      <div>hola soy renderRows</div>


    );
  }
}

export default Pedidos;
