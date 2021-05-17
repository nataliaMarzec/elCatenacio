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
} from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";
import PedidoItems from "./PedidoItems";
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
      importeTotal: [],
      descripcion: {},
      descripciones: [],
      precioUnitario: [],
      selectedValues: null,
      items: [],
      item: {},
      productoId: "",
      selector: {},
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
            importeTotal: 0,
            montoCobrado: 0,
            pagado: "no",
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
  }

  componentDidMount() {
    this.listadoItemsPedido();
  }
  componentWillMount() {
    this.listadoPedidos();
  }
  listadoPedidos = () => {
    fetch(`http://localhost:8383/pedidosTodos`)
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

  seleccionarItem = (unItem) => {
    this.setState({ item: unItem });
    // console.log("seleccionar", this.state.item);
  };

  settingDescripciones = (selectedValues) => {
    // if (selectedValues != null) {
      this.setState(
        {
          // item: {
          //   ...this.state.item,
          // productoId: this.state.productoId,
          selectedValues: selectedValues
            .map(function (d) {
              // console.log("map",d.descripcion,selectedValues.length);
              return d.descripcion;
            })
            .forEach((n) => {
              this.getProductoAItem(n);
              selectedValues.pop(n)
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
    fetch("http://localhost:8383/itemsPedidos/" + descripcion, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(this.state.item),
    })
      .then((res) => this.listadoItemsPedido())
      .then((res) => this.setState({ productoId: this.state.producto.id }))
      .then((res) => this.estadoInicial());
  };

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

  render(props) {
    var { selectedValues } = this.state;
    var listaItems = this.state.items;
    var listaProductosEnPedido = this.state.productos.map((p) => ({
      name: p.descripcion + "",
      id: p.id,
      precio: "$" + p.precioUnitario,
      descripcion: p.descripcion,
    }));
    // console.log("listaProductosEnPedido",listaProductosEnPedido);
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
              onRemove={this.onRemove}
              placeholder="Seleccione un producto"
              displayValue="name"
              emptyRecordMsg="No hay más productos para seleccionar"
            />
          </FormGroup>
        </Row>
        <CardHeader style={{ backgroundColor: "#eedc0a" }}>
          Detalles de pedido
        </CardHeader>
        <CardHeader>
          <Container style={{ backgroundColor: "#f1f1f1" }}>
            <Row>
              <Col className="col-lg-4">
                {/* {Boolean(
                  listaItems.length !=0 && ( */}
                <Table style={{ backgroundColor: "#eee363" }}>
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Productos</th>
                      <th>Cantidad</th>
                      <th></th>
                      {/* <th>Importe</th>
                    <th>Observaciones</th> */}
                    </tr>
                  </thead>

                  <tbody>{this.renderItems(listaProductosEnPedido)}</tbody>
                </Table>

                {/* )} */}
              </Col>
              {/* <Col class="col-lg-4"><h6>hola</h6> */}
              {/*  <Table style={{ backgroundColor: "#eee363" }}>
                <thead>
                  <tr>
                    <th>Importe</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>{this.renderItems(listaProductosEnPedido)}</tbody>
              </Table>*/}
              {/* </Col>  */}
            </Row>
          </Container>
        </CardHeader>
        {/* <RenderTablaItem
          items={this.state.items}
          pedidoId={this.state.pedidoId}
          listadoItemsPedido={this.listadoItemsPedido}
          listaProductosEnPedido={listaProductosEnPedido}
        ></RenderTablaItem> */}

        <CargarPedido
          listadoPedidos={this.listadoPedidos}
          listadoProductos={this.listadoProductos}
          pedido={this.state.pedido}
          pedidos={this.state.pedidos}
          producto={this.state.producto}
          productos={this.state.productos}
        />
        <Row>&nbsp;</Row>
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardBody>
                  <Table responsive bordered size="sm">
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Mesero</th>
                        <th>Sección</th>
                        <th>Cantidad</th>
                        <th>Precio p/un.</th>
                        <th>Importe</th>
                        <th>descripcion</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  renderItems(listaProductosEnPedido) {
    let items = this.state.items;
    if (listaProductosEnPedido.length) {
      return !items
        ? console.log("NULL__NO HAY ITEMS", null, listaProductosEnPedido)
        : items.map((unItem, index) => {
            var producto = listaProductosEnPedido.find(
              (p) => p.id == unItem.productoId
            );
            return (
              <PedidoItems
                key={index}
                item={unItem}
                items={this.state.items}
                productos={this.state.productos}
                productoId={unItem.productoId}
                descripcion={producto.descripcion}
                importe={producto.precio}
                cantidad={unItem.cantidad}
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
  renderRows() {
    let pedidos = this.state.pedidos;
    let productos = this.state.productos;
    // let descripciones=this.state.descripciones;

    return !pedidos
      ? console.log("NULL__pedidos", null, pedidos)
      : pedidos.map((unPedido, index) => {
          return (
            <Pedido
              key={index}
              pedido={unPedido}
              unPedido={this.state.unPedido}
              pedidos={this.state.pedidos}
              productos={this.state.productos}
              producto={this.state.producto}
              items={this.state.items}
              item={this.state.item}
              selector={this.seleccionar}
              actualizarAlEliminar={this.actualizarAlEliminar}
              eliminarPedido={this.eliminarPedido.bind(this)}
              toggle={this.toggle}
              listadoPedidos={this.listadoPedidos}
              listadoProductos={this.listadoProductos}
            />
          );
        });
  }
}

export default Pedidos;
