import React from "react";
import { Button } from "reactstrap";

class Producto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: this.props.toggle,
      imagen: props.imagen,
      vista: props.vista,
      imagenCargada: props.imagenCargada,
    };
    this.eliminarProducto = this.eliminarProducto.bind(this);
    this.editarProducto = this.editarProducto.bind(this);
  }

  eliminarProducto = (id_imagen,id) => {
    this.eliminarImagen(id_imagen)
    fetch("http://localhost:8383/productos/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(this.props.actualizarAlEliminar(this.props.producto));
  };

  eliminarImagen = (id) => {
    console.log("eliminarImagen",id)
    fetch("http://localhost:8383/imagen/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  };

  editarProducto() {
    this.props.selector(this.props.producto);
    console.log("seleccionar___", this.props.producto);
    this.props.toggle();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: this.props.productos });
      // console.log("productos props", this.props.productos, nextProps.productos.values());
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto });
    }
    if (nextProps.imagen !== this.props.imagen) {
      this.setState({ imagen: nextProps.imagen });
    }
    if (nextProps.vista !== this.props.vista) {
      this.setState({ vista: nextProps.vista });
    }
    if (nextProps.imagenCargada !== this.props.imagenCargada) {
      this.setState({ imagenCargada: nextProps.imagenCargada });
    }
  }

  render = () => {
    return (
      <tr>
        <td>{this.props.producto.id}</td>
        <td>{this.props.producto.imagenId}</td>
        <td>{this.props.producto.descripcion}</td>
        <td>{this.props.producto.categoria}</td>
        <td>{this.props.producto.precioUnitario}</td>
        <td>{this.props.producto.habilitado == true ? "si" : "no"}</td>

        <td>
          <Button
            color="danger"
            size="btn-xs"
            onClick={() => this.eliminarProducto(this.props.producto.imagenId,this.props.producto.id)}
          >
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            color="warning"
            size="btn-xs"
            onClick={this.editarProducto}
          >
            <i className="fa fa-dot-circle-o">{""}</i>
          </Button>
          &nbsp;&nbsp;
        </td>
      </tr>
    );
  };
}

export default Producto;
