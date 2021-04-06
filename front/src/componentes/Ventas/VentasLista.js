import React from "react";
import Venta from "./Venta";
import CargarVenta from "./CargarVenta";
import Cliente from "../Clientes/Cliente"



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
  Form,
  FormGroup,
  Input,
  Label,

} from "reactstrap";

class VentasLista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionado: {},
      venta: {},
      ventas: [],
      clientes: props.clientes,
      articulos: props.articulos,
      pagosCliente: [],
      modal: false,
      cuit: "",
      ventasACliente: [],
      pagosDeCliente: [],
      clientes:props.clientes,
      cliente:props.cliente,
      fecha:""
      
     
    };
    this.seleccionar = this.seleccionar.bind(this);
    this.actualizarAlEliminar = this.actualizarAlEliminar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.listadoVentas = this.listadoVentas.bind(this);
    this.estadoInicial = this.estadoInicial.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ cliente: props.cliente });
    this.setState({ clientes: props.clientes });
    console.log("reciveV",props.clientes)
    this.setState({ pagosDeCliente: props.pagoDelCliente });
  }

  componentDidMount() {
    this.listadoVentas();
    console.log("didMoutnv",this.listadoVentas())
    
  }
  componentWillMount(){
    this.listadoClientes();
    console.log("willMount",this.listadoClientes())
  }

  listadoClientes = () => {
    fetch(`http://localhost:8282/clientes`)
      .then((res) => res.json())
      .then(
        (cltes) => this.setState({ clientes: cltes, cliente: {} }),
        console.log("Enviado clientes", this.state.clientes)
      );
  };
  
  listadoVentas = () => {
    fetch(`http://localhost:8282/ventas`)
      .then((res) => res.json())
      .then(
        (vtas) => this.setState({ ventas: vtas, venta: {} }),
        console.log("Enviado ventas", this.state.ventas)
      );
  };

  estadoInicial = () => {
    this.setState({
      venta: {
        nroVenta: "",
        fecha: "",
        tipoDePago: "",
        facturado: "no",
        importeTotal: "",
        saldoCobrado: "",
        montoSinCobrar: "",
      },
    });
  };

  listadoVentasPorFecha=(fecha)=>{
      var listaActualizada = this.state.ventas.filter(
        (item) => fecha == item.fecha
      );
      console.log("listaActualizada", listaActualizada);
      this.setState({
        ventas: listaActualizada,
        fecha: fecha,
      });
      return listaActualizada;
    }
  
  encontrarVentasPorFecha = (fecha) => {
    fetch("http://localhost:8282/busqueda/fecha:" + fecha)
      .then((res) => res.json())
      .then((unaVenta) => this.setState({venta: unaVenta, fecha: fecha }))
      .then(console.log("fecha", fecha));
  };

  listadoBusqueda = (fecha) => {
    if (fecha != null) {
      fetch(`http://localhost:8282/ventas` + fecha)
        .then((res) => res.json())
        .then((clts) => this.setState({ clientes: clts }));
    }
  };
  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleSubmitVentasPorFecha = (event) => (fecha) => {
    var busqueda;
    if (this.state != "") {
      busqueda = '?busqueda=fecha=="' + fecha + '"';
      this.encontrarVentasPorFecha(busqueda)
    }
    if (this.state === "") {
      this.estadoInicial();
    }
    event.preventDefault(event);
  };
 
  actualizarAlEliminar = (unaVenta) => {
    var listaActualizada = this.state.ventas.filter(
      (item) => unaVenta !== item
    );
    this.setState({ ventas: listaActualizada, venta: {} });
  };

  eliminarVenta(id) {
    this.props.eliminarVenta(id);
  }

  seleccionar = (unaVenta) => {
    this.setState({ venta: unaVenta });
  };


  editarVentaFecht(id) {
    this.props.editarVenta(id);
    this.toogle();
  }
  editarVenta = (unaVenta) => {
    this.setState({ venta: unaVenta });
  };

  

  render(props) {
    var listaVentasFecha = this.state.ventas.map((venta, index) => {
      return (
        <div key={index}>
          <option value={venta.fecha} cuitelegido={venta.fecha} />
        </div>
      );
    });
    var fechaVenta = this.state.fecha;
    return (
      <div className="container">
        <div></div>
        <Row>&nbsp;</Row>
        <div>

        <CardHeader>
                  <i className="fa fa-align-justify"></i>Ver ventas por fecha
                </CardHeader>
                <CardHeader>
                  <Form
                    onSubmit={this.handleSubmitVentasPorFecha(this.state.fechaelegida)}
                    id="formulario"
                  >
                    <FormGroup row>
                      <Col xs="12" md="9">
                        <Input
                          type="date"
                          id="fecha"
                          name="fecha"
                          placeholder="Elegir fecha"
                          onChange={this.handleChange}
                          list="cliente"
                        />
                      </Col>
                      <datalist id="cliente">{listaVentasFecha} </datalist>
                    </FormGroup>
                    <div className="row">
                      <div className="input-field col s12 m12">
                        <Button
                          type="button"
                          style={{ margin: "2px" }}
                          color="info"
                          outline
                          onChange={() => this.handleChange}
                          onClick={() =>
                            this.listadoVentasPorFecha(this.state.fechaelegida)
                          }
                          limpiartabla={false}
                        >
                          <i className="fa fa-dot-circle-o"></i>Ver detalles de
                          cliente
                        </Button>
                        {/* <Button
                          limpiarTabla={true}
                          type="button"
                          style={{ margin: "2px" }}
                          color="success"
                          outline
                          onClick={this.limpiarTabla}
                        >
                          <i className="fa fa-dot-circle-o"></i>Limpiar
                        </Button> */}
                      </div>
                    </div>
                  </Form>
                </CardHeader>
        </div>

        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Ventas Lista
                </CardHeader>
                <CardBody>
                  <Table responsive bordered size="sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>cliente</th>
                        <th>nroVenta</th>
                        <th>fecha</th>
                        <th>cliente</th>
                        <th>tipoDePago</th>
                        <th>facturado</th>
                        <th>importeTotal</th>
                        <th>saldoCobrado</th>
                        <th>montoSinCobrar</th>
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

  renderRows() {
    
    let ventas = this.state.ventas;
    return !ventas
      ? console.log("NULL", null)
      : ventas.map((unaVenta, index) => {
          return (
            <Venta
              key={index}
              index={index}
              venta={unaVenta}
              ventas={this.state.ventas}
              selector={this.seleccionar}
              actualizarAlEliminar={this.actualizarAlEliminar}
              eliminarVenta={this.eliminarVenta.bind(this)}
              editarVenta={this.editarVenta}
              activarEditar={true}
              toggle={this.toggle}
              isMutableItem={(unaVenta) => unaVenta.id}
              editarVentaFecht={this.editarVentaFecht.bind(this)}
              clientes={this.state.clientes}
              cliente={this.state.cliente}
            />
          );
        });
  }


}

export default VentasLista;
