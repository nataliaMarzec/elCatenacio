import React, { Component, useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import {
  Table, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button,
  CardColumns, CardText, Container, Row, Col, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import classnames from 'classnames';
import CocinaDetallesRow from './CocinaDetallesRow';
import VistaDePedidosParaCocinaRow from './VistaDePedidosParaCocinaRow';
import VistaDePedidosParaParrillaRow from './VistaDePedidosParaParrillaRow';
import Paginacion from './Paginacion';
registerLocale('es', es)
var moment = require('moment');

const CocinaDetallesController = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [startDate, setStartDate] = useState(new Date());
  const [currentPageCocina, setCurrentPageCocina] = useState(0)
  const [currentPageParrilla, setCurrentPageParrilla] = useState(0)
  const [currentPagePreparados, setCurrentPagePreparados] = useState(0)
  const [currentPageEntregados, setCurrentPageEntregados] = useState(0)


  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }


  const pedidosEnEspera = (props) => {
    let lista = props.pedidos.filter(p => p.preparadoCocina == false && p.preparadoParrilla == false)
      .map(p => p.fecha)
    console.log("pedidosEspera", props)


  }

  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": [
        // props.pedidos.filter(p=>p.preparadoCocina == false && p.preparadoParrilla == false)
        // .map(function(p){ 
        //   const d = p.fecha                              
        //   return d;                                         
        // })

      ],
    },
    // {
    //   "react-datepicker__day--highlighted-custom-2": [
    //     // addDays(new Date(), 1),
    //     // addDays(new Date(), 2),
    //     // addDays(new Date(), 3),
    //     // addDays(new Date(), 4),
    //   ],
    // },
  ];


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
  console.log(startDate, "DATE", props.pedidos.filter(p => p.preparadoCocina == false && p.preparadoParrilla == false)
    .map(function (p) {
      const d = p.fecha
        return d
      
    }))


  return (
    <div>
      <Container className="border rounded  shadow-lg p-3 bg-body mb-5 rounded" key="padre">
        <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
          <DatePicker
            className="date-picker-icon row border offset-sm-3 rounded ml-3 shadow-lg p-3 mb-3 bg-body rounded" key="data-pickers"
            selected={startDate}
            onSelect={props.handleDateSelect}
            onChange={(date) => setStartDate(date)}
            locale="es"
            dateFormat="dd/MM/yyyy"
            // timeInputLabel="Hora:"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={15}
            // showTimeInput
            highlightDates={highlightWithRanges}

          />
        </div>
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
            <Paginacion estadoPage={'Cocina'} pedidosCocina={props.pedidos.filter(p => p.entregado == false &&
              p.preparadoCocina == false && p.fecha == moment(startDate).format('DD/MM/yyyy'))}
              currentPageCocina={currentPageCocina} setCurrentPageCocina={setCurrentPageCocina}
            >
            </Paginacion>
            <Row>
              <React.Fragment>{
                props.pedidos.filter(p => p.entregado == false && p.preparadoCocina == false && p.ItemsPedido.length > 0 && p.fecha == moment(startDate).format('DD/MM/yyyy')).length > 0 &&

                props.pedidos.filter(p => p.entregado == false && p.preparadoCocina == false && p.fecha == moment(startDate).format('DD/MM/yyyy'))
                  .slice(currentPageCocina, currentPageCocina + 3)
                  .map((unPedido, index) => {
                    let itemsListoCocina = itemsListaCocina()
                      .filter((i) => i.pedidoId == unPedido.id && i.listoCocina == true)
                    let filter = unPedido.ItemsPedido.filter(i => i.listoCocina == true)
                    console.log("pedidoCocina++", unPedido.fecha, "+++++", moment(startDate).format('DD/MM/yyyy'))
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
            <Paginacion estadoPage={'Parrilla'} pedidosParrilla={props.pedidos.filter(p => p.entregado == false &&
              p.preparadoParrilla == false && p.fecha == moment(startDate).format('DD/MM/yyyy'))}
              currentPageParrilla={currentPageParrilla} setCurrentPageParrilla={setCurrentPageParrilla}
            >
            </Paginacion>
            <Row>
              <React.Fragment>{
                props.pedidos.filter(p => p.entregado == false && p.preparadoParrilla == false && p.fecha == moment(startDate).format('DD/MM/yyyy')).length > 0 &&

                props.pedidos.filter(p => p.entregado == false && p.preparadoParrilla == false &&
                  p.fecha == moment(startDate).format('DD/MM/yyyy'))
                  .slice(currentPageParrilla, currentPageParrilla + 3)
                  .map((unPedido, index) => {
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
            <Paginacion estadoPage={'Preparados'}
              pedidosPreparados={props.pedidos.filter(p => p.preparadoCocina == true && p.entregado === false && p.fecha == moment(startDate).format('DD/MM/yyyy')
                || p.preparadoParrilla == true && p.entregado === false && p.fecha == moment(startDate).format('DD/MM/yyyy'))}
              currentPagePreparados={currentPagePreparados} setCurrentPagePreparados={setCurrentPagePreparados}
            >
            </Paginacion>
            <Container>
              <React.Fragment>{
                props.pedidos.filter(p => p.preparadoCocina == true && p.entregado === false && p.fecha == moment(startDate).format('DD/MM/yyyy')
                  || p.preparadoParrilla == true && p.entregado === false && p.fecha == moment(startDate).format('DD/MM/yyyy')).length > 0 &&
                <Table responsive bordered size="sm">
                  <thead>
                    <tr>
                      <th>N° pedido</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Observaciones</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody> {tablaPreparados(props, currentPagePreparados)}</tbody>
                </Table>
              }{
                  props.pedidos.filter(p => p.preparadoCocina == true && p.entregado === false).length === 0 &&
                  <Container><CardText>No hay productos para preparar</CardText></Container>
                }
              </React.Fragment>
            </Container>
          </TabPane>
          <TabPane tabId="4">
            <Paginacion estadoPage={'Entregados'}
              pedidosEntregados={props.pedidos.filter(p => p.entregado == true
                && p.fecha == moment(startDate).format('DD/MM/yyyy'))}
              currentPageEntregados={currentPageEntregados} setCurrentPageEntregados={setCurrentPageEntregados}
            >
            </Paginacion>
            <Container>
              <React.Fragment>{
                props.pedidos.filter(p => p.entregado == true && p.fecha == moment(startDate)
                  .format('DD/MM/yyyy')).length > 0 &&
                <Table responsive bordered size="sm">
                  <thead>
                    <tr>
                      <th>N° pedido</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>{tablaEntregados(props, startDate, currentPageEntregados)}</tbody>
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


function tablaPreparados(props, currentPagePreparados) {
  return (
    <React.Fragment>{
      props.pedidos.filter(p => p.entregado === false && p.preparadoCocina === true ||
        p.entregado === false && p.preparadoParrilla === true).slice(currentPagePreparados, currentPagePreparados + 2)
        .map((unPedido, index) => {
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
function tablaEntregados(props, startDate, currentPageEntregados) {
  return (
    <React.Fragment>{
      props.pedidos.filter(p => p.entregado === true && p.fecha == moment(startDate).format('DD/MM/yyyy'))
        .slice(currentPageEntregados, currentPageEntregados + 2)
        .map((unPedido, index) => {
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


