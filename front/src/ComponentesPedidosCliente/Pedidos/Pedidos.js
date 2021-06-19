import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
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
      precioUnitario: [],
      selectedValues: null,
      SelectedItem: null,
      // SelectedItem: { descripcion: "" },
      options: null,
      items: [],
      // item: {},
      unItem: {
        descripcion: null,
        cantidad: null, importe: null
      },
      unPedido: { seccion: "", observaciones: "" },
      productoId: props.productoId,
      selector: {},
      mostrarTabla: false,
      idPedido: null,
      codigo: "",
      pedidoId: null,
      // secciones: props.secciones,
      secciones: [
        { id: 1, name: "Abierta" },
        { id: 2, name: "Carpa" },
      ],
      seccion: props.seccion,
      importeTotal: null,
      cantidad: null,
      // descripcion: props.descripcion,
      observaciones: props.observaciones,
      // importe: props.importe,
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
      confirmar: null,
      valueSeccion: props.valueSeccion,
      idSeccion: props.idSeccion,
      refSeccion: React.createRef(),
      limpiar: props.limpiar,
      event: null,
    };
    this.listadoItemsPedido = this.listadoItemsPedido.bind(this);
    this.envioDePedido = this.envioDePedido.bind(this);
    this.envioDeEstadoObservaciones =
      this.envioDeEstadoObservaciones.bind(this);
    this.envioDeEstadoLimpiarPedido =
      this.envioDeEstadoLimpiarPedido.bind(this);
    this.settearPedidoYProductoAItem =
      this.settearPedidoYProductoAItem.bind(this);
    this.crearPedido = this.crearPedido.bind(this);
    this.handleRemoveRow = this.handleRemoveRow.bind(this);
    this.seleccionarItem = this.seleccionarItem.bind(this)
    this.limpiarSeccion = this.limpiarSeccion.bind(this)
    this.confirmar = this.confirmar.bind(this)
    this.calcular = this.calcular.bind(this)


    // this.limpiar=this.limpiar.bind(this)
    // this.estadoInicial = this.estadoInicial.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  confirmar = (bool, e) => {
    if (e) {
      this.setState({
        event: e, confirmar: bool
      }, () => console.log("confirmartrue", e, this.state.confirmar), this.limpiarSeccion());
    }
  };

  estadoInicial = () => {
    this.setState({
      pedido: {
        clienteId: null,
        codigoPedido: "",
        mesero: "",
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
  // componentDidMount() {
  //   this.state.refSeccion.current.focus();
  // }

  componentWillReceiveProps(props) {
    this.setState({ producto: props.producto });
    this.setState({ productos: props.productos });
    this.setState({ pedido: props.pedido });
    this.setState({ seccion: props.seccion });
    this.setState({ importe: props.importe });
    this.setState({ observaciones: props.observaciones });
    this.setState({ cantidad: props.cantidad });
    this.setState({ productoId: props.productoId });
    this.setState({ descripcion: props.descripcion });
    this.setState({ id: props.id });
    // this.setState({ valueSeccion: props.valueSeccion });
    // this.setState({ idSeccion: props.idSeccion })
    // this.setState({ refSeccion: props.refSeccion })
  }

  componentWillMount() {
    this.listadoPedidos();
    this.listadoProductos();
    this.listadoItemsPedido();
    this.listaProductosEnPedido();
    this.setState({ options: this.listaProductosEnPedido() })
    this.setState((currentState) => ({ cantidad: currentState.cantidad }));
    this.setState({ secciones: this.state.secciones }, () => console.log("willsecciones", this.state.secciones))
    this.setState({ confirmar: false }, () => console.log("confirmarwillfalse", this.state.confirmar))
  }

  // componentDidMount(){
  //   this.limpiar()
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

  handleRemoveRow = () => {
    this.setState((prevState, props) => {
      return { listaItems: prevState.listaItems.slice(1) };
    });
  };

  handleAddRow = (SelectedItem) => {
    let unItem = this.state.unItem;
    this.setState((prevState, props) => {
      const row = {
        descripcion: SelectedItem.descripcion, cantidad: 1,
        importe: SelectedItem.precioUnitario, observaciones: ""

      };
      return { unItem: row, listaItems: [...prevState.listaItems, row] };
    }
      // , () => console.log("listaItemsADD", this.state.listaItems)
    );
  };

  settingDescripciones = (selectedValues, SelectedItem) => {
    let nuevaListaDescripciones = this.state.nuevaListaDescripciones;
    this.setState(
      { selectedValues: selectedValues, SelectedItem: SelectedItem },
      this.handleAddRow(SelectedItem),
      nuevaListaDescripciones.push(SelectedItem.descripcion),
    );
    // console.log("nuevaListaDescripciones", nuevaListaDescripciones);
  };

  onRemove = (selectedValues, SelectedItem) => {
    let index = selectedValues.indexOf(SelectedItem.name);
    selectedValues.splice(index, 1);
  
    this.setState(
      {
        selectedValues:selectedValues,
        SelectedItem:SelectedItem
      },
      () => console.log("onRemove", selectedValues)
    );

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
      // this.setState(
      //   { importeTotal: total },
      //   console.log("importetotal", this.state.importeTotal)
      // );
      console.log("importetotal", this.state.importeTotal);

      return total;
    };

    getCollapse = (idPedido, boolean) => {
      this.toggle();
      var modal = this.state.modal;
      this.setState({ editable: boolean })
      // , console.log("boolean", this.state.editable, boolean))

      if (modal == false && boolean.value == false) {
        this.setState({ editable: false })
        // , console.log("NOboolean", this.state.editable, boolean.value))
        // this.setState({ codigoPedido: this.state.codigoPedido }, () =>
        //   this.uniqueCodigo(idPedido)
        // );
      }
      if (modal == false && boolean.value == true) {
        this.setState({ editable: true })
        // , console.log("SIboolean", this.state.editable, boolean))
        // this.setState({ codigoPedido: this.state.codigoPedido }, () =>
        //   this.uniqueCodigo(idPedido)
        // );
      }
    };

    getImporte() {
      return this.state.importe;
    }

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

    listadoBusqueda = (busqueda) => {
      // "/pedido/busqueda/:id"
      if (busqueda != null) {
        fetch(`http://localhost:8383/pedido` + busqueda)
          .then((res) => res.json())
          .then((pedidos) => this.setState({ pedidos: pedidos }));
      }
      if (busqueda == null) {
        fetch(`http://localhost:8383/pedido`)
          .then((res) => res.json())
          .then((pedidos) => this.setState({ pedidos: pedidos }));
      }
    };
    limpiarTabla = () => {
      document.getElementById("id").value = "";
      // this.listadoPedidos();
    };

    verDetallesPedido(id) {
      var listaActualizada = this.state.pedidos.filter(
        (pedido) => id == pedido.id
      );
      this.setState({ pedidos: listaActualizada });
    }

    handleChange = (e) => {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value });
    };
    handleChangeObservaciones = (e) => {
      let unPedido = this.state.unPedido
      var nuevoPedido = Object.assign({}, this.state.unPedido);
      nuevoPedido[e.target.name] = e.target.value;
      unPedido = nuevoPedido
      this.setState({ unPedido: unPedido }
        , () => console.log("nuevoPedido/key", this.state.unPedido, nuevoPedido),
      );
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



    crearPedido() {
      let seccion = this.state.seccion;
      let observaciones = this.state.unPedido.observaciones;
      let listaItems = this.state.listaItems
      console.log("crearObservaciones", observaciones)
      fetch("http://localhost:8383/pedidos/nuevo", {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seccion, observaciones }),
      })
        .then((res) => res.json())
        .then((res) => this.setState({ idPedido: res.id }
          , () => console.log("idPEDIDO", this.state.idPedido)))
        .then((res) => listaItems.map(i => this.settearPedidoYProductoAItem(this.state.idPedido,
          i.descripcion, i.cantidad, i.importe, i.observaciones,
          () => console.log("listaItemsSETEAR", listaItems, i.observaciones))))
        .catch(function (error) {
          console.log(error);
        });
    }
    settearPedidoYProductoAItem = (id, descripcion, cantidad, importe, observaciones) => {
      // let observaciones = this.state.observaciones;
      // let descripcion=this.state.unItem.descripcion
      console.log("SEETEAR****", id, descripcion, cantidad, importe);
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
        // .then((res) => this.listadoPedidos())
        .then((res) =>
          this.setState(
            {
              pedidoId: id,
              // cantidad: cantidad,
            },
            console.log("pedidoIdSETTEAR", res, "++", importe, cantidad)
          )
        )
        // .then(this.listadoItemsPedido())
        .catch(function (error) {
          console.log(error, "error......", id);
        });
    };

    signOut(e) {
      e.preventDefault();
      this.props.history.push("./Editar/EditarPedido");
      // console.log("propsSigout", this.props);
    }

    //   if (this.state.responsable.nombre != null) {
    //   console.log("value",document.getElementById("nombre").value = "")

    //   this.listadoResponsablesDeMesa();
    // }
    // if (this.state.seccion != "") {
    //   document.getElementById("seccion").value = ""
    //   this.setState({ seccion: "" });
    //   // this.props.envioDeEstadoLimpiarPedido(this.state.seccion)
    //   this.setState({ secciones: this.state.secciones });
    // }





    render(props) {
      let editable = this.state.editable;
      let nuevaListaDescripciones = this.state.nuevaListaDescripciones;
      let items = this.state.items;
      let importe = this.state.importe;
      let hoy = new Date();
      let codigoPedido = this.state.codigoPedido;
      // console.log("listaProductosEnPedido$$", this.state.idPedido);
      //sacar los div y integra <React.Fragment/> para poder retornar varios componentes
      var listaIdsPedidos = this.state.pedidos.map((pedido) => {
        return (
          <div>
            <option value={pedido.id} />
          </div>
        );
      });
      // console.log("listaIdsPedidos", listaIdsPedidos);
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
            </Col>
          </Row>
          <Collapse
            isOpen={this.state.modal}
            toggle={editable == true ? this.toggle : this.toggleEditar}
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
                      <React.Fragment>
                        {editable == false &&
                          <Col>Detalles de pedido</Col>
                        }
                      </React.Fragment>
                      <React.Fragment>
                        {editable == true &&
                          <CardHeader>

                            <Form onSubmit={this.handleSubmit} id="formulario">
                              <FormGroup row>
                                <Col xs="12" md="9">
                                  <Input
                                    type="number"
                                    id="id"
                                    name="id"
                                    placeholder="Elegir id"
                                    onChange={this.handleChange}
                                    list="pedido"
                                  />
                                </Col>
                                <datalist id="pedido">{listaIdsPedidos}</datalist>
                              </FormGroup>
                              <div className="row">
                                <div className="input-field col s12 m12">
                                  <Button
                                    type="button"
                                    style={{ margin: "2px" }}
                                    color="info"
                                    outline
                                    onClick={() =>
                                      this.verDetallesPedido(this.state.id)
                                    }
                                  >
                                    <i className="fa fa-dot-circle-o"></i>Ver detalles
                                    de pedido
                                  </Button>
                                  <Button
                                    type="button"
                                    style={{ margin: "2px" }}
                                    color="success"
                                    outline
                                    onClick={this.limpiarTabla}
                                  >
                                    <i className="fa fa-dot-circle-o"></i>Ver Pedidos
                                  </Button>
                                </div>
                              </div>
                            </Form>
                            <CardBody>
                              <Table responsive bordered size="sm">
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>Responsable de mesa</th>
                                    <th>Código</th>
                                    <th>Sección</th>
                                    <th>Observaciones</th>
                                    <th>Hora</th>
                                  </tr>
                                </thead>
                                <tbody>{this.renderRows()}</tbody>
                              </Table>
                            </CardBody>
                          </CardHeader>
                        }
                      </React.Fragment>
                      <Col align="left">Fecha:{hoy.toLocaleDateString()}</Col>
                    </Row>
                  </CardHeader>
                  <TablaPedido
                    editable={this.state.editable}
                    envioDePedido={this.envioDePedido}
                    envioDeEstadoLimpiarPedido={this.envioDeEstadoLimpiarPedido}
                    pedidos={this.state.pedidos}
                    pedido={this.state.pedido}
                    unPedido={this.state.unPedido}
                    secciones={this.state.secciones}
                    items={this.state.items}
                    pedidoId={this.state.pedidoId}
                    listadoItemsPedido={this.listadoItemsPedido}
                    // listaProductosEnPedido={listaProductosEnPedido}
                    listadoPedidos={this.listadoPedidos}
                    listadoProductos={this.listadoProductos}
                    obtenerId={this.obtenerId}
                    crearPedido={this.crearPedido}
                    codigoPedido={codigoPedido}
                    handleChangeSeccion={this.handleChangeSeccion}
                    limpiarSeccion={this.limpiarSeccion}
                    // limpiar={this.limpiar}
                    confirmar={this.state.confirmar}
                    // refSeccion={this.state.refSeccion}
                    // confirmarMetodo={this.confirmar}
                    // handleEvent={this.handleEvent}
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
                            selectedValues={this.state.selectedValues}
                            SelectedItem={this.state.SelectedItem}
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
                  )}</React.Fragment>

                  <React.Fragment>
                    {nuevaListaDescripciones.length > 0 && editable == false && (
                      <Container style={{ backgroundColor: "#f1f1f1" }}>
                        <Row>
                          <Col class="col-lg-4">
                            <Table style={{ backgroundColor: "#eee363" }}>
                              <thead>
                                <tr>
                                  <th>Código</th>
                                  <th>Productos</th>
                                  <th>Cantidad</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.renderItems(this.state.SelectedItem)}
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
                                {this.renderItemsDos()}
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
                          // onSubmit={this.handleEvent} FocusEvent
                          onClick={() => this.confirmarPedido()}
                        // onClick={() => this.handleEvent, () => this.confirmarPedido()}
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

                        {/* <Button color="primary" size="lg" block>
                        Guardar pedido
                      </Button> */}
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

    limpiarSeccion(nuevoPedido) {
      this.setState(function (state, props) {
        var seccionVacia = "";
        return {
          secciones: state.secciones.find(function (s) {
            if (s.name === nuevoPedido.seccion) {
              nuevoPedido.seccion = seccionVacia
            }
            console.log("nuevaLista", nuevoPedido.seccion);
          }
          ),
          secciones: state.secciones,
          unPedido: {
            seccion: nuevoPedido.seccion,
          },

        };
      }, () => console.log("nuevaLista2", this.state.secciones, this.state.unPedido))
    }

    confirmarPedido() {
      this.crearPedido();
      this.setState({
        listaItems: [], nuevaListaDescripciones: [], modal: true
      }, () => console.log("listaItemsCOnfirmar", this.state.unPedido, this.state.secciones)
      );
      // this.onRemove(this.state.selectedValues,this.state.SelectedItem)
      this.limpiarSeccion(this.state.unPedido)
      // this.confirmar();
      // this.limpiarSeccion(this.state.unPedido)
    }

    envioDePedido(estadoSeccion, estadoSecciones) {
      this.setState({ seccion: estadoSeccion, secciones: estadoSecciones },
        () => console.log("envioSeccion", estadoSeccion, this.state.seccion));
    }
    seleccionarItem(unItem) {
      this.setState({ item: unItem }, () => console.log("seleccionar", this.state.item))

    }

    envioDeEstadoObservaciones(nuevoItem) {
      this.setState(function (state, props) {
        return {
          listaItems: state.listaItems.forEach(function (i) {
            // if (i.descripcion === nuevoItem.descripcion) {
            // i.descripcion = nuevoItem.descripcion
            i.observaciones = nuevoItem.observaciones;
            // }
            console.log("nuevaLista", state.listaItems, nuevoItem.observaciones);
          }
          ),
          listaItems: state.listaItems,
          unItem: {
            observaciones: state.unItem.observaciones,
            descripcion: state.unItem.descripcion,

          },
        };
      }, () => console.log("nuevaLista2", this.state.listaItems))

    }

    envioDeEstadoLimpiarPedido(estado) {
      this.setState({ seccion: estado });
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
    //primero selecciono el producto
    //segundo le pido el id

    actualizarEstados = () => {
      // let listaItems= this.state.listaItems;
      // let arrayCantidad=this.state.estadosCantidad
      // listaItems.map(i=>this.envioDeEstadoCantidad(z))

    }
    renderItems(SelectedItem) {
      let nuevaListaDescripciones = this.state.nuevaListaDescripciones;
      const id = this.state.id;
      let productos = this.state.productos;
      let listaItems = this.state.listaItems;
      // let item = this.state.unItem;
      // let cantidad = this.state.unItem.cantidad
      let idItem = this.state.idItem

      if (nuevaListaDescripciones.length) {
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
          console.log("ROWITEMUNO", listaItems.indexOf(unIndex));
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

    renderItemsDos(listaProductosEnPedido) {
      let nuevaListaDescripciones = this.state.nuevaListaDescripciones;
      let items = this.state.items;
      let SelectedItem = this.state.SelectedItem;
      let listaItems = this.state.listaItems;

      if (nuevaListaDescripciones.length) {
        return listaItems.map((unItem, index) => {
          // const producto = listaProductosEnPedido.find(
          //   (p) => p.descripcion == SelectedItem
          // );
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
