import React from "react";
import { Button, Input } from "reactstrap";

class PedidoItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle:props.toggle,
      cantidad: props.cantidad,
      importeTotal: props.importeTotal,
      descripciones: props.descripciones,
      precioUnitario: props.precioUnitario,
      items:props.items,
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

  updateCantidadItem = (productoId) => {
    fetch("http://localhost:8383/itemsPedido/" + productoId, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.item),
    })
      .then((res) => this.props.listadoItemsPedido())
      .then((res) => this.seleccionarItem())
      .then((res) => this.props.estadoInicial());
    console.log("GUARDARITEM", productoId);
  };

  seleccionarItem() {
    this.props.selector(this.props.item);
    console.log("seleccionar___", this.props.cantidad);
  }
  // handleChange = productoId => e => {
  //   const { name, value } = e.target;
  //   const items = [...this.state.items];
  //   items[productoId] = {
  //     [name]: value
  //   };
  //   this.setState({
  //     items
  //   });
  // };
  handleAddCantidad = (productoId) => {
    this.updateCantidadItem(productoId)
    const item = {
      productoId:productoId,
      cantidad: ""
    };
    this.setState({
      items: [...this.state.items, item]
    });
  };

  handleChange = () => {
    this.setState((prevState, props) => {
      const cantidad = { cantidad: props.cantidad };
      console.log("cantidad", cantidad);
      return { items: [...prevState.items, cantidad] };
    });
  };

  // handleChange = (e) => {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;
  //   this.setState({ [name]: value });
  // };

  render = () => {
    // console.log("items",this.props.items)
    return (
      <tr>
        <td>{this.props.productoId}</td>
        <td>{this.props.descripcion}</td>
        <td>
          <input
            style={{ backgroundColor: "#eee363" }}
            type="number"
            id="cantidad"
            name="cantidad"
            placeholder="1"
            // required
            value={this.props.cantidad}
            onChange={this.handleChange}
          ></input>
        </td>
        <td>
          {" "}
          {"  "}
          <Button
            color="info"
            size="btn-xs"
            onClick={() => this.updateCantidadItem(this.props.productoId)}
          >
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>
        </td>
        {/* <td>{this.props.importe}</td> */}
        &nbsp;&nbsp;
        {/* <Button
            color="danger"
            size="btn-xs"
            // onClick={this.onClick}
          >
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "} */}
        &nbsp;&nbsp;
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
