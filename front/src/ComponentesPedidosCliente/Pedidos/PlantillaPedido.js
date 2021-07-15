import React from "react";
import {
  Button, Container, CardHeader, Card, CardBody, Col, Row, Table
} from "reactstrap";
var moment = require('moment');
class PlantillaPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fecha: props.fecha,
      hora: props.hora,
      listaItems: props.listaItems,
      unPedido: props.unPedido,
      nombre: props.nombre,
      nuevaListaDescripciones: props.nuevaListaDescripciones,
      selectedValues: props.selectedValues,
    };
    this.guardar = this.guardar.bind(this)

  }

  componentWillMount() {
    this.setState({
      listaItems: this.state.listaItems, unPedido: this.state.unPedido,
      fecha: this.state.fecha, hora: this.state.hora,
      nuevaListaDescripciones: this.state.nuevaListaDescripciones,
      unPedido: this.state.unPedido
    }
      , () => console.log("plantillaWill-unPedido", this.state.unPedido))
  }

  // componentWillUpdate(nextProps,prevProps,prevState) {
  //   // let items=this.props.itemsPedido.filter(i=>i.pedidoId===this.props.idPedido)
  //   if (nextProps.idPedido !== this.props.idPedido && this.state.itemsPedido != []) {
  //     this.setState({ idPedido: this.props.idPedido, itemsPedido: this.props.itemsPedido }
  //       , () => console.log("updateIdPedido", this.state.idPedido, this.state.itemsPedido))
  //   }
  //   let idPedido = this.state.idPedido
  //   // if (nextProps.itemsPedido != this.prevState.itemsPedido){
  //   try {
  //     return fetch(`http://localhost:8383/itemsDePedido/${idPedido}`, {
  //       method: "get",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((res) =>
  //         this.setState({ itemsPedido: res, itemsPedido2: res }
  //           , () => console.log("itemUpdae", res, this.state.itemsPedido, this.state.idPedido)))
  //   } catch (error) {
  //     console.log(error);
  //   }
  // // }

  // }
  // shouldComponentUpdate(){
  //   this.setState({itemsPedido:[]})
  //   if(this.state.itemsPedido==[])
  //   return false
  // }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.unPedido !== this.props.unPedido) {
      this.setState({ unPedido: nextProps.unPedido });
    }
    if (nextProps.listaItems !== this.props.listaItems) {
      this.setState({ listaItems: nextProps.listaItems });
    }
    if (nextProps.fecha !== this.props.fecha) {
      this.setState({ fecha: nextProps.fecha });
    }
    if (nextProps.hora !== this.props.hora) {
      this.setState({ hora: nextProps.hora });
    }
    if (nextProps.nombre !== this.props.nombre) {
      this.setState({ nombre: nextProps.nombre });
    }
  }

  sumar = () => {
    let importes = this.state.listaItems.map((i) => i.importe);
    let total = importes.reduce((a, b) => a + b, 0);
    return total;
  };

  guardar() {
    this.props.crearPedido()
    this.props.actualizarEstadosAlGuardar()
    this.setState({ listaItems: [], unPedido: {} }, () => this.forceUpdate())
    this.props.vistaPrevia(false)
  }

  render = () => {
    let unPedido = this.state.unPedido
    // return itemsPedido.map((unItem, index) => {
    console.log("ultimoPedPlantilla", unPedido)

    return (
      <Container>
        {/* <b>Ultimo pedido </b> <p></p> */}
        <CardHeader align="left"><b>Último pedido</b>{"   "}Fecha: {moment(this.state.fecha).format('DD-MM-YYYY')}</CardHeader>
        <Card>
          <CardBody>

            <Table striped>
              <thead>
                <tr>
                  {/* <th>#Código</th> */}
                  <th>Responsable de mesa</th>
                  <th>Sección</th>
                  <th>Horario</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.nombre}</td>
                  <td>{this.state.unPedido.seccion}</td>
                  <td>{moment(this.state.hora).format('HH:mm')}</td>
                </tr>
                <tr align="left">
                  <b>Observaciones generales</b> : {this.state.unPedido.observaciones || "S/observaciones"}
                </tr>
              </tbody>

            </Table>

            <Table>
              <thead>
                <tr>
                  {/* <th>#Código</th> */}
                  <th>Productos</th>
                  <th>Cantidad</th>
                  <th>Observaciones</th>
                  <th>Importe</th>
                </tr>
              </thead>
              <React.Fragment>{
                this.state.listaItems.map((unItem, unIndex) => {
                  return (
                    <tbody>
                      <tr>
                        <th scope="row">{unItem.descripcion}</th>
                        <td>{unItem.cantidad}</td>
                        <td>{unItem.observaciones || "Sin observaciones"}</td>
                        <td>{unItem.importe}</td>
                      </tr>
                    </tbody>
                  )
                })}
              </React.Fragment>
            </Table>
            {/* <CardHeader align="left">Estado</CardHeader> */}
            <CardHeader align="left">
              <Row><b>Importe total</b></Row>
              <Row><h8 align="right">${this.sumar()}</h8></Row>
            </CardHeader>
          </CardBody>
        </Card>
        <Row>
          <Col>
            <Button color="primary" size="lg" block
              onClick={() => this.props.vistaPrevia(false)}
            >
              Cerrar
            </Button>
            <Button color="success" size="lg" block
              onClick={() => this.guardar()}
            >
              Guardar
            </Button>

          </Col>
        </Row>
      </Container>

    )

  };



}

export default PlantillaPedido;
