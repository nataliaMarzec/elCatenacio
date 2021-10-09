// import React from "react";
// import {
//   Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Col,
//   ModalBody,
//   ModalFooter,
// } from "reactstrap";

// class CargarArticulo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       articulo: props.articulo || {},
//       articulos: props.articulos || [],
//       modal: false,
//     };
//     this.handleChange=this.handleChange.bind(this);
//     this.handleSubmit=this.handleSubmit.bind(this)
    
//   }

//   estadoInicial() {
//     this.setState({
//       articulo: { nombre: "", codigo: "", descripcion: "", precio: "" },
//     });
//   }

//   toggle() {
//     this.setState({
//       modal: !this.state.modal,
//     });
//   }


//   componentDidMount() {
//     this.props.listadoArticulos();
//     console.log("didMount-cargarArticulo");
//   }

//   handleSubmit(event) {
//     const id = this.state.articulo.id;
//     if (id) {
//       this.editarArticulo(id);
//     } else {
//       this.crearArticulo();
//     }
//     event.preventDefault(event);
//   }

//   handleChange(e) {
//     var nuevoArticulo = Object.assign({}, this.state.articulo);
//     nuevoArticulo[e.target.name] = e.target.value;
//     this.setState({ articulo: nuevoArticulo });
//     console.log(
//       "evenEditar",
//       nuevoArticulo,
//       this.state.articulo.id,
//       this.state.articulo.nombre
//     );
//   }

 
//   crearArticulo = () => {
//     fetch("http://localhost:8282/articulos/nuevo", {
//       method: "post",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(this.state.articulo),
//     })
//       .then((res) => this.props.listadoArticulos())
//       .then((res) => this.estadoInicial());
//   };

//   editarArticulo = (id) => {
//     console.log("idEditar", id);
//     fetch(
//       "http://localhost:8282/articulos/" + id,
//       {
//         method: "PUT",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(this.state.articulo),
//       },
//       console.log("ArticuloEditado", this.state.articulo)
//     )
//       .then(this.props.listadoArticulos())
//       .then(this.estadoInicial())
//       .then(console.log("EDITAR"));
//   };

//   render() {
//     return (
//       <Col xs="12" md="12">
//         <ModalBody>
//           <Form className="form-horizontal">
//             <FormGroup row>
//               <Col md="3">
//                 <Label for="nombre">Nombre</Label>
//               </Col>
//               <Col xs="12" md="9">
//                 <Input
//                   type="text"
//                   id="nombre"
//                   name="nombre"
//                   placeholder="Completa Nombre..."
//                   required
//                   value={this.state.articulo.nombre || ""}
//                   onChange={this.handleChange}
//                 />
//               </Col>
//             </FormGroup>
//             <FormGroup row>
//               <Col md="3">
//                 <Label for="codigo">codigo</Label>
//               </Col>
//               <Col xs="12" md="9">
//                 <Input
//                   type="number"
//                   id="codigo"
//                   name="codigo"
//                   placeholder="Completa codigo..."
//                   required={false}
//                   value={this.state.articulo.codigo || ""}
//                   onChange={this.handleChange}
//                 />
//               </Col>
//             </FormGroup>
//             <FormGroup row>
//               <Col md="3">
//                 <Label for="descripcion">descripcion</Label>
//               </Col>
//               <Col xs="12" md="9">
//                 <Input
//                   type="text"
//                   id="descripcion"
//                   name="descripcion"
//                   placeholder="Completa descripcion..."
//                   required={false}
//                   value={this.state.articulo.descripcion || ""}
//                   onChange={this.handleChange}
//                 />
//               </Col>
//             </FormGroup>

//             <FormGroup row>
//               <Col md="3">
//                 <Label htmlFor="precio">precio</Label>
//               </Col>
//               <Col xs="12" md="9">
//                 <Input
//                   type="number"
//                   id="precio"
//                   name="precio"
//                   placeholder="Completa precio..."
//                   required={false}
//                   value={this.state.articulo.precio}
//                   onChange={this.handleChange}
//                 />
//               </Col>
//             </FormGroup>
//           </Form>
//         </ModalBody>

//         <ModalFooter>
//           <Button
//             type="submit"
//             color="success"
//             outline
//             onClick={this.handleSubmit}
//           >
//             <i className="fa fa-dot-circle-o"></i>Guardar Articulo
//           </Button>
//         </ModalFooter>
//       </Col>
//     );
//   }
// }

// export default CargarArticulo;
