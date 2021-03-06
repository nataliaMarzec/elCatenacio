import React from "react";
import { Button } from "reactstrap";

class Pedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: this.props.toggle,
      cantidad:this.props.cantidad,
      importeTotal:this.props.importeTotal,
      descripcion:this.props.descripcion,
      precioUnitario:this.props.precioUnitario,
    };
    this.eliminarPedido = this.eliminarPedido.bind(this);
    this.seleccionarPedido = this.seleccionarPedido.bind(this);
  }

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

  componentWillMount() {
    // console.log(importeTotal.reduce(reducer));
    var items = this.props.pedido.ItemsPedido;
    var cantidad = items.map((i) => (i = i.cantidad + ","));
    var importeTotal = items.map((i) => (i = i.importeTotal + ","));
    var precioUnitario = items.map((i) => (i = i.Productos.precioUnitario + ","));
    var descripcion = items.map((i) => (i = i.Productos.descripcion + ","));
    this.setState(
      {
        cantidad: cantidad,
        importeTotal: importeTotal,
        precioUnitario:precioUnitario,
        descripcion: descripcion,
      },
      console.log("cantidad", descripcion)
    );
    // var cantidad=items.filter((item)=>item.Productos.cantidad)
    //  console.log("items",items,"map",map,"cant",this.state.cantidad)
    //  var cantidad=items.filter((item)=>item.cantidad)
    //  console.log("items",cantidad)
    // items.map(function(item){
    //    var cantidadT= item.cantidad;
    // })
    // this.setState({cantidad})
  }

  seleccionarPedido() {
    this.props.selector(this.props.pedido);
    console.log("seleccionar___", this.props.pedido);
    console.log("productoS____", this.props.producto);
    this.props.toggle();
  }

  agregarVenta = () => {
    this.props.pedidoseleccionado(this.props.pedido);
  };

  editCliente = () => {
    this.props.editarCliente(this.props.pedido);
    this.props.toogle();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
      console.log(
        "pedidos props",
        this.props.pedidos,
        nextProps.pedidos.values()
      );
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido });
    }
    if (nextProps.nuevaListaPedido !== this.props.nuevaListaPedido) {
      this.setState({ nuevaListaPedido: this.props.nuevaListaPedido });
      console.log(
        "nuevaListaPEDIDO props",
        this.props.nuevaListaPedido,
        nextProps.nuevaListaPedido.values()
      );
     
    }
  
  }

  render = () => {
    return (
      <tr>
        <td>{this.props.pedido.codigoPedido}</td>
        <td>{this.props.pedido.mesero}</td>
        <td>{this.props.pedido.seccion}</td>
        <td>{this.state.cantidad}</td>
        <td>{this.state.precioUnitario}</td>
        <td>{this.state.importeTotal}</td>
        <td>{this.state.descripcion}</td>
        {/* <td>{this.props.pedido.habilitado? "si":"no"}</td> */}
        <td>
          <Button
            color="danger"
            size="btn-xs"
            onClick={() => this.eliminarPedido(this.props.pedido.id)}
          >
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            className="btn #e65100 orange darken-4"
            onClick={this.seleccionarPedido}
          >
            <i className="fa fa-dot-circle-o">{""} Editar</i>
          </Button>
        </td>
      </tr>
    );
  };
}

export default Pedido;
