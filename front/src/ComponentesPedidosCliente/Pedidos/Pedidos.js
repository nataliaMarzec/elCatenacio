import React from "react";
import Pedido from "./Pedido";
import CargarPedido from "./CargarPedido";
import PedidoItem from "./PedidoItems";
import RenderTablaItem from "./RenderTablaItem";

import {
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  Col,
  Card,
  CardHeader,
  CardBody,
  Label,
  Form,
  FormGroup,
  Input,
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
      cantidad: [],
      importeTotal: [],
      descripcion: {},
      descripciones: [],
      precioUnitario: [],
      items: [],
      item: {},
      selectedValues:null,
      items: [],
      item: {},
    };
    this.listadoItemsPedido=this.listadoItemsPedido.bind(this)
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

  handleChange(descripcion) {
    this.setState({ descripcion: descripcion });
  }

  handleMultiChange(descripciones) {
    this.setState({ descripciones: descripciones });
  }

  ModalHeaderStrong = () => {
    return (
      <ModalHeader editable={this.state.editable} toggle={this.toggle}>
        <strong>Nuevo</strong>Pedido
      </ModalHeader>
    );
  };
  onSeleccion(e) {
    let { name, value } = e.target;
    let productos = [...this.state.productos];
    let indice = productos.findIndex((el) => el.descripcion == name);
    productos[indice].check = !productos[indice].check;
    this.setState({
      productos: [...productos],
    });
  }

  onSelect = selectedValues => {
    this.setState({selectedValues })

    // ()=>console.log("onSeletc",this.state.descripciones));
    // let descs = [...this.state.descripciones];
    // descs.push({ descrip });
    
    // this.setState({
    //   descripciones: [...descs],
    // });
    //para cada desc crear un item
    // console.log("onSelect", this.state.descripciones, "+++",descripciones);
  };

  onRemove = (descripciones) => {
    this.setState({ descripciones: descripciones });
  };

  onSubmit(e) {
    var descripcion = this.state.descripcion;
    var descripciones = this.state.descripciones;
    for (var i = 0; i < descripciones.length; i++) {
      this.agregarProductoAItem(descripcion);
    }
    e.preventDefault();
  }
  finalizar(selectedValues){
    if(selectedValues !=null){
    let descrip=selectedValues.map((d)=>d.name)
    console.log("descripmap",descrip)
    }
    console.log("finalizar",selectedValues)
  }

  agregarProductoAItem = (descripcion) => {
    fetch("http://localhost:8383/itemsPedidos/" + descripcion, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.item),
    })
      .then((res) => this.props.listadoItemsPedido())
      .then((res) => this.estadoInicial());
    // console.log("CREARRRR", this.state.pedido);
  };

  event = (event) => {
    event.preventDefault();
  };

  render(props) {
    var {selectedValues}=this.state
    // console.log("items tabla", items);
    var listaProductosEnPedido = this.state.productos.map((p) => ({
      name: p.descripcion + "   " ,
      id: p.id,
      precio: "$" + p.precioUnitario,
    }));

    // console.log("listaProductosEnPedido", listaProductosEnPedido, "+++");
    // console.log("descripcionesrender", this.state.productos);
    return (
      <div className="container">
        <div></div>
        <Row>
          &nbsp;
          <FormGroup>
            <Label for="descripciones">
              Menus
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <Button color="info" onClick={this.finalizar(this.state.selectedValues)}>
                +
              </Button>
            </Label>

            <Multiselect
              id="descripcion"
              options={listaProductosEnPedido}
              selectedValues={selectedValues}
              onSelect={this.onSelect}
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
        {/* <div className="container">
          <tbody>
            {
              <this.RenderTablaItem
                items={items}
                listadoItemsPedido={this.listadoItemsPedido}
              ></this.RenderTablaItem>
            }
          </tbody>
        </div> */}
        <RenderTablaItem
          items={this.state.items}
          listadoItemsPedido={this.listadoItemsPedido}
        ></RenderTablaItem>

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
  actualizarItems = () => {
    this.setState({ items: this.state.items });
    // console.log("actualizar items", this.state.items);
  };

  RenderTablaItem() {
    var listaItems = this.state.items;
    // console.log("items tabla", listaItems);
    // if (listaItems.length) {
    return listaItems.map((item, index) => (
      <Container fluid style={{ backgroundColor: "#f1f1f1" }}>
        <h3>Cargar item</h3>
        <body></body>
        <Row>
          <Col class="col-lg-12">
            <div className="animated fadeIn">
              <Row>
                <Col xs="12" lg="12">
                  <Card>
                    <CardBody>
                      <Table responsive bordered size="sm">
                        <thead>
                          <tr>
                            <th>Código</th>
                            <th>Cantidad</th>
                            <th>Productos</th>
                            <th>Importe</th>
                            <th>Observaciones</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderItems(item, index)}</tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
            {/* <Card fluid>
                <CardHeader>Detalles pedido</CardHeader>
                <CardBody> */}
            {/* </CardBody> */}
            {/* <Form class="row">
                  <FormGroup >
                   <Col className="col-md-4">
                   <Label>hola</Label>
                    <Input></Input>
                   </Col>
                    
                  </FormGroup>
                </Form> */}
            {/* </Card> */}
          </Col>
          <Col class="col-lg-4">
            <h1>chau</h1>
          </Col>
          {/* <Col class="col-lg-4">
              <h1>hola</h1>
            </Col> */}
        </Row>
      </Container>
    ));
    // } else {
    //   return (
    //     <div className="container">
    //       <div className="jumbotron mt-5">
    //         <div className="col-sm-8 mx-auto">
    //           <h1 className="text-center">No hay items para mostrar</h1>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
  }

  renderItems(item, index) {
    var itemsLista = this.state.items;
    var listaActualizada = itemsLista.filter((item) => item == item);
    console.log("renderRows", listaActualizada);
    return <PedidoItems key={index} item={item} items={listaActualizada} />;
  }
  // renderItems() {
  //   let pedidos = this.state.pedidos;
  //   let productos = this.state.productos;
  //   let items = this.state.items;
  //   let names = this.state.descripciones.map((d) => d.name);

  //   return !items
  //     ? console.log("NULL__pedidos", null, items)
  //     : items.map((unItem, index) => {
  //         return (
  //           <PedidoItem
  //             key={index}
  //             item={unItem}
  //             items={this.state.items}
  //             names={names}
  //             productos={this.state.productos}
  //             producto={this.state.producto}
  //             listadoPedidos={this.listadoPedidos}
  //             listadoProductos={this.listadoProductos}
  //             listadoItemsPedido={this.listadoItemsPedido}
  //             selector={this.seleccionar}
  //             actualizarAlEliminar={this.actualizarAlEliminar}
  //             eliminarPedido={this.eliminarPedido.bind(this)}
  //             toggle={this.toggle}
  //           />
  //         );
  //       });
  // }
  renderRows() {
    let pedidos = this.state.pedidos;
    let productos = this.state.productos;
    // let descripciones=this.state.descripciones;
    let names = this.state.descripciones.map((d) => d.name);

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
              names={names}
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
