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
      pedido: {},
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
      idPedido: 1,
      codigo: "",
      pedidoId: 1,
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
        clienteId_pedido: null,
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
      { importe: props.importe },
      console.log("recibetotal", props.importe)
    );
  }

  componentDidMount() {
    this.listadoItemsPedido();
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

  //  uniquePedidoId(prefix) {
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

  guardar(items, pedidoId) {
    var items = items;
    console.log("guardar", items, pedidoId);
    this.uniquePedidoId();
    items
      .map((i) => i.codigo)
      .forEach((c) => this.crearPedidoConPedidoId(c, pedidoId));

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

  render(props) {
    var { selectedValues } = this.state;
    var items = this.state.items;
    var codigo = this.state.items.map((i) => i.codigo);
    var listaProductosEnPedido = this.state.productos.map((p) => ({
      name: p.descripcion + "",
      id: p.id,
      precio: "$" + p.precioUnitario,
      descripcion: p.descripcion,
      precioUnitario: p.precioUnitario,
    }));
    // console.log("listaProductosEnPedido$$", listaProductosEnPedido);
    return (
      <div className="container">
        <div></div>
        <Row>
          &nbsp;
          <FormGroup>
            <Label for="descripciones">
              Menus
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              {/* <Button color="info" onClick={this.onSelect}>
                +
              </Button> */}
            </Label>

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
        <CardHeader style={{ backgroundColor: "#eedc0a" }}>
          <Row>
            <Col class="col-lg-10">Detalles de pedido </Col>
            <CardText align="left">Pedido n°:{this.state.pedidoId} </CardText>
          </Row>
        </CardHeader>
        <CardHeader>
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
                  <tbody>{this.renderItemsDos(listaProductosEnPedido)}</tbody>
                </Table>
              </Col>
            </Row>
          </Container>
          <CardFooter>
            <Button
              color="info"
              size="btn-xs"
              onClick={() => this.guardar(items, this.state.pedidoId)}
            >
              {" "}
              <i className="fa fa-dot-circle-o">{""}Guardar</i>
            </Button>
          </CardFooter>
        </CardHeader>

        <div></div>
        <Row>&nbsp;</Row>
        <div className="animated fadeIn">
          <Container style={{ backgroundColor: "#f1f1f1" }}>
            <TablaPedido
              pedidos={this.state.pedidos}
              pedido={this.state.pedido}
              items={this.state.items}
              pedidoId={this.state.pedidoId}
              listadoItemsPedido={this.listadoItemsPedido}
              listaProductosEnPedido={listaProductosEnPedido}
              listadoPedidos={this.listadoPedidos}
              listadoProductos={this.listadoProductos}
            ></TablaPedido>
          </Container>
        </div>
        <Row>&nbsp;</Row>
      </div>
    );
  }

  renderItems(listaProductosEnPedido) {
    let items = this.state.items;
    let productos = this.state.productos;
    if (listaProductosEnPedido.length) {
      return items.map((unItem, index) => {
        const producto = listaProductosEnPedido.find(
          (p) => p.id == unItem.productoId
        );
        // console.log("codigo", unItem.codigo);
        return (
          <PedidoItems
            key={index}
            item={unItem}
            items={items}
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
