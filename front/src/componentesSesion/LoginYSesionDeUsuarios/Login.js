import React, { createContext } from "react";
import { Link } from "react-router-dom";
import Register from "./Register"
import WrapperConsumer, { ContextUsuario } from "../Context/ContextUsuario";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

class Login extends React.Component {
  static contextType = createContext(ContextUsuario)

  componentDidMount() {
    console.log("contextDidMount++", this.props.history);
  }


  verificarUsuario(usuario) {
    try {
      fetch(`http://localhost:8383/usuario/${usuario.username}/${usuario.email}`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then(res => this.rol(res))
    } catch (error) {
      console.log(error);
    }
  }

  login() {
    try {
      fetch(`http://localhost:8383/usuario/signin`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.props.context.usuario),
      })
        .then((res) => this.resStatusError(res))
    } catch (error) {
      console.log(error);
      this.props.context.estadoInicial()
    }
  }

  rol(usuario) {
    if (!usuario) {
      this.props.context.estadoInicial()
      this.props.history.push("/login")
    }
    if (usuario) {
      console.log("rol",usuario.rol);
      if (usuario.rol === "CLIENTE") {
        this.login()
        this.props.context.logueado(true)
        this.props.context.setStateRol(usuario.rol)
        this.props.history.push("/home");
      }
      if (usuario.rol === "ADMIN" || usuario.rol === "RESPONSABLE") {
        this.login()
        this.props.context.logueado(true)
        this.props.context.setStateRol(usuario.rol)
        this.props.history.push("/");
      }
    }
  }

  resStatusError = (res) => {
    console.log("resLogin", res)
    if (!res) {
      this.props.history.push(`/login`);
      console.log("ingrese un usuario", res)

    }
    if (res.status == 500) {
      this.props.history.push(`/login`);
      this.props.context.estadoInicial()
      console.log("ingrese un usuario", res)

    }
    if (res.status == 404) {
      this.props.history.push(`/login`);
      this.props.context.estadoInicial()
      console.log("usuario no encontrado 404")
    }
    if (res.status == 401) {
      this.props.history.push(`/login`);
      this.props.context.estadoInicial()
      console.log("Sin autorizacion")
    }
    if (res.status == 200) {
      console.log("esta logueado", this.props.context.rol)
    }

  }

  onSubmitLogin = (e) => {
    e.preventDefault();
    this.verificarUsuario(this.props.context.usuario)
  }

  render() {
    const { context: { usuario, rol, onChangeLogin } } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form noValidate onSubmit={this.onSubmitLogin}>
                      <h1>Accede a tu cuenta</h1>
                      <p className="text-muted">Iniciar sesión con tu cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Username"
                          autoComplete="username"
                          required={true}
                          value={usuario.username}
                          onChange={onChangeLogin}
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
                          id="email"
                          name="email"
                          placeholder="Email"
                          autoComplete="email"
                          required={true}
                          value={usuario.email}
                          onChange={onChangeLogin}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" 
                            // onClick={()=>this.props.context.setStateVerPassword()}
                            ></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="password"
                          required={true}
                          value={usuario.password}
                          onChange={onChangeLogin}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">

                          <Button color="primary" className="px-4" onClick={this.onSubmitLogin}>
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            ¿Olvidaste tu contraseña?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Registrate</h2>
                      <p>
                        Si aún no tienes una cuenta,crea una y sé parte del
                        Catenacio.
                      </p>
                      <Link to="/register" render={props => <Register {...props} />}>
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Registrarse Ahora!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}
export default WrapperConsumer(Login)
