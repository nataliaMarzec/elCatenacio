import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap';


const PaginacionPedidos = (props) => {
  // const [search, setSearch] = useState('');
  const [estadoPage, setEstadoPage] = useState('')



  // const filteredPedidos = () => {

  //     if (search.length === 0)
  //         return props.pedidos.slice(currentPage, currentPage + 5);

  //     // Si hay algo en la caja de texto
  //     const filtered = props.pedidos.filter(p => p.fecha.includes(search));
  //     return filtered.slice(currentPage, currentPage + 5);
  // }


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


  // const onSearchChange = ({ target }) => {
  //     setCurrentPage(0);
  //     setSearch(target.value);
  // }

  // const usePedidos = () => {

  //     const [ isLoading, setisLoading ] = useState(true);
  //     const [ pedidos, setPedidos ] = useState([])

  //     useEffect(() => {
  //         // Carga de los Pedidos
  //         props.listadoPedidos()
  //             .then( pedidos => {
  //                 setisLoading(false);
  //                 setPedidos( pedidos );
  //             })
  //     }, [])


  //     return {
  //         isLoading,
  //         pedidos
  //     }
  // }

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
export default PaginacionPedidos