import React,{useContext} from "react";
import { Button } from "reactstrap";

class PedidoDeResponsableRow extends React.Component {
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
      }).then(this.props.actualizarAlEliminar(this.props.responsable,this.props.usuario));
    // }
  };

  seleccionarResponsable(unUsuario,unResponsable) {
    this.props.selector(unUsuario,unResponsable);
    console.log("seleccionar___", this.props.responsable);
    this.props.toggle();
  }

  agregarVenta = () => {
    this.props.responsableSeleccionado(this.props.responsable);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.usuarios !== this.props.usuarios) {
      this.setState({ usuarios:nextProps.usuarios });
    }
    if (nextProps.usuario !== this.props.usuario) {
      this.setState({ usuario: nextProps.usuario });
    }
    if (nextProps.responsables !== this.props.responsables) {
      this.setState({ responsables: nextProps.responsables });
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
        <td>{this.props.usuario.username}</td>
        <td>{this.props.usuario.email}</td>
        <td>{this.props.usuario.rol}</td>
        
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
            onClick={()=>this.seleccionarResponsable(this.props.usuario,this.props.responsable)}
          >
            <i className="fa fa-dot-circle-o">{""}</i>
          </Button>
         
        </td>
      </tr>
    );
  };
}

export default PedidoDeResponsableRow;