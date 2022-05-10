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
  Label,
  Row,

} from "reactstrap";
import logo from "../../assets/img/brand/logo.svg";


class VistaDeProductosParaClientesRow extends React.Component {
  static contextType = createContext(ContextUsuario)

  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: props.toggle,
      producto: props.producto,
      modal: false,
      selector: props.selector
    };
    this.eliminarProducto = this.eliminarProducto.bind(this);
    this.elegirProducto = this.elegirProducto.bind(this);
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

  comprar() { }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: this.props.productos });
      console.log(
        "productos props",
        this.props.productos,
        nextProps.productos.values()
      );
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto });
    }
  }

  elegirProducto() {
    this.props.selector(this.props.producto);
    console.log("seleccionar___", this.props.producto);
    this.props.toggle();
  }

  render = () => {
    const { context: { usuario, onChangeLogin } } = this.props;
    return (
      <div>

        {/* <Card className="border-warning" style={{ color: "info" }} onClick={this.elegirProducto}>
          <CardImg top 
          src={logo}
          // src={'http://localhost:8383/' + 'Uploads/b202aba7-69cb-4f2b-b3cb-fddf229b2148.png'}
            style={{ border: "1px solid red" }} />
          <CardTitle><b className="ml-2">{this.props.producto.id} / {this.props.producto.descripcion}</b>
          </CardTitle>
          <Label className="ml-1"></Label>
          <Label className="ml-1"><b>${this.props.producto.precioUnitario}</b></Label>
          <CardFooter>
          </CardFooter>
        </Card> */}
        {/* <Card className="border-info" style={{ color: "info" }} onClick={this.elegirProducto}> */}
          <div class="card p-3 mt-5" onClick={this.elegirProducto}>

            <div class="d-flex justify-content-between align-items-center ">
              <div class="mt-2">
                <h4 class="text-uppercase"> {this.props.producto.id}</h4>
                <div class="mt-5">
                  <h5 class="text-uppercase mb-0">{this.props.producto.categoria}</h5>
                  <h1 class="main-heading mt-0">{this.props.producto.descripcion}</h1>
                  <div class="d-flex flex-row user-ratings">
                    {/* <div class="ratings">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div> */}
                    {/* <h6 class="text-muted ml-1">4/5</h6> */}
                  </div>
                </div>
              </div>
              <div class="image">
              <CardImg src={logo} width="200" style={{ color: "info" }} />
                {/* <CardImg top src={logo}
                  style={{ border: "1px solid red" }} /> */}
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-2 mb-2">
              {/* <span>Available colors</span>
              <div class="colors">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div> */}

            </div>


            <p>El Catenacio te ofrece la mejor atención. </p>

            <button class="btn btn-danger">Elegir producto</button>
          </div>
          {/* </Card> */}
      </div>

    );
  };
}

// export default VistaDeProductosParaClientesRow;
export default WrapperConsumer(VistaDeProductosParaClientesRow)
