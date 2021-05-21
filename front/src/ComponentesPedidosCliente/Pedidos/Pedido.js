import React from "react";
import { Button } from "reactstrap";

class Pedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: this.props.toggle,
      cantidad: this.props.cantidad,
      importeTotal: this.props.importeTotal,
      descripciones: this.props.descripciones,
      precioUnitario: this.props.precioUnitario,
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

  // componentWillMount(){
  //   let descripciones=this.props.descripciones.map((d)=>d.name)
  //   console.log("will descripciones____",descripciones)
  // }


  // componentWillMount() {
  //   this.props.listadoPedidos()
  //   var items = this.props.pedido.ItemsPedido;
  //   var prod = this.props.pedido.ItemsPedido.Productos;
  //   var cantidad = items.map((i) => (i = i.cantidad + ","));
  //   var importeTotal = items.map((i) => (i = i.importeTotal + ","));
  //   // var precioUnitario = items.map((i) => (i = i.Productos.precioUnitario + ","));
  //   // var descripcion = items.map((i) => (i = i.Productos.descripcion + ","));
  //   this.setState(
  //     {
  //       cantidad: cantidad,
  //       importeTotal: importeTotal,
  //       // precioUnitario:precioUnitario,
  //       // descripcion: descripcion,
  //     },
  //     console.log("cantidad",prod)
  //   );
  // var cantidad=items.filter((item)=>item.Productos.cantidad)
  //  console.log("items",items,"map",map,"cant",this.state.cantidad)
  //  var cantidad=items.filter((item)=>item.cantidad)
  //  console.log("items",cantidad)
  // items.map(function(item){
  //    var cantidadT= item.cantidad;
  // })
  // this.setState({cantidad})
  // }

  seleccionarPedido() {
    this.props.selector(this.props.pedido);
    // console.log("seleccionar___", this.props.pedido);
    // console.log("productoS____", this.props.producto);
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
    if (nextProps.items !== this.props.items) {
      this.setState({ items: this.props.items });
      console.log(
        "Items props",
        this.props.items,
        nextProps.items.values()
      );
    }
    // if (nextProps.item !== this.props.item) {
    //   this.setState({ item: nextProps.item });
    // }
   
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: this.props.productos });
      // console.log(
      //   "PRODUCTOS props",
      //   this.props.productos,
      //   nextProps.productos.values()
      // );
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto });
    }
    
  }

  render = () => {
     
    return (
      <tr>
        <td>{this.props.pedido.codigoPedido}</td>
        <td>{this.props.responsableDeMesa}</td>
        <td>{this.props.pedido.seccion}</td>
        <td>{this.props.pedido.importeTotal}</td>
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
