import React from "react";
import { Button} from "reactstrap";

class Producto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: this.props.toggle,
    };
    this.eliminarProducto = this.eliminarProducto.bind(this);
    this.editarProducto = this.editarProducto.bind(this);
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

  editarProducto() {
    this.props.selector(this.props.producto);
    console.log("seleccionar___", this.props.producto);
    this.props.toggle();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: this.props.productos });
      console.log("productos props", this.props.productos, nextProps.productos.values());
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto });
    }
  }

  render = () => {
    return (
      <tr>
        <td>{this.props.producto.codigo}</td>
        <td>{this.props.producto.descripcion}</td>
        <td>{this.props.producto.categoria}</td>
        <td>{this.props.producto.precioUnitario}</td>
        <td>{this.props.producto.habilitado == true ? "si": "no"}</td>

        <td>
          <Button
            color="danger"
            size="btn-xs"
            onClick={() => this.eliminarProducto(this.props.producto.id)}
          >
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            className="btn #e65100 orange darken-4"
            color="warning"
            onClick={this.editarProducto}
          >
            <i className="fa fa-dot-circle-o">{""} Editar</i>
          </Button>
          &nbsp;&nbsp;
          <Button
            // onClick={}
            color="info"
          >
            <i className="fa fa-dot-circle-o">{""} Habilitar</i>
          </Button>
        </td>
      </tr>
    );
  };
}

export default Producto;
