import React, { createContext } from "react";
import WrapperConsumer, { ContextUsuario } from "../../componentesSesion/Context/ContextUsuario";
import {
  Button,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  CardFooter,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,

} from "reactstrap";
import InputGroup from "reactstrap/lib/InputGroup";
import logo from "../../assets/img/brand/logo.svg";

class CardSeleccionadoModalRow extends React.Component {
  static contextType = createContext(ContextUsuario)

  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: props.toggle,
      producto: props.producto,
      modal: false,
      itemCliente:props.itemCliente,
      listaItemsCliente:props.listaItemsCliente
    };
    this.eliminarProducto = this.eliminarProducto.bind(this);
    this.handleChange=this.handleChange.bind(this)
  }

  eliminarProducto = (id) => {
    fetch("http://localhost:8383/productos/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.props.actualizarAlEliminar(this.props.producto));
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: this.props.productos });
      // console.log(
      //   "productos props",
      //   this.props.productos,
      //   nextProps.productos.values()
      // );
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto });
    }
    if (nextProps.itemCliente !== this.props.itemCliente) {
      this.setState({ itemCliente: nextProps.itemCliente },
        );
      }
      if (nextProps.listaItemsCliente !== this.props.listaItemsCliente) {
        this.setState({ listaItemsCliente: nextProps.listaItemsCliente },
          console.log("itemClienteprops",this.props.listaItemsCliente)
        );
    }
  }
  handleChange(e) {
    let unItem = this.state.itemCliente
    var nuevoItem = Object.assign({}, this.state.itemCliente);
    nuevoItem[e.target.name] = e.target.value;
    unItem = nuevoItem
    this.setState({itemCliente: unItem}
    ,() => console.log("nuevoItem/key", this.state.itemCliente, nuevoItem)
    );
    // this.props.calcular(unItem)
  };
  render = () => {
    const { context: { usuario,onChangeLogin } } = this.props;

    console.log("itemCLIENTErENDER",this.props.itemCliente,this.state.itemCliente)
    return (
      <div>

        <Card className="border-info">
          <CardImg top src={this.state.vista} style={{ border: "1px solid green" }} />
          <Card className="border-info"><b>{this.props.producto.descripcion}</b>

            {/* <CardSubtitle>Producto </CardSubtitle> */}
            <Label className="ml-1"></Label>
            <Label className="ml-1"><b>${this.props.producto.precioUnitario}</b></Label>
          </Card>
          <Form>
            <FormGroup xs="12" row >
              <Col md="3">
                <Label className="ml-3 "><b>Unidades</b></Label>
              </Col>
              <Col md="2">
                <Input
                  key="cantidad"
                  style={{ border: "1px solid grey", marginrigth: "3" }}
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  min={1}
                  value={this.state.itemCliente.cantidad}
                  onChange={this.handleChange}
                  className="form-control"></Input>
              </Col>
            </FormGroup>
            <FormGroup className="ml-1 mr-1">

              <Label className="ml-3 "><b>¿Quieres detallar algo?</b></Label>
              <Input
                key="observaciones"
                style={{ border: "1px solid grey" }}
                type="text"
                id="observaciones"
                name="observaciones"
                min={1}
                value={this.state.itemCliente.observaciones}
                onChange={this.handleChange}
                className="form-control">
                </Input>

            </FormGroup>
          </Form>
          <CardFooter>
            <Button
              color="danger" size="lg" className="btn-pill"
              block
              onClick={() => this.props.agregarAMiCarrito(this.state.itemCliente,this.state.producto)}
            >
              Agregar a mi carrito
            </Button>
          </CardFooter>
        </Card>
      </div>

    );
  };
}

export default WrapperConsumer(CardSeleccionadoModalRow)
