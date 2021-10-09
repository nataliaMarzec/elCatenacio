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
    };
  }

  estadoInicial = () => {
    this.setState({
      cliente: {
        nombre: "",
        direccion: "",
        telefono: "",
        username:"",
        email: "",
        rol: "CLIENTE",
        registrado:false,
      },
    });
  };
  componentDidMount(){
    this.props.listadoClientes();
    console.log("CLIENTES",this.state.clientes)
  }

  handleSubmit = (event) => {
    const id = this.state.cliente.id_cliente;
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
    console.log("dniEncontrar", cliente.username, cliente);
    fetch("http://localhost:8383/clientes/busqueda/:" + cliente.username)
      .then((res) => res.json())
      .then((unCliente) =>
        this.setState(
          { cliente: unCliente },
          console.log("encontrar:", cliente.username, { cliente: unCliente })
          // this.crearCliente(cliente, false)
        )
      );
    // .catch((error) =>
    //   this.setState({
    //     error: "no encontrado",
    //     : false,
    //   })
    // );
  };

  crearCliente = () => {
    fetch("http://localhost:8383/cliente/nuevo", {
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
    fetch("http://localhost:8383/cliente/" + id, {
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
                  value={this.state.cliente.username}
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
            {/* <FormGroup row>
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
                  value={this.state.cliente.password}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup> */}
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
