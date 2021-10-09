import React, { useState, useMemo, useCallback } from "react";
import Cliente from "../../ComponentesClientes/Clientes/Cliente";
import {
  Table,
  Row,
  Button,
  Col,
  Card,
  CardHeader,
  CardBody,
  Collapse,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

import VentasAUnClienteRows from "./VentasAUnClienteRows";
import CargarVenta from "./CargarVenta";
class VentasAUnCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionado: {},
      cliente: {},
      clientes: [],
      modal: false,
      editable: false,
      cuit: "",
      cuitelegido: "",
      pagosDelCliente: [],
      ventasACliente: [],
      tablaId: "tabla",
      limpiartabla: false,
      mostrarBotonDePago: false,
      open: false,
      ventasACliente:props.ventasACliente,
      pagosDelCliente:props.pagosDelCliente,
    };
    this.seleccionar = this.seleccionar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.listadoClientes = this.listadoClientes.bind(this);
    this.estadoInicial = this.estadoInicial.bind(this);
    this.clienteSeleccionado = this.clienteSeleccionado.bind(this);
    this.calcularDeudaTotal = this.calcularDeudaTotal.bind(this);
    this.handleChangeCliente = this.handleChangeCliente.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  estadoInicial = () => {
    this.setState({
      cliente: {
        cuit: "",
        nombre: "",
        apellido: "",
        razonSocial: "",
        telefono: "",
        email: "",
      },
      pagosCliente: [],
    });
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

  componentWillReceiveProps(props) {
    this.setState({ cliente: props.cliente });
    this.setState({ ventasACliente: props.ventasACliente });
    this.setState({ clientes: props.clientes });
    this.setState({ pagosDelCliente: props.pagosDelCliente });
  }

  componentWillMount() {
    this.listadoClientes();
    console.log("willMount", this.listadoClientes());
  }

  verDetallesCliente(cuit) {
    var limpiarTabla = this.state.limpiartabla;
    var listaActualizada = this.state.clientes.find(
      (item) => cuit == item.cuit
    );
    console.log("listaActualizada", listaActualizada);
    this.setState({
      cliente: listaActualizada,
      cuit: cuit,
      limpiarTabla: false,
    });
    this.handleAddRow();
    return listaActualizada;
  }


  handleChangeCliente = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    this.setState({ cuitelegido: value });
    console.log("change", this.state.cuitelegido, "value", value, "name", name);
  };

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  listadoVentas = () => {
    fetch(`http://localhost:8282/ventas`)
      .then((res) => res.json())
      .then(
        (vtas) => this.setState({ ventas: vtas, venta: {} }),
        console.log("Enviado ventas", this.state.ventas)
      );
  };

  listadoClientes = () => {
    fetch(`http://localhost:8282/clientes`)
      .then((res) => res.json())
      .then(
        (cltes) => this.setState({ clientes: cltes, cliente: {}, cuit: "" }),
        console.log("ClientaEnviado", this.state.clientes)
      );
  };

  listadoBusqueda = (busqueda) => {
    if (busqueda != null) {
      fetch(`http://localhost:8282/clientes` + busqueda)
        .then((res) => res.json())
        .then((clts) => this.setState({ clientes: clts }));
    }
  };

  encontrarCliente = (cuit) => {
    fetch("http://localhost:8282/clientes/busqueda/:" + cuit)
      .then((res) => res.json())
      .then((unCliente) => this.setState({ cliente: unCliente, cuit: cuit }))
      .then(console.log("cuit", cuit));
  };

  agregarVentaACliente() {
    fetch(`http://localhost:8282/ventas/` + this.state.venta.clienteId_venta, {
      method: "PUT",
      body: JSON.stringify(this.state.venta),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(this.listadoVentas())
      .then(this.estadoInicial());

    this.estadoInicial();
  }

  handleChange(event) {
    var nuevaVenta = Object.assign({}, this.state.venta);
    nuevaVenta[event.target.name] = event.target.value;
    this.setState({ venta: nuevaVenta });
  }

  handleSubmit(event) {
    if (this.state.cliente.cuit === undefined) {
      this.estadoInicial();
    } else {
      this.agregarVentaACliente();
    }
    event.preventDefault(event);
  }

  limpiarTabla = () => {
    document.getElementById("cuit").value = "";
    this.handleRemoveRow();
    this.estadoInicial();
    this.setState({ limpiartabla: true });
  };

  handleSubmitCliente = (event) => (cuitCliente) => {
    var busqueda;
    if (this.state != "") {
      busqueda = '?busqueda=cuit=="' + cuitCliente + '"';
      this.encontrarCliente(busqueda);
      this.verDetallesCliente(busqueda);
    }
    if (this.state === "") {
      this.estadoInicial();
      this.limpiarTabla();
    }
    event.preventDefault(event);
  };

  seleccionar = (unCliente) => {
    this.setState({ cliente: unCliente, cuit: unCliente.cuit });
  };

  editarClienteFetch(id) {
    this.props.editarCliente(id);
    this.toogle();
  }
  editarCliente = (unCliente) => {
    this.setState({ cliente: unCliente });
  };
  clienteSeleccionado = (unCliente) => {};

  agregarVenta = () => {
    this.clienteSeleccionado(this.props.cliente);
  };

  handleAddRow = () => {
    this.setState((prevState, props) => {
      const row = { content: "esto es un nuevo row!" };
      return { clientes: [...prevState.clientes, row] };
    });
  };

  handleRemoveRow = () => {
    this.setState((prevState, props) => {
      return { clientes: prevState.clientes.slice(1) };
    });
  };

  handleChangePagos = (event) => {
    var nuevosPagos = Object.assign({}, this.state.pagosDeCliente);
    nuevosPagos[event.target.name] = event.target.value;
    console.log("pagosDeCliente", nuevosPagos);
    this.setState({ pagosDeCliente: nuevosPagos });
  };

  deudaTotal() {
    var total = 0;
    var saldoCobrado = 0;
    this.state.ventasACliente.forEach((ventas) => {
      total += parseFloat(ventas.importeTotal);
      saldoCobrado += parseFloat(ventas.saldoCobrado);
    });

    return (total - saldoCobrado).toFixed(2);
  }

  pagoDelCliente = () => {
    var total = 0;
    this.state.pagosDeCliente.forEach((pago) => {
      total += parseFloat(pago.importePago);
      console.log("pagos total", total);
    });

    return total.toFixed(2);
  };

  calcularDeudaTotal = () => {
    var total = this.deudaTotal() - this.pagoDelCliente();
    return total.toFixed(2);
  };

  render(props) {
    var listaCuitCliente = this.state.clientes.map((cliente, index) => {
      return (
        <div key={index}>
          <option value={cliente.cuit} cuitelegido={cliente.cuit} />
        </div>
      );
    });
    var cuitCliente = this.state.cuit;
    return (
      <div className="container">
        <div></div>
        <Row>&nbsp;</Row>
       
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>Iniciar venta
                </CardHeader>
                <CardHeader>
                  <Form
                    onSubmit={this.handleSubmitCliente(this.state.cuitelegido)}
                    id="formulario"
                  >
                    <FormGroup row>
                      <Col xs="12" md="9">
                        <Input
                          type="number"
                          id="cuit"
                          name="cuit"
                          placeholder="Elegir cuit"
                          onChange={this.handleChangeCliente}
                          list="cliente"
                          limpiartabla={true}
                        />
                      </Col>
                      <datalist id="cliente">{listaCuitCliente} </datalist>
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
                            this.verDetallesCliente(this.state.cuitelegido)
                          }
                          limpiartabla={false}
                        >
                          <i className="fa fa-dot-circle-o"></i>Ver detalles de
                          cliente
                        </Button>
                        <Button
                          limpiarTabla={true}
                          type="button"
                          style={{ margin: "2px" }}
                          color="success"
                          outline
                          onClick={this.limpiarTabla}
                        >
                          <i className="fa fa-dot-circle-o"></i>Limpiar
                        </Button>
                      </div>
                    </div>
                  </Form>
                </CardHeader>
                <div>
                  <this.unaTabla />

                </div>
                <CargarVenta
                  cuit={cuitCliente}
                  handleChangeCliente={this.handleChangeCliente}
                  listadoClientes={this.listadoClientes}
                  listadoVentas={this.listadoVentas}
                  venta={this.state.venta}
                  ventas={this.state.ventas}
                  cliente={this.state.cliente}
                  clientes={this.state.clientes}
                  estadoInicial={this.estadoInicial}
                  pagosDelCliente={this.state.pagoDelCliente}
                  ventasACliente={this.state.VentasACliente}
                ></CargarVenta>
                
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  unaTabla = () => {
    return (
      <CardBody>
        <Table responsive bordered size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>cuit</th>
              <th>nombre</th>
              <th>apellido</th>
              <th>razonSocial</th>
              <th>telefono</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>{this.unCliente()}</tbody>
        </Table>
      </CardBody>
    );
  };

  VentaCollapse = () => {
    var cuit = this.state.cuitelegido;
    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapse = () => setIsOpen(!isOpen);
    return (
      <div className="container">
        <Button
          onClick={toggleCollapse}
          type="button"
          style={{ margin: "2px" }}
          color="success"
          outline
        >
          <i className="fa fa-dot-circle-o"></i>Iniciar venta
        </Button>
        <Collapse isOpen={isOpen}>
          <div>
            <CargarVenta
              cuit={cuit}
              handleChangeCliente={this.handleChangeCliente}
              listadoClientes={this.listadoClientes}
              listadoVentas={this.listadoVentas}
              venta={this.state.venta}
              ventas={this.state.ventas}
              cliente={this.state.cliente}
              clientes={this.state.clientes}
              estadoInicial={this.estadoInicial}
            ></CargarVenta>
          </div>
        </Collapse>
      </div>
    );
  };

  clienteSeleccionado = (unCliente) => {};

  unCliente = () => {
    var cuit = this.state.cuitelegido;
    var unCliente = this.state.cliente;
    if (unCliente) {
      return (
        <VentasAUnClienteRows
          cuit={cuit}
          cliente={unCliente}
          clienteSeleccionado={this.clienteSeleccionado(unCliente)}
          seleccionado={this.state.seleccionado}
          clientes={this.state.clientes}
          idCliente={(unCliente) => unCliente.id}
        />
      );
    }
    if (!unCliente) {
      return console.log("NULL", null, unCliente);
    }
  };
  renderRows() {
    let clientes = this.state.clientes;
    return !clientes
      ? console.log("NULL", null)
      : clientes.map((unCliente, index) => {
          return (
            <Cliente
              key={index}
              index={index}
              cliente={unCliente}
              clientes={this.state.clientes}
              selector={this.seleccionar}
              clienteSeleccionado={this.clienteSeleccionado}
              actualizarAlEliminar={this.actualizarAlEliminar}
              eliminarCliente={this.eliminarCliente.bind(this)}
              editarCliente={this.editarCliente}
              activarEditar={true}
              toggle={this.toggle}
              isMutableItem={(unCliente) => unCliente.id}
              editarClienteFetch={this.editarClienteFetch.bind(this)}
            />
          );
        });
  }
}

export default VentasAUnCliente;
