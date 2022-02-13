import React,{useContext} from "react";
import { Button } from "reactstrap";

class ResponsableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: this.props.toggle,
    };
    this.eliminarResponsable = this.eliminarResponsable.bind(this);
    this.seleccionarResponsable = this.seleccionarResponsable.bind(this);
  }

  eliminarResponsable = (id) => {
    // var answer = window.confirm(
    //   "¿ELIMINAR  " + this.props.responsable.nombre + " ?"
    // );
    // if (answer) {
      fetch("http://localhost:8383/responsable/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(this.props.actualizarAlEliminar(this.props.responsable));
    // }
  };

  seleccionarResponsable() {
    this.props.selector(this.props.responsable);
    console.log("seleccionar___", this.props.responsable);
    this.props.toggle();
  }

  agregarVenta = () => {
    this.props.responsableSeleccionado(this.props.responsable);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.responsables !== this.props.responsables) {
      this.setState({ responsables: this.props.responsables });
    }
    if (nextProps.responsable !== this.props.responsable) {
      this.setState({ responsable: nextProps.responsable });
    }
  }

  render = () => {
    return (
      <tr>
      <td>{this.props.responsable.id_responsable}</td>
        <td>{this.props.responsable.nombre}</td>
        <td>{this.props.responsable.direccion}</td>
        <td>{this.props.responsable.telefono}</td>
        <td>{this.props.responsable.username}</td>
        <td>{this.props.responsable.email}</td>
        <td>{this.props.responsable.rol}</td>
        
        <td>
          <Button
            color="danger"
            size="btn-xs"
            onClick={() => this.eliminarResponsable(this.props.responsable.id_responsable)}
          >
            {/* <Col xs="10" sm="8" md="4" xl="1"> */}
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            color="info"
            size="btn-xs"
            onClick={this.seleccionarResponsable}
          >
            <i className="fa fa-dot-circle-o">{""}</i>
          </Button>
         
        </td>
      </tr>
    );
  };
}

export default ResponsableRow;
