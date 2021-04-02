import axios from 'axios'

export const register = nuevoUsuario => {
    return axios
      .post('usuarios/register', {
        username: nuevoUsuario.username,
        email: nuevoUsuario.email,
        dni:nuevoUsuario.dni,
        password: nuevoUsuario.password
      })
      .then(response => {
        console.log('Regitrado')
      })
  }
 
  export const login = usuario => {
    return axios
      .post('usuarios/login', {
        username: usuario.username,
        password: usuario.password
      })
      .then(response=>{
        this.props.listadoUsuarios()
      })
      .then(response => this.estadoInicial())
      // .then(response => {
      //   localStorage.setItem('usertoken', response.data)
      //   return response.data
      // })
      .catch(err => {
        console.log(err)
      })
  }
  
  export const getPerfil = usuario => {
    return axios
      .get('usuarios/perfil', {
        //headers: { Authorization: ` ${this.getToken()}` }
      })
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
  }
  