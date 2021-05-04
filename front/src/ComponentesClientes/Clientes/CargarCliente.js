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
      unCuit: {},
      cuitCreado: {},
    };
  }

  estadoInicial = () => {
    this.setState({
      cliente: {
        cuit: "",
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        email: "",
      },
    });
  };

  handleSubmit = (event) => {
    const id = this.state.cliente.id;
    if (id) {
      this.editarcliente(id);
    } else {
      // if(!id){
      this.crearCliente();
      //  this.encontrarCliente(this.state.cliente);
      // }
    }
    event.preventDefault(event);
  };

  encontrarCliente = (cliente) => {
    console.log("cuitEncontrar", cliente.nombre, cliente);
    fetch("http://localhost:8383/clientes/busqueda/:" + cliente.nombre)
      .then((res) => res.json())
      .then((unCliente) =>
        this.setState(
          { cliente: unCliente },
          console.log("encontrar:", cliente.nombre, { cliente: unCliente })
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
    fetch("http://localhost:8383/clientes/nuevo", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.cliente),
    })
      .then(this.props.listadoClientes)
      .then(this.estadoInicial());
  };

  editarcliente = (id) => {
    fetch("http://localhost:8383/clientes/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.cliente),
    })
      .then(this.props.listadoClientes)
      .then(this.estadoInicial());
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
                <Label for="direccion">direccion</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="Completa razon social..."
                  // required
                  value={this.state.cliente.direccion}
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

  handleChange = (e) => {
    var nuevoCliente = Object.assign({}, this.state.cliente);
    nuevoCliente[e.target.name] = e.target.value;
    this.setState({ cliente: nuevoCliente });
  };

  
}

export default CargarCliente;
