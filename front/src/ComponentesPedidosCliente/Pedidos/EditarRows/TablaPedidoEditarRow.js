import React from "react";
import { Button, Collapse } from "reactstrap";
import { limpiar } from "../funciones"
class TablaPedidoEditarRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      responsablesDeMesa: [],
      responsable: {},
      secciones: [
        { id: 1, name: "Abierta" },
        { id: 2, name: "Carpa" },
      ],
      seccion: "",
      pedido: props.pedido || {},
      pedidos: props.pedidos,
      nuevoPedido:props.nuevoPedido
    };
    this.input = React.createRef();
    this.limpiar = this.limpiar.bind(this)
  }

  componentWillMount = () => {
    this.listadoResponsablesDeMesa();
    this.setState({
      pedido:this.state.pedido,
      secciones: this.state.secciones,
      seccion: this.state.seccion,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido });
    }
 
  }


  verDetallesResponsable(nombre) {
    var listaActualizada = this.state.responsablesDeMesa.filter(
      (item) => nombre == item.nombre
    );
    this.setState({ responsablesDeMesa: listaActualizada });
  }
  handleChangeResponsable = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    this.setState({ responsable: value });
    // console.log("responsable", this.state.responsable, value);
  };

  handleChangeSeccion = (e) => {
    var nuevoPedido = Object.assign({}, this.state.pedido);
    nuevoPedido[e.target.name] = e.target.value;
    this.setState(
      {
        pedido: nuevoPedido,
        seccion:nuevoPedido.seccion
      },
    );
  };
  handleChangeObservaciones = (e) => {
    var nuevoPedido = Object.assign({}, this.state.pedido);
    nuevoPedido[e.target.name] = e.target.value;
    this.setState(
      {
        pedido: nuevoPedido,
        observaciones:nuevoPedido.observaciones
      },
    );
  };
  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    // this.setState({ [name]: value });
  };

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

  listadoResponsablesDeMesa = () => {
    fetch(`http://localhost:8383/responsables`)
      .then((res) => res.json())
      .then((resps) =>
        this.setState({ responsablesDeMesa: resps, responsable: {} })
      );
  };

 

  limpiar = () => {
    document.getElementById("nombre").value = "";
    this.listadoResponsablesDeMesa();
    document.getElementById("seccion").value = "";
    this.setState({ seccion: "" });
    // this.props.envioDeEstadoLimpiarPedido(this.state.seccion)
    this.setState({ secciones: this.state.secciones });
  };

  render = () => {
    return (
      <tr>
        <td><input
          key="responsableDeMesa"
          type="text"
          id="responsableDeMesa"
          name="responsableDeMesa"
          value={this.state.responsablesDeMesa}
          // onChange={this.handleChange}
          className="form-control"
          autoComplete="true"
        /></td>
        <td> <input
          key="seccion"
          type="text"
          id="seccion"
          name="seccion"
          value={this.props.pedido.seccion}
          ref={this.input}
          defaultValue={this.props.pedido.seccion}
          onChange={this.handleChange}
          className="form-control"
        /></td>
        <td><input
          key="observaciones"
          type="text"
          id="observaciones"
          name="observaciones"
          value={this.props.pedido.observaciones}
          ref={this.input}
          defaultValue={this.props.pedido.observaciones}
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
