const express = require("express");
const router = new express.Router();
const controllerPedido = require("../ControllersPedidosCliente/PedidoController");
const controllerProducto = require("../ControllersPedidosCliente/ProductoController");
const controllerItemsPedido = require("../ControllersPedidosCliente/ItemsPedidoController");

router.post("/pedidos/", controllerPedido.add);
router.post("/pedidos/items",controllerPedido.addConItems)
router.get("/pedidosTodos", controllerPedido.encontrarPedidoConItems);
router.get("/pedidos/:id", controllerPedido.getPedidoId);
router.put("/pedidos/items/:id", controllerPedido.updateConItems);
router.delete("/pedidos/:id", controllerPedido.delete);

router.get("/pedidos", controllerPedido.getPedidos);
router.get("/unPedido", controllerPedido.getUnPedido);
router.put("/pedidos/:id", controllerPedido.update);
router.get("/pedidos/buscar/:codigo", controllerPedido.encontrarPedidoPorCodigo);
router.get("/pedidos/busqueda/:mesero", controllerPedido.encontrarPedidoPorMesero);




router.post("/productos/nuevo", controllerProducto.create);
router.delete("/productos/:id", controllerProducto.delete);
router.put("/productos/:id", controllerProducto.update);
router.get("/productos", controllerProducto.getProductos);

router.get("/productos/busqueda/:codigo", controllerProducto.encontrarProductoPorCodigo);
router.get("/productos/buscar/:productoFk", controllerProducto.encontrarProductoPorForeingKey);
router.get("/productos/ver/:id", controllerProducto.getForeingKeys);
// funciona:
router.get("/productosFks", controllerProducto.getProductosTodos);
router.get("/productos/pedido/:id", controllerProducto.getInfoProducto);
router.get("/productosDescripciones", controllerProducto.getProductosDescripciones);
router.get("/productosConItems", controllerProducto.productosConItems);



router.post("/itemsPedido/nuevo",controllerItemsPedido.create);
router.get("/itemsPedido/:id", controllerItemsPedido.encontrarItemPorId);
router.get("/itemsPedido/:productoId", controllerItemsPedido.encontrarProductoPorProductoId);

router.get("/itemsDePedido/:pedidoId", controllerItemsPedido.encontrarItemsPorPedidoId);
router.get("/itemsTodos", controllerItemsPedido.todosLosItems);
router.get("/items/:id/producto/:descripcion", controllerItemsPedido.addProducto);
router.get("/itemsUpdate/:id/producto/:descripcion", controllerItemsPedido.updateProducto);
router.get("/itemsDePedidos", controllerItemsPedido.todosLosItemsDePedidos);
router.put("/itemsPedido/:id",controllerItemsPedido.updatePorId);
router.delete("/itemsPedido/:id",controllerItemsPedido.delete);
router.post("/itemsPedido/producto",controllerItemsPedido.addConProducto);
















module.exports= router