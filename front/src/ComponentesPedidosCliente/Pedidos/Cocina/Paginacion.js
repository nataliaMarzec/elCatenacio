import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap';


const Paginacion = (props) => {
  const [estadoPage, setEstadoPage] = useState('')

  const nextPage = (estado) => {
    if (estado === 'Cocina') {
      let listaCocina = props.pedidosCocina
      if (listaCocina.length > (props.currentPageCocina + 2))
        props.setCurrentPageCocina(props.currentPageCocina + 2);
    }
    if (estado === 'Parrilla') {
      let listaParrilla = props.pedidosParrilla
      if (listaParrilla.length > (props.currentPageParrilla + 2))
        props.setCurrentPageParrilla(props.currentPageParrilla + 2);
    }
    if (estado === 'Preparados') {
      let listaPreparados = props.pedidosPreparados
      if (listaPreparados.length > (props.currentPagePreparados + 2))
        props.setCurrentPagePreparados(props.currentPagePreparados + 2);
    }
    if (estado === 'Entregados') {
      let listaEntregados = props.pedidosEntregados
      if (listaEntregados.length > (props.currentPageEntregados + 2))
        props.setCurrentPageEntregados(props.currentPageEntregados + 2);
    }
  }

  const prevPage = (estado) => {
    if (estado === 'Cocina') {
      if (props.currentPageCocina > 0)
        props.setCurrentPageCocina(props.currentPageCocina - 2);
    }
    if (estado === 'Parrilla') {
      if (props.currentPageParrilla > 0)
      props.setCurrentPageParrilla(props.currentPageParrilla - 2);
    }
    if (estado === 'Preparados') {
      if (props.currentPagePreparados > 0)
      props.setCurrentPagePreparados(props.currentPagePreparados - 2);
    }
    if (estado === 'Entregados') {
      if (props.currentPageEntregados > 0)
      props.setCurrentPageEntregados(props.currentPageEntregados - 2);
    }
  }

  const onClickPrev = () => {
    console.log("estadoPrev", props.estadoPage)
    prevPage(props.estadoPage)

  }

  const onClickNext = () => {
    console.log("estadoNext", props.estadoPage)
    nextPage(props.estadoPage)

  }


  return (
    <div>
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink previous onClick={onClickPrev}>Anterior</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next onClick={onClickNext}>Siguiente</PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  )

}
export default Paginacion