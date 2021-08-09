import React, { Component, useState } from 'react';
import CocinaDetallesRow from './CocinaDetallesRow';
import VistaDePedidosParaCocinaRow from './VistaDePedidosParaCocinaRow';
import VistaDePedidosParaParrillaRow from './VistaDePedidosParaParrillaRow';

import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardColumns, CardText, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const CocinaDetallesController = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }


  const itemsListaCocina = () => {
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
    // console.log("nuevaLista1",nuevaLista)
    nuevaLista = nuevaLista.concat(data2.filter(function (el) {
      var found = false, x = 0;
      while (x < data1.length && !found) {
        if (el.id == data1[x].productoId) found = true;
        // data1[x].listoCocina=true;
        x++;
      }
      if (!found) return el;
    }));

    // console.log("nuevaLista2", nuevaLista)
    return nuevaLista
  }
  const pedidoListaCocina = () => {
    let data1 = props.pedidos
    let data2 = itemsListaCocina()
    // console.log("pedidoItemscocina", itemsListaCocina())
    var nuevaLista = data1.filter(function (el) {
      var found = false, x = 0;
      while (x < data2.length && !found) {
        if (el.id == data2[x].pedidoId && el.preparado != false && el.entregado != false) found = true;
        x++;
      }
      if (!found) return el;
    });
    // console.log("CocinaPEDIDOf1", nuevaLista)
    nuevaLista = nuevaLista.concat(data2.filter(function (el) {
      var found = false, x = 0;
      while (x < data1.length && !found) {
        if (el.pedidoId == data1[x].id) found = true;
        x++;
      }
      if (!found) return el;
    }));
    // console.log("CocinaPEDIDOf2", nuevaLista)
    return nuevaLista
  }

  const itemsListaParrilla = () => {
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
    // console.log("Cocina", nuevaLista)
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
            <Row>

              <React.Fragment>{
                props.pedidos.filter(p => p.entregado == false && p.preparadoCocina == false).length > 0 &&

                props.pedidos.filter(p => p.entregado == false && p.preparadoCocina == false).map((unPedido, index) => {
                  let itemsListoCocina = itemsListaCocina()
                    .filter((i) => i.pedidoId == unPedido.id && i.listoCocina == true)
                  let filter = unPedido.ItemsPedido.filter(i => i.listoCocina == true)
                  {/* console.log("pedidoCocina++", filter) */ }
                  if (filter.length > 0) {
                    return (
                      <div className="col-sm-4">
                        <VistaDePedidosParaCocinaRow
                          index={index}
                          itemsCocina={itemsListoCocina}
                          item={props.item}
                          productos={props.productos}
                          producto={props.producto}
                          pedidoCocina={unPedido}
                          pedidos={props.pedidos}
                          listadoPedidos={props.listadoPedidos}
                          listadoItemsPedido={props.listadoItemsPedido}
                          entregado={unPedido.entregado}
                        />
                      </div>
                    )
                  }
                })}{
                  props.pedidos.filter(p => p.entregado == false && p.preparadoCocina === false).length === 0 &&
                  <Container><CardText>No hay productos para preparar</CardText></Container>
                }
              </React.Fragment>
            </Row>
          </TabPane>

          <TabPane tabId="2">
            <Row>
              <React.Fragment>{
                props.pedidos.filter(p => p.entregado == false && p.preparadoParrilla == false).length > 0 &&

                props.pedidos.filter(p => p.entregado == false && p.preparadoParrilla == false).map((unPedido, index) => {
                  let itemsListoParrilla = itemsListaParrilla()
                    .filter((i) => i.pedidoId == unPedido.id && i.listoParrilla == true)
                  let filter = unPedido.ItemsPedido.filter(i => i.listoParrilla == true)
                  {/* console.log("pedidoCocina++", filter) */ }
                  if (filter.length > 0) {
                    return (
                      <div className="col-sm-4">
                        <VistaDePedidosParaParrillaRow
                          index={index}
                          itemsParrilla={itemsListoParrilla}
                          item={props.item}
                          productos={props.productos}
                          producto={props.producto}
                          pedidoParrilla={unPedido}
                          pedidos={props.pedidos}
                          listadoPedidos={props.listadoPedidos}
                          listadoItemsPedido={props.listadoItemsPedido}
                          entregado={unPedido.entregado}
                        />
                      </div>
                    )
                  }
                })}{
                  props.pedidos.filter(p => p.entregado == false && p.preparadoParrilla === false).length === 0 &&
                  <Container><CardText>No hay productos para preparar</CardText></Container>
                }
              </React.Fragment>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Container>
              <React.Fragment>{
                props.pedidos.filter(p => p.preparadoCocina == true && p.entregado === false
                  || p.preparadoParrilla == true && p.entregado === false).length > 0 &&
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
                  props.pedidos.filter(p => p.preparadoCocina == true && p.entregado === false).length === 0 &&
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
      props.pedidos.filter(p => p.entregado === false && p.preparadoCocina === true ||
        p.entregado === false && p.preparadoParrilla === true).map((unPedido, index) => {
          let itemsListoCocina = unPedido.ItemsPedido.filter(i => i.pedidoId == unPedido.id && i.listoCocina == true && unPedido.preparadoCocina == true)
          let itemsListoParrilla = unPedido.ItemsPedido.filter(i => i.pedidoId == unPedido.id && i.listoParrilla == true && unPedido.preparadoParrilla == true)
          let array = props.itemsPreparados
          let array2 = array.concat(itemsListoParrilla)
          let array3 = array2.concat(itemsListoCocina)

          if (itemsListoCocina.length > 0 || itemsListoParrilla.length > 0) {
            return (
              <CocinaDetallesRow
                index={index}
                items={array3}
                itemsParrilla={itemsListoParrilla}
                item={props.item}
                pedido={unPedido}
                pedidos={props.pedidos}
                listadoPedidos={props.listadoPedidos}
                listadoItemsPedido={props.listadoItemsPedido}
              >
              </CocinaDetallesRow>
            )
          }
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


