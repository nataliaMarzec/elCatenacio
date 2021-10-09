import React from "react";
import Cliente from "./Cliente";
import CargarCliente from "./CargarCliente";
import WrapperConsumer,{ContextUsuario} from "../../componentesSesion/Context/ContextUsuario";
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
  static contextType = ContextUsuario;

  constructor(props) {
    super(props);
    this.state = {
      seleccionado: {},
      cliente: {},
      clientes: [],
      usuariosClientes:[],
      ventasACliente: [],
      pagosDeCliente: [],
      modal: false,
      editable: false,
      username: "",
      detalleClientes:[],
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  verDetallesCliente(username) {
    let data1 = this.props.context.usuarios
    let data2 = this.state.clientes
    var nuevaLista=data1.concat(data2)
    var listaActualizada = nuevaLista.filter(
      (u) => username == u.username
    );
    this.setState({clientes: listaActualizada });
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
    this.usuariosClientes()
    console.log("listadoClientes", this.listadoClientes());
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
        console.log("ClientaEnviado", this.state.clientes)
      );
  };

  listadoUsuarios = () => {
    fetch(`http://localhost:8383/usuarios`)
      .then((res) => res.json())
      .then(
        (res) => this.props.context.setStateUsuarios(res),
        console.log("Usuarios", this.props.context.usuarios)
      );
  }
  usuariosClientes = () => {
    let data1 = this.props.context.usuarios
    console.log("data1+++++++",data1)
    let data2 = this.state.clientes
    // var nuevaLista = data1.filter(function (el) {
    //   var found = false, x = 0;
    //   while (x < data2.length && !found) {
    //     if (el.productoId == data2[x].id && data2[x].categoria != "Cocina") found = true;
    //     x++;
    //   }
    //   if (!found) return el;
    // });
    var nuevaLista=data1.concat(data2)
    // console.log("nuevaLista1",nuevaLista)
    // nuevaLista = nuevaLista.concat(data2.filter(function (el) {
    //   var found = false, x = 0;
    //   while (x < data1.length && !found) {
    //     if (el.id == data1[x].productoId) found = true;
    //     // data1[x].listoCocina=true;
    //     x++;
    //   }
    //   if (!found) return el;
    // }));
    // this.setState({usuariosClientes:nuevaLista})
    console.log("nuevaLista",this.state.usuariosClientes)
    return nuevaLista
  }

  limpiarTabla = () => {
    document.getElementById("username").value = "";
    this.listadoClientes();
    // this.listadoUsuarios();
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

  actualizarAlEliminar = (unCliente) => {
    var listaActualizada = this.state.clientes.filter(
      (item) => unCliente !== item
    );
    this.setState({ clientes: listaActualizada, cliente: {} });
  };

  eliminarCliente(id) {
    this.props.eliminarCliente(id);
  }

  seleccionar = (unCliente) => {
    this.setState({ cliente: unCliente });
  };

  clienteSeleccionado = (unCliente) => {};

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

  render(props) {
    let data1 = this.state.clientes
    let data2= this.props.context.usuarios
    var nuevaLista=data1.concat(data2)
    var listaUserNames = nuevaLista.map((cliente) => {
      return (
        <div>
          <option value={cliente.username} />
        </div>
      );
    });
    console.log("renderData1",data1,"renderData1",data2);
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
              cliente={this.state.cliente}
              clientes={this.state.clientes}
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
                      </Form>
                    </CardHeader>
                    <CardBody>
                      <Table responsive bordered size="sm">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Registrado</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderRows()}</tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
        </div>
      </div>
    );
  }

  renderRows() {
    let data1 = this.state.clientes
    let data2 = this.props.context.usuarios
    console.log("data1+++++++",data1)
    var nuevaLista=data1.concat(data2)
    return !nuevaLista
      ? console.log("NULL", null)
      : nuevaLista.map((unUsuario, index) => {
          return (
            <Cliente
              key={index}
              index={index}
              usuario={unUsuario}
              usuarios={nuevaLista}
              selector={this.seleccionar}
              clienteSeleccionado={this.clienteSeleccionado}
              actualizarAlEliminar={this.actualizarAlEliminar}
              eliminarCliente={this.eliminarCliente.bind(this)}
              toggle={this.toggle}
            />
          );
        });
  }
}

export default WrapperConsumer(Clientes)
