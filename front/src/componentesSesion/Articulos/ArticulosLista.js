// import React, { useState, useMemo, useCallback } from "react";
// import Articulo from "./Articulo";
// import CargarArticulo from "./CargarArticulo";
// import {
//   Table,
//   Container,
//   Row,
//   Button,
//   Modal,
//   ModalHeader,
//   Col,
//   Card,
//   CardHeader,
//   CardBody,
// } from "reactstrap";
// import DataListInput from "react-datalist-input";

// class ArticulosLista extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       articulos: [],
//       articulo: {},
//       seleccionado: {},
//       articuloSeleccionado: {},
//       onSelectDataList: false,
//       modalDataList: false,
//     };
//     this.listadoArticulos = this.listadoArticulos.bind(this);
//     this.toggle = this.toggle.bind(this);
//     this.toggleDataList = this.toggleDataList.bind(this);
//     this.seleccionar = this.seleccionar.bind(this);
//     this.actualizarAlEliminar = this.actualizarAlEliminar.bind(this);
//     this.estadoInicial = this.estadoInicial.bind(this);
  
//   }

//   toggle() {
//     this.setState({
//       modal: !this.state.modal,
//     });
//   }

//   toggleDataList() {
//     this.onSelect();
//     this.setState({
//       modalDataList: !this.state.modalDataList,
//     });
//   }

//   estadoInicial() {
//     this.setState({
//       articulo: { nombre: "", codigo: "", descripcion: "", precio: "" },
//     });
//   }

//   componentDidMount() {
//     this.listadoArticulos();
//   }

//   listadoArticulos = () => {
//     fetch(`http://localhost:8282/articulos`)
//       .then((res) => res.json())
//       .then(
//         (arts) => this.setState({ articulos: arts, articulo: {} }),
//         console.log("ArticulosEnviado", this.state.articulos)
//       );
//   };


//   ArticulosDataListInput = () => {
//     const [articulo, setItem] = useState();
//     const onSelect = useCallback((articulo) => {
//       console.log("articuloSeleccionado___", this.onSelect(articulo));
//     }, []);

//     const items = useMemo(
//       () =>
//         this.state.articulos.map((articulo) => ({
//           label: articulo.nombre,
//           key: articulo.id,
//           someAdditionalValue: articulo.precio,
//           ...articulo,
//         })),
//       console.log("articulos", [items])
//     );
//     return (
//       <div className="container">
//         <DataListInput
//           placeholder="Seleciona un articulo..."
//           item={articulo}
//           items={items}
//           onSelect={onSelect}
//           articuloChange={this.articulosDataListInputChangeHandler.bind(this)}
//         />
//       </div>
//     );
//   };

//   articulosDataListInputChangeHandler(unArticulo) {
//     var nuevaLista = this.state.articulos.map((item) =>
//       item.id !== unArticulo.id ? item : unArticulo
//     );
//     this.setState({ articuloSeleccionado: unArticulo });
//   }


//   onSelect = (articulo) => {
//     this.setState({ articuloSeleccionado: articulo, onSelectDataList: true });
//   };

//   actualizarAlEliminar = (unArticulo) => {
//     var listaActualizada = this.state.articulos.filter(
//       (item) => unArticulo !== item
//     );
//     this.setState({ articulos: listaActualizada, articulo: {} });
//   };

//   eliminarArticulo(id) {
//     this.props.eliminarArticulo(id);
//   }

//   seleccionar = (unArticulo) => {
//     this.setState({ articulo: unArticulo });
//   };

//   editarArticuloFetch(id) {
//     this.props.editarArticulo(id);
//     this.toogle();
//   }
//   editarArticulo = (unArticulo) => {
//     this.setState({ articulo: unArticulo });
//   };
  
// render() {
//     return (
//       <div className="container">
//         <Row>&nbsp;</Row>
//         <Container fluid>
//           <this.ArticulosDataListInput
//             color="info"
//             onClick={this.toggleDataList}
//           ></this.ArticulosDataListInput>

//           <br></br>
//           <br></br>

//           <Button color="success" onClick={this.toggle}>
//             Nuevo Articulo
//           </Button>

//           <Modal
//             isOpen={this.state.modal}
//             toggle={this.toggle}
//             className={this.props.className}
//           >
//             <ModalHeader toggle={this.toggle}>
//               <strong>Nuevo</strong>Articulo
//             </ModalHeader>

//             <CargarArticulo
//               articulo={this.state.articulo}
//               articulos={this.state.articulos}
//               listadoArticulos={this.listadoArticulos}
//               editarClienteFetch={this.props.editarClienteFetch}
//               estadoInicial={this.estadoInicial}
//             />
//           </Modal>

//           <Row>&nbsp;</Row>
//         </Container>

//         <div className="animated fadeIn">
//           <Row>
//             <Col xs="12" lg="12">
//               <Card>
//                 <CardHeader>
//                   <i className="fa fa-align-justify"></i> articulos Lista
//                 </CardHeader>
//                 <CardBody>
//                   <Table responsive bordered size="sm">
//                     <thead>
//                       <tr>
//                         <th>id</th>
//                         <th>nombre</th>
//                         <th>codigo</th>
//                         <th>descripcion</th>
//                         <th>precio</th>
//                       </tr>
//                     </thead>
//                     <tbody>{this.renderRows()}</tbody>
//                   </Table>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </div>
//     );
//   }


//   renderRows() {
//     let articulos = this.state.articulos;
//     return !articulos
//       ? console.log("NULL", null)
//       : articulos.map((unArticulo, index) => {
//           return (
//             <Articulo
//               key={index}
//               articulo={unArticulo}
//               articulos={this.state.articulos}
//               selector={this.seleccionar}
//               actualizarAlEliminar={this.actualizarAlEliminar}
//               eliminarArticulo={this.eliminarArticulo.bind(this)}
//               editarArticulo={this.editarArticulo}
//               toggle={this.toggle}
//               editarArticuloFetch={this.editarArticuloFetch.bind(this)}
//             />
//           );
//         });
//   }
// }
// export default ArticulosLista;
