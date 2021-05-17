import React from "react";
import { Button, Input } from "reactstrap";

class PedidoItemsDos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: props.toggle,
      cantidad: props.cantidad,
      importeTotal: props.importeTotal,
      descripciones: props.descripciones,
      precioUnitario: props.precioUnitario,
      items: props.items,
      item: props.item,
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

  seleccionarPedido() {
    this.props.selector(this.props.pedido);
    // console.log("seleccionar___", this.props.pedido);
    this.props.toggle();
  }

  editCliente = () => {
    this.props.editarCliente(this.props.pedido);
    this.props.toogle();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
      // console.log(
      //   "pedidos props",
      //   this.props.pedidos,
      //   nextProps.pedidos.values()
      // );
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido });
    }
    if (nextProps.items !== this.props.items) {
      this.setState({ items: this.props.items });
      // console.log("Items props", this.props.items, nextProps.items.values());
    }
    if (nextProps.item !== this.props.item) {
      this.setState({ item: nextProps.item });
    }
    if (nextProps.productoId !== this.props.productoId) {
      this.setState({ productoId: this.props.productoId });
      // console.log("productoId", this.props.productoId);
    }
    if (nextProps.cantidad !== this.props.cantidad) {
      this.setState({ cantidad: this.props.cantidad });
      // console.log("cantidad---", this.props.cantidad);
    }
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: this.props.productos });
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto });
    }
  }

  updateCantidadItem = (productoId) => {
    fetch("http://localhost:8383/itemsPedidos/" + productoId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.item),
    })
      .then((res) => this.props.listadoItemsPedido)
      .then((res) =>
        this.setState(
          { item: { ...this.state.item, cantidad: this.state.item.cantidad } },
          // () =>
          //   console.log(
          //     "update-cantidad",
          //     this.state.item,
          //     this.state.item.cantidad
          //   )
        )
      );
    // .then((res) => this.props.estadoInicial());
    // console.log("GUARDARITEM", productoId, this.props.cantidad);
  };


  guardarCantidad(productoId) {
    // this.props.selector(this.props.item);
    this.updateCantidadItem(productoId);
    // console.log("seleccionar___", productoId, this.props.cantidad);
  }

  
  handleChange = (e) => {
    var nuevoItem = Object.assign({}, this.state.item);
    nuevoItem[e.target.name] = e.target.value;
    this.setState({ item: nuevoItem });
  };


  event = (e) => {
    e.preventDefault();
  };

  render = () => {
    // console.log("items",this.props.items)
    return (
      <tr key={this.props.index}>
        <td>{this.props.productoId}</td>
        <td>{this.props.descripcion}</td>
        <td onSubmit={this.event}>
          <input
            style={{ backgroundColor: "#eee363" }}
            type="number"
            id="cantidad"
            name="cantidad"
            placeholder="1"
            // required
            value={this.state.item.cantidad || 1}
            onChange={this.handleChange.bind(this)}
            className="form-control"
          ></input>
        </td>
        <td>
          {" "}
          {"  "}
          <Button
            color="info"
            size="btn-xs"
            onClick={() => this.guardarCantidad(this.props.productoId)}
          >
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>
        </td>
        {/* <td>{this.props.importe}</td> */}
        {/* &nbsp;&nbsp; */}
        {/* <Button
            color="danger"
            size="btn-xs"
            // onClick={this.onClick}
          >
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "} */}
        {/* &nbsp;&nbsp; */}
        {/*   <td>{this.props.names}</td>
       
        {/* <th>Observaciones</th> */}
        {/* <td>
          <Button
            color="danger"
            size="btn-xs"
            onClick={() => this.eliminarPedido(this.props.pedido.id)}
          >
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            size="btn-xs"
            className="btn #e65100 orange darken-4"
            onClick={this.seleccionarPedido}
          >
            <i className="fa fa-dot-circle-o">{""}</i>
          </Button> */}
        {/* </td> */}
      </tr>
    );
  };
}

export default PedidoItems;
