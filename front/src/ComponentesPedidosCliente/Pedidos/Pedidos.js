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
  CardColumns,
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
      pedido: {},
      pedidos: [],
      producto: props.producto,
      productos: [],
      listaProductosEnPedidoEditar: [],
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
      precioUnitario: [],
      selectedValues: null,
      SelectedItem: null,
      selectedValuesEditar: null,
      SelectedItemEditar: null,
      options: [],
      items: [],
      item: {},
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
      seccionEditable: "",
      responsablesDeMesa: [],
      responsable: {},
      nombre: "",
      nombreResponsableEditable: "",
      // fecha: new Date().toLocaleDateString(),
      fecha: new Date().toString(),
      hora: new Date(),
      importeTotal: null,
      cantidad: null,
      observaciones: props.observaciones,
      observacionesEditable: "",
      importe: null,
      total: props.total,
      idItem: 0,
      id: props.id,
      idPedidoTabla: "",
      productoIdDos: null,
      nuevaListaDescripciones: [],
      nuevaListaDescripcionesEditar: [],
      listaItems: [],
      nuevoItem: {},
      itemsObjects: [],
      idPedido: null,
      descripcion: null,
      nuevaListaItems: [],
      confirmar: false,
      refSeccion: React.createRef(),
      limpiar: props.limpiar,
      verPlantilla: false,
      itemsSeleccionado: 0,
      encontrado: false,
      vistaPrevia: false,
      hasError: false,
      itemsDePedidoElegido: [],
      limpiarPedidoEditar: false



    };
    this.listadoPedidos = this.listadoPedidos.bind(this)
    this.listadoItemsPedido = this.listadoItemsPedido.bind(this);
    this.listadoResponsables = this.listadoResponsables.bind(this)
    this.listaProductosEnPedido = this.listaProductosEnPedido.bind(this);
    this.envioDePedido = this.envioDePedido.bind(this);
    this.envioDeSeccionEditar = this.envioDeSeccionEditar.bind(this)
    this.envioDeEstadoObservaciones = this.envioDeEstadoObservaciones.bind(this);
    this.envioDeObservacionesEditar = this.envioDeObservacionesEditar.bind(this)
    this.envioDeEstadoResponsable = this.envioDeEstadoResponsable.bind(this)
    this.envioDeEstadoResponsableEditar = this.envioDeEstadoResponsableEditar.bind(this)
    this.crearPedido = this.crearPedido.bind(this);
    this.settearPedidoYProductoAItem = this.settearPedidoYProductoAItem.bind(this);
    this.handleRemoveRow = this.handleRemoveRow.bind(this);
    this.handleAddRowEditar = this.handleAddRowEditar.bind(this)
    this.seleccionarItem = this.seleccionarItem.bind(this)
    this.calcular = this.calcular.bind(this)
    this.multiselectRef = React.createRef();
    this.multiselectRefEditar = React.createRef();
    this.vistaPrevia = this.vistaPrevia.bind(this)
    this.actualizarEstadosAlGuardar = this.actualizarEstadosAlGuardar.bind(this)
    this.selectedItems = this.selectedItems.bind(this)
    this.resetValues = this.resetValues.bind(this)
    this.selectedItemsEditar = this.selectedItemsEditar.bind(this)
    this.resetValuesEditar = this.resetValuesEditar.bind(this)
    this.selectedItems = this.selectedItems.bind(this)
    this.guardarVistaPrevia = this.guardarVistaPrevia.bind(this)
    this.elegirId = this.elegirId.bind(this)
    this.calcularEditar = this.calcularEditar.bind(this)
    this.limpiarItemsDePedidoElegidoDeTabla = this.limpiarItemsDePedidoElegidoDeTabla.bind(this)
    this.limpiarIdTabla = this.limpiarIdTabla = this.limpiarIdTabla.bind(this)
    this.actualizarAlEliminar = this.actualizarAlEliminar.bind(this)
    this.encontrarItemsIdPedido = this.encontrarItemsIdPedido.bind(this)
    this.confirmarPedidoTablaEditar = this.confirmarPedidoTablaEditar.bind(this)
    this.tablaPedido = React.createRef()
    this.getReferenceChildTablaPedido = this.getReferenceChildTablaPedido.bind(this)
    // this.pedidoElegido=this.pedidoElegido.bind(this)
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
        // , () => console.log("NOboolean", this.state.editable, boolean.value)
      )
      // this.setState({ codigoPedido: this.state.codigoPedido }, () =>
      //   this.uniqueCodigo(idPedido)
      // );
    }
    if (modal == false && boolean.value == true) {
      this.setState({
        editable: true, itemsDePedidoElegido: [], items: [], pedido: {}, item: {}
        , limpiarPedidoEditar: false
      }
        , () => this.forceUpdate()
      )
      // this.setState({ codigoPedido: this.state.codigoPedido }, () =>
      //   this.uniqueCodigo(idPedido)
      // );
    }
  };

  componentWillMount() {
    this.listadoPedidos();
    this.listadoProductos();
    this.listadoItemsPedido();
    this.listaProductosEnPedido();
    this.nuevaLista()
    this.setState((currentState) => ({ cantidad: currentState.cantidad }));
    this.setState({
      secciones: this.state.secciones, idPedido: this.state.idPedido
      , SelectedItem: {}, selectedValues: [], listaItems: [], unPedido: {},
    })
    this.setState({
      selectedValuesEditar: [], SelectedItemEditar: {}, responsable: {}, pedido: {}
      , idPedidoTabla: this.state.idPedidoTabla
      , itemsDePedidoElegido: this.state.itemsDePedidoElegido, item: this.state.item
      , limpiarPedidoEditar: this.state.limpiarPedidoEditar
    }
      , () => this.forceUpdate())
    this.setState({
      confirmar: false, fecha: this.state.fecha, hora: this.state.hora,
      verPlantilla: this.state.verPlantilla
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: nextProps.productos }
        , () => console.log("nextProductos", this.state.productos))
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto })
    }
    // if (nextProps.pedido !== this.props.pedido) {
    //   this.setState({ pedido: nextProps.pedido })
    // }
    if (nextProps.importe !== this.props.importe) {
      this.setState({ importe: nextProps.importe })
    }
    if (nextProps.observaciones !== this.props.observaciones) {
      this.setState({ observaciones: nextProps.observaciones })
    }
    if (nextProps.cantidad !== this.props.cantidad) {
      this.setState({ cantidad: nextProps.cantidad })
    }
    if (nextProps.productoId !== this.props.productoId) {
      this.setState({ productoId: nextProps.productoId })
    }
    if (nextProps.descripcion !== this.props.descripcion) {
      this.setState({ descripcion: nextProps.descripcion });
    }
    if (nextProps.id !== this.props.id) {
      this.setState({ id: nextProps.id });
    }
  }

  listadoPedidos = () => {
    fetch(`http://localhost:8383/pedidos`)
      .then((res) => res.json())
      .then((pdds) =>
        this.setState({
          pedidos: pdds,
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
        categoria: p.categoria,
        cantidad: 0,
        importe: 0,
      }));

    return listaProductosEnPedido
  }
  nuevaLista() {
    let data1 = this.state.itemsDePedidoElegido
    let data2 = this.listaProductosEnPedido()
    var nuevaLista = data1.filter(function (el) {
      var found = false, x = 0;
      while (x < data2.length && !found) {
        if (el.productoId == data2[x].id) found = true;
        x++;
      }
      if (!found) return el;
    });
    nuevaLista = nuevaLista.concat(data2.filter(function (el) {
      var found = false, x = 0;
      while (x < data1.length && !found) {
        if (el.id == data1[x].productoId) found = true;
        x++;
      }
      if (!found) return el;
    }));
    console.log("nuevaLista", nuevaLista)
    return nuevaLista
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

  settingDescripciones = (selectedValues, SelectedItem) => {
    let nuevaListaDescripciones = this.state.nuevaListaDescripciones;
    this.setState(
      { selectedValues: selectedValues, SelectedItem: SelectedItem },
      this.handleAddRow(SelectedItem),
      nuevaListaDescripciones.push(SelectedItem.descripcion),
    );
  };

  handleAddRow = (SelectedItem) => {
    if (SelectedItem.categoria == "Cocina") {
      this.setState((prevState, props) => {
        const row = {
          descripcion: SelectedItem.descripcion, cantidad: 1,
          importe: SelectedItem.precioUnitario, observaciones: "", listoCocina: true,
        };
        return { unItem: row, listaItems: [...this.state.listaItems, row] };
      });
    } else {
      this.setState((prevState, props) => {
        const row = {
          descripcion: SelectedItem.descripcion, cantidad: 1,
          importe: SelectedItem.precioUnitario, observaciones: "", listoParrilla: true,
        };
        return { unItem: row, listaItems: [...this.state.listaItems, row] };
      });
    }
  };

  handleRemoveRow = (unItem) => {
    var selectedValues = this.state.selectedValues
    let listaItems = this.state.listaItems
    this.selectedItems()
    this.setState({ selectedValues: selectedValues })
    var listaActualizadaSeleccionados = selectedValues.filter(
      (item) => unItem.descripcion !== item.name);
    selectedValues = listaActualizadaSeleccionados
    this.setState({ listaItems: listaItems }, () => this.forceUpdate())
    var listaActualizada = this.state.listaItems.filter((item) => unItem !== item);
    listaItems = listaActualizada
    this.setState({ listaItems: listaItems, unItem: {} })
    this.setState({ selectedValues: selectedValues, SelectedItem: {} })
    this.state.nuevaListaDescripciones.pop(1)
    this.resetValues();
  };

  onRemove = (selectedValues, SelectedItem) => {
    let listaItems = this.state.listaItems
    this.setState({ SelectedItem: SelectedItem });
    this.setState({ listaItems: listaItems }, () => this.forceUpdate())
    var listaActualizada = listaItems.filter((item) => SelectedItem.name !== item.descripcion);
    listaItems = listaActualizada
    this.setState({ listaItems: listaItems, unItem: {} })
    this.state.nuevaListaDescripciones.pop(SelectedItem.descripcion)
  };

  settingDescripcionesEditar = (selectedValuesEditar, SelectedItemEditar) => {
    let nuevaListaDescripcionesEditar = this.state.nuevaListaDescripcionesEditar;
    this.setState(
      { selectedValuesEditar: selectedValuesEditar, SelectedItemEditar: SelectedItemEditar },
      this.handleAddRowEditar(SelectedItemEditar),
      // nuevaListaDescripcionesEditar.push(SelectedItemEditar.descripcion)
    );
  }

  handleAddRowEditar = (SelectedItemEditar) => {
    let item = {
      pedidoId: this.state.pedido.id, productoId: SelectedItemEditar.id,
      cantidad: 1,
      importe: SelectedItemEditar.precioUnitario, observaciones: null, listo: false
    }
    fetch("http://localhost:8383/itemsPedido/nuevo", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState((prevState, state) => {
          let row = res
          return {
            item: res, itemsDePedidoElegido: [...this.state.itemsDePedidoElegido, row]
          }
        }
          // ,()=>console.log("itemhandleADD", this.state.item, this.state.itemsDePedidoElegido)
        ))
      .then(this.listadoItemsPedido())
  };

  onRemoveEditar = (selectedValuesEditar, SelectedItemEditar) => {

    let itemsDePedidoElegido = this.state.itemsDePedidoElegido
    // this.setState({ SelectedItemEditar: SelectedItemEditar, selectedValuesEditar: selectedValuesEditar });
    var item = itemsDePedidoElegido.find((item) => SelectedItemEditar.id === item.productoId)
    // this.setState({item:item},()=>this.forceUpdate())
    fetch("http://localhost:8383/itemsPedido/eliminar/" + item.codigo, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(
      this.actualizarListasEliminadas(selectedValuesEditar, SelectedItemEditar, itemsDePedidoElegido)
    )
      .then(() => this.selectedItemsEditar())
    // .then(this.setState({itemsDePedidoElegido:this.state.itemsDePedidoElegido,item:{}}))
    // this.setState({item:{}})
    // var listaActualizada = 
    // itemsDePedidoElegido = listaActualizada
    // console.log("listaActualizada", listaActualizada, "++", item)
    //   , () => console.log("itemsDEpEDIEl", this.state.itemsDePedidoElegido))
    // this.state.nuevaListaDescripcionesEditar.pop(SelectedItemEditar.descripcion)
  }
  actualizarListasEliminadas(selectedValuesEditar, SelectedItemEditar, itemsDePedidoElegido) {
    this.selectedItemsEditar()
    this.setState({ itemsDePedidoElegido: itemsDePedidoElegido })
    let listaActualizada = itemsDePedidoElegido.filter((i) => SelectedItemEditar.id !== i.productoId)
    let selectedValuesActualizados = selectedValuesEditar.filter((s) => s.id !== SelectedItemEditar.id)
    this.setState({ selectedValuesEditar: selectedValuesActualizados, SelectedItemEditar: {} })
    this.setState({ itemsDePedidoElegido: listaActualizada, item: {} })
    // this.state.nuevaListaDescripcionesEditar.pop(SelectedItemEditar)
    this.resetValuesEditar()
  }

  handleRemoveRowEditar = (unItem) => {
    this.selectedItemsEditar()
    var selectedValuesEditar = this.state.selectedValuesEditar
    let itemsDePedidoElegido = this.state.itemsDePedidoElegido
    this.setState({ selectedValuesEditar: selectedValuesEditar })
    var listaActualizadaSeleccionados = this.state.selectedValuesEditar.filter(
      (s) => unItem.productoId !== s.id);
    selectedValuesEditar = listaActualizadaSeleccionados
    this.setState({ itemsDePedidoElegido: itemsDePedidoElegido, item: this.state.item })
    var listaActualizada = this.state.itemsDePedidoElegido.filter(
      (item) => unItem !== item);
    itemsDePedidoElegido = listaActualizada
    this.setState({ itemsDePedidoElegido: itemsDePedidoElegido, item: {} })
    this.setState({ selectedValuesEditar: selectedValuesEditar, SelectedItemEditar: {} })
    // this.state.nuevaListaDescripcionesEditar.pop(1)
    this.resetValuesEditar();
  };


  resetValues() {
    this.multiselectRef.current.resetSelectedValues();
  }

  selectedItems() {
    this.multiselectRef.current.getSelectedItems();
  }

  resetValuesEditar() {
    this.multiselectRefEditar.current.resetSelectedValues();
  }

  selectedItemsEditar() {
    this.multiselectRefEditar.current.getSelectedItems();
  }



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
    // console.log("importetotal", this.state.importeTotal);

    return importeTotal;
  };

  sumarEditar = () => {
    //items con el mismo productoId
    let importes = this.state.itemsDePedidoElegido.map((i) => i.importe);
    let total = importes.reduce((a, b) => a + b, 0);
    let importeTotal = this.state.importeTotal
    importeTotal = total
    // console.log("importetotal", this.state.importeTotal);

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
    // console.log("nombreResponsable", idPedido)
    fetch(`http://localhost:8383/pedidos/nuevo/${nombre}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seccion, observaciones, fecha, hora }),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ idPedido: res.id, pedido: res }, console.log("listaitems", listaItems)))
      .then((res) => listaItems.map(i => this.settearPedidoYProductoAItem(this.state.idPedido,
        i.descripcion, i.cantidad, i.importe, i.observaciones, i.listoCocina, i.listoParrilla)))
      .catch(function (error) {
        console.log(error);
      });

  }
  settearPedidoYProductoAItem = (id, descripcion, cantidad, importe, observaciones
    , listoCocina, listoParrilla) => {
    console.log("setterar", listoCocina, listoParrilla)
    fetch(
      `http://localhost:8383/pedidos/items/pedido/${id}/producto/${descripcion}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cantidad, importe, observaciones, listoCocina, listoParrilla }),
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
  //falta fecha y hora
  editarPedido(id) {
    let nombre = this.state.responsable.nombre
    let seccion = this.state.seccionEditable || this.state.pedido.seccion;
    let observaciones = this.state.observacionesEditable || this.state.pedido.observaciones;
    let fecha = this.state.fecha;
    let hora = this.state.hora
    let horaFormato = moment(hora).format('HH-mm');
    console.log("nombreResponsable", id, nombre, seccion, observaciones)

    fetch(`http://localhost:8383/pedidos/editar/${id}/${nombre}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seccion, observaciones }),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ idPedido: res.id, pedido: res }), () => console.log("itemsPedido", this.state.itemsDePedidoElegido))
      .then((res) => this.state.itemsDePedidoElegido.map(i => this.editarPedidoYProductoAItem(this.state.idPedido,
        i.productoId, i.cantidad, i.importe, i.observaciones)))
      .catch(function (error) {
        console.log(error);
      });
  }

  editarPedidoYProductoAItem = (id, productoId, cantidad, importe, observaciones) => {
    let producto = this.state.productos.find(p => p.id === productoId)
    console.log("editarDescripcion", producto.descripcion, "+++", cantidad, importe, observaciones)
    fetch(
      `http://localhost:8383/pedidos/items/pedido/${id}/producto/${producto.descripcion}`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cantidad, importe, observaciones }),
      }
    ).then((res) =>

      this.setState({
        pedidos: this.state.pedidos.filter(p => p.id != id), pedido: {}
      }), () => this.forceUpdate())
      // .then((res) =>
      //   this.setState({
      //     pedidoId: id,
      //   }))
      .catch(function (error) {
        // console.log(error, "error......", id);
      });
  };

  eliminarItem = (codigo) => {
    fetch("http://localhost:8383/itemsPedido/eliminar/" + codigo, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => this.setState({ itemsDePedidoElegido: this.state.itemsDePedidoElegido }
        , () => this.nuevaLista()), console.log("ipeEliminar", this.state.itemsDePedidoElegido
        ))
    // .then(this.listadoItemsPedido())
  };

  signOut(e) {
    e.preventDefault();
    this.props.history.push("./Editar/EditarPedido");
    // console.log("propsSigout", this.props);
  }

  // pedidoElegido(pedido,items){
  //  this.setState({pedido:pedido,itemsDePedidoElegido:items}
  //   ,()=>console.log("pedidoElegido-PEDDIDOS",this.state.pedido,this.state.itemsDePedidoElegido))
  // }
  getReferenceChildTablaPedido() {
    this.ref.tablaPedido.eliminarDetallesPedido(this.state.id);

  }


  encontrarItemsIdPedido(idPedido) {
    try {
      return fetch(`http://localhost:8383/itemsDePedido/${idPedido}`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) =>
          this.setState({ itemsDePedidoElegido: res }
            , () => console.log("itemUpdae", res, this.state.itemsDePedidoElegido, this.state.pedido)
          ))
    } catch (error) {
      console.log(error);
    }
    // }
  }


  render() {
    let editable = this.state.editable;
    let nuevaListaDescripciones = this.state.nuevaListaDescripciones;
    let codigoPedido = this.state.codigoPedido;
    let listaItems = this.state.listaItems
    let pedido = this.state.pedido
    // console.log("listaProductosEnPedido$$", this.state.responsablesDeMesa);
    // var listaIdsPedidos = this.state.pedidos.map((pedido) => {
    //   return (
    //     <div>
    //       <option value={pedido.id} />
    //     </div>
    //   );
    // });
    // let itemsDePedido=this.state.items.filter(i=>i.pedidoId ===pedido.id)
    // console.log("listaIdsPedidos", this.nuevaLista());

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
                    ref="tablaPedido"
                    editable={this.state.editable}
                    envioDePedido={this.envioDePedido}
                    envioDeEstadoResponsable={this.envioDeEstadoResponsable}
                    envioDeEstadoResponsableEditar={this.envioDeEstadoResponsableEditar}
                    envioDeSeccionEditar={this.envioDeSeccionEditar}
                    envioDeObservacionesEditar={this.envioDeObservacionesEditar}
                    limpiarItemsDePedidoElegidoDeTabla={this.limpiarItemsDePedidoElegidoDeTabla}
                    pedidos={this.state.pedidos}
                    pedido={this.state.pedido}
                    unPedido={this.state.unPedido}
                    responsablesDeMesa={this.state.responsablesDeMesa}
                    responsable={this.state.responsable}
                    nombre={this.state.nombre}
                    secciones={this.state.secciones}
                    seccionEditable={this.state.seccionEditable}
                    observacionesEditable={this.state.observacionesEditable}
                    items={this.state.items}
                    item={this.state.item}
                    itemsPedido={this.state.itemsPedido}
                    itemsDePedidoElegido={this.state.itemsDePedidoElegido}
                    pedidoId={this.state.pedidoId}
                    listadoItemsPedido={this.listadoItemsPedido}
                    listadoPedidos={this.listadoPedidos}
                    listadoProductos={this.listadoProductos}
                    listadoResponsables={this.listadoResponsables}
                    obtenerId={this.obtenerId}
                    codigoPedido={codigoPedido}
                    confirmar={this.state.confirmar}
                    toggle={this.toggle}
                    idPedidoTabla={this.state.idPedidoTabla}
                    elegirId={this.elegirId}
                    limpiarPedidoEditar={this.state.limpiarPedidoEditar}
                    confirmarPedidoTablaEditar={this.confirmarPedidoTablaEditar}
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

                  <React.Fragment>{editable == true && this.state.pedido.id !== undefined && (
                    <CardBody>
                      <Row>
                        &nbsp;
                        <FormGroup>
                          <Multiselect
                            id="descripcionEditar"
                            options={this.nuevaLista()}
                            ref={this.multiselectRefEditar}
                            selectedValues={this.state.selectedValuesEditar}
                            SelectedItem={this.state.SelectedItemEditar}
                            onSelect={this.settingDescripcionesEditar}
                            onRemove={this.onRemoveEditar}
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
                    {editable == true && this.state.itemsDePedidoElegido.length > 0 && (
                      <Container style={{ backgroundColor: "#f1f1f1" }}>
                        <Row>
                          <Col className="col-lg-6">
                            <Table style={{ backgroundColor: "#eee363" }}>
                              <thead>
                                <tr>
                                  <th>Código</th>
                                  <th>Productos</th>
                                  <th>Cantidad</th>
                                  {/* <th>Precio</th> */}
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.itemsDePedidoElegido.map((unItem, index) => {
                                  let producto = this.state.productos.find(p => p.id === unItem.productoId)
                                  {/* let descripcion =this.state.SelectedItemEditar.descripcion */ }
                                  return (
                                    <PedidoItemsEditar
                                      key={index}
                                      item={unItem}
                                      pedido={pedido}
                                      productos={this.state.productos}
                                      producto={producto}
                                      // descripcion={this.state.SelectedItemEditar ? this.state.SelectedItemEditar.descripcion : producto.descripcion}
                                      calcularEditar={this.calcularEditar}
                                    />
                                  )
                                })
                                }
                              </tbody>
                            </Table>
                          </Col>
                          <Col className="col-lg-6">
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
                                {this.state.itemsDePedidoElegido.map((unItem, index) => {
                                  let producto = this.state.productos.find(p => p.id === unItem.productoId)
                                  return (
                                    <PedidoItemsDosEditar
                                      key={index}
                                      pedido={pedido}
                                      items={this.state.itemsDePedidoElegido}
                                      item={unItem}
                                      actualizarAlEliminar={this.actualizarAlEliminar}
                                      handleRemoveRowEditar={this.handleRemoveRowEditar}

                                    />
                                  )
                                })
                                }
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
                        {/* <Col xs="12" md="6" onSubmit={this.event}> */}
                        <Button
                          color="success"
                          size="lg"
                          block
                          onClick={() => this.confirmarPedidoEditado(this.state.pedido.id)
                          }
                        >
                          Guardar
                        </Button>
                        {/* </Col> */}
                      </Container>
                    )}
                  </React.Fragment>

                  <CardFooter>
                    <Row>
                      {editable === false &&
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
                      }
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


  actualizarEstadosAlGuardar() {
    this.guardarVistaPrevia()

  }
  guardarVistaPrevia() {
    this.setState({
      listaItems: [], unPedido: {}, nuevaListaDescripciones: [], selectedValues: [],
    });
  }

  vistaPrevia(boolean) {
    this.setState({
      vistaPrevia: boolean
    });
  }

  confirmarPedido(idPedido) {
    if (this.state.listaItems.length >= 1) {
      this.crearPedido();
      this.setState({
        listaItems: [], nuevaListaDescripciones: [], modal: true, confirmar: true,
        idPedido: this.state.idPedido, selectedValues: [], verPlantilla: true
      });
      this.getCollapse();
      // console.log("prueba",this.state.unItem.descripcion)
    } else {
      if (this.state.listaItems.length === 0) {
        var answer = window.confirm(
          "Por favor selecciona productos"
        );
        return answer
        // console.log("por favor selecciona productos")
      }
    }
  }
  limpiarIdTabla = () => {
    console.log("limpiarId")
  }
  //modificar elegirId o limpiar 
  elegirId(id) {
    this.setState({ limpiarPedidoEditar: false })
    console.log("id", id, this.state.pedidos)
    // this.setState({pedido:{},itemsDePedidoElegido:[],responsablesDeMesa:[],selectedValuesEditar:[]})
    var pedido = this.state.pedidos.find(
      (pedido) => pedido.id == id
    );
    console.log("pedido", pedido)
    let responsable = this.state.responsablesDeMesa.find(r => r.id_responsable === pedido.responsableId)
    let items = this.state.items.filter(i => i.pedidoId === pedido.id)
    this.setState({
      pedido: pedido, responsable: responsable, itemsDePedidoElegido: items
      , responsablesDeMesa: this.state.responsablesDeMesa, secciones: this.state.secciones,
      selectedValuesEditar: this.state.selectedValuesEditar,
    }
      , () => console.log("pedidoelegido", this.state.itemsDePedidoElegido)
    );
    // this.encontrarItemsIdPedido(pedido.id)
  }

  limpiarItemsDePedidoElegidoDeTabla() {
    this.setState({
      itemsDePedidoElegido: [], selectedValuesEditar: []
      , SelectedItemEditar: {}, pedido: {}
    })
  }
  confirmarPedidoTablaEditar(idVacio) {
    if (this.state.limpiarPedidoEditar === true) {
      this.setState({ pedido: idVacio })
    }
  }
  confirmarPedidoEditado(id) {
    // if (id !== undefined) {

    this.editarPedido(id);
    // this.setState({itemsDePedidoElegido:[]})
    // this.limpiarEditado(id)
    // this.listadoPedidos()
    // this.listadoItemsPedido()
    // this.setState({
    //   pedidos: [], pedido: {}, idPedidoTabla: "", itemsDePedidoElegido: [], pedido: { id: "", seccion: "", observaciones: "" }
    //   , selectedValuesEditar: [], responsable: { nombre: "" }, responsablesDeMesa: [],
    //   seccionEditable: "", observacionesEditable: ""
    // }, () =>console.log("limpiarPedido",this.state.limpiarPedidoEditar));
    // this.setState({limpiarPedidoEditar :true})
    this.getCollapse();

    // } else {
    //   if (id === undefined) {
    //     var answer = window.confirm(
    //       "Por favor selecciona un pedido"
    //     );
    //     return answer
    //   }
    // }
  }
  limpiarEditado(id) {
    var listaActualizada = this.state.pedidos.filter(
      (pedido) => id !== pedido.id
    );
    this.setState({
      pedidos: listaActualizada, pedido: { id: null, seccion: "", observaciones: "" }
      , responsable: { nombre: "" },
      seccionEditable: "", observacionesEditable: "", responsablesDeMesa: [], itemsDePedidoElegido: []
    })
  }

  envioDePedido(estadoSeccion) {
    this.setState({ unPedido: { seccion: estadoSeccion } },
      // () => console.log("envioSeccion", estadoSeccion, this.state.seccion)
    );
  }
  envioDeSeccionEditar(estadoSeccion) {
    this.setState({ seccionEditable: estadoSeccion }, () => console.log("envioSeccion", this.state.seccionEditable))
  }
  envioDeObservacionesEditar(estadoObservaciones) {
    this.setState({ observacionesEditable: estadoObservaciones }
      , () => console.log("envioObservaciones", this.state.observacionesEditable))
  }
  envioDeEstadoResponsableEditar(estadoResponsable) {
    this.setState({
      responsable: { nombre: estadoResponsable }
    }
      , () => console.log("estadoRespPedid", this.state.responsable.nombre)
    )
  }
  envioDeEstadoResponsable(estadoResponsable) {
    this.setState({ nombre: estadoResponsable }
      , () => console.log("estadoRespPedid", estadoResponsable, this.state.nombre)
    )
  }
  seleccionarItem(unItem) {
    this.setState({ item: unItem }
      // , () => console.log("seleccionar", this.state.item)
    )

  }

  envioDeEstadoObservaciones(nuevoItem) {
    this.setState(function (state, props) {
      return {

        listaItems: state.listaItems.forEach(function (i) {
          if (i.descripcion === nuevoItem.descripcion) {
            i.observaciones = nuevoItem.observaciones;
          }
        }),
        listaItems: state.listaItems,
        unItem: {
          observaciones: state.unItem.observaciones,
        },
      };
    })
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
        }),
        listaItems: state.listaItems,
        unItem: {
          importe: total,
          descripcion: state.unItem.descripcion,
        },
      };
    })
  }

  calcularEditar = (nuevoItem, producto) => {
    this.setState(function (state, props) {
      var total = 0;
      return {
        itemsDePedidoElegido: state.itemsDePedidoElegido.forEach(function (i) {
          if (producto.id == i.productoId) {
            i.cantidad = nuevoItem.cantidad;
            total = (i.cantidad * producto.precioUnitario);
            i.importe = total;
          }
        }),
        itemsDePedidoElegido: state.itemsDePedidoElegido,
        item: {
          importe: total,
        },
      };
    })
  }


  actualizarAlEliminar = (unItem) => {
    var listaActualizada = this.state.itemsDePedidoElegido.filter(
      (item) => unItem !== item
    );
    this.setState({ itemsDePedidoElegido: listaActualizada, item: {} });
  };

  renderItems(listaItems, SelectedItem) {
    const id = this.state.id;
    let productos = this.state.productos;
    if (listaItems) {
      return listaItems.map((unItem, unIndex) => {
        return (
          <PedidoItems
            nuevaListaDescripciones={this.state.nuevaListaDescripciones}
            envioDePedido={this.envioDePedido}
            envioDeEstadoCantidad={this.envioDeEstadoCantidad}
            envioDeEstadoImporte={this.envioDeEstadoImporte}
            settearPedidoYProductoAItem={this.settearPedidoYProductoAItem}
            key={unIndex}
            index={unIndex}
            unItem={unItem}
            listaItems={listaItems}
            pedido={this.state.pedido}
            productos={productos}
            productoId={unItem.productoId}
            descripcion={SelectedItem.descripcion}
            precio={SelectedItem.precioUnitario}
            importe={unItem.importe}
            seleccionarItem={this.seleccionarItem}
            codigo={unItem.codigo}
            selector={this.seleccionarItem}
            calcular={this.calcular}
            listadoPedidos={this.listadoPedidos}
            listadoProductos={this.listadoProductos}
            listadoItemsPedido={this.listadoItemsPedido}
            estadoInicial={this.estadoInicial}
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
    if (listaItems) {
      return listaItems.map((unItem, index) => {
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
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }
  // console.log("renderItemsRowEdit",pedido,lista)
  // if (this.state.hasError) {
  //   // You can render any custom fallback UI
  //   return <h1>Something went wrong.</h1>;
  // }

}

export default Pedidos;
