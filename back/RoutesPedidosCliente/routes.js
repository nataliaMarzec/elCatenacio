const express = require("express");
const router = new express.Router();
const controllerPedido = require("../ControllersPedidosCliente/PedidoController");
const controllerProducto = require("../ControllersPedidosCliente/ProductoController");
const controllerItemsPedido = require("../ControllersPedidosCliente/ItemsPedidoController");
const controllerPago = require("../ControllersPedidosCliente/PagoController");
const controllerResponsableDeMesa = require("../ControllersPedidosCliente/ResponsableDeMesaController");

router.put("/pedidos/nuevo/:nombre", controllerPedido.create);
router.get("/pedido/busqueda/:id",controllerPedido.busquedaPedidoPorId)
router.put("/pedidos/items/pedido/:id/producto/:descripcion",controllerPedido.settearPedidoYProductoAItem)
// router.get("/pedidosTodos", controllerPedido.encontrarPedidoConItems);
// router.get("/pedidos/:id", controllerPedido.getPedidoId);
router.put("/pedidos/items/:id", controllerPedido.updateConItems);
router.get("/pedidos/entregado/:id/", controllerPedido.updatePedidoEntregado);
router.get("/pedidos/preparadoCocina/:id/", controllerPedido.todoListoPedidoPreparadoDeCocina);
router.get("/pedidos/preparadoParrilla/:id/", controllerPedido.todoListoPedidoPreparadoDeParrilla);
router.put("/pedidos/editar/:id/:nombre", controllerPedido.editarPedido);
//este
router.put("/pedidos/editar/:id/:codigo/:descripcion",controllerPedido.editarItemConProductoDePedido)
router.delete("/pedido/delete/:id", controllerPedido.eliminarPedidoConItems);

router.get("/pedidos", controllerPedido.getPedidos);
// router.get("/unPedido", controllerPedido.getUnPedido);
router.put("/pedidos/:id", controllerPedido.update);
router.get("/pedidos/buscar/:codigo", controllerPedido.encontrarPedidoPorCodigo);
router.get("/pedidos/encontrar/:mesero", controllerPedido.encontrarPedidoPorMesero);
router.put("/pedido/:id/entregado/:entregado",controllerPedido.updateEntregado);
router.get("/itemParaPedido/:codigo/:id", controllerPedido.guardarPedidoId);

router.post("/productos/nuevo", controllerProducto.create);
router.delete("/productos/:id", controllerProducto.delete);
router.put("/productos/:id", controllerProducto.update);
router.get("/productos", controllerProducto.getProductos);
router.get("/productos/habilitados", controllerProducto.getProductosHabilitados);

router.get("/productos/busqueda/:codigo", controllerProducto.encontrarProductoPorCodigo);
router.get("/productos/buscar/:productoFk", controllerProducto.encontrarProductoPorForeingKey);
router.get("/productos/ver/:id", controllerProducto.getForeingKeys);
// funciona:
router.get("/productosFks", controllerProducto.getProductosTodos);
router.get("/productos/pedido/:id", controllerProducto.getInfoProducto);
router.get("/productosDescripciones", controllerProducto.getProductosDescripciones);
router.get("/productosConItems", controllerProducto.productosConItems);

// primero crear el productoId a traves de la descripcion 
// segundo 

router.post("/itemsPedido/nuevo",controllerItemsPedido.create);
router.get("/itemsPedido/:id", controllerItemsPedido.encontrarItemPorId);
router.get("/itemsPedido/:productoId", controllerItemsPedido.encontrarProductoPorProductoId);

router.get("/itemsDePedido/:pedidoId", controllerItemsPedido.encontrarItemsPorPedidoId);
router.get("/itemsTodos", controllerItemsPedido.todosLosItems);
router.get("/items/:id/producto/:descripcion", controllerItemsPedido.addProducto);
router.get("/itemsUpdate/:id/producto/:descripcion", controllerItemsPedido.updateProducto);
router.get("/itemsDePedidos", controllerItemsPedido.todosLosItemsDePedidos);
router.put("/itemsPedido/:id",controllerItemsPedido.updatePorId);
router.put("/itemsPedido/:codigo/listoCocina/:listoCocina",controllerItemsPedido.updateListoCocina);
router.put("/itemsPedido/:codigo/listoParrilla/:listoParrilla",controllerItemsPedido.updateListoParrilla);
router.put("/itemsPedido/listos/cocina/:id",controllerItemsPedido.updateItemsListosCocina);
router.get("/itemsPedido/listos/cocina/:id",controllerItemsPedido.getItemsCocina)
router.put("/itemsPedido/listos/parrilla/:id",controllerItemsPedido.updateItemsListosParrilla);
router.get("/itemsPedido/listos/parrilla/:id",controllerItemsPedido.getItemsParrilla)
router.delete("/itemsPedido/eliminar/:codigo",controllerItemsPedido.delete);
router.post("/itemsPedido/producto",controllerItemsPedido.addConProducto);

router.get("/itemsDescripcion/:descripcion",controllerItemsPedido.buscarDescripcion);
router.get("/itemsPedidos/:id/:descripcion",controllerItemsPedido.getProductoAItem);
router.put("/itemsPedidos/:productoId",controllerItemsPedido.updateCantidadItem)
router.put("/itemObservaciones/:productoId",controllerItemsPedido.updateObservaciones)
router.get("/itemsPedidos/importe/:importe/:productoId",controllerItemsPedido.updateImporteItem)

router.post("/pago/nuevo",controllerPago.create);

router.post("/responsable/nuevo",controllerResponsableDeMesa.create);
router.get("/responsables", controllerResponsableDeMesa.todosLosResponsablesDeMesa);
router.get("/clientes/busqueda/:nombre", controllerResponsableDeMesa.encontrarResponsablePorNombre);













module.exports= router