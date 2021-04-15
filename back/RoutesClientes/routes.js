const express = require("express");
const router = new express.Router();
const controllerCliente = require("../ControllersClientes/ClienteController");


router.post("/clientes/nuevo", controllerCliente.create);
router.get("/clientes/:id", controllerCliente.getClienteId);
router.get("/clientes", controllerCliente.getClientes);
router.delete("/clientes/:id", controllerCliente.deleteClienteById);
router.put("/clientes/:id", controllerCliente.update);
router.get("/clientes/busqueda/:dni", controllerCliente.encontrarClientePorDni);















module.exports= router