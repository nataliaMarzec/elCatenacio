import React ,{useContext,createContext} from "react";
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
      modal: false,

    };
    // this.onSubmitRegistrar=this.onSubmitRegistrar.bind(this)
  }

  estadoInicial = () => {
    this.setState({
      responsable: {
        nombre: "",
        direccion: "",
        telefono: "",
        username: "",
        email: "",
        password: "",
        rol: "",
      },
    });
  };

  componentDidMount() {
    this.props.listadoResponsables();
    // this.listadoUsuarios()
    console.log("RESPONS", this.state.responsables)
  }

  listadoUsuarios = () => {
    fetch(`http://localhost:8383/usuarios`)
        .then((res) => res.json())
        .then(
            (res) => this.props.context.setStateUsuarios(res),
            console.log("Usuarios", this.props.context.usuarios)
        );
}

  // registrar() {
  //   fetch("http://localhost:8383/this.state.responsable/signup", {
  //     method: "post",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(this.props.context.this.state.responsable),
  //   })
  //   .then(res => this.error(res))
  //   .then(this.props.context.setStateUsuario(this.props.context.this.state.responsable))
  //   .then(this.props.context.setStateRol("ADMIN"))
  //   .then(this.listadoUsuarios())
  //   .catch(err => console.log("error", err), this.props.context.estadoInicial())
  //   // console.log("registrarRESPONSABLE", this.props.context.this.state.responsable)
  // }
  // error = res => {
  //   if (res.status === 401) {
  //     console.log("El email ya se encuentra registrado")
  //   }

  //   if (res.status === 200) {
  //     console.log("Su cuenta se ha creado satisfactoriamente");
  //     // this.props.context.estadoInicial()
  //   }
  //   if (res.status === 403) {
  //     console.log(
  //       "Su cuenta no se pudo crear. Por favor vuelva a registrarse y complete todos los campos"
  //     );
  //     // this.props.context.estadoInicial();
  //     this.props.history.push("./register");
  //   }
  // };
  
  // onSubmitRegistrar(event) {
  //   if (this.props.context.usuario !== {}) {
  //     this.registrar()
  //     console.log("this.context", this.props.context.usuario)
  //     // this.props.history.push(`/login`);
  //   }
  //   event.preventDefault(event);
  // }
  // encontrarResponsable = (responsable) => {
  //   console.log("dniEncontrar", responsable.nombre, responsable);
  //   fetch("http://localhost:8383/responsables/busqueda/:" + responsable.nombre)
  //     .then((res) => res.json())
  //     .then((unResponsable) =>
  //       this.setState(
  //         { responsable: unResponsable },
  //         console.log("encontrar:", responsable.nombre, { responsable: unResponsable })
  //         // this.crearResponsable(responsable, false)
  //       )
  //     );
    // .catch((error) =>
    //   this.setState({
    //     error: "no encontrado",
    //     : false,
    //   })
    // );
  // };

  crearResponsable = () => {
    fetch("http://localhost:8383/responsable/signup", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.responsable,this.state.usuario),
    })
      .then(this.props.listadoResponsables)
      .then(this.estadoInicial());
  };

  editarResponsable = (id) => {
    fetch("http://localhost:8383/responsable/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.responsable),
    })
      .then(this.props.listadoResponsables)
      .then(this.estadoInicial());
  };

  onSubmit = (event) => {
    const id = this.state.responsable.id_responsable;
    if (id) {
      console.log("onSubmit-id",id)
      this.editarResponsable(id);
    } else {
      this.crearResponsable();
    }
    event.preventDefault(event);
  };

  render() {
    const { context: { usuario}} = this.props;
    console.log("CARGAR RESPONSABLE", usuario)
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
                  value={this.state.responsable.username}
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
                  value={this.state.responsable.email}
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
                  value={this.state.responsable.password}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <Button
              type="submit"
              color="success"
              outline
              onClick={this.onSubmit}
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
    var nuevoResponsable = Object.assign({}, this.state.responsable);
    nuevoResponsable.rol = "RESPONSABLE"
    nuevoResponsable[e.target.name] = e.target.value;
    this.setState({ responsable: nuevoResponsable });
  };


}

export default WrapperConsumer(CargarResponsable)
