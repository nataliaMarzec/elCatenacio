import React, { createContext } from "react";
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
import WrapperConsumer, { ContextUsuario } from "./../../componentesSesion/Context/ContextUsuario";

class CargarCliente extends React.Component {
  static contextType = createContext(ContextUsuario)


  constructor(props) {
    super(props);
    this.state = {
      cliente: props.cliente || {},
      clientes: props.clientes || [],
      usuario: props.usuario || {},
      usuarios: props.usuarios || [],
      modal: false,
    };
  }

  estadoInicial = () => {
    this.setState({
      cliente: {
        nombre: "",
        direccion: "",
        telefono: "",
      },
      usuario: {
        username: "",
        email: "",
        password: "",
        rol: "CLIENTE",
      }
    });
  };

  componentDidMount() {
    this.props.listadoClientes();
    this.props.listadoUsuarios();

  }

  handleSubmit = (event) => {
    const id = this.state.cliente.id_cliente;
    if (id) {
      this.editarcliente(id);
    } else {
      this.crearCliente();
    }
    event.preventDefault(event);
  };

  crearCliente = () => {
    fetch("http://localhost:8383/cliente/nuevo", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.cliente, this.state.usuario),
    })
      // .then(this.setState({usuarios:this.props.context.usuarios}))
      .then(this.props.listadoClientes)
      .then(this.props.listadoUsuarios)
      .then(this.estadoInicial())
      .catch(err => console.log("error", err), this.estadoInicial())
  };


  editarcliente = (id) => {
    fetch("http://localhost:8383/cliente/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.usuario, this.state.cliente),
    })
      .then(this.props.listadoUsuarios)
      .then(this.props.listadoClientes)
      .then(this.estadoInicial())
      .catch(err => console.log("error", err), this.estadoInicial())
  };


  render() {
    console.log("USUARIOcargar", this.state.usuario)

    return (
      <Col xs="12" md="12">
        <ModalBody>
          <Form className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label for="nombre">Nombre completo</Label>
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
                <Label for="direccion">Dirección</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="Completa dirección..."
                  // required
                  value={this.state.cliente.direccion}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label for="telefono">Nro&nbsp;teléfono</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="number"
                  id="telefono"
                  name="telefono"
                  placeholder="Completa teléfono..."
                  required={false}
                  value={this.state.cliente.telefono}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="username">UserName</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Completa UserName..."
                  // required
                  value={this.state.usuario.username}
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
                  value={this.state.usuario.email}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="password">Password</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Completa Email..."
                  // required={true}
                  value={this.state.usuario.password}
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
    var nuevoUsuario = Object.assign({}, this.state.usuario);
    var nuevoCliente = Object.assign({}, this.state.cliente);
    nuevoUsuario[e.target.name] = e.target.value;
    nuevoCliente[e.target.name] = e.target.value;
    this.setState({
      usuario: nuevoUsuario, cliente: nuevoCliente,
      usuarios: this.state.usuarios, clientes: this.state.clientes
    });
  };


}

export default WrapperConsumer(CargarCliente)
