import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import PropTypes from 'prop-types'

// console.log(Usuarios)


class NuevoUsuario extends React.Component {
  

  constructor(props) {
      super(props);
      // this.state={usuario:"",nombre:"",cuit:"",email:""}
      this.estadoInicial=this.estadoInicial.bind(this)
      this.state = {usuario:props.usuario};
      this.insertar =this.insertar.bind(this)
      this.onChange=this.onChange.bind(this)
    }


  componentWillMount() {
      fetch(`http://localhost:8008/usuarios`)
          .then(res => res.json())
          .then(uss => this.setState({uss}));
  }

  estadoInicial(){ this.setState({usuario: {nombre: "",cuit: "",email:"" }});}

  
    componentWillReceiveProps(props) {
      this.setState({usuario: props.usuario});
      // this.setState({usuarios: props.usuarios});
    }

    onSubmit = e =>{
      // console.log(e,"submiting.._____");
      // console.log(this.state)
      this.insertar(e);
      e.preventDefault();
   }
 

    onChange =(e) =>{
      console.log("HanleChanging.._____",e.target.name,e.target.value)
      var NuevoUsuario = Object.assign({}, this.state.usuario)
      NuevoUsuario[e.target.name] = e.target.value
      this.setState({usuario: NuevoUsuario})}


    
    insertar(e) {
        // let nuevoUsuario={...this.state.usuario};
        // var usuarios={...this.props.usuariosLista}
        // console.log(JSON.stringify(nuevoUsuario))
        fetch(`http://localhost:8008/usuarios`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.state.usuario),
        }) 
        .then(res => res.json())
        .then(res =>this.props.usuariosLista)
        // .then(this.props.actualizarModal())
        // .then(this.setState(this.props.usuarios))
        // .then(res=>this.estadoInicial())
        // .catch(err => console.log("Error:",err))
        e.preventDefault();   
      
    };


  //   addHandler(event) {
  //     fetch('http://localhost:3004/clientes', {
  //         method: 'post',
  //         headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json'
  //         },
  //           body: JSON.stringify(this.state.cliente)
  //         })
  //         .then(res =>this.props.listadoClientes)
  //         .then(res => this.estadoInicial());
  //         event.preventDefault();
  // }
  

  
  
  

    



render() {
  // console.log(this.props)
  // console.log(this.props.funcionCualquiera(""))
  return (
    <Form onSubmit={this.insertar} >  
      <FormGroup>
      <Label htmlFor="exampleName">Nombre</Label>
      <Input type="text" name="nombre" id="nombre" value={this.state.usuario.nombre} 
       onChange={this.onChange} placeholder="ej.Lucía Adamkzick" />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="examplecuit">cuit</Label>
      <Input type="text" name="cuit" id="cuit" value={this.state.usuario.cuit}
      onChange={this.onChange} placeholder="30222888" />
    </FormGroup>
    <FormGroup >
      <Label htmlFor="email"> email</Label>
      <Input type="text" name="email" id="email" value={this.state.usuario.email}
      onChange={this.onChange}></Input>
    </FormGroup>
    <p>{JSON.stringify(this.state.id,this.state)}</p>
    {/* <Button type="<submit></submit>" color="success" onClick={ this.handleSubmit.bind(this) }><i className="fa fa-dot-circle-o"></i> Submit</Button> */}
    {/* <Button type="submit" outline color="success"><i className="fa fa-dot-circle-o"></i>Agregar usuario</Button>   */}
    <Button type="submit" outline color="success" ><i className="fa fa-dot-circle-o"></i>Agregar usuario</Button>  

    </Form>
)

  };


  



}

NuevoUsuario.propTypes={
  // usuario:PropTypes.object.usuario.isRequired,
  

}

  //  actualizarUsuario(e){
  //   this.setState({
  //     usuario:{...this.state.usuario, [e.target.name]:e.target.value}
  //   })
  // }
   

  //   onChange = e =>{
  //     // console.log("HanleChanging.._____",e.target.name,e.target.value)
  //     // this.actualizarUsuario(e)
  //     this.setState({
  //       usuario:{...this.state.usuario,
  //       [e.target.name]:e.target.value}
  //     })
  //     // console.log(this.state.usuario)
  //   }

    // editarUsuario = () => {
    //   fetch("http://localhost:8008/usuario", {
    //     method: "PUT",
    //     body: JSON.stringify(this.state.usuario),
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     }
    //   })
    //     .then(this.props.listadoDeUsuarios)
    //     .then(this.estadoInicial());
    // };





export default NuevoUsuario