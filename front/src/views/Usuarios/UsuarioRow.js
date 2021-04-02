import React from 'react';
import { Button } from 'reactstrap';


class UsuarioRow extends React.Component {
  
    constructor(props) {
        super(props);
        this.selectorUsuario = this.selectorUsuario.bind(this);
    }

    selectorUsuario() {
      this.props.selector(this.props.usuario)
    }


    render() {
      // const {usuario} = this.props;
      return (
        <tr key={this.props.usuario.id} onClick={this.selectorUsuario}>
          {/* <td>{this.props.usuario.img}</td> */}
          <td>img de usuario</td>
          <td>{this.props.usuario.id}</td> 
          <td>{this.props.usuario.nombre}</td>
          <td>{this.props.usuario.cuit}</td>
          <td>{this.props.usuario.email}</td>
          {/* <Button onClick= {this.seleccionarUsuario} outline color="primary"> seleccionar</Button> */}
          <Button onClick={()=> this.borrarUsuario(this.props.usuario.id)} outline color="danger">Borrar</Button>
          
      </tr>)
  
    }
    borrarUsuario(id) {
      fetch(`http://localhost:8008/usuarios/${id}`, {
          method: 'DELETE', 
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(res => this.props.delete(this.props.usuario))
  }


}
  export default UsuarioRow
