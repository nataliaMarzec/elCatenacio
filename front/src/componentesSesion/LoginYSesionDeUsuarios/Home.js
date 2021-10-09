import React from "react";
import { Redirect, Route, Switch,Link } from "react-router-dom";
import * as router from "react-router-dom";
import { Button,Row,Col } from "reactstrap";
import WrapperConsumer,{ContextUsuario} from "../Context/ContextUsuario";

class Home extends React.Component {
  static contextType = ContextUsuario

  constructor(props) {
    super(props);
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.history.push("/vistaDeProductosParaClientes");
  };

  salir = (e) => {
    e.preventDefault();
    this.props.history.push("/login");
    this.props.context.estadoInicial()
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
      <div className="container">
        <div className="jumbotron mt-5" style={{ backgroundColor: "#020405" }}>
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center" style={{ color: "#18ecca" }}>
              Conoce El Catenacio!
            </h1>
          </div>
          <Row>
          <Col>
          <Link style={{ color: "#18ecca" }} aling="aling-center" size="lg"  onClick={this.onClick}>
            Ver productos
          </Link>
          </Col>
          <Col>
          <Link style={{ color: "#18ecca" }} aling="aling-center" size="lg"  onClick={this.salir}>
            Salir
          </Link>
          </Col>
          </Row>
        </div>
      </div>
      </div>
    );
  }
}

export default WrapperConsumer(Home)
