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
      categorias: props.categorias,
      modal: false,
      codigo: "",
      onClick: false,
      imagen:props.imagen,
      vista:props.vista,
      imagenCargada:props.imagenCargada,

    };
    this.onChangeImagen = this.onChangeImagen.bind(this)
    this.crearProductoConImagen = this.crearProductoConImagen.bind(this)
  }

  estadoInicial = () => {
    this.setState({
      producto: {
        codigo: "",
        descripcion: "",
        categoria: "",
        precioUnitario: "",
        habilitado: "",
      },
      imagen:{}
    });
  };
  componentWillMount() {
    this.setState({ productos: this.state.productos, producto: this.state.producto })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: nextProps.productos },
        () => console.log("CargarProductos-props", this.state.productos));
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto }
        , () => console.log("CargarProductoprops", this.state.producto));
    }
    if (nextProps.descripcion !== this.props.descripcion) {
      this.setState({ descripcion: nextProps.descripcion });
    }

  }

  handleSubmit = (event) => {
    const id = this.state.producto.id;
    if (id) {
      this.editarProducto(id);
    } else {
      this.crearProductoConImagen(event)
      this.setState({imagen:{}})
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

  crearProducto = (id_imagen) => {
    console.log("id_imagen",id_imagen)
    fetch("http://localhost:8383/productos/"+id_imagen, {
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
  onChangeImagen = (e) => {
    console.log("event-onChange", e.target.files[0])
    this.setState({ imagen: e.target.files[0] }, console.log('image-console', this.state.imagen))
    this.setState({ vista: URL.createObjectURL(e.target.files[0]) }
      , () => { console.log("file-onCha", this.state.vista) });
    this.setState({ imagenCargada: true }, console.log("imgCargada", this.state.imagenCargada));
    this.props.envioDeImagen(this.state.imagen,this.state.vista,this.state.imagenCargada)

  }
  crearProductoConImagen(event) {
    const formData = new FormData();
    formData.append('imagen', this.state.imagen);
    console.log("sendImagen", formData)
    fetch("http://localhost:8383/imagen/", {
      method: "post",
      body: formData,
    })
      .then(res => res.json())
      .then((resBody)=>{
        console.log("resBody",resBody.Imagen)
        this.setState({imagen:resBody.Imagen},
          this.crearProducto(resBody.Imagen.id_imagen))
      })
      .then(this.setState({imagen:{descripcion:null},vista:null}))
      .catch((error) => error, {});
  }


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
                    <input top width="100%"
                      type="file"
                      name="imagen"
                      id="imagen"
                      enctype=" multipart/form-data "
                      className="form-control-file border"
                      // value={this.state.imagen.descripcion}
                      onChange={this.onChangeImagen}
                    />
                    <CardImg top max-width="100%" src={this.state.vista}></CardImg>
                </Card>


                <CardBody>
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
                        value={this.state.producto.descripcion}
                        // style="text-transform:uppercase"
                        onChange={this.handleChange}
                      ></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label for="categoria">Categoría</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="categoria"
                        name="categoria"
                        placeholder="Completa categoría..."
                        list="categorias"
                        required={false}
                        value={this.state.producto.categoria}
                        onChange={this.handleChange}
                      />

                      <datalist id="categorias">
                        {this.state.categorias.map((categoria, index) => {
                          return (
                            <option id={index} value={categoria.name} />
                          );
                        })}
                      </datalist>

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label for="precioUnitario">Precio</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="number"
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
    this.setState({ producto: nuevoProducto }, () => console.log("nuevoProducto", nuevoProducto));
  };
}

export default CargarProducto;
