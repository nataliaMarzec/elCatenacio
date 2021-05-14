import React from "react";
import Cliente from "./Cliente";
import CargarCliente from "./CargarCliente";
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
  constructor(props) {
    super(props);
    this.state = {
      seleccionado: {},
      cliente: {},
      clientes: [],
      ventasACliente: [],
      pagosDeCliente: [],
      modal: false,
      editable: false,
      cuit: "",
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  verDetallesCliente(cuit) {
    var listaActualizada = this.state.clientes.filter(
      (item) => cuit == item.cuit
    );
    this.setState({ clientes: listaActualizada });
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.listadoClientes();
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

  limpiarTabla = () => {
    document.getElementById("cuit").value = "";
    this.listadoClientes();
  };

  handleSubmit = (e) => {
    var busqueda;
    if (this.state.cuit === "") {
      this.listadoBusqueda(busqueda);
    }
    if (this.state.cuit !== "") {
      busqueda = '?busqueda=cuit=="' + this.state.cuit + '"';
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
    var listaCuitCliente = this.state.clientes.map((cliente) => {
      return (
        <div>
          <option value={cliente.cuit} />
        </div>
      );
      
    });
    console.log("listaCuitCliente",listaCuitCliente)

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
                          type="number"
                          id="cuit"
                          name="cuit"
                          placeholder="Elegir cuit"
                          onChange={this.handleChange}
                          list="cliente"
                        />
                      </Col>
                      <datalist id="cliente">{listaCuitCliente}</datalist>
                    </FormGroup>
                    <div className="row">
                      <div className="input-field col s12 m12">
                        <Button
                          type="button"
                          style={{ margin: "2px" }}
                          color="info"
                          outline
                          onClick={() =>
                            this.verDetallesCliente(this.state.cuit)
                          }
                        >
                          <i className="fa fa-dot-circle-o"></i>Ver detalles de
                          cliente
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
                        <th>cuit</th>
                        <th>nombre</th>
                        <th>apellido</th>
                        <th>dirección</th>
                        <th>telefono</th>
                        <th>email</th>
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
    let clientes = this.state.clientes;
    return !clientes
      ? console.log("NULL", null)
      : clientes.map((unCliente, index) => {
          return (
            <Cliente
              key={index}
              index={index}
              cliente={unCliente}
              clientes={this.state.clientes}
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

export default Clientes;
