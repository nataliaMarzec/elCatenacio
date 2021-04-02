import React, { Component } from 'react';
import toastr from 'toastr';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Container,
  Table
} from 'reactstrap';
import ContactoUsuario from './ContactoUsuario';
import Register from './Register'

class Contactos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionado: {},
      usuario: {},
      usuarios: [],
    };
    this.listadoUsuarios=this.listadoUsuarios.bind(this)
  }


  componentDidMount() {
    this.listadoUsuarios();
  }

  listadoUsuarios = () => {
    fetch(`http://localhost:8282/usuarios`)
      .then((res) => res.json())
      .then((uss) => this.setState({ usuarios: uss, usuario: {} }));
  };

  estadoInicial = () => {
    this.setState({
      usuario: {
        username: "",
        email: "",
        password: "",
        dni: "",
      },
    });
  };

    eliminarContacto(id) {
        this.props.onDelete(id);
    };

    render() {
        let listadoContactos;
        if (this.props.usuarios) {
            listadoContactos = this.props.usuarios.map((usuario,index) => {
                return (
                    <ContactoUsuario onDelete={ this.eliminarContacto.bind(this) }
                     key={index} usuario={ usuario } usuarios={this.state.usuarios} />
                );
            });
        }

        return (
      <div className="animated fadeIn">
      <Container fluid>
      {/* <Register
              listadoUsuarios={this.listadoUsuarios}
              usuario={this.state.usuario}
              usuarios={this.state.usuarios}
              estadoInicial={this.estadoInicial}
            /> */}
      </Container>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Contactos
              </CardHeader>

              <CardBody>
                <Table responsive bordered size="sm">
                  <thead>
                  <tr>
                    <th><i class="icon-people"></i></th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Dni</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>
                  { listadoContactos }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
        );
    }
}

export default Contactos;
