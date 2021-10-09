import React from "react";
import Cliente from "../../ComponentesClientes/Clientes/Cliente";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  ModalBody,
  ModalFooter,
} from "reactstrap";

class CargarVenta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venta: props.venta || {},
      ventas: props.ventas || [],
      modal: false,
      clientes: props.clientes,
      cliente: props.cliente,
      seleccionado: {},
      listadoClientes: props.listadoClientes,
      cuit: "",
      seleccionadoCliente: {},
      pagosDelCliente: props.pagosDelCliente,
      ventasACliente: props.ventasACliente,
      cuitelegido: props.cuitelegido,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.estadoInicialCliente = this.estadoInicialCliente.bind(this);
    this.calcularDeuda=this.calcularDeuda.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  estadoInicial = () => {
    this.setState({
      venta: {
        nroVenta: "",
        fecha: "",
        tipoDePago: "",
        facturado: "no",
        importeTotal: "",
        saldoCobrado: "",
      },
      montoSinCobrar: 0,
    });
  };
  estadoInicialCliente = () => {
    this.setState({
      cliente: {
        cuit: "",
        nombre: "",
        apellido: "",
        razonSocial: "",
        telefono: "",
        email: "",
      },
    });
  };

  handleSubmit(e) {
    const id = this.state.venta.id;
    if (id) {
      this.editarVenta(id);
    } else {
      this.crearVenta();
      this.calcularDeuda()
      console.log("submit-venta", { ...this.state.venta });
    }
    e.preventDefault(e);
  }

  handleChange(e) {
    var nuevaVenta = Object.assign({}, this.state.venta);
    nuevaVenta[e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ venta: nuevaVenta });
  }
 


  crearVenta = () => {
    fetch("http://localhost:8282/ventas/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.venta),
    })
      .then((res) => this.props.listadoVentas())
      .then((res) => this.estadoInicial(), this.estadoInicialCliente());
  };

  editarVenta = (id) => {
    fetch("http://localhost:8282/ventas/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.venta),
    })
      .then(this.props.listadoVentas())
      .then(this.estadoInicial(), this.estadoInicialCliente());
  };

  componentDidMount() {
    this.props.listadoClientes();
    console.log("didMount-cargarCliente", this.props.listadoClientes());
  }

  clienteSeleccionado = (unCliente) => {};

  deudaTotal() {
    var total = 0;
    var saldoCobrado = 0;
    this.state.ventasACliente.forEach((ventas) => {
      total += parseFloat(ventas.importeTotal);
      saldoCobrado += parseFloat(ventas.saldoCobrado);
    });

    return (total - saldoCobrado).toFixed(2);
  }


  calcularDeuda=()=>{
    var total = 0;
    var importeTotal=this.state.venta.importeTotal;
    var saldoCobrado=this.state.venta.saldoCobrado;
    total = importeTotal-saldoCobrado;
    return total
  }
  render(props) {
    var listaCuitCliente = this.state.clientes.map((cliente, index) => {
      return (
        <div key={index}>
          <option key={index} value={cliente.cuit} />
        </div>
      );
    });
    return (
      <Col xs="12" md="12">
        <ModalBody>
          <Form className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label for="cuit" 
                  type="number"
                  id="cuit"
                  name="cuit" value={this.props.cuit}
                  onChange={this.props.handleChangeCliente}
                  >cliente:{this.props.cuit}</Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="nroVenta">nroVenta</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="number"
                  id="nroVenta"
                  name="nroVenta"
                  placeholder="Completa Venta..."
                  required={true}
                  value={this.state.venta.nroVenta}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="fecha">Fecha</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="date"
                  id="fecha"
                  name="fecha"
                  placeholder="Elegir fecha..."
                  required
                  value={this.state.venta.fecha}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="tipoDePago">tipoDePago</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="tipoDePago"
                  name="tipoDePago"
                  placeholder="Completa tipo de Pago..."
                  value={this.state.venta.tipoDePago}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Label for="facturado">facturado</Label>
              <input
                type="checkbox"
                name="facturado"
                checked={this.state.venta.facturado}
                onChange={this.handleChange}
              ></input>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="importeTotal">ImporteTotal</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="number"
                  id="importeTotal"
                  name="importeTotal"
                  placeholder="Completa importe total..."
                  value={this.state.venta.importeTotal}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label for="saldoCobrado">Nro&nbsp;saldoCobrado</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="number"
                  id="saldoCobrado"
                  name="saldoCobrado"
                  placeholder="Completa saldoCobrado..."
                  required={false}
                  value={this.state.venta.saldoCobrado}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <tbody>
            <tr className="#1b5e20 green darken-4">
                  <th>Deuda</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th>{this.calcularDeuda() || 0}</th>
                  <th> </th>
                </tr>
            </tbody>
         
            <Button
              type="submit"
              color="success"
              outline
              onClick={this.handleSubmit}
            >
              <i className="fa fa-dot-circle-o"></i> Guardar venta
            </Button>
          </Form>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Col>
    );
  }

  clienteSeleccionado = (unCliente) => {};

  unCliente = () => {
    var unCliente = this.state.seleccionado;
    return (
      <Cliente
        cliente={unCliente}
        clienteSeleccionado={this.clienteSeleccionado(unCliente)}
        seleccionado={this.state.seleccionado}
        clientes={this.state.clientes}
      />
    );
  };
}

export default CargarVenta;
