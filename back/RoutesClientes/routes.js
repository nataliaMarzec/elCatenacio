const express = require("express");
const router = new express.Router();
const controllerCliente = require("../ControllersClientes/ClienteController");


router.post("/cliente/nuevo", controllerCliente.create);
router.route("/cliente/:id_cliente")
    .delete(controllerCliente.delete)
    .put(controllerCliente.update)
router.get("/clientes/:id_cliente", controllerCliente.getClienteId);
router.get("/clientes", controllerCliente.getClientes);
router.get("/clientes/busqueda/:userName", controllerCliente.encontrarClientePorUserName);















module.exports= router