const express = require("express");
const router = new express.Router();
const controllerUsuario = require("../ControllerUsuario/UsuarioController");
const AuthController = require("../ControllerUsuario/AuthController")


router.post("/usuario/signup",AuthController.signUp)
router.post('/usuario/signin', AuthController.signIn);
router.post("/responsable/:username/:email",AuthController.signUpResponsable)
router.get("/usuarios/",AuthController.getUsuarios);
router.get("/usuario/:username/:email",AuthController.verificarUsuario)
router.delete("/usuario/:id_usuario",AuthController.delete)











module.exports = router