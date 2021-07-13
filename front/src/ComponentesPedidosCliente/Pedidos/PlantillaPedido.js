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
      nuevaListaDescripciones: props.nuevaListaDescripciones,
      selectedValues:props.selectedValues,
    };
    this.guardar=this.guardar.bind(this)

  }

  componentWillMount() {
    this.setState({
      listaItems: this.state.listaItems, unPedido: this.state.unPedido
      , fecha: this.state.fecha, hora: this.state.hora
      , nuevaListaDescripciones: this.state.nuevaListaDescripciones,
      selectedValues:this.state.selectedValues
    }
      , () => console.log("listaItemsWill", this.state.fecha, this.state.hora))
  }

  // shouldComponentUpdate() {
  //     this.setState({encontrado:false})

  // }

  // componentWillUpdate(nextProps,prevProps){
  //   if(prevProps.idPedido != this.props.idPedido){
  //    this.setState({idPedido:this.props.idPedido}
  //     ,console.log("updateidPedido",this.state.idPedido)) 
  //   }
  //   this.props.encontrarItemsIdPedido(this.props.idPedido)


  // }





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
      this.setState({ unPedido: nextProps.unPedido }
        // , () => console.log("pedidoPlantilla", nextProps.pedido)
      );
    }
    if (nextProps.listaItems !== this.props.listaItems) {
      this.setState({ listaItems: nextProps.listaItems }
        , () => console.log("listaItemsPlantilla", nextProps.listaItems));
    }
    if (nextProps.fecha !== this.props.fecha) {
      this.setState({ fecha: nextProps.fecha }
        // , () => console.log("pedidoPlantilla", nextProps.pedido)
      );
    }
    if (nextProps.hora !== this.props.hora) {
      this.setState({ hora: nextProps.hora }
        // , () => console.log("pedidoPlantilla", nextProps.pedido)
      );
    }
    if (nextProps.selectedValues !== this.props.selectedValues) {
      this.setState({ selectedValues: nextProps.selectedValues }
        // , () => console.log("pedidoPlantilla", nextProps.pedido)
      );
    }


  }

  sumar = () => {
    let importes = this.state.listaItems.map((i) => i.importe);
    let total = importes.reduce((a, b) => a + b, 0);
    console.log("importetotal", this.state.importeTotal);

    return total;
  };

  guardar(listaItems) {
    let lista=listaItems
    lista=[]
    this.setState({listaItems:lista})
    // this.props.crearPedido()
    // this.setState({selectedValues:this.state.selectedValues},()=>console.log("GUARDAR",this.state.selectedValues))
    this.props.crearPedido()
    this.props.actualizarEstadosAlGuardar([],[])
    this.props.vistaPrevia(false)
    // this.props.resetValues()

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
                  <td>{ }</td>
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
                        {/* <td>{unItem.descripcion}</td> */}
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
              onClick={() => this.guardar(this.state.listaItems)}
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
