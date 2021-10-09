var { Sequelize, Op } = require("sequelize");
const { models } = require("../SequelizeConnection");
const multer = require('multer');
var path = require("path");
const fs = require('fs');
const Imagen = models.Imagen
const Producto = models.Producto;
const ItemsPedido = models.ItemsPedido;
const Pedido = models.Pedido;
const Responsable = models.ResponsableDeMesa


// const uploadImage = multer({
//     storage,
//     // limits: { fileSize: 1000000 }
// }).single('image');



module.exports = {
  cargarImagen: async (req, res) => {
    if (req.file == undefined) {
      return res.send(`Falta seleccionar una imagen.`);
    }

    console.log("req", req.file, req.file.mimetype)
    const { titulo } = req.body
    Imagen.create({
      titulo: titulo,
      tipo: req.file.mimetype,
      descripcion: req.file.originalname,
      imagenPath:req.file.path

      // data: fs.readFileSync('Uploads/' + req.file.filename)
    }).then(image => {

      try {
        // if(image.descripcion){
        //   return res.status(400).send(`La imagen ya existe.`)
        // }
        // else{
        console.log("image", image)
        // fs.readFileSync(image.imagenPath)
        fs.writeFileSync('Tmp/' + image.descripcion, image.path);
        res.json({ 'msg': 'Imagen cargada!', 'Imagen': image });
        // }
      } catch (e) {
        console.log(e);
        res.json({ 'err': e });
      }
    })
  },
  getImagenes: async (req, res, err) => {
    const photos = await Imagen.findAll()
    return res.status(200).json(photos)
  },

  getImagen: async (req, res, err) => {
    console.log(req.params.id_imagen)
    const photo = await Imagen.findByPk(req.params.id_imagen)
    return res.json(photo)
  },

  deleteImagen: async (req, res) => {
    return await Imagen.findOne({
      where: { id_imagen: req.params.id_imagen }
    })
      .then((photo) => {
        if (photo) {
          photo.destroy()
          fs.unlinkSync(path.resolve(photo.imagenPath))
          if (fs.existsSync('Tmp/' + photo.descripcion, photo.path)) {
            fs.unlinkSync('Tmp/' + photo.descripcion, photo.path);
          }
        }
      }).then(function (res) {
        return res.status(200).send({ message: 'Imagen eliminada' })
      })
      .catch(function (e) {
        res.status(400).send({
          message: "Error imagen eliminada!",
          error: e.toString(), req: req.body
        });
      });
  },

  updateImagen: async (req, res, err) => {
    console.log(req.params.id)
    let photo = await Imagen.findByPk({ where: { id_imagen: req.params.id_imagen } })
    const { id } = req.params.id_imagen
    const { titulo, descripcion } = req.body
    const updatedPhoto = await photo.update(id, { titulo, descripcion }, { new: true })
    return res.json({ message: 'Updated photo', updatedPhoto })
  }


}







