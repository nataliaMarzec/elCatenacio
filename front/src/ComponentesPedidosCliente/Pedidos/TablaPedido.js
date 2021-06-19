import React from "react";
import Pedido from "./Pedido";
import PedidoEditar from "./EditarRows/PedidoEditar";
import { Table} from "reactstrap";
class TablaPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido:{},
      pedidos:[],
      unPedido:props.unPedido,
      productos: props.productos || [],
      producto: props.producto || {},
      cliente: props.cliente || {},
      modal: false,
      codigo: "",
      descripcion: "",
      productoId: props.productoId,
      items: props.items || [],
      responsablesDeMesa: [],
      responsable: {},
      nombre: "",
      seleccionado: {},
      codigoPedido:props.codigoPedido,
      editable:props.editable,
      secciones:props.secciones
    };
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
  componentWillReceiveProps(props) {
    this.setState({ editable: props.editable })
    this.setState({ secciones: props.secciones }
      ,()=>console.log("propsTabSecciones",this.state.secciones))

    // this.setState({unPedido:props.unPedido},()=>console.log("unPedido",this.state.unPedido))
    this.setState({confirmar:props.confirmar})
      // ,()=>console.log("propsConfirmar",props.confirmar)
      // )
  }

  componentWillMount() {
    this.props.listadoPedidos();
    this.props.listadoItemsPedido();
    this.props.listadoProductos();
    this.listadoResponsablesDeMesa();
    this.setState({editable:this.state.editable});
    this.setState({unPedido:this.state.unPedido}
      ,()=>console.log("willunPedido",this.state.unPedido)
      )
  }

  listadoResponsablesDeMesa = () => {
    fetch(`http://localhost:8383/responsables`)
      .then((res) => res.json())
      .then(
        (resps) => this.setState({ responsablesDeMesa: resps, responsable: {} })
      );
  };

  render() {
    let pedidos = this.state.pedidos;
    let editable=this.state.editable;
    return (
      <Table
        responsive
        bordered
        size="sm"
        style={{ backgroundColor: "#eee363" }}
      >
        <thead>
          <tr>
            <th>Código</th>
            <th>Responsable de mesa</th>
            <th>Sección</th>
            <th>Hora</th>
          </tr>
        </thead>
        <React.Fragment>
        {editable==false && (
         <tbody>{this.unPedido(pedidos)}</tbody>
        )}
        {editable==true && (
         <tbody>{this.unPedidoEditable(pedidos)}</tbody>
        )}
         </React.Fragment>
     
       
      </Table>
    );
  }

  unPedido = (pedidos) => {
    const {crearPedido}=this.props;
    const {envioDePedido}=this.props;
    const {envioDeEstadoLimpiarPedido}=this.props
    const {toggle}=this.props;
    const {handleChangeSeccion}=this.props
    const {limpiarSeccion}=this.props;
    // const {refSeccion}=this.props;
    // const {handleEvent}=this.props;
    // const {confirmar}=this.props;
    // const {confirmarMetodo}=this.props
    // const {limpiar}=this.props
    var unPedido = this.state.seleccionado;
    // console.log("tbl_unPedido.seccion",unPedido.codigoPedido)
    return (
      <Pedido
        id={unPedido.id}
        pedido={unPedido}
        unPedido={this.state.unPedido}
        secciones={this.state.secciones}
        pedidos={pedidos}
        envioDePedido={envioDePedido}
        envioDeEstadoLimpiarPedido={envioDeEstadoLimpiarPedido}
        codigoPedido={this.state.codigoPedido}
        crearPedido={crearPedido}
        seleccionado={this.state.seleccionado}
        listadoPedidos={this.props.listadoPedidos}
        handleChangeSeccion={handleChangeSeccion}
        limpiarSeccion={limpiarSeccion}
        // refSeccion={refSeccion}
        // handleEvent={handleEvent}
        // confirmar={this.state.confirmar}
        confirmar={this.props.confirmar}
        // confirmarMetodo={confirmarMetodo}
        // limpiar={limpiar}
        toggle={toggle}
      />
    );
  };
  unPedidoEditable = (pedidos) => {
    const {crearPedido}=this.props;
    const {envioDePedido}=this.props;
    const {envioDeEstadoLimpiarPedido}=this.props
    const {toggle}=this.props;
  
    var unPedido = this.state.seleccionado;
    // console.log("tbl_unPedido.seccion",unPedido.codigoPedido)
    return (
      <PedidoEditar
        id={unPedido.id}
        pedido={unPedido}
        pedidos={pedidos}
        envioDePedido={envioDePedido}
        envioDeEstadoLimpiarPedido={envioDeEstadoLimpiarPedido}
        codigoPedido={this.state.codigoPedido}
        crearPedido={crearPedido}
        seleccionado={this.state.seleccionado}
        listadoPedidos={this.props.listadoPedidos}
        toggle={toggle}
      />
    );
  };

}
export default TablaPedido;
