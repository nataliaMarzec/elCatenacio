import React from "react";
import { Button, Input, Label } from "reactstrap";
// import {prueba} from "./PedidoItems"
class PedidoItemsDos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaItems: props.listaItems,
      unItem:props.unItem,
      importe: props.importe,
      precio: props.precio,
      observaciones: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.observaciones = this.observaciones.bind(this);
  }

  componentWillMount() {
    this.setState({ listaItems: this.state.listaItems},
      () => console.log("willListaItems", this.state.listaItems))
    // this.observaciones(this.state.observaciones)
  }
 

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.unItem !== this.props.unItem) {
      this.setState({ unItem: nextProps.unItem });
    }
    if (nextProps.listaItems !== this.props.listaItems) {
      this.setState({ listaItems: this.props.listaItems });
      // console.log("Items props", this.props.items, nextProps.items.values());
    }
    if (nextProps.productoId !== this.props.productoId) {
      this.setState({ productoId: this.props.productoId });
      // console.log("productoId", this.props.productoId);
    }
    if (nextProps.precio !== this.props.precio) {
      this.setState({ precio: this.props.precio });
      console.log("precio---", this.props.precio);
    }
    if (nextProps.importe !== this.props.importe) {
      this.setState({ importe: this.props.importe });
      console.log("importe---", this.props.importe);
    }
  }

  observaciones = (value) => {
     if (value === '' || value === null || value === undefined) {
      this.setState({observaciones:null})
      this.props.envioDeEstadoObservaciones(null);
    } 
      this.props.envioDeEstadoObservaciones(value);
    
  };

  // handleChange = (e) => {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;
  //   this.setState(
  //     { [name]: value},
  //     this.observaciones(value)
  //   );
  // };
  handleChange(e) {
    let unItem = this.state.unItem
    var nuevoItem = Object.assign({}, this.state.unItem);
    nuevoItem[e.target.name] = e.target.value;
    unItem = nuevoItem
    this.setState({ unItem: unItem},
      ()=>this.props.envioDeEstadoObservaciones(nuevoItem)
    ,() => console.log("nuevoItem/key", this.state.unItem, nuevoItem),
   
    ); 
    // console.log("evento", `${e.target.name}:${e.target.value}`);
  };

  event = (e) => {
    e.preventDefault();
  };
  
  eliminar = () => {
    this.props.handleRemoveRow();
    console.log("eliminar");
  };

  render = () => {
    return (
      <tr key={this.props.index}>
        <td key="observaciones" onSubmit={this.event}>
          <input
            style={{ backgroundColor: "#F5C765" }}
            type="text"
            id={this.state.observaciones}
            name="observaciones"
            placeholder="observaciones"
            value={this.state.unItem.observaciones}
            // defaultValue="Sin observaciones"
            onChange={this.handleChange}
            className="form-control"
          ></input>
        </td>
        <td>${this.props.importe}</td>
        <td>
          {"  "}
          <Button color="danger" size="btn-xs" onClick={() => this.eliminar()}>
            <i className="cui-trash icons font-1xl d-block mt-1"></i>
          </Button>{" "}
        </td>
      </tr>
    );
  };
}

export default PedidoItemsDos;
