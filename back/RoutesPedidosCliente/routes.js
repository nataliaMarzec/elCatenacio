const express = require("express");
const router = new express.Router();
const controllerPedido = require("../ControllersPedidosCliente/PedidoController");


router.post("/pedidos/nuevo", controllerPedido.create);
// router.get("/pedidos/:id", controllerPedido.getPedidoId);
router.get("/pedidos", controllerPedido.getPedidos);
router.delete("/pedidos/:id", controllerPedido.deletePedidoById);
router.put("/pedidos/:id", controllerPedido.update);
router.get("/pedidos/busqueda/:codigo", controllerPedido.encontrarPedidoPorCodigo);















module.exports= router