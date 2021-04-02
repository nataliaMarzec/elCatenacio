import React from "react";
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

class CargarCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: props.cliente || {},
      clientes: props.clientes || [],
      modal: false,
      // clienteVentas: props.clientes,
      unCuit:{},
      inputs: { ...props.cliente },
      working: null,
      clientesCantidad: 0,
      cuitCreado: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.encontrarCliente = this.encontrarCliente.bind(this);
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
    });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    this.props.listadoClientes();
    console.log("didMount-cargarCliente");
  }


  handleSubmit(event) {
    const id = this.state.cliente.id;
    if (id) {
      this.editarcliente(id);
    } else {
      this.crearCliente();
      //  this.encontrarCliente(this.state.cliente);
       console.log("submit-cliente",{...this.state.cliente})
    }
    event.preventDefault(event);
    
  }

  buscarElCliente = (elCliente) => {
    fetch(`http://localhost:8282/clientes/buscar/` + elCliente)
      .then((res) => res.json())
      .then((clts) =>
        this.setState({ elCliente: clts }, this.agregarCliente(clts))
      );
  };


  encontrarCliente = (cliente) => {
    console.log("cuitEncontrar",cliente.cuit,cliente)
    fetch("http://localhost:8282/clientes/busqueda/:" + cliente.cuit)
    .then((res) => res.json())
      .then((unCliente) =>
        this.setState({cliente:unCliente},
          console.log("encontrar:",cliente.cuit,{cliente:unCliente})
          // this.crearCliente(cliente, false)
        )
      );
    // .catch((error) =>
    //   this.setState({
    //     error: "no encontrado",
    //     cuitCreado: false,
    //   })
    // );
  };

  crearCliente = () => {
    fetch("http://localhost:8282/clientes/nuevo", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.cliente),
    })
      .then((res) => this.props.listadoClientes())
      .then((res) => this.estadoInicial());
  };


  editarcliente = (id) => {
    console.log("idEditar", id);
    fetch(
      "http://localhost:8282/clientes/" + id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.cliente),
      },
      console.log("ClienteEditado", this.state.cliente)
    )
      .then(this.props.listadoClientes)
      .then(this.estadoInicial())
      .then(console.log("EDITAR"));
  };

  limpiarTabla = () => {
    document.getElementById("cuit").value = "";
    this.listadoClientes();
  };

  render() {
    return (
      <Col xs="12" md="12">
        <ModalBody>
          <Form className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label for="cuit">Cuit</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="number"
                  id="cuit"
                  name="cuit"
                  placeholder="Completa Cuit..."
                  required={true}
                  value={this.state.cliente.cuit}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="nombre">Nombre</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Completa Nombre..."
                  required
                  value={this.state.cliente.nombre}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="apellido">apellido</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="Completa Apellido..."
                  // required
                  value={this.state.cliente.apellido}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label for="razonSocial">razon social</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="razonSocial"
                  name="razonSocial"
                  placeholder="Completa razon social..."
                  // required
                  value={this.state.cliente.razonSocial}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label for="telefono">Nro&nbsp;telefono</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="number"
                  id="telefono"
                  name="telefono"
                  placeholder="Completa telefono..."
                  required={false}
                  value={this.state.cliente.telefono}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="email">Email</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Completa Email..."
                  // required={true}
                  value={this.state.cliente.email}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <Button
              type="submit"
              color="success"
              outline
              onClick={this.handleSubmit}
            >
              <i className="fa fa-dot-circle-o"></i> Guardar cliente
            </Button>
          </Form>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Col>
    );
  }

  handleChange(e) {
    var nuevoCliente = Object.assign({}, this.state.cliente);
    nuevoCliente[e.target.name] = e.target.value;
    this.setState({ cliente: nuevoCliente });
    console.log(
      "evenEditar",
      nuevoCliente,
      this.state.cliente.id,
      this.state.cliente.nombre
    );
  }
}

export default CargarCliente;
