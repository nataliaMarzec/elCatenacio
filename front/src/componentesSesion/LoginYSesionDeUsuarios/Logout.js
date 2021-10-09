import React from "react";
import WrapperConsumer, { ContextUsuario } from "../Context/ContextUsuario";

class Logout extends React.Component {
  static contextType = ContextUsuario;
 

  salir (){
    this.props.history.push("/login")
    this.props.context.estadoInicial()
    };

  render() {
    return (
      <div>
        <button onClick={this.salir()}>Salir</button>
      </div>
    );
  }
}

export default WrapperConsumer(Logout);
