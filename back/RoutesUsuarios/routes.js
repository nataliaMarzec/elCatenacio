const express = require("express");
const router = new express.Router();
const AuthController = require("../ControllerUsuario/AuthController")


router.post("/usuario/signup",AuthController.signUp)
router.post("/usuario/cliente",AuthController.signupCliente)
router.post('/usuario/signin', AuthController.login);
router.post('/usuario/password', AuthController.loginPassword);
router.get("/usuarios/",AuthController.getUsuarios);
router.get("/usuario/:username/:email",AuthController.verificarUsuario)
router.get("/usuario/:password",AuthController.verificarPassword)
router.delete("/usuario/:id_usuario",AuthController.delete)
// router.update("/responsable/:id_responsable",AuthController.update)











module.exports = router