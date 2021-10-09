const express = require("express");
const router = new express.Router();
const multer = require("../libs/uploads.config")

const controllerImagen = require("../ControllerMulter/controllerImagen");
const controllerHome = require("../ControllerMulter/home");


router.get("/home",controllerHome.getHome);

router.route("/imagen/").post(multer.single('imagen'), controllerImagen.cargarImagen);
router.route("/imagenes/").get(controllerImagen.getImagenes);
router.route("/imagen/:id_imagen")
    .get(controllerImagen.getImagen)
    .delete(controllerImagen.deleteImagen)
    .put(controllerImagen.updateImagen);


module.exports = router