const express = require("express");
const router = new express.Router();
const controllerCliente = require("../ControllersClientes/ClienteController");


router.post("/cliente/nuevo", controllerCliente.create);
router.route("/cliente/:id_cliente")
    .delete(controllerCliente.delete)
    .put(controllerCliente.update)
router.route("/cliente/direccion/:id_cliente")
    .put(controllerCliente.updateDireccion)
router.get("/clientes/:id_cliente", controllerCliente.getClienteId);
router.get("/clientes", controllerCliente.getClientes);
router.get("/clientes/busqueda/:username", controllerCliente.encontrarClientePorUsername);















module.exports = router