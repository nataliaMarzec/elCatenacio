import React from "react";
import { Button, Input,Row } from "reactstrap";

class PedidoItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      productos:props.productos,
      producto:props.producto,
      pedidos:props.pedidos,
      pedido: props.pedido,
      codigo:props.codigo,
      descripcion:props.descripcion
    };
    this.handleChangeItem = this.handleChangeItem.bind(this);
    this.handleChangeProducto=this.handleChangeProducto.bind(this)
  }
 

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }
    if (nextProps.item !== this.props.item) {
      this.setState({ item: nextProps.item },()=>console.log("props item",this.state.item));
    }
    if (nextProps.productos !== this.props.productos) {
      this.setState({ productos: this.props.productos });
    }
    if (nextProps.producto !== this.props.producto) {
      this.setState({ producto: nextProps.producto });
    }
    if (nextProps.descripcion !== this.props.descripcion) {
      this.setState({ descripcion: nextProps.descripcion });
    }
  
  }

  handleChangeItem(e) {
    var nuevoItem = Object.assign({}, this.state.item);
    nuevoItem[e.target.name] = e.target.value;
    // if(this.state.producto.id != nuevoItem.productoId){
    //   let find= this.state.itemsDePedidoElegido.find(i=>i.productoId == this.state.producto.id)
    // this.setState({ item:find}
    // ,() => console.log("nuevoItem/key", this.state.item, nuevoItem)
    // );
    
    // this.props.calcularEditar(this.state.item,this.state.producto)
    // }
    // else{
      this.setState({ item:nuevoItem}
        ,() => console.log("nuevoItem/key", this.state.item, nuevoItem)
        );
        
        this.props.calcularEditar(nuevoItem,this.state.producto)
    // }

  };

  handleChangeProducto(e) {
    var nuevoProducto = Object.assign({}, this.state.producto);
    nuevoProducto[e.target.name] = e.target.value;
    this.setState({producto:nuevoProducto}
    ,() => console.log("nuevoProducto/key", this.state.producto, nuevoProducto)
    );
    this.props.restaurarProductoEditar(nuevoProducto)
  };

  listaDescripciones(){
    var listaDescripciones = this.state.productos.map((producto) => {
      return (
        <div key={producto.id}>
          <option key={producto.id} value={producto.descripcion}/>
        </div>
      );
    });
    return listaDescripciones;
  }

  render() {
    return (
      <tr key={this.props.pedido.id}>
        <td>{this.props.item.codigo}</td>
        <td>
          <input
            key={this.state.producto.id}
            id={this.state.producto.id}
            type="text"           
            name="descripcion"
            list="descripciones"
            value={this.state.producto.descripcion}
            onChange={this.handleChangeProducto}
            className="form-control"
          ></input>
           <datalist id="descripciones">{this.listaDescripciones()}</datalist>
        </td>
        <td>
          <input
            key="cantidad"
            id={this.props.item.id}
            style={{ backgroundColor: "#eee363" }}
            type="number"
            // id="cantidad"
            name="cantidad"
            min={1}
            // max={999}
            value={this.state.item.cantidad}
            onChange={this.handleChangeItem}
            className="form-control"
          ></input>
        </td>
        {/* <td>
          ${this.props.producto.precioUnitario}
        </td> */}
      </tr>
    
    );
  }

}

export default PedidoItems;
