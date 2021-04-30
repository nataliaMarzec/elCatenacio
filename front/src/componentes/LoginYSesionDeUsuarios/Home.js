import React from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Button} from 'reactstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    };

    onClick=(e)=>{
      e.preventDefault()
      this.props.history.push('/vistaDeProductosParaClientes')
    }
    render() {
      return (
        <div className="container">
          <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">Conoce combapp!</h1>
            </div>
            <Button color="danger" size="lg" block onClick={this.onClick}>Ver productos</Button>
          </div>
        </div>
      )
    }
  }
  




export default Home;
