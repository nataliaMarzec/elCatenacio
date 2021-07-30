import React from "react";
import { Button, Collapse } from "reactstrap";
import { limpiar } from "../funciones"
class TablaPedidoEditarRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      responsablesDeMesa: props.responsablesDeMesa,
      responsable: props.responsable,
      secciones: [
        { id: 1, name: "Abierta" },
        { id: 2, name: "Carpa" },
      ],
      // seccion: "",
      // secciones: props.secciones,
      // seccionEditable: props.seccion,
      // nombreResponsableEditable:props.nombreResponsableEditable,
      pedido: props.pedido,
      pedidos: props.pedidos,
      nuevoPedido: props.nuevoPedido
    };
    this.input = React.createRef();
    this.limpiar = this.limpiar.bind(this)
    this.handleChangeResponsable = this.handleChangeResponsable.bind(this)
    this.handleChangeSeccion = this.handleChangeSeccion.bind(this)
    this.handleChangeObservaciones = this.handleChangeObservaciones.bind(this)
  }

  componentWillMount = () => {
    this.listadoResponsablesDeMesa();
    this.setState({
      pedido: this.state.pedido,
      responsable:this.state.responsable,
      secciones: this.state.secciones,
      seccion: this.state.seccion,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido }        
        , () => console.log("PEDIDO-ROW", nextProps.pedido));
      }
    if (nextProps.responsablesDeMesa !== this.props.responsablesDeMesa) {
      this.setState({ responsablesDeMesa: nextProps.responsablesDeMesa });
    }
    if (nextProps.responsable !== this.props.responsable) {
      this.setState({ responsable: nextProps.responsable })
        // , () => console.log("RESPONSABLE-ROW", nextProps.responsable));
    }

  }
  
  handleChangeResponsable = (e) => {
    var nuevoResponsable = Object.assign({}, this.state.responsable);
    nuevoResponsable[e.target.name] = e.target.value;
    this.setState({ responsable: nuevoResponsable },
      () => console.log("RESPONSABLE--", nuevoResponsable.nombre)
    );
    this.props.envioDeEstadoResponsableEditar(nuevoResponsable.nombre)
  };

  handleChangeSeccion = (e) => {
    var nuevoPedido = Object.assign({}, this.state.pedido);
    nuevoPedido[e.target.name] = e.target.value;
    this.setState({ pedido:nuevoPedido},
      () => console.log("SECCIONES---", nuevoPedido.seccion)
    );
    this.props.envioDeSeccionEditar(nuevoPedido.seccion)
  };
  handleChangeObservaciones = (e) => {
    var nuevoPedido = Object.assign({}, this.state.pedido);
    nuevoPedido[e.target.name] = e.target.value;
    this.setState({ pedido: nuevoPedido }
      , () => console.log("observacionesEnvio", nuevoPedido.observaciones)
    );
    this.props.envioDeObservacionesEditar(nuevoPedido.observaciones)
  };

  listadoResponsablesDeMesa = () => {
    fetch(`http://localhost:8383/responsables`)
      .then((res) => res.json())
      .then((resps) =>
        this.setState({ responsablesDeMesa: resps, responsable: {} })
      );
  };

  limpiar = () => {
    this.setState({ pedido: { seccion: "", observaciones: "" }, responsable: {nombre:""} }
    , () => this.forceUpdate()
      , () => console.log("limpiar", this.state.pedido, this.state.responsable.nombre))
    this.listadoResponsablesDeMesa();
    this.setState({ secciones: this.state.secciones });
  };


  render = () => {
    return (
      <tr>
        <td>
          <input
            type="text"
            id="nombre"
            name="nombre"
            ref="nombre"
            onChange={this.handleChangeResponsable}
            list="responsablesDeMesa"
            value={this.state.responsable.nombre}
            className="form-control"
          />
          <datalist id="responsablesDeMesa">
          {this.state.responsablesDeMesa.map((responsable,index) => {
            return (
              <option id={responsable.id} value={responsable.nombre} />
            );
          })}</datalist>
        </td>
        <td>
          {" "}
          <input
            type="text"
            id="seccion"
            name="seccion"
            ref="seccion"
            onChange={this.handleChangeSeccion}
            list="secciones"
            value={this.state.pedido.seccion}
            className="form-control"
          
          />
          <datalist id="secciones">
            {this.state.secciones.map((seccion, index) => {
              return (
                <option id={seccion.id} value={seccion.name} />
              );
            })}
          </datalist>
        </td>
        <td><input
          key="observaciones"
          type="text"
          id="observaciones"
          name="observaciones"
          value={this.state.pedido.observaciones}
          ref={this.input}
          onChange={this.handleChangeObservaciones}
          className="form-control"
        /></td>

        <td>
          <Button color="danger" size="btn-xs" onClick={() => this.limpiar()}>
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
        </td>
      </tr>
    );
  };
}

export default TablaPedidoEditarRow;
