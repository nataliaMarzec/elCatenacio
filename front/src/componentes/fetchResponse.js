import React from "react";
// / const url =
//   process.env.NODE_ENV = 'http://localhost:8888';

// const getFacturaURL = id => {
//   return `${url}/${id}`;
// };


module.exports = {


listadoClientes:() =>{
    fetch(`http://localhost:8282/clientes`)
      .then((res) => res.json()).send()
    //   .then(
    //     (cltes) => this.setState({ clientes: cltes, cliente: {} }),
    //     console.log("ClientaEnviado", this.state.clientes)
    //   );
  }

}