import React, { Component } from 'react';
import {
  Button,
} from 'reactstrap';

class ContactPerson extends Component {
    deleteContact(id) {
      var answer = console.log("Eliminar contacto?")
      if (answer) {
          this.props.onDelete(id);
      }
        
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.usuarios !== this.props.usuarios) {
          this.setState({ usuarios: this.props.usuarios });
        }
        if (nextProps.usuario !== this.props.usuario) {
          this.setState({ usuario: nextProps.usuario });
        }
      }

    render() {

        return (

            <tr className="ContactoUsuario">
                <td align="center"> <img src={'img/default.png'} width="30px" height="30px" /></td>
                <td>{ this.props.usuario.dni }</td>
                <td>{ this.props.usuario.username }</td>
                <td>{ this.props.usuario.email }</td>
                <td>{ this.props.usuario.password }</td>

                <td>
                    <Button color="danger" size="sm" onClick={ this.deleteContact.bind(this, this.props.usuario.id) }><i className="fa fa-ban"></i> Delete</Button>{' '}
                </td>
            </tr>
        );
    }
}

export default ContactPerson;
