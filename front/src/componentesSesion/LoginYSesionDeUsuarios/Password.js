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

class Password extends React.Component {
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
  // verificarPassword(usuario) {
  //   try {
  //     fetch(`http://localhost:8383/usuario/${usuario.username}/${usuario.password}`, {
  //       method: "get",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then(res => res.json())
  //       .then(res => this.rol(res))
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  rol(usuario) {
    if (!usuario) {
      this.props.context.estadoInicial()
      this.props.history.push("/password")
    }
    if (usuario) {
      if (usuario.rol === "RESPONSABLE") {
        this.login()
        this.props.context.logueado(true)
        this.props.context.setStateRol(usuario.rol)
        this.props.history.push("/");
      }
      if (usuario.rol === "ADMIN") {
        this.login()
        this.props.context.logueado(true)
        this.props.context.setStateRol(usuario.rol)
        this.props.history.push("/");
      }
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

  resStatusError = (res) => {
    console.log("resLoginPASSWORD+++", res)
    if (!res) {
      this.props.history.push(`/password`);
      console.log("ingrese el password", res)
    }
    if (res.status == 500) {
      this.props.history.push(`/password`);
      this.props.context.estadoInicial()
      console.log("ingrese un password", res)
    }
    if (res.status == 404) {
      this.props.history.push(`/password`);
      this.props.context.estadoInicial()
      console.log("password no encontrado 404")
    }
    if (res.status == 401) {
      this.props.history.push(`/password`);
      this.props.context.estadoInicial()
      console.log("Sin autorizacion")
    }
    if (res.status == 200) {
      console.log("esta logueado,password correcto", this.props.context.rol)
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
                      <h1>Accede al Catenacio</h1>
                      <p className="text-muted">Inicia sesión con tu password</p>
                      <InputGroup key="nombre" className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="nombre"
                          name="nombre"
                          placeholder="Nombre"
                          autoComplete="nombre"
                          required={true}
                          value={usuario.nombre}
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
                            <i className="icon-lock"></i>
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
                            Ingresar
                          </Button>
                        </Col>

                      </Row>
                    </Form>
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
export default WrapperConsumer(Password)
