const express = require("express");
const router = new express.Router();
const controllerPedido = require("../ControllersPedidosCliente/PedidoController");
const controllerProducto = require("../ControllersPedidosCliente/ProductoController");
const controllerItemsPedido = require("../ControllersPedidosCliente/ItemsPedidoController");


router.post("/pedidos/nuevo", controllerPedido.create);
router.get("/pedidos/:id", controllerPedido.getPedidoId);
router.get("/pedidos", controllerPedido.getPedidos);
router.get("/unPedido", controllerPedido.getUnPedido);
router.delete("/pedidos/:id", controllerPedido.deletePedidoById);
router.put("/pedidos/:id", controllerPedido.update);
router.get("/pedidos/buscar/:codigo", controllerPedido.encontrarPedidoPorCodigo);
router.get("/pedidos/busqueda/:mesero", controllerPedido.encontrarPedidoPorMesero);
// router.put("/pedidos/producto/:productoId_pedido",controllerPedido.createPedidoConProductoId)

router.post("/productos/nuevo", controllerProducto.create);
// router.post("/productos/pedido/:pedidoId", controllerProducto.createProductoConPedido);
// router.post("/pedidos/:codigo_pedido/productos", controllerProducto.create);
// router.get("/productos/:id", controllerProducto.getPedidoId);
router.get("/productos", controllerProducto.getProductos);
router.delete("/productos/:id", controllerProducto.deleteProductoById);
router.put("/productos/:id", controllerProducto.update);
router.get("/productos/busqueda/:codigo", controllerProducto.encontrarProductoPorCodigo);
// router.get("/productos/fkey", controllerProducto.getProductosFk);
// router.get("/productos/pedidos", controllerProducto.encontrarProductosConPedido);
// router.get("/productos/:descripcion", controllerProducto.encontrarProductoPorDescripcion);
router.get("/productos/buscar/:productoFk", controllerProducto.encontrarProductoPorForeingKey);
// router.get("/productos/encontrar/:precio", controllerProducto.encontrarProductoPorPrecio);
router.get("/productos/ver/:id", controllerProducto.getForeingKeys);
// funciona:
router.get("/productosFks", controllerProducto.getProductosTodos);
router.get("/productos/pedido/:id", controllerProducto.getInfoProducto);
router.get("/productosDescripciones", controllerProducto.getProductosDescripciones);


router.post("/itemsPedido/nuevo",controllerItemsPedido.create);
// router.get("/itemsPedido", controllerItemsPedido.getItems);
// router.get("/pedidos", controllerItemsPedido.findAll);
router.get("/itemsPedido/:id", controllerItemsPedido.encontrarItemPorId);
router.get("/pedidosTodos", controllerPedido.encontrarPedidoConItems);

















module.exports= router