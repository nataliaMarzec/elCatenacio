const express = require("express");
const router = new express.Router();
const controllerPedido = require("../ControllersPedidosCliente/PedidoController");
const controllerProducto = require("../ControllersPedidosCliente/ProductoController");


router.post("/pedidos/nuevo", controllerPedido.create);
// router.get("/pedidos/:id", controllerPedido.getPedidoId);
router.get("/pedidos", controllerPedido.getPedidos);
router.delete("/pedidos/:id", controllerPedido.deletePedidoById);
router.put("/pedidos/:id", controllerPedido.update);
router.get("/pedidos/busqueda/:codigo", controllerPedido.encontrarPedidoPorCodigo);
router.get("/pedidos/busqueda/:mesero", controllerPedido.encontrarPedidoPorMesero);
// router.put("/pedidos/producto/:productoId_pedido",controllerPedido.createPedidoConProductoId)


router.post("/productos/nuevo", controllerProducto.create);
// router.get("/productos/:id", controllerProducto.getPedidoId);
router.get("/productos", controllerProducto.getProductos);
router.delete("/productos/:id", controllerProducto.deleteProductoById);
router.put("/productos/:id", controllerProducto.update);
router.get("/productos/busqueda/:codigo", controllerProducto.encontrarProductoPorCodigo);
// router.get("/productos/fkey", controllerProducto.getProductosFk);
// router.get("/productos/pedidos", controllerProducto.encontrarProductosConPedido);














module.exports= router