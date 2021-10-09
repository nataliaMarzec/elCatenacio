import React from 'react'
import {Col, Row } from 'reactstrap'
import {Link } from "react-router-dom";
const Login = React.lazy(() => import('./componentesSesion/LoginYSesionDeUsuarios/Login.js'))


class PrincipalPage extends React.Component {
    constructor(props) {
        super(props);

    }

    onClickAdmin(e) {
        e.preventDefault(e)
    }

    onClickCliente(e) {
        e.preventDefault(e)
    }

    render() {
        return (
            <div className="app flex-row align-items-center ">
                <div className="container mt-1" style={{ backgroundColor: "#020405" }}>
                    <div className="jumbotron mt-5" style={{ backgroundColor: "#020405" }}>
                        <div className="col-sm-8 mx-auto">
                            <h1 className="text-center" style={{ color: "#18ecca" }}>
                                Principal page
                            </h1>
                        </div>
                        <Row>
                            <Col>
                                <Link to="/login" style={{ color: "#18ecca" }} aling="aling-left" size="lg"
                                    render={props => <Login {...props} />}>
                                    Admin
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/login" style={{ color: "#18ecca" }} aling="aling-right" size="lg"
                                    render={props => <Login  {...props} />}>
                                    Cliente
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}


export default PrincipalPage;
















