import React from "react";
import { Button, Collapse } from "reactstrap";

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
      codigoPedido: props.codigoPedido,
    };
  }

  componentWillMount = () => {
    this.listadoResponsablesDeMesa();
    this.setState({
      secciones: this.state.secciones,
      seccion: this.state.seccion,
      id: this.state.id,
    });
  };

  // componentDidMount() {
  //   this.setState(
  //     { seccion: this.state.seccion },
  //     console.log("didMountrow", this.state.seccion)
  //   );
  // }

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

  guardar = () => {
    this.props.crearPedido(this.state.seccion);
    // this.props.toggle();
  };

  limpiar = () => {
    document.getElementById("nombre").value = "";
    this.listadoResponsablesDeMesa();
    document.getElementById("seccion").value = "";
    this.setState({ seccion:"" });
    this.setState({ secciones: this.state.secciones });
  };
  event = (e) => {
    e.preventDefault();
  };

  render = () => {
    let secciones = this.state.secciones;
    return (
      <tr>
        <td>{this.state.codigoPedido}</td>
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
            key="seccion"
            type="text"
            id="seccion"
            name="seccion"
            value={this.state.seccion}
            onChange={this.handleChangeSeccion}
            list="secciones"
            placeholder="Elige sección"
            className="form-control"
            autoComplete={true}
            onSubmit={this.event}
            // required={true}
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
