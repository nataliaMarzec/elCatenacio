import React from "react";
import {
  Button,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  Col,
  Row,
} from "reactstrap";
import logo from "../assets/img/brand/logo.svg";


function Card({codigo,descripcion,precio,habilitado }) {
    var codigoPedido=this.state.pedido.codigo;
    return (
      <div className="container">
        <Col xs="12" md="12">
          {/* <Form className="form-vertical"> */}
          <Row></Row>
          <Col xs="12" sm="6" md="4">
            <Card className="border-warning">
              <Card style={{ border: "1px solid red" }}>
                {/* <CardImg top height="15px" src={logo} /> */}
                <CardImg top src={logo} />
                <CardBody>
                  <CardSubtitle>Cargar imagen</CardSubtitle>
                  <CardText></CardText>
                </CardBody>
              </Card>
              <CardBody>
              <tbody>
            <tr className="#1b5e20 green darken-4">
                  <th>Codigo{codigo}</th>
                  <th>&nbsp;</th>
                  <th>descripcion{descripcion}</th>
                  <th>&nbsp;</th>
                  <th>precio{precio}</th>
                  <th>&nbsp;</th>
                  <th>habilitado{habilitado}</th>
                  <th> </th>
                   {/* <tbody>{this.unPedido}</tbody> */}
                </tr>
            </tbody>
              </CardBody>
            </Card>

            <Button
              type="submit"
              color="success"
              outline
            >
              <i className="fa fa-dot-circle-o"></i> Comprar
            </Button>
          </Col>
        </Col>
      </div>
    );
}