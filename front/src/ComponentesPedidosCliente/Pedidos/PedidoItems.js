import React from "react";
import { Button, Input } from "reactstrap";

class PedidoItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: false,
      toogle: props.toggle,
      items: props.items,
      item: props.item,
      importe: props.importe,
      descripciones: props.descripciones,
      cantidad: props.cantidad,
      precio: props.precio,
      importe: props.importe,
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
    if (nextProps.precio !== this.props.precio) {
      this.setState({ precio: this.props.precio });
      // console.log("precio---", this.props.precio);
    }
    if (nextProps.importe !== this.props.importe) {
      this.setState({ importe: this.props.importe });
      // console.log("importe---", this.props.importe);
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
          () => console.log("update-cantidad", this.state.item.cantidad)
        )
      );
    // .then((res) => this.props.estadoInicial());
    // console.log("GUARDARITEM", productoId, this.props.cantidad);
  };

  updateImporteItem = (importeTotal, productoId) => {
    fetch(
      `http://localhost:8383/itemsPedidos/importe/${importeTotal}/${productoId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => this.props.listadoItemsPedido())
      .then((res) =>
        this.setState(
          {
            item: { ...this.state.item, importe: importeTotal },
            // ,      function() {
            // }
          },
          console.log("importe", importeTotal)
        )
      );
  };

  guardar(importeTotal, productoId) {
    var precio = this.state.precio;
    this.updateCantidadItem(productoId);
    if (importeTotal == null) {
      this.updateImporteItem(precio, productoId);
    } else {
      this.updateImporteItem(importeTotal, productoId);
    }
  }

  handleChange = (e) => {
    var nuevoItem = Object.assign({}, this.state.item);
    nuevoItem[e.target.name] = e.target.value;
    this.setState({ item: nuevoItem, cantidad: nuevoItem.cantidad });
    var total = 0;
    var cantidad = nuevoItem.cantidad;
    var precio = this.state.precio;
    if (cantidad == null) {
      total = 1 * precio;
      this.setState({ precio: this.state.precio, importe: total });
      return total;
    } else {
      total = cantidad * precio;
      this.setState({ precio: this.state.precio, importe: total });
      return total;
    }
  };

  event = (e) => {
    e.preventDefault();
  };

  render = () => {
    return (
      <tr key={this.props.index}>
        <td>{this.props.codigo}</td>
        <td>{this.props.descripcion}</td>
        <td onSubmit={this.event}>
          <input
            style={{ backgroundColor: "#eee363" }}
            type="number"
            id="cantidad"
            name="cantidad"
            placeholder="1"
            // required
            value={this.state.item.cantidad}
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
            onClick={() =>
              this.guardar(this.state.importe, this.props.productoId)
            }
          >
            <i className="fa fa-dot-circle-o">{""}</i>{" "}
          </Button>
        </td>
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
