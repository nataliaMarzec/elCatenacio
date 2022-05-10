import React, { createContext } from "react";
import Cliente from "./Cliente";
import CargarCliente from "./CargarCliente";
import WrapperConsumer, { ContextUsuario } from "../../componentesSesion/Context/ContextUsuario";
import {
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

class Clientes extends React.Component {
  static contextType = createContext(ContextUsuario)


  constructor(props) {
    super(props);
    this.state = {
      seleccionado: {},
      cliente: {},
      clientes: [],
      usuario: {},
      usuarios: [],
      usuariosClientes: [],
      ventasACliente: [],
      pagosDeCliente: [],
      modal: false,
      editable: false,
      username: "",
      detalleClientes: [],
      nuevosUsuarios: [],

    };
    this.listadoClientes = this.listadoClientes.bind(this)
    this.listadoUsuarios = this.listadoUsuarios.bind(this)
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  verDetallesCliente(username) {
    let data1 = this.state.usuarios.filter(u => u.rol == "CLIENTE")
    let data2 = this.state.clientes
    var usuario = data1.find(
      (u) => username == u.username
    )
    if (usuario) {
      var listaActualizada = data2.filter(c => c.id_cliente == usuario.clienteId)
      this.setState({ clientes: listaActualizada },
        () => console.log("LISTAaCTUALIZADA", listaActualizada, this.state.clientes));
    }
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.listadoClientes();
    this.listadoUsuarios();
  }

  listadoBusqueda = (busqueda) => {
    if (busqueda != null) {
      fetch(`http://localhost:8383/clientes` + busqueda)
        .then((res) => res.json())
        .then((clts) => this.setState({ clientes: clts }));
    }
    if (busqueda == null) {
      fetch(`http://localhost:8383/clientes`)
        .then((res) => res.json())
        .then((clts) => this.setState({ clientes: clts }));
    }
  };

  listadoClientes = () => {
    fetch(`http://localhost:8383/clientes`)
      .then((res) => res.json())
      .then(
        (cltes) => this.setState({ clientes: cltes, cliente: {} }),
      );
  };

  listadoUsuarios = () => {
    fetch(`http://localhost:8383/usuarios`)
      .then((res) => res.json())
      .then(
        (res) => this.setState({usuarios:res}),
        console.log("Usuarios", this.props.context.usuarios,this.state.usuarios)
      )
      // .then(this.setState({ usuario: {} }))
  }

  limpiarTabla = () => {
    document.getElementById("username").value = "";
    this.listadoClientes();
  };

  handleSubmit = (e) => {
    var busqueda;
    if (this.state.username === "") {
      this.listadoBusqueda(busqueda);
    }
    if (this.state.username !== "") {
      busqueda = '?busqueda=username=="' + this.state.username + '"';
      this.listadoBusqueda(busqueda);
    }
    e.preventDefault(e);
  };

  actualizarAlEliminar = (unCliente, unUsuario) => {
    var listadoClientes = this.state.clientes.filter(
      (item) => unCliente !== item
    );
    var listadoUsuarios = this.state.usuarios.filter(
      (item) => unUsuario != item
    )
    this.setState({
      clientes: listadoClientes, usuarios: listadoUsuarios,
      usuario: {}, cliente: {}
    });
  };

  seleccionar = (unUsuario, unCliente) => {
    this.setState({ usuario: unUsuario, cliente: unCliente });
  };

  ModalHeaderStrong = (editable) => {
    if (editable) {
      return (
        <ModalHeader editable={false} toggle={this.toggle}>
          <strong>Nuevo</strong>Cliente
        </ModalHeader>
      );
    }
    return (
      <ModalHeader editable={true} toggle={this.toggle}>
        <strong>Modificar</strong>Cliente
      </ModalHeader>
    );
  };

  render() {
    let data1 = this.state.clientes
    let data2 = this.state.usuarios.filter(u => u.rol == "CLIENTE")
    var listaUserNames = data2.map((cliente) => {
      return (
        <div>
          <option value={cliente.username} />
        </div>
      );
    });
    console.log("renderUsuario+++", this.state.usuario);
    return (
      <div className="container">
        <div></div>
        <Row>&nbsp;</Row>
        <Container fluid>
          <Button color="success" onClick={this.toggle}>
            Nuevo cliente
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <this.ModalHeaderStrong></this.ModalHeaderStrong>
            <CargarCliente
              listadoClientes={this.listadoClientes}
              listadoUsuarios={this.listadoUsuarios}
              cliente={this.state.cliente}
              clientes={this.state.clientes}
              usuario={this.state.usuario}
              usuarios={this.state.usuarios}
            />
          </Modal>
          <Row>&nbsp;</Row>
        </Container>
        <div className="animated fadeIn">
          {/* {Boolean(
            this.state.clientes.length ? */}
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Clientes Lista
                </CardHeader>
                <CardHeader>
                  <Form onSubmit={this.handleSubmit} id="formulario">
                    <FormGroup row>
                      <Col xs="12" md="9">
                        <Input
                          type="username"
                          id="username"
                          name="username"
                          placeholder="Elegir username"
                          onChange={this.handleChange}
                          list="nuevaLista"
                        />
                      </Col>
                      <datalist id="nuevaLista">{listaUserNames}</datalist>
                    </FormGroup>
                    {/* <React.Fragment>{
                      this.state.usuario.clienteId == undefined && 
                      this.state.username == undefined ?
                      null : this.state.usuario.clienteId !==undefined &&
                       this.state.username !== undefined && */}
                    <div className="row">
                      <div className="input-field col s12 m12">
                        <Button
                          type="button"
                          style={{ margin: "2px" }}
                          color="info"
                          outline
                          onClick={() =>
                            this.verDetallesCliente(this.state.username)
                          }
                        >
                          <i className="fa fa-dot-circle-o"></i>Ver detalles
                          de cliente
                        </Button>
                        <Button
                          type="button"
                          style={{ margin: "2px" }}
                          color="success"
                          outline
                          onClick={this.limpiarTabla}
                        >
                          <i className="fa fa-dot-circle-o"></i>Ver clientes
                        </Button>
                      </div>
                    </div>
                    {/* } </React.Fragment> */}
                  </Form>
                </CardHeader>
                <CardBody>
                  <React.Fragment>{
                    this.state.clientes.length > 0 &&
                    <Table responsive bordered size="sm">
                      <thead>
                        <tr>
                          {/* <th>ID</th> */}
                          <th>Nombre</th>
                          <th>Dirección</th>
                          <th>Teléfono</th>
                          <th>UserName</th>
                          <th>Email</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>{this.renderRows()}</tbody>
                    </Table>
                  }
                  </React.Fragment>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  renderRows() {
    let clientes = this.state.clientes
    let usuarios = this.state.usuarios.filter(u => u.rol == "CLIENTE")
    console.log("ROW Usuarios", this.state.usuarios)
    return (
      <React.Fragment>{
        usuarios.map((unUsuario, index) => {
          var cliente = clientes.find(c => c.id_cliente == unUsuario.clienteId)

          if (cliente) {
            let listaClientes = clientes.filter(c => c.id_cliente == unUsuario.clienteId)
            return (
              <Cliente
                key={index}
                index={index}
                usuario={unUsuario}
                usuarios={usuarios}
                clientes={listaClientes}
                cliente={cliente}
                selector={this.seleccionar}
                actualizarAlEliminar={this.actualizarAlEliminar}
                toggle={this.toggle}
              />

            )
          }
          else {
            return
          }
        })}
      </React.Fragment>
    )
  }
}

export default WrapperConsumer(Clientes)
