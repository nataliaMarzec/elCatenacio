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


  const itemsListaCocina= ()=> {
    let data1 = props.items
    let data2 = props.productos
    var nuevaLista = data1.filter(function (el) {
      var found = false, x = 0;
      while (x < data2.length && !found) {
        if (el.productoId == data2[x].id && data2[x].categoria != "Cocina") found = true;
        x++;
      }
      if (!found) return el;
    });
    nuevaLista = nuevaLista.concat(data2.filter(function (el) {
      var found = false, x = 0;
      while (x < data1.length && !found) {
        if (el.id == data1[x].productoId) found = true;
        x++;
      }
      if (!found) return el;
    }));
    console.log("Cocina", nuevaLista)
    return nuevaLista
  }
  // const pedidoListaCocina= ()=> {
  //   let data1 = props.pedidos
  //   let data2 = itemsListaCocina()
  //   var nuevaLista = data1.filter(function (el) {
  //     var found = false, x = 0;
  //     while (x < data2.length && !found) {
  //       if (el.id == data2[x].pedidoId && el.preparado != false && el.entregado != false) found = true;
  //       x++;
  //     }
  //     if (!found) return el;
  //   });
  //   nuevaLista = nuevaLista.concat(data2.filter(function (el) {
  //     var found = false, x = 0;
  //     while (x < data1.length && !found) {
  //       if (el.pedidoId == data1[x].id) found = true;
  //       x++;
  //     }
  //     if (!found) return el;
  //   }));
  //   console.log("CocinaPEDIDO", nuevaLista)
  //   return nuevaLista
  // }

  const itemsListaParrilla= ()=> {
    let data1 = props.items
    let data2 = props.productos
    var nuevaLista = data1.filter(function (el) {
      var found = false, x = 0;
      while (x < data2.length && !found) {
        if (el.productoId == data2[x].id && data2[x].categoria != "Parrilla") found = true;
        x++;
      }
      if (!found) return el;
    });
    nuevaLista = nuevaLista.concat(data2.filter(function (el) {
      var found = false, x = 0;
      while (x < data1.length && !found) {
        if (el.id == data1[x].productoId) found = true;
        x++;
      }
      if (!found) return el;
    }));
    console.log("Cocina", nuevaLista)
    return nuevaLista
  }

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
              Pedidos para parrilla
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              Pedidos preparados
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => { toggle('4'); }}
            >
              Pedidos entregados
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>

          <TabPane tabId="1">
            <React.Fragment>{
              props.pedidos.filter(p => p.entregado == false && p.preparado === false).length > 0 &&
              props.pedidos.filter(p => p.entregado === false && p.preparado === false).map((unPedido, index) => {
               
                let itemsLista = itemsListaCocina().filter((i) => i.pedidoId == unPedido.id)
               console.log("itemsLista",itemsListaCocina())
               {/* if(itemsListaCocina().length > 0){ */}
                return (
                  <Row>
                    {/* <React.Fragment>{
                      props.pedidos.map(p=><Col className="col-lg-4"></Col> */}
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
                  </Row>
                )
                {/* } */}
              })}{
                props.pedidos.filter(p => p.entregado == false && p.preparado === false).length === 0 &&
                <Container><CardText>No hay productos para preparar</CardText></Container>
              }
            </React.Fragment>
          </TabPane>

          <TabPane tabId="2">
            <React.Fragment>{
              props.pedidos.filter(p => p.entregado == false && p.preparado === false).length > 0 &&
              props.pedidos.filter(p => p.entregado === false && p.preparado === false).map((unPedido, index) => {
                let itemsLista = itemsListaParrilla().filter((i) => i.pedidoId == unPedido.id)
                return (
                  <Row>
                    {/* <React.Fragment>{
                      props.pedidos.map(p=><Col className="col-lg-4"></Col> */}
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


                  </Row>
                )

              })}{
                props.pedidos.filter(p => p.entregado == false && p.preparado === false).length === 0 &&
                <Container><CardText>No hay productos para preparar</CardText></Container>
              }
            </React.Fragment>
          </TabPane>
          <TabPane tabId="3">
            {/* <Row>
              <Col sm="12">
                <h4>Tabla pedidos preparados</h4>
              </Col>
            </Row> */}
            <Container>
              <React.Fragment>

              </React.Fragment>
              <React.Fragment>{
                props.pedidos.filter(p => p.preparado === true && p.entregado === false).length > 0 &&
                <Table responsive bordered size="sm">
                  <thead>
                    <tr>
                      <th>N° pedido</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Observaciones</th>
                    </tr>
                  </thead>
                  <tbody> {tablaPreparados(props)}</tbody>
                </Table>
              }{
                  props.pedidos.filter(p =>p.preparado === true && p.entregado === false).length === 0 &&
                  <Container><CardText>No hay productos para preparar</CardText></Container>
                }
              </React.Fragment>
            </Container>
          </TabPane>
          <TabPane tabId="4">
            <Container>
              <React.Fragment>{
                props.pedidos.filter(p => p.entregado == true).length > 0 &&
                <Table responsive bordered size="sm">
                  <thead>
                    <tr>
                      <th>N° pedido</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>{tablaEntregados(props)}</tbody>
                </Table>
              }{
                  props.pedidos.filter(p => p.entregado == true).length === 0 &&
                  <Container><CardText>No hay pedidos listos</CardText></Container>
                }
              </React.Fragment>
            </Container>
          </TabPane>

        </TabContent>
      </Container>
    </div>
  );
}


function tablaPreparados(props) {
  return (
    <React.Fragment>{
      props.pedidos.filter(p => p.entregado=== false && p.preparado === true).map((unPedido, index) => {
        let itemsLista = props.items.filter(i => i.pedidoId == unPedido.id)
        return (
          <CocinaDetallesRow
            index={index}
            items={itemsLista}
            item={props.item}
            pedido={unPedido}
            pedidos={props.pedidos}
            listadoPedidos={props.listadoPedidos}
            listadoItemsPedido={props.listadoItemsPedido}
          >
          </CocinaDetallesRow>
        )
      })}
    </React.Fragment>
  )
};
function tablaEntregados(props) {
  return (
    <React.Fragment>{
      props.pedidos.filter(p => p.entregado === true).map((unPedido, index) => {
        let itemsLista = props.items.filter(i => i.pedidoId == unPedido.id)
        return (
          <CocinaDetallesRow
            index={index}
            items={itemsLista}
            item={props.item}
            pedido={unPedido}
            pedidos={props.pedidos}
          >
          </CocinaDetallesRow>
        )
      })}
    </React.Fragment>
  )

}
export default CocinaDetallesController;


