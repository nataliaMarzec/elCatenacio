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
import WrapperConsumer, { ContextUsuario } from "../Context/ContextUsuario";

class Register extends Component {
  static contextType = ContextUsuario;
  constructor(props) {
    super(props);
    this.onSubmitRegistrar = this.onSubmitRegistrar.bind(this)
    this.salir=this.salir.bind(this)
  }

  componentDidMount() {
    console.log("contextDidMountReg++", this.props.context);
    this.listadoUsuarios()

  }

  listadoUsuarios = () => {
    fetch(`http://localhost:8383/usuarios`)
      .then((res) => res.json())
      .then(
        (res) => this.props.context.setStateUsuarios(res),
        console.log("Usuarios", this.props.context.usuarios)
      );
  }

  registrar() {
    console.log("registrar1", this.props.context.usuario)
    fetch("http://localhost:8383/usuario/signup", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.props.context.usuario),
    })
      .then(res => this.error(res))
      .then(this.props.context.setStateUsuario(this.props.context.usuario))
      .then(this.props.context.setStateRol(this.props.context.usuario.rol))
      .then(this.props.context.estadoInicial())
      .catch(err => console.log("error", err), this.props.context.estadoInicial())
  }
  error = res => {
    if (res.status === 401) {
      this.props.history.push("./login");
      console.log("El email ya se encuentra registrado")
    }

    if (res.status === 200) {
      console.log("Su cuenta ha sido creada");
      // this.props.context.estadoInicial()
    }
    if (res.status === 403) {
      this.props.history.push("./login");
      console.log(
        "Por favor vuelva a registrarse")
    }
      if (res.status === 505) {
        this.props.history.push("./login");
        console.log(
          "Error,su cuenta no se ha creado."
        );
      // this.props.context.estadoInicial();
      this.props.history.push("./register");
    }
  };
  onSubmitRegistrar(event) {
    console.log("this.context", this.props.context.usuario)
   
    if (this.props.context.usuario !== {}) {
      this.registrar()
      this.props.history.push(`/login`);
    }
    event.preventDefault(event);
  }
  
  salir(event){
    this.props.history.push(`/login`);
    event.preventDefault(event)
  }

  render() {
    const { context: { usuario, onChangeRegistrar } } = this.props;
    console.log("usuarioRegistrerender", usuario)
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this.onSubmitRegistrar}>
                    <h1>Registrarse</h1>
                    <p className="text-muted">Crear cuenta</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Nombre completo *"
                        autoComplete="nombre"
                        name="nombre"
                        value={usuario.nombre}
                        onChange={onChangeRegistrar}
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
                        placeholder="direccion"
                        autoComplete="direccion"
                        name="direccion"
                        value={usuario.direccion}
                        onChange={onChangeRegistrar}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        className="form-control"
                        placeholder="telefono"
                        autoComplete="telefono"
                        name="telefono"
                        value={usuario.telefono}
                        onChange={onChangeRegistrar}
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
                        value={usuario.username}
                        onChange={onChangeRegistrar}
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
                        value={usuario.email}
                        onChange={onChangeRegistrar}
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
                        value={usuario.password}
                        onChange={onChangeRegistrar}
                      />
                    </InputGroup>
                    <Button color="success" block onClick={this.onSubmitRegistrar}>
                      Crear cuenta
                    </Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    {/* <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block>
                        <span>facebook</span>
                      </Button>
                    </Col> */}
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block onClick={this.salir}>
                        <span>Salir</span>
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
export default WrapperConsumer(Register)

