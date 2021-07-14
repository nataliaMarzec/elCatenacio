import React from "react";
import { Button, Collapse } from "reactstrap";
import { limpiar } from "./funciones"
class TablaPedidoRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsablesDeMesa: props.responsablesDeMesa,
      responsable: props.responsable,
      secciones: props.secciones,
      seccion: props.seccion,
      pedido: props.pedido,
      unPedido: props.unPedido,
      nombre: props.nombre,
    };
    this.handleChangeSeccion = this.handleChangeSeccion.bind(this);
    this.limpiar = this.limpiar.bind(this)
    this.handleChangeResponsable = this.handleChangeResponsable.bind(this)
    this.listaResponsables=this.listaResponsables.bind(this)
    this.seccionesComponent = React.createRef()

  }

  componentWillMount = () => {
    this.props.listadoResponsables();
    this.listaResponsables()
    this.setState({
      responsablesDeMesa:this.state.responsablesDeMesa,
      secciones: this.state.secciones,
      seccion: this.state.seccion,
      nombre: this.state.nombre,
    });
  };

  listadoResponsables = () => {
    fetch(`http://localhost:8383/responsables`)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          responsablesDeMesa: res,
          responsable: {},
        })
      );
  };

  verDetallesResponsable(nombre) {
    var listaActualizada = this.state.responsablesDeMesa.filter(
      (resp) => nombre == resp.nombre
    );
    this.setState({ responsablesDeMesa: listaActualizada });
  }

  handleChangeResponsable = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    this.setState({ nombre: value });
    this.props.envioDeEstadoResponsable(value)
  };

  handleChangeSeccion(e) {
    let unPedido = this.state.unPedido
    var nuevoPedido = Object.assign({}, this.state.unPedido);
    nuevoPedido[e.target.name] = e.target.value;
    unPedido = nuevoPedido
    this.setState({ unPedido: unPedido },
      this.props.envioDePedido(nuevoPedido.seccion));
  };


  componentDidUpdate(nextProps){
    if(nextProps.responsablesDeMesa != this.props.responsablesDeMesa){
      this.setState({responsablesDeMesa:nextProps.responsablesDeMesa})
    }
    if(nextProps.responsable != this.props.responsable){
      this.setState({responsable:nextProps.responsable})
    }
    if (nextProps.secciones !== this.props.secciones) {
      this.setState({ secciones: nextProps.secciones });
    }
    if (nextProps.unPedido !== this.props.unPedido) {
      this.setState({ unPedido: nextProps.unPedido });
    }
  }

  handleSubmitResponsable = (e) => {
    var busqueda;
    if (this.state.nombre === "") {
      this.listadoBusqueda(busqueda);
    }
    if (this.state.nombre !== "") {
      busqueda = '?busqueda=nombre=="' + this.state.nombre + '"';
      this.listadoBusqueda(busqueda);
    }
    e.preventDefault(e);
  };

  listadoBusqueda = (busqueda) => {
    if (busqueda != null) {
      fetch(`http://localhost:8383/responsables` + busqueda)
        .then((res) => res.json())
        .then((resp) => this.setState({ responsablesDeMesa: resp }));
    }
    if (busqueda == null) {
      fetch(`http://localhost:8383/responsables`)
        .then((res) => res.json())
        .then((resp) => this.setState({ responsablesDeMesa: resp }));
    }
  };

  listadoResponsables = () => {
    fetch(`http://localhost:8383/responsables`)
      .then((res) => res.json())
      .then((resps) =>
        this.setState({ responsablesDeMesa: resps, responsable: {} })
      );
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.unPedido !== this.props.unPedido) {
      this.setState({ unPedido: nextProps.unPedido });
    }
    if (nextProps.secciones !== this.props.secciones) {
      this.setState({ secciones: nextProps.secciones });
    }
    if (nextProps.responsablesDeMesa !== this.props.responsablesDeMesa) {
      this.setState({ responsablesDeMesa: nextProps.responsablesDeMesa });
    }
    if (nextProps.nombre !== this.props.nombre) {
      this.setState({ nombre: nextProps.nombre });
    }
  }

  limpiar = () => {
    document.getElementById("nombre").value = ""
    this.listadoResponsables();
    document.getElementById("seccion").value = ""
    this.setState({ unPedido: { seccion: "" } });
    this.setState({ secciones: this.state.secciones });
  };


  listaResponsables(){
    var listaResponsables = this.props.responsablesDeMesa.map((responsable) => {
      return (
        <div>
          <option value={responsable.nombre} />
        </div>
      );
    });
    return listaResponsables;
  }
  
  render = () => {
    let secciones = this.state.secciones;
    return (
      <tr>
        <td>
          <input
            type="text"
            id="nombre"
            ref="nombre"
            onChange={this.handleChangeResponsable}
            list="responsable"
            placeholder="Elige responsable"
            className="form-control"
          />
          <datalist id="responsable">{this.listaResponsables()}</datalist>
        </td>
        <td>
          {" "}
          <input
            type="text"
            id="seccion"
            name="seccion"
            onChange={this.handleChangeSeccion}
            list="secciones"
            placeholder="Elige sección"
            className="form-control"
            autoComplete="true"
          />
          <datalist ref={this.seccionesComponent} id="secciones" autoComplete="on">
            {secciones.map((seccion, index) => {
              return (
                <option key={index} id={seccion.id} value={seccion.name} />
              );
            })}
          </datalist>
        </td>
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

export default TablaPedidoRow;
