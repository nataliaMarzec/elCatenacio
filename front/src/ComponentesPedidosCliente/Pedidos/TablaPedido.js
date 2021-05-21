import React, { useState } from "react";
import Pedido from "./Pedido";
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
  Container,
  Table,
} from "reactstrap";
import CardHeader from "reactstrap/lib/CardHeader";

class TablaPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: props.pedido,
      pedidos: props.pedidos,
      productos: props.productos || [],
      producto: props.producto || {},
      cliente: props.cliente || {},
      modal: false,
      codigo: "",
      descripcion: "",
      productoId: props.productoId,
      items: props.items || [],
      id: "",
      responsablesDeMesa: [],
      responsable: {},
      nombre: "",
      seleccionado:{}
    };
  }

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
    this.setState({ pedidos: props.pedidos });
    this.setState({ pedido: props.pedido });
    this.setState({ items: props.items });
    this.setState({ item: props.item });
    this.setState({ productos: props.productos });
    this.setState({ producto: props.producto });
  }
  componentDidMount() {
    this.props.listadoPedidos();
    console.log("will items---", this.props);
  }
  componentWillMount() {
    this.props.listadoItemsPedido();
    this.props.listadoProductos();
    this.listadoResponsablesDeMesa();
  }
  //   /clientes/busqueda/:nombre
  verDetallesResponsable(nombre) {
    var listaActualizada = this.state.responsablesDeMesa.filter(
      (item) => nombre == item.nombre
    );
    this.setState({ responsablesDeMesa: listaActualizada });
  }
  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    var busqueda;
    if (this.state.nombre === "") {
      this.listadoBusqueda(busqueda);
    }
    if (this.state.nombre !== "") {
      busqueda = '?busqueda=nombre=="' + this.state.nombre + '"';
      this.listadoBusqueda(busqueda);
    }
    e.preventDefault(e);
  };
  listadoBusqueda = (busqueda) => {
    if (busqueda != null) {
      fetch(`http://localhost:8383/responsables` + busqueda)
        .then((res) => res.json())
        .then((resp) => this.setState({ responsablesDeMesa: resp }));
    }
    if (busqueda == null) {
      fetch(`http://localhost:8383/clientes`)
        .then((res) => res.json())
        .then((resp) => this.setState({ responsablesDeMesa: resp }));
    }
  };

  listadoResponsablesDeMesa = () => {
    fetch(`http://localhost:8383/responsables`)
      .then((res) => res.json())
      .then(
        (resps) =>
          this.setState({ responsablesDeMesa: resps, responsable: {} }),
        console.log("ResponsablesEnviado", this.state.responsablesDeMesa)
      );
  };

  elegirOtroResponsable = () => {
    document.getElementById("nombre").value = "";
    this.listadoResponsablesDeMesa();
  };

  render() {
    let pedidos = this.state.pedidos;
    var listadoResponsables = this.state.responsablesDeMesa.map(
      (responsable) => {
        return (
          <div>
            <option value={responsable.nombre} />
          </div>
        );
      }
    );
    console.log("listadoResponsables",pedidos);
    // if (pedidos) {
      return (
        <div className="container-fluid">
          <Card>
            <CardHeader> Pedidos </CardHeader>
            <CardHeader>
              {/* <CardHeader>
              <i className="fa fa-align-justify"></i>Responsables de mesa
            </CardHeader> */}
              <CardHeader>
                <Form onSubmit={this.handleSubmit} id="formulario">
                  <FormGroup row>
                    <Col class="col-lg-4">
                      <Input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Elegir responsable de mesa"
                        onChange={this.handleChange}
                        list="responsable"
                      />
                    </Col>
                    <datalist id="responsable">{listadoResponsables}</datalist>
                  </FormGroup>
                  <div className="row">
                    <div className="input-field col s12 m12">
                      <Button
                        type="button"
                        style={{ margin: "2px" }}
                        color="success"
                        outline
                        onClick={this.elegirOtroResponsable}
                      >
                        <i className="fa fa-dot-circle-o"></i>Elegir otro
                        responsable
                      </Button>
                    </div>
                  </div>
                </Form>
              </CardHeader>
            </CardHeader>
            <CardBody>
              <Table
                responsive
                bordered
                size="sm"
                style={{ backgroundColor: "#eee363" }}
              >
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Mesero</th>
                    <th>Sección</th>
                    <th>importeTotal</th>
                  </tr>
                </thead>
                <tbody>{this.renderRows(pedidos)}</tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      );
    // } else {
    //   return (
    //     <div className="container">
    //         <div className="col-sm-8 mx-auto">
    //           <CardHeader className="text-center">No hay pedidos para mostrar</CardHeader>
    //         </div>
    //     </div>
    //   );
    // }
  }


  unPedido = () => {
    var unPedido = this.state.seleccionado;
    return (
      <Pedido
        pedido={unPedido}
        pedidoSeleccionado={this.clienteSeleccionado}
        seleccionado={this.state.seleccionado}
       
      />
    );
  };


  renderRows(pedidos) {
    let productos = this.state.productos;
    let responsablesDeMesa = this.state.responsablesDeMesa;

    return !pedidos
      ? console.log("NULL__pedidos", null, pedidos)
      : 
      pedidos.map((unPedido, index) => {
          return (
            <Pedido
              key={index}
              pedido={unPedido}
              pedidos={pedidos}
              productos={this.state.productos}
              producto={this.state.producto}
              items={this.state.items}
              item={this.state.item}
              responsablesDeMesa={this.state.responsablesDeMesa}
            //   selector={this.seleccionar}
            //   actualizarAlEliminar={this.actualizarAlEliminar}
            //   eliminarPedido={this.eliminarPedido.bind(this)}
              toggle={this.toggle}
              listadoPedidos={this.props.listadoPedidos}
              listadoProductos={this.props.listadoProductos}
            />
          );
        });
  }
}
export default TablaPedido;
