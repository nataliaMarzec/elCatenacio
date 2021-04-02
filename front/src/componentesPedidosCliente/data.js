import React from 'react'
import Item from './Item';
import Button from './Button';
import _ from 'lodash';


 
class Data extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      pedidos : [] || null
    }
  }

  _remove(position){
    let { pedidos } = this.state;
   
    let newData = [
      ...pedidos.slice(0, position),
      ...pedidos.slice(position + 1),
    ]

    this.setState({ pedidos : newData });
    console.log("remove__",pedidos.length)
  }

  _add(){
    let { pedidos } = this.state;
    let newData = [
      ...pedidos,
      {
        // image : "papas.png",
        descripcion : "Papas a la francesa",
        precio  : Math.floor(Math.random() * 20) 
      }
    ]
    this.setState({ pedidos : newData });
    console.log("add__",pedidos.length," values __",this.state.pedidos)
  }

  _getTotal(){
    return _.sumBy(this.state.pedidos, function(o) { return o.price; });;
  }


  render() {
    return (
      <div className="app">
        <h1>Ejemplo de listas</h1>
        <ul className="todo-list">
          {this.state.pedidos.map(
            (item,index) =>
              <Item pedidos={item} key={index} onRemove={ () => this._remove(index)} />
            )
          }
        </ul>
        <div className="footer">
          <Button
            onClick={this._add.bind(this)}
            name="Añadir producto"
          />
          <h4>$ {this._getTotal()}</h4>
        </div>
      </div>
    );
  }
}
 
export default Data;