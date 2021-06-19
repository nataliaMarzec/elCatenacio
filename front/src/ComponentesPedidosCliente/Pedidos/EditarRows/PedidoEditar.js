import React from "react";
import { Button, Collapse } from "reactstrap";
import { limpiar } from "../funciones"
class PedidoEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toogle: this.props.toggle,
      nombre: "",
      responsablesDeMesa: [],
      responsable: {},
      secciones: [
        { id: 1, name: "Abierta" },
        { id: 2, name: "Carpa" },
      ],
      seccion: "",
      pedido: props.pedido,
      pedidos: props.pedidos,
      codigoPedido: props.codigoPedido,
    };
    this.handleChangeSeccion = this.handleChangeSeccion.bind(this);
    this.limpiar = this.limpiar.bind(this)
  }

  componentWillMount = () => {
    this.listadoResponsablesDeMesa();
    this.setState({
      secciones: this.state.secciones,
      seccion: this.state.seccion,
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
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
        seccion: nuevoPedido.seccion,
      },
      this.props.envioDePedido(nuevoPedido.seccion, this.state.secciones)
    );

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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido });
    }
    if (nextProps.codigoPedido !== this.props.codigoPedido) {
      this.setState({ codigoPedido: nextProps.codigoPedido });
    }
  }

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
          key="codigoPedido"
          type="text"
          id="codigoPedido"
          name="codigoPedido"
          value={this.state.codigoPedido}
          // onChange={this.handleChange}
          className="form-control"
          autoComplete="true"
        /></td>
        <td><input
          key="responsableDeMesa"
          type="text"
          id="responsableDeMesa"
          name="responsableDeMesa"
          value={this.state.responsableDeMesa}
          // onChange={this.handleChange}
          className="form-control"
          autoComplete="true"
        /></td>
        <td> <input
          key="seccion"
          type="text"
          id="seccion"
          name="seccion"
          value={this.state.seccion}
          onChange={this.handleChangeSeccion}
          className="form-control"
          autoComplete="true"
        /></td>
        <td>hora</td>
        {/* <td>{this.props.pedido.habilitado? "si":"no"}</td> */}
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

export default PedidoEditar;
