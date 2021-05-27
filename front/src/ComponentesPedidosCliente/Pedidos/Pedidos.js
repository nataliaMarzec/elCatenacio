import React from "react";
import Pedido from "./Pedido";
import CargarPedido from "./CargarPedido";

import {
  Table,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Button,
  CardFooter,
  CardSubtitle,
  CardText,
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
      cantidad: {},
      descripcion: {},
      descripciones: [],
      precioUnitario: [],
      selectedValues: null,
      items: [],
      item: {},
      productoId: "",
      selector: {},
      importe: props.importe,
      mostrarTabla: false,
      nuevosProductos: [],
      idPedido: 0,
      codigo: "",
      pedidoId: 1,
      seccion: props.seccion,
      importeTotal: {},
      id: {},
    };
    this.listadoItemsPedido = this.listadoItemsPedido.bind(this);
    this.obtenerIdPedido = this.obtenerIdPedido.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  estadoInicial = () => {
    this.setState({
      pedido: {
        id: this.state.id,
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
    this.setState(
      { pedido: props.pedido }
      // , () =>console.log("pedido", props.pedido)
    );
    this.setState({ id: props.id }, () => console.log("idProps", props.id));
    this.setState({ seccion: props.seccion });
    this.setState(
      { importe: props.importe }
      // console.log("recibetotal", props.importe)
    );
  }

  componentDidMount() {
    this.listadoItemsPedido();
  }
  componentWillMount() {
    this.listadoPedidos();
    this.listadoProductos();
    // this.setState({ idPedido: this.state.idPedido });
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

  //modificar las opciones o selectValues
  settingDescripciones = (selectedValues) => {
    // if (selectedValues != null) {
    var item = this.state.item;
    this.setState(
      {
        // item: {
        //   ...this.state.item,
        // productoId: this.state.productoId,
        selectedValues: selectedValues
          .map(function (d) {
            // if(!item.descripcion){
            console.log("item", item.descripcion);
            return d.descripcion;
            // }
          })
          .forEach((n) => {
            this.getProductoAItem(n);
            // selectedValues.pop(selectedValues[n])

            console.log(
              "SelectValues-----",
              selectedValues.length,
              this.state.descripciones
            );
          }),
        // },
      }
      // () =>
      // console.log("state", this.state.item.productoId, "+++", selectedValues)
    );
    // }
  };

  // onSelect = (selectedValues) => {
  //   var descripciones = selectedValues;
  //   // this.settingDescripciones(selectedValues);
  //   descripciones
  //     .map((d) => d.descripcion)
  //     .forEach((n) => {
  //       if (!n) {
  //         this.getProductoAItem(n);
  //       }
  //     });
  //   this.setState(
  //     { descripciones },
  //     console.log("descripciones", descripciones)

  //     //  () =>
  //     // console.log("onSelect", selectedValues)
  //   );
  // };

  onRemove = (selectedValues) => {
    this.setState({ selectedValues });
  };

  getProductoAItem = (descripcion) => {
    let nuevosProductos = this.state.nuevosProductos;
    let existe = nuevosProductos.find((d) => d == descripcion);
    if (!existe) {
      nuevosProductos.push(descripcion);
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
            },
            console.log("guardarDescripcion", this.state.nuevosProductos)
          )
        )
        .then((res) => this.estadoInicial());
    } else {
      console.log("ya existe descripcion", descripcion);
    }
  };

  //  uniqueCodigo(prefix) {
  //     var id = + new Date() + '-' + Math.floor(Math.random() * 1000);
  //     return prefix ? prefix + id : id;
  // };

  uniquePedidoId() {
    var idCounter = this.state.pedidoId;
    var id = ++idCounter;
    this.setState(
      { pedidoId: id },
      console.log("unique", id, this.state.pedidoId)
    );
    return id;
  }

  handleChange(event) {
    var nuevoItem = Object.assign({}, this.state.item);
    nuevoItem[event.target.name] =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ item: nuevoItem });
  }

  event = (event) => {
    event.preventDefault();
  };

  guardar(codigo, items, pedidoId) {
    var items = items;
    console.log("guardar", items, pedidoId);
    this.uniquePedidoId();
    // this.crearPedidoConPedidoId(codigo, pedidoId);
    // items
    //   .map((i) => i.codigo)
    // .forEach((c) => this.crearPedidoConPedidoId(c, pedidoId));

    // e.preventDefault(e);
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
  onClick = (id, descripcion, pedidos) => {
    // this.crearPedido();
    // this.settearPedidoYProductoAItem(id,descripcion)
    // this.obtenerUltimoId(pedidos);
    // this.sumar(items);
    // console.log("items", id, descripcion);
    //  e.preventDefault(e);
  };

 
  obtenerUltimoId = (pedidos) => {
    let pedido = pedidos[pedidos.length - 1].id;
    let total = pedido + 1;
    if (pedidos) {
      console.log("ultimo id------", total);
      this.setState(
        { idPedido: total },
        console.log("id", this.props.idPedido)
      );
      return total;
    } else {
      this.setState({ idPedido:pedido });
      return total;
    }
  };


  sumar = (items) => {
    let importes = items.map((i) => i.importe);
    let total = importes.reduce((a, b) => a + b, 0);
    this.setState(
      { importeTotal: total },
      console.log("importetotal", this.state.importe)
    );
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
    console.log("CREARItem", id, descripcion);
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
      .then((res) => res.json())
      .then((ped) =>
        this.setState({ id: ped.id,idPedido:ped.id,seccion:ped.seccion }, () => console.log("id", this.state.id))
      )
      .then((res) => this.listadoPedidos);
    console.log("CREARRRR", this.state.id);
  };
  obtenerIdPedido = () => {
    this.setState(
      { id: this.state.id },
      console.log("obteniendo id pedido ###", this.state.id)
    );
  };

  render(props) {
    let hoy = new Date();
    const id = this.state.id;
    var { selectedValues } = this.state;
    var listaProductosEnPedido = this.state.productos.map((p) => ({
      name: p.descripcion + "",
      id: p.id,
      precio: "$" + p.precioUnitario,
      descripcion: p.descripcion,
      precioUnitario: p.precioUnitario,
    }));
    console.log("listaProductosEnPedido$$", id);
    return (
      <div className="container">
        <CardHeader style={{ backgroundColor: "#eedc0a" }}>
          <Row>
            <Col class="col-lg-10">Pedido </Col>
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
              ></TablaPedido>
              <CardBody>
                <Row>
                  &nbsp;
                  <FormGroup>
                    <Multiselect
                      id="descripcion"
                      options={listaProductosEnPedido}
                      selectedValues={selectedValues}
                      onSelect={this.settingDescripciones}
                      groupBy="precio"
                      // showCheckbox={true}
                      // searchBox
                      closeIcon="circle2"
                      hidePlaceholder={true}
                      loading={false}
                      // showArrow={true}
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
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>{this.renderItems(listaProductosEnPedido)}</tbody>
                    </Table>

                    {/* )} */}
                  </Col>
                  <Col class="col-lg-4">
                    <Table style={{ backgroundColor: "#F5C765" }}>
                      <thead>
                        <tr>
                          <th>Importe</th>
                          <th>Observaciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.renderItemsDos(listaProductosEnPedido)}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <CardFooter>
                  <CardText align="left">
                    Importe total $:
                    {/* {this.sumar(items)}{" "} */}
                  </CardText>
                </CardFooter>
              </Container>
              <CardFooter>
                <Button
                  color="info"
                  size="btn-xs"
                  // onClick={this.obtenerIdPedido()}
                  // onClick={() => this.onClick(53, "asado", pedidos)}
                >
                  {" "}
                  <i className="fa fa-dot-circle-o">{""}Guardar</i>
                </Button>
              </CardFooter>
            </Card>
          </Container>
        </div>
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
        console.log("pedido++++++++++++++++++++++",unItem.pedidoId);
        const producto = listaProductosEnPedido.find(
          (p) => p.id == unItem.productoId
        );
        // console.log("codigo", unItem.codigo);
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

  renderItemsDos(listaProductosEnPedido) {
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
            importe={unItem.importe || producto.precioUnitario}
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
