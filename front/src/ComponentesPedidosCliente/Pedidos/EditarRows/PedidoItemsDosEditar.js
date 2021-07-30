import React from "react";
import { Button, Input, Label } from "reactstrap";
// import {prueba} from "./PedidoItems"
class PedidoItemsDosEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      item: props.item,

    };
    this.handleChange = this.handleChange.bind(this);
    this.eliminar=this.eliminar.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }
    if (nextProps.item !== this.props.item) {
      this.setState({ item: nextProps.item });
    }
  }

  handleChange(e) {
    var nuevoItem = Object.assign({}, this.state.item);
    nuevoItem[e.target.name] = e.target.value;
    this.setState({ item: nuevoItem }
      , () => console.log("nuevoItem/key", this.state.item, nuevoItem)
    );
    // this.props.envioDeEstadoObservaciones(nuevoItem) 
    // console.log("evento", `${e.target.name}:${e.target.value}`);
  };

  event = (e) => {
    e.preventDefault();
  };

  eliminarItem = (codigo) => {
    if(codigo !== undefined){
      fetch("http://localhost:8383/itemsPedido/eliminar/"+ codigo, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(this.props.actualizarAlEliminar(this.props.item));
    }else{
      console.log("codigoUndefined")
      this.props.actualizarAlEliminar(this.props.item)
    }
  };
  
  eliminar = (unItem) => {
    this.props.handleRemoveRowEditar(unItem);
    this.eliminarItem(unItem.codigo)

    
    
  };

  render = () => {
    return (
      <tr key={this.props.pedido.id}>
        <td key="observaciones">
          <input
            style={{ backgroundColor: "#F5C765" }}
            type="text"
            id={this.props.item.id}
            name="observaciones"
            placeholder="observaciones"
            value={this.state.item.observaciones}
            onChange={this.handleChange}
            className="form-control"
          ></input>
        </td>
        <td>${this.props.item.importe}</td>
        <td>
          {"  "}
          <Button color="danger" size="btn-xs" onClick={() => this.eliminar(this.state.item)}>
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
        </td>
      </tr>
    );
  };
}

export default PedidoItemsDosEditar;
