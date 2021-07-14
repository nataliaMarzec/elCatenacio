import React from "react";
import TablaPedidoRow from "./TablaPedidoRow";
import TablaPedidoEditarRow from "./EditarRows/TablaPedidoEditarRow";
import { Table, Container, Card, Form, FormGroup, Input, Col, Button } from "reactstrap";
class TablaPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: {},
      pedidos: [],
      unPedido: props.unPedido,
      responsablesDeMesa:props.responsablesDeMesa,
      responsable:props.responsable,
      itemsPedido:props.itemsPedido,
      productos: props.productos || [],
      producto: props.producto || {},
      cliente: props.cliente || {},
      modal: false,
      codigo: "",
      descripcion: "",
      productoId: props.productoId,
      items: props.items || [],
      seleccionado: {},
      codigoPedido: props.codigoPedido,
      editable: props.editable,
      secciones: props.secciones,
      id: ""
    };
    this.elegirId = this.elegirId.bind(this)
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
    this.setState({ editable: this.state.editable, id: "" }, console.log("id", this.state.id));
    this.setState({ unPedido: this.state.unPedido, pedido: this.state.pedido
      ,itemsPedido:this.state.itemsPedido,responsablesDeMesa:this.state.responsablesDeMesa }
      , () => console.log("willunPedido", this.state.pedido)
    )
  }


  componentWillReceiveProps(props) {
    this.setState({ editable: props.editable })
    this.setState({ secciones: props.secciones })
    // this.setState({unPedido:props.unPedido},()=>console.log("unPedido",this.state.unPedido))
    this.setState({ confirmar: props.confirmar })
    this.setState({ pedidos: props.pedidos })
      // , () => console.log("propsPEDIDOS", this.state.pedidos)
    this.setState({ pedido: props.pedido } )
      // , () => console.log("propsPEDIDOS", this.state.pedido)
    this.setState({ itemsPedido: props.itemsPedido},)
    this.setState({ responsablesDeMesa: props.responsablesDeMesa})
    this.setState({ responsable: props.responsable},)
  }

  handleSubmit = (e) => {
    var busqueda;
    if (this.state.id === "") {
      this.listadoBusqueda(busqueda);
      this.setState({pedido:{}})
    }
    if (this.state.id !== "") {
      busqueda = '?busqueda=id=="' + this.state.id + '"';
      this.listadoBusqueda(busqueda);
      this.elegirId(this.state.id)
      this.encontrarItemsIdPedido(this.state.id)
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
    if (busqueda == null) {
      fetch(`http://localhost:8383/pedido`)
        .then((res) => res.json())
        .then((pedidos) => this.setState({ pedidos: pedidos }));
    }
  };

  encontrarItemsIdPedido(idPedido) {
    try {
      return fetch(`http://localhost:8383/itemsDePedido/${idPedido}`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) =>
          this.setState({ itemsPedido: res }
            , () => console.log("itemUpdae", res, this.state.itemsPedido, this.state.idPedido)))
    } catch (error) {
      console.log(error);
    }
    // }
  }


  limpiarTabla = () => {
    this.setState({pedido:{seccion:"",observaciones:""}}
    ,()=>  console.log("limpiarrr",this.state.pedido))
    document.getElementById("id").value = "";
    this.props.listadoPedidos()
  
    // this.eliminarDetallesPedido(this.state.id)
  };

  elegirId(id) {
    var pedido = this.state.pedidos.find(
      (pedido) => id == pedido.id
    );
    this.setState({ pedido:pedido }
      , () => console.log("pedidoelegido",pedido));

  }

  eliminarDetallesPedido(id) {
    var listaActualizada = this.state.pedidos.filter(
      (pedido) => id != pedido.id
    );
    this.setState({ pedidos: listaActualizada });
  }

  handleChange = (e) => {
    var nuevoPedido = Object.assign({}, this.state.pedido);
    nuevoPedido[e.target.name] = e.target.value;
    this.setState(
      {pedido: nuevoPedido})
    };


 

  render() {
    let pedidos = this.state.pedidos;
    let editable = this.state.editable;
   
    
    var listaIdsPedidos = this.state.pedidos.map((pedido) => {
      let unPedido=this.state.pedido;
      unPedido=pedido;
      return (
        <div>
          <option value={pedido.id} id={pedido.id}/>
        </div>
      );
    });
    console.log("pedidosTabla", this.state.pedidos,this.state.pedido,this.state.id)
    return (
      <Container>
        <React.Fragment>
          {editable == true &&
            <Card>
              <Form onSubmit={this.handleSubmit} id="formulario">
                <FormGroup row>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="id"
                      name="id"
                      placeholder="Elegir id"
                      onChange={this.handleChange}
                      list="pedido"
                    />
                  </Col>
                  <datalist id="pedido">{listaIdsPedidos}</datalist>
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
            <tbody>{this.unPedido()}</tbody>
          </Table>}
        </React.Fragment>
        <React.Fragment>{editable == true &&
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
            <tbody>{this.unPedidoEditable(pedidos,this.state.pedido,this.state.id)}</tbody>
          </Table>}
        </React.Fragment>

      </Container>
    );
  }

  unPedido = () => {
    const { envioDePedido } = this.props;
    const {envioDeEstadoResponsable}=this.props
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
  unPedidoEditable = (pedidos,pedido,id) => {
    const { envioDePedido } = this.props;
    const { envioDeEstadoLimpiarPedido } = this.props

    let nuevoPedido= pedidos.find((unPedido)=> 
      unPedido.id == pedido.id )
      console.log("tbl_unPedido.editarrow",pedido)
      if (nuevoPedido) {
        return (
          <TablaPedidoEditarRow
            pedido={nuevoPedido}
            pedidos={pedidos}
            envioDePedido={envioDePedido}
            envioDeEstadoLimpiarPedido={envioDeEstadoLimpiarPedido}
            seleccionado={this.state.seleccionado}
            listadoPedidos={this.props.listadoPedidos}

          />
        )
      }
   

  };

}
export default TablaPedido;
