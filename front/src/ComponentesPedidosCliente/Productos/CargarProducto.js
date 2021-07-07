import React from "react";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  ModalBody,
  ModalFooter,
  Row,
  CheckBox,
} from "reactstrap";
import { AppSwitch } from "@coreui/react";

class CargarProducto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      producto: props.producto || {},
      productos: props.productos || [],
      modal: false,
      codigo: "",
      onClick: false,
   
    };
  }

  estadoInicial = () => {
    this.setState({
      producto: {
        codigo: "",
        descripcion: "",
        precioUnitario: "",
        habilitado: "",
      },
    });
  };

  handleSubmit = (event) => {
    const id = this.state.producto.id;
    if (id) {
      this.editarProducto(id);
    } else {
      this.crearProducto();
    }
    event.preventDefault(event);
  };

 

  listadoBusqueda = (busqueda) => {
    if (busqueda != null) {
      fetch(`http://localhost:8383/productos` + busqueda)
        .then((res) => res.json())
        .then((pdds) => this.setState({ productos: pdds }));
    }
    if (busqueda == null) {
      fetch(`http://localhost:8383/productos`)
        .then((res) => res.json())
        .then((pdds) => this.setState({ productos: pdds }));
    }
  };

  crearProducto = () => {
    fetch("http://localhost:8383/productos/nuevo", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.producto),
    })
      .then(this.props.listadoProductos)
      .then(this.estadoInicial());
  };

  editarProducto = (id) => {
    fetch("http://localhost:8383/productos/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.producto),
    })
      .then(this.props.listadoProductos)
      .then(this.estadoInicial());
  };
 

  render() {
  
    return (
      <Col xs="12" md="12">
        <ModalBody>
          <Col xs="12" md="12">
            {/* <Form className="form-vertical"> */}

            <Row></Row>
            <Col max-width="%100">
              <Card className="border-warning">
                <Card style={{ border: "1px solid red" }}>
                  <CardImg
                    // top height="150px" src={asado}
                    type="img"
                    id="img"
                    name="img"
                    placeholder="Agrega una imagen..."
                    required={false}
                    value={this.state.producto.img}
                    onChange={this.handleChange}
                  />
                  <CardBody>
                    <CardSubtitle>Cargar imagen</CardSubtitle>
                    <CardText></CardText>
                  </CardBody>
                </Card>
                

                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label for="codigo">Código</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="number"
                        id="codigo"
                        name="codigo"
                        placeholder="Completa Código..."
                        required={true}
                        value={this.state.producto.codigo}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label for="descripcion">Descripción</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        placeholder="Completa descripción..."
                        required={false}
                        value={this.state.producto.descripcion}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label for="precioUnitario">Precio</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="precioUnitario"
                        name="precioUnitario"
                        placeholder="Completa precio..."
                        // required
                        value={this.state.producto.precioUnitario}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <div className="card-header-actions">
                      <AppSwitch
                        type="checkbox"
                        className={"float-left mb-0"}
                        label
                        color={"info"}
                        // defaultChecked
                        size={"sm"}
                        name="habilitado"
                        checked={this.state.producto.habilitado}
                        onChange={this.handleChange}
                      />
                    </div>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
            <Button
              color="danger"
              size="lg"
              className="btn-pill"
              type="submit"
              onClick={this.handleSubmit}
            >
              Guardar producto
            </Button>

            {/* </Form> */}
          </Col>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </Col>
    );
  }

  handleChange = (e) => {
    var nuevoProducto = Object.assign({}, this.state.producto);
    nuevoProducto[e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ producto: nuevoProducto });
  };
}

export default CargarProducto;
