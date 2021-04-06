import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { register } from "./funcionesDeUsuario";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario:props.usuario,
      usuarios:props.usuarios,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.listadoUsuarios();
  }

 
  estadoInicial = () => {
    this.setState({
      usuario: {
        username: "",
        email: "",
        password: "",
        dni: "",
        rol:""
      },
    });
  };

  crearUsuario = () => {
    fetch("http://localhost:8282/usuarios/nuevo", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.usuario),
    })
      .then((res) => this.listadoUsuarios())
      .then((res) => this.estadoInicial());
  };

  
  onChange(e) {
    var nuevoUsuario = Object.assign({}, this.state.usuario);
    nuevoUsuario[e.target.name] = e.target.value;
    this.setState({ usuario: nuevoUsuario });
 
  }


  onSubmit(event) {
      this.crearCliente().then((res) => {
        this.props.history.push(`/login`);
      });
    
    event.preventDefault(event);
    
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this.onSubmit}>
                    <h1>Registrarse</h1>
                    <p className="text-muted">Crear cuenta</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Dni"
                        autoComplete="dni"
                        name="dni"
                        value={this.state.usuario.dni}
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        value={this.state.usuario.username}
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        value={this.state.usuario.email}
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        autoComplete="new-password"
                        name="password"
                        value={this.state.usuario.password}
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                      />
                    </InputGroup>
                    <Button color="success" block>
                      Crear cuenta
                    </Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block>
                        <span>facebook</span>
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block>
                        <span>twitter</span>
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
