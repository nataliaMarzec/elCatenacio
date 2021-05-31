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
      descripciones: props.descripciones,
      cantidad: props.cantidad,
      precio: props.precio,
      // importe: props.importe,
      importe:props.precio,
      pedido: props.pedido,
      pedidoId: props.pedidoId,
      name: "importe",
      value: props.value,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pedidos !== this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos });
    }
    if (nextProps.pedido !== this.props.pedido) {
      this.setState({ pedido: nextProps.pedido });
      // console.log("PEDIDO PROPS-------", this.props.pedido);
    }
    if (nextProps.pedidoId !== this.props.pedidoId) {
      this.setState({ pedidoId: nextProps.pedidoId });
      console.log("Pedido id PROPS-------", this.props.pedidoId);
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

  updateCantidadItem = (productoId,cantidad) => {
    const pedidoId = this.state.pedidoId;
    fetch("http://localhost:8383/itemsPedidos/" + productoId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.item, this.state.pedidoId),
    })
      .then((res) => this.props.listadoItemsPedido)
      .then((item) =>
        this.setState(
          { pedidoId: this.state.pedidoId, cantidad: this.state.item.cantidad },
          () => console.log("updatecantidad",this.state.pedidoId, this.state.cantidad)
        )
      );
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
          },
          console.log("importe", importeTotal)
        )
      );
  };

  guardar(importeTotal, productoId) {
    var precio = this.state.precio;
    var pedidoId = this.state.pedidoId;
    console.log("pedidoId%%%%%", pedidoId);
    this.updateCantidadItem(productoId);
    console.log("guarda%%%%%",this.state.cantidad);
    // if (importeTotal == null) {
    //   this.updateImporteItem(precio, productoId);
    // } else {
      this.updateImporteItem(importeTotal, productoId);
    // }
  }

  // prueba(cantidad) {
  //   var total = 0;
  //   var cantidad = cantidad;
  //   var precio = this.state.precio;
  //   total = cantidad * precio;
  //   this.setState({ precio: this.state.precio, importe: total });
  //   return total;
  // }

  searchFun(e) {
    if (e.target.value.length !== 0) {
      let enteredValue = e.target.value.toLowerCase();
      let presentValue = this.props.options.filter(function (data) {
        return data.name.indexOf(enteredValue) > -1;
      });
      this.setState({ productos: presentValue });
    } else {
      this.setState({ productos: this.state.productos });
    }
  }

  calcular = (item) => {
    var cantidad = item.cantidad;
    // var importe = item.importe;
    var precio = this.state.precio;
    let total = cantidad * precio;
    this.setState({ precio: this.state.precio, importe: total,cantidad:cantidad });
    console.log("importe",precio, this.state.importe);
    return total;
  };

  handleChange = (e) => {
    var nuevoItem = Object.assign({}, this.state.item);
    console.log("nuevoItem", nuevoItem);
    nuevoItem[e.target.name] = e.target.value;
    this.setState({ item: nuevoItem }, () => this.calcular(nuevoItem));
    // this.setState({ importe: this.state.item.importe });
    console.log(
      "item",
      nuevoItem.cantidad,
      this.state.importe
      // nuevoImporte
    );
    // console.log("evento", `${e.target.name}:${e.target.value}`);
  };

  event = (e) => {
    e.preventDefault();
  };

  render = () => {
    return (
      <tr key={this.props.index}>
        <td>{this.props.codigo}</td>
        <td>{this.props.descripcion}</td>
        <td>
          <input
            id="i-cantidad"
            style={{ backgroundColor: "#eee363" }}
            type="number"
            id="cantidad"
            name="cantidad"
            defaultValue={1}
            min={1}
            value={this.state.item.cantidad}
            onChange={this.handleChange}
            className="form-control"
          ></input>
        </td>
        <td>${this.state.item.importe || this.state.importe}</td>
        <td>
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
      </tr>
    );
  };
}

export default PedidoItems;
