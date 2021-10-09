
export default {
    items: [
      {
        name: "Pedidos",
        url: "/pedidosLista",
        icon: "cui-list",
        attributes: { disabled:true},
      },
      {
        name: "Cargar pedidos",
        url: "/pedidos",
        icon: "cui-note",
        variant: 'primary',
        attributes: { disabled: false},
      },
      {
        name: "Un Pedido",
        url: "/unPedido",
        icon: "cui-puzzle",
        variant: 'success',
        attributes: { disabled: false },
      },
  
      {
        name: "Cocina",
        url: "/cocinaDetalles",
        icon: "cui-speedometer",
        variant: 'warning',
        attributes: { disabled: false},
      },
  
      {
        url: "/responsables",
        name: "RegistrarResponsable",
        icon: "cui-puzzle",
        variant: 'danger',
        attributes: { disabled: false},
      },
  
    ],
  };