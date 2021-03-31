const express = require("express");
const router = new express.Router();
const controllerMenu = require("../ControllersPedidosCliente/MenuController");


router.post("/menus/nuevo", controllerMenu.create);
router.get("/menus/:id", controllerMenu.getMenuId);
router.get("/menus", controllerMenu.getMenus);
router.delete("/menus/:id", controllerMenu.deleteMenuById);
router.put("/menus/:id", controllerMenu.update);















module.exports= router