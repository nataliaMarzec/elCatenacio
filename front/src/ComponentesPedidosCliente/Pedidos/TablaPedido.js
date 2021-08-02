import React from "react";
import TablaPedidoRow from "./TablaPedidoRow";
import TablaPedidoEditarRow from "./EditarRows/TablaPedidoEditarRow";
import { Table, Container, Card, Form, FormGroup, Input, Col, Button } from "reactstrap";
class TablaPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: props.pedido,
      pedidos: props.pedidos,
      unPedido: props.unPedido,
      responsablesDeMesa: props.responsablesDeMesa,
      responsable: props.responsable || {},
      itemsPedido: props.itemsPedido,
      itemsDePedidoElegido: props.itemsDePedidoElegido,
      productos: props.productos || [],
      producto: props.producto || {},
      cliente: props.cliente || {},
      modal: false,
      codigo: "",
      descripcion: "",
      productoId: props.productoId,
      items: props.items || [],
      item: props.item || {},
      seleccionado: {},
      codigoPedido: props.codigoPedido,
      editable: props.editable,
      secciones: props.secciones,
      id: "",
      idPedidoTabla: props.idPedidoTabla,
      limpiarPedidoEditar: props.limpiarPedidoEditar,
    };
    // this.elegirId = this.elegirId.bind(this)
  }
  // componentDidUpdate(prevProps) {
  //   // Uso tipico (no olvides de comparar las props):
  //   if (this.props.limpiar !== prevProps.limpiar) {
  //     // this.fetchData(this.props.userID);
  //     this.props.limpiar()
  //   }
  // }


  estadoInicial = () => {
    this.setState({
      pedido: {
        clienteId: null,
        codigoPedido: "",
        mesero: "",
        seccion: "",
        observaciones: "",
        entregado: false,
        fecha: "",
        hora: "",
        ItemsPedido: [
          {
            cantidad: 1,
            importeTotal: 0,
            Productos: {
              descripcion: "",
              precioUnitario: 0,
            },
          },
        ],
      },
    });
  };
  componentWillMount() {
    this.props.listadoPedidos();
    this.props.listadoItemsPedido();
    this.props.listadoProductos();
    this.props.listadoResponsables();
    this.setState({ editable: this.state.editable, id: "", idPedidoTabla: this.state.idPedidoTabla }
      , console.log("id", this.state.id)
    );
    this.setState({
      unPedido: this.state.unPedido, pedido: this.state.pedido, secciones: this.state.secciones
      , itemsPedido: this.state.itemsPedido, responsablesDeMesa: this.state.responsablesDeMesa,
      itemsDePedidoElegido: this.state.itemsDePedidoElegido
    }
      // , () => console.log("willunPedido", this.state.pedido)
    )
  }


  componentWillReceiveProps(props) {
    this.setState({ editable: props.editable })
    this.setState({ secciones: props.secciones })
    // this.setState({unPedido:props.unPedido},()=>console.log("unPedido",this.state.unPedido))
    this.setState({ confirmar: props.confirmar })
    this.setState({ pedidos: props.pedidos }, () => console.log("pedidos_tbl", props.pedidos))
    this.setState({ pedido: props.pedido }, () => console.log("pedido_tbl", props.pedido))
    this.setState({ items: props.items },)
    this.setState({ item: props.item },)
    this.setState({ idPedidoTabla: props.idPedidoTabla },)
    this.setState({ itemsDePedidoElegido: props.itemsDePedidoElegido })
    this.setState({ responsablesDeMesa: props.responsablesDeMesa })
    this.setState({ responsable: props.responsable })
    this.setState({ limpiarPedidoEditar: props.limpiarPedidoEditar })
    this.setState({
      seccionEditable: props.seccionEditable
      , observacionesEditable: props.observacionesEditable
      , nombreResponsableEditable: props.nombreResponsableEditable, nombre: props.nombre
    })
    // this.props.refs.tablaPedido;
    // this.setState({ responsable: props.responsable },)
  }



  handleSubmit = (e) => {
    var busqueda;
    if (this.state.pedido.id === "") {
      this.listadoBusqueda(busqueda);
      this.setState({limpiarPedidoEditar:false})
      this.setState({pedido:{}})
    }
    if (this.state.pedido.id !== "") {
      busqueda = '?busqueda=id=="' + this.state.pedido.id + '"';
      this.listadoBusqueda(busqueda);
     
      // this.elegirId(this.state.pedido.id)
    }
    e.preventDefault(e);
  };


  listadoBusqueda = (busqueda) => {
    // "/pedido/busqueda/:id"
    if (busqueda != null) {
      fetch(`http://localhost:8383/pedido` + busqueda)
        .then((res) => res.json())
        .then((pedidos) => this.setState({ pedidos: pedidos }));
    }
    if (this.state.limpiarPedidoEditar === true) {
      fetch(`http://localhost:8383/pedido`)
        .then((res) => res.json())
        .then((pedidos) => this.setState({ pedidos: pedidos, pedido: { id: "" } }));
    }
  };
  limpiarTabla = () => {
    this.setState({seccionEditable:"",observacionesEditable:""
    ,pedido:{id:null,seccion:"",observaciones:""},responsable:{}
    ,itemsDePedidoElegido:[]})
    document.getElementById("id").value = "";
    // this.setState({idPedidoTabla:""})
    this.props.limpiarItemsDePedidoElegidoDeTabla()
    this.props.listadoPedidos()
    this.props.listadoResponsables()
  };

  handleChange = (e) => {
    var nuevoPedido = Object.assign({}, this.state.pedido);
    nuevoPedido[e.target.name] = e.target.value;
      this.setState(
        { pedido: nuevoPedido }, () => this.props.elegirId(nuevoPedido.id)) 
        // this.props.confirmarPedidoTablaEditar(nuevoPedido)  
  };

  onChangeDataList = (e) => {
    document.getElementById("id").value = "";
    this.props.limpiarItemsDePedidoElegidoDeTabla()
    this.props.listadoPedidos()
    this.props.listadoResponsables()
    this.setState({limpiarPedidoEditar:false})
    e.preventDefault(e)
    console.log("e",e)
  }


  render() {
    let pedidos = this.state.pedidos;
    let editable = this.state.editable;
    // console.log("itemsTabla", this.state.itemsDePedidoElegido)
    var listaIdsPedidos = this.state.pedidos.map((pedido) => {
      let unPedido = this.state.pedido;
      unPedido = pedido;
      // console.log("id listaIds",pedido)
      return (
        <div>
          <option data-value="" value={pedido.id} id={pedido.id} />
        </div>
      );
    });

    return (
      <Container>
        <React.Fragment>
          {editable == true &&
            <Card>
              <Form id="formulario" onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="id"
                      name="id"
                      value={this.state.pedido.id}
                      placeholder="Elegir id"
                      onChange={this.state.limpiarPedidoEditar === true ? this.onChangeDataList : this.handleChange}
                      list="pedidos"
                    />
                  </Col>
                  <datalist id="pedidos" onChange={this.onChangeDataList } >{listaIdsPedidos}</datalist>
                </FormGroup>
                <div className="row">
                  <div className="input-field col s12 m12">
                    {/* <Button
                      type="button"
                      style={{ margin: "2px" }}
                      color="info"
                      outline
                      onClick={() =>
                        this.elegirId(this.state.id)
                      }
                    >
                      <i className="fa fa-dot-circle-o"></i> Elegir Pedido
                    </Button> */}
                    <Button
                      type="button"
                      style={{ margin: "2px" }}
                      color="success"
                      outline
                      onClick={this.limpiarTabla}
                    >
                      <i className="fa fa-dot-circle-o"></i> Limpiar id
                    </Button>
                  </div>
                </div>
              </Form>
            </Card>

          }
        </React.Fragment>

        <React.Fragment>{editable == false &&
          <Table
            responsive
            bordered
            size="sm"
            style={{ backgroundColor: "#eee363" }}
          >
            <thead>
              <tr>
                <th>Responsable de mesa</th>
                <th>Sección</th>
              </tr>
            </thead>
            <tbody>{this.tablaPedidoRow()}</tbody>
          </Table>}
        </React.Fragment>
        <React.Fragment>{editable == true && this.state.pedido.id !== undefined &&
          <Table
            responsive
            bordered
            size="sm"
            style={{ backgroundColor: "#eee363" }}
          >
            <thead>
              <tr>
                <th>Responsable de mesa</th>
                <th>Sección</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>{this.tablaPedidoEditarRow(pedidos, this.state.pedido)}</tbody>
          </Table>}
        </React.Fragment>

      </Container>
    );
  }

  tablaPedidoRow = () => {
    const { envioDePedido } = this.props;
    const { envioDeEstadoResponsable } = this.props
    return (
      <TablaPedidoRow
        unPedido={this.state.unPedido}
        responsablesDeMesa={this.state.responsablesDeMesa}
        listadoResponsables={this.props.listadoResponsables}
        responsable={this.state.responsable}
        nombre={this.state.responsable.nombre}
        seccion={this.state.unPedido.seccion}
        secciones={this.state.secciones}
        envioDePedido={envioDePedido}
        envioDeEstadoResponsable={envioDeEstadoResponsable}
        listadoPedidos={this.props.listadoPedidos}

      />
    );
  };
  tablaPedidoEditarRow = (pedidos, pedido) => {
    const { envioDeEstadoResponsableEditar } = this.props
    const { envioDeSeccionEditar } = this.props
    const { envioDeObservacionesEditar } = this.props
    const { envioDeEstadoLimpiarPedido } = this.props
    if (pedido) {
      // let responsable= this.state.responsablesDeMesa.find(r=>r.id_responsable==pedido.responsableId) 
      return (
        <TablaPedidoEditarRow
          pedido={pedido}
          pedidos={pedidos}
          responsablesDeMesa={this.state.responsablesDeMesa}
          responsable={this.state.responsable}
          listadoPedidos={this.props.listadoPedidos}
          envioDeEstadoResponsableEditar={envioDeEstadoResponsableEditar}
          envioDeSeccionEditar={envioDeSeccionEditar}
          envioDeObservacionesEditar={envioDeObservacionesEditar}
          envioDeEstadoLimpiarPedido={envioDeEstadoLimpiarPedido}
        />
      )
    }



  };

}
export default TablaPedido;
