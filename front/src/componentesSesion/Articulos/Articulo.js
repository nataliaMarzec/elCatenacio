// import React from "react";
// import { Button, Col } from "reactstrap";

// class Articulo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editar: false,
//       toogle: this.props.toggle,
//     };
//     this.eliminarArticulo = this.eliminarArticulo.bind(this);
//     this.seleccionarArticulo = this.seleccionarArticulo.bind(this);
//   }

//   eliminarArticulo = (id) => {
//     fetch("http://localhost:8282/articulos/" + id, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     }).then(this.props.actualizarAlEliminar(this.props.articulo));
//   };

//   editar() {
//     this.props.editarArticuloFetch(this.props.articulo);
//     this.props.toggle();
//   }

//   seleccionarArticulo() {
//     this.props.selector(this.props.articulo);
//     console.log("seleccionar___", this.props.articulo);
//     this.props.toggle();
//   }

//   UNSAFE_componentWillReceiveProps(nextProps) {
//     if (nextProps.articulos !== this.props.articulos) {
//       this.setState({ articulos: this.props.articulos });
//     }
//     if (nextProps.articulo !== this.props.articulo) {
//       this.setState({ articulo: nextProps.articulo });
//     }
//   }

//   render = () => {
//     return (
//       <tr>
//         <td>{this.props.articulo.id}</td>
//         <td>{this.props.articulo.nombre}</td>
//         <td>{this.props.articulo.codigo}</td>
//         <td>{this.props.articulo.descripcion}</td>
//         <td>{this.props.articulo.precio}</td>
//         <td>
//           <Button
//             color="danger"
//             size="btn-xs"
//             onClick={() => this.eliminarArticulo(this.props.articulo.id)}
//           >
//             <i className="cui-trash icons font-1xl d-block mt-1"></i>
//           </Button>{" "}
//           &nbsp;&nbsp;
//           <Button
//             className="btn #e65100 orange darken-4"
//             onClick={this.seleccionarArticulo}
//           >
//             <i className="fa fa-dot-circle-o">{""} Editar</i>
//           </Button>
//         </td>
//       </tr>
//     );
//   };
// }

// export default Articulo;
