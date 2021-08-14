import React from "react";
import { Redirect, Route, Switch,Link } from "react-router-dom";
import * as router from "react-router-dom";
import { Button } from "reactstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.history.push("/vistaDeProductosParaClientes");
  };
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5" style={{ backgroundColor: "#020405" }}>
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center" style={{ color: "#18ecca" }}>
              Conoce El Catenacio!
            </h1>
          </div>
          <Link style={{ color: "#18ecca" }} aling="aling-center" size="lg"  onClick={this.onClick}>
            Ver productos
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
