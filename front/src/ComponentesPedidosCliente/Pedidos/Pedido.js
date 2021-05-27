import React from "react";
import { Button } from "reactstrap";

class Pedido extends React.Component {
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
      id: props.id,
    };
    this.eliminarPedido = this.eliminarPedido.bind(this);
  }

  componentWillMount = () => {
    this.listadoResponsablesDeMesa();
    this.setState({
      secciones: this.state.secciones,
      seccion: this.state.seccion,
      id: this.state.id,
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
    this.setState({
      pedido: nuevoPedido,
      seccion: nuevoPedido.seccion,
    });
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
  eliminarPedido = (id) => {
    fetch("http://localhost:8383/pedidos/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.props.actualizarAlEliminar(this.props.pedido));
  };

  editar() {
    this.props.editarPedidoFetch(this.props.pedido);
    this.props.toggle();
  }

  seleccionarPedido() {
    this.props.selector(this.props.pedido);
    this.props.toggle();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido });
    }
  }

  guardar = () => {
    this.props.crearPedido();
    // this.obtenerUltimoId(this.state.pedidos);
  };

  limpiar = () => {
    document.getElementById("nombre").value = "";
    this.listadoResponsablesDeMesa();
    this.setState({ seccion: "" });
    this.setState({ secciones: this.state.secciones });
  };

  render = () => {
    let secciones = this.state.secciones;
    return (
      <tr>
        <td>{this.state.pedido.id}</td>
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

          <datalist id="responsable" autoComplete="on">
            {this.state.responsablesDeMesa.map((responsable, index) => {
              return <option key={index} value={responsable.nombre} />;
            })}
          </datalist>
        </td>
        <td>
          {" "}
          <input
            type="text"
            id="seccion"
            name="seccion"
            value={this.state.seccion}
            onChange={this.handleChangeSeccion.bind(this)}
            list="secciones"
            placeholder="Elige sección"
            className="form-control"
          />
          <datalist id="secciones" autoComplete="on">
            {secciones.map((seccion, index) => {
              return (
                <option key={index} id={seccion.id} value={seccion.name} />
              );
            })}
          </datalist>
        </td>
        <td>hora</td>
        {/* <td>{this.props.pedido.habilitado? "si":"no"}</td> */}
        <td>
          <Button color="info" size="btn-xs" onClick={() => this.limpiar()}>
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
          <Button color="info" size="btn-xs" onClick={() => this.guardar()}>
            <i className="fa fa-dot-circle-o">{""}</i>
          </Button>{" "}
          {/* <Button
            color="info"
            size="btn-xs"
            onClick={() => this.obtenerIdPedido(this.state.id)}
          >
            <i className="fa fa-dot-circle-o">{""} ID</i>
          </Button>{" "} */}
        </td>
      </tr>
    );
  };
}

export default Pedido;
