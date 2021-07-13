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
      pedidos: props.pedidos,
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
      id: this.state.id,
      nomb: this.state.nomb,
    });
    // this.setState({ refSeccion: this.state.refSeccion })
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
  // componentDidMount() {
  //  this.state.refSeccion.current.focus();
  //  this.setState({refSeccion:this.state.refSeccion.current.value
  //  ,confirmar:true},()=>console.log("refconvalue",this.state.refSeccion))
  //  if(this.state.confirmar==true){
  //    this.setState({seccion:""})
  //  }
  // }
  


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
    // console.log("responsable", this.state.nombre, value);
  };

  handleChangeSeccion(e) {
    let unPedido = this.state.unPedido
    var nuevoPedido = Object.assign({}, this.state.unPedido);
    nuevoPedido[e.target.name] = e.target.value;
    unPedido = nuevoPedido
    // this.props.limpiarSeccion(nuevoPedido)
    this.setState({ unPedido: unPedido }
      , () => console.log("nuevoseccion/handle", this.state.unPedido, nuevoPedido),
      this.props.envioDePedido(nuevoPedido.seccion)
    );
    // console.log("evento", `${e.target.name}:${e.target.value}`);
  };

  limpiarSeccion(nuevoPedido) {
    if (this.props.confirmar == true) {
      this.props.limpiarSeccion(nuevoPedido)
    }
  }

  componentDidUpdate(nextProps){
    if(nextProps.responsablesDeMesa != this.props.responsablesDeMesa){
      this.setState({responsablesDeMesa:nextProps.responsablesDeMesa})
    }
    if(nextProps.responsable != this.props.responsable){
      this.setState({responsable:nextProps.responsable})
    }
    if (nextProps.secciones !== this.props.secciones) {
      this.setState({ secciones: nextProps.secciones }
        , () => console.log("updateSecciones",nextProps.secciones));
    }
    if (nextProps.unPedido !== this.props.unPedido) {
      this.setState({ unPedido: nextProps.unPedido }
        , () => console.log("updateunPedido",nextProps.unPedido));
    }
  }

  // handleChangeSeccion = (e) => {
  //   var nuevoPedido = Object.assign({}, this.state.unPedido);
  //   nuevoPedido[e.target.name] = e.target.value;
  //   this.setState(
  //     {
  //       pedido: nuevoPedido,
  //       seccion: nuevoPedido.seccion,
  //     },
  //     ()=>console.log("handleEvent",this.state.seccion),
  //     this.props.envioDePedido(nuevoPedido.seccion
  //       , this.state.secciones)

  //   );
  //   // this.props.handleEvent(e)
  // };

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
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
    }
    if (nextProps.unPedido !== this.props.unPedido) {
      this.setState({ unPedido: nextProps.unPedido });
    }
    if (nextProps.codigoPedido !== this.props.codigoPedido) {
      this.setState({ codigoPedido: nextProps.codigoPedido });
    }
    if (nextProps.secciones !== this.props.secciones) {
      this.setState({ secciones: nextProps.secciones });
    }
    if (nextProps.responsablesDeMesa !== this.props.responsablesDeMesa) {
      this.setState({ responsablesDeMesa: nextProps.responsablesDeMesa },
        console.log("respDeMesa", this.props.responsablesDeMesa));
    }
    if (nextProps.nombre !== this.props.nombre) {
      this.setState({ nombre: nextProps.nombre });
    }
    // if (nextProps.confirmar !== this.props.confirmar) {
    //   this.setState({ confirmar: nextProps.confirmar });
    // }
    // if (nextProps.refSeccion !== this.props.refSeccion) {
    //   this.setState({ refSeccion: nextProps.refSeccion });
    // }
  }

  limpiar = () => {
    // if(this.state.seccion != null)
    document.getElementById("nombre").value = ""
    this.listadoResponsables();
    // this.setState({refSeccion:""})
    document.getElementById("seccion").value = ""
    this.setState({ unPedido: { seccion: "" } });
    this.setState({ secciones: this.state.secciones });
  };

  obtenerResponsable(resp) {
    console.log("respObtener", resp)
    return resp
  }

  listaResponsables(){
    console.log("listaResponsables",this.props.responsablesDeMesa)
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
    let resp = this.state.resp
    let id = this.state.id
    let nomb = this.state.nomb
  
    console.log("listarResponsablesMap", this.state.listaResponsables);
    return (
      <tr onSubmit={this.props.handleEvent}>
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
            ref="seccion"
            // value={this.state.seccion}
            // ref={this.state.refSeccion}
            onChange={this.handleChangeSeccion}
            list="secciones"
            placeholder="Elige sección"
            className="form-control"
            autoComplete="true"
            onSubmit={this.event}
          // required={true}
          />
          {/* <datalist ref={this.seccionesComponent} value={this.state.seccion} id="secciones" autoComplete="on"> */}
          <datalist ref={this.seccionesComponent} id="secciones" autoComplete="on">
            {secciones.map((seccion, index) => {
              return (
                <option key={index} id={seccion.id} value={seccion.name} />
              );
            })}
          </datalist>
        </td>
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

export default TablaPedidoRow;
