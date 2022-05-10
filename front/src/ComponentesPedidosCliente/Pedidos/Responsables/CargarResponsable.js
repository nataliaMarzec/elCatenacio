import React, { useContext, createContext } from "react";
import WrapperConsumer, { ContextUsuario } from "../../../componentesSesion/Context/ContextUsuario";

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

class CargarResponsable extends React.Component {
  static contextType = createContext(ContextUsuario)

  constructor(props) {
    super(props);
    this.state = {
      responsable: props.responsable || {},
      responsables: props.responsables || [],
      usuario: props.usuario || {},
      usuarios: props.usuarios || [],
      modal: false,

    };
  }

  estadoInicial = () => {
    this.setState({
      responsable: {
        nombre: "",
        direccion: "",
        telefono: "",

      },
      usuario: {
        username: "",
        email: "",
        password: "",
        rol: "RESPONSABLE",
      }
    });
  };

  componentDidMount() {
    this.props.listadoResponsables();
    this.props.listadoUsuarios()
  }

  handleSubmit = (event) => {
    const id = this.state.responsable.id_responsable;
    if (id) {
      console.log("onSubmit-id", id)
      this.editarResponsable(id);
    } else {
      this.crearResponsable();
    }
    event.preventDefault(event);
  };


  crearResponsable = () => {
    fetch("http://localhost:8383/responsable/nuevo", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.responsable, this.state.usuario),
    })
      .then(this.props.listadoResponsables)
      .then(this.props.listadoUsuarios)
      .then(this.estadoInicial())
      .catch(err => console.log("error", err), this.estadoInicial())

  };


  editarResponsable = (id) => {
    fetch("http://localhost:8383/responsable/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.usuario, this.state.responsable),
    })
      .then(this.props.listadoUsuarios)
      .then(this.props.listadoResponsables)
      .then(this.estadoInicial())
      .catch(err => console.log("error", err), this.estadoInicial())

  };




  render() {
    console.log("USUARIOcargarRESP", this.state.usuario)
    return (
      <Col xs="12" md="12">
        <ModalBody>
          <Form className="form-horizontal">
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
                  value={this.state.responsable.nombre}
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
                  placeholder="Completa Direccion..."
                  required
                  value={this.state.responsable.direccion}
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
                  value={this.state.responsable.telefono}
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
                  required
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
                <Label for="email">Password</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Completa password..."
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
              <i className="fa fa-dot-circle-o"></i> Guardar responsable
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Col>
    );
  }

  handleChange = (e) => {
    var nuevoUsuario = Object.assign({}, this.state.usuario);
    var nuevoResponsable = Object.assign({}, this.state.responsable);
    nuevoUsuario[e.target.name] = e.target.value;
    nuevoResponsable[e.target.name] = e.target.value;
    this.setState({
      usuario: nuevoUsuario, responsable: nuevoResponsable,
      usuarios: this.state.usuarios, responsables: this.state.responsables
    });
  };



}

export default WrapperConsumer(CargarResponsable)