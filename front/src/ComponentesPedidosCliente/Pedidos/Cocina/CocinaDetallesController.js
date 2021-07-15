import React, { useState } from 'react';
import CocinaDetallesRow from './CocinaDetallesRow';
import VistaDePedidosParaCocinaRow from './VistaDePedidosParaCocinaRow';
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardColumns, CardText, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const CocinaDetallesController = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  // console.log("controllerPedidos", props.items)



  return (
    <div>
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              Pedidos para cocina
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              Pedidos sin entregar
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              Pedidos entregados
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>

          <TabPane tabId="1">
            <React.Fragment>{
              props.pedidos.filter(p => p.entregado === false).map((unPedido, index) => {
                let itemsLista = props.items.filter(i => i.pedidoId == unPedido.id)
                console.log("contro", "+++", itemsLista)
                return (
                  <Container>
                  {/* <CardColumns> */}
                  <Col class="col-lg-4">
                    <Table>
                      <VistaDePedidosParaCocinaRow
                        index={index}
                        items={itemsLista}
                        item={props.item}
                        productos={props.productos}
                        producto={props.producto}
                        pedido={unPedido}
                        pedidos={props.pedidos}
                        listadoPedidos={props.listadoPedidos}
                        listadoItemsPedido={props.listadoItemsPedido}
                        entregado={unPedido.entregado}
                      />
                    </Table>

                    </Col>
                    {/* </CardColumns> */}
                  </Container>
                )
              })}
            </React.Fragment>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <h4>Tabla pedidos sin Entregar</h4>
              </Col>
            </Row>
            <Container>
              <Table responsive bordered size="sm">
                <thead>
                  <tr>
                    <th>N° pedido</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>

                <tbody> <React.Fragment>{
                  props.pedidos.filter(p => p.entregado === false).map((unPedido, index) => {
                    let itemsLista = props.items.filter(i => i.pedidoId == unPedido.id)
                    {/* console.log("contro", "+++", itemsLista) */ }
                    return (
                      <CocinaDetallesRow
                        index={index}
                        items={itemsLista}
                        item={props.item}
                        pedido={unPedido}
                        pedidos={props.pedidos}
                        listadoPedidos={props.listadoPedidos}
                        listadoItemsPedido={props.listadoItemsPedido}
                        entregado={unPedido.entregado}
                      >
                      </CocinaDetallesRow>
                    )
                  })}
                </React.Fragment>
                </tbody>


              </Table>
            </Container>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <h4>Tabla Pedidos Entregados</h4>
              </Col>
            </Row>

            <Container>
              <Table responsive bordered size="sm">
                <thead>
                  <tr>
                    <th>N° pedido</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>

                <tbody> <React.Fragment>{
                  props.pedidos.filter(p => p.entregado === true).map((unPedido, index) => {
                    let itemsLista = props.items.filter(i => i.pedidoId == unPedido.id)
                    return (
                      <CocinaDetallesRow
                        index={index}
                        items={itemsLista}
                        item={props.item}
                        pedido={unPedido}
                        pedidos={props.pedidos}
                        entregado={unPedido.entregado}
                      >
                      </CocinaDetallesRow>
                    )
                  })}
                </React.Fragment>
                </tbody>


              </Table>
            </Container>
          </TabPane>

        </TabContent>
      </Container>
    </div>
  );
}


export default CocinaDetallesController;


