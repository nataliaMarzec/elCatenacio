var { Sequelize, Op } = require("sequelize");
const { models } = require("../SequelizeConnection");
const ResponsableDeMesa = models.ResponsableDeMesa;
const Pedidos = models.Pedido;
const Usuario = models.Usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

module.exports = {
  create: async = (req, res) => {
    // let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

    ResponsableDeMesa.create({
      id_responsable: req.body.id,
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      username: req.body.username,
      email: req.body.email,
      rol: req.body.rol,
      password: req.body.password,
      registrado: req.body.registrado,

    }).then(responsable => {
      // Crea el token
      // let token = jwt.sign({ responsable: responsable }, authConfig.secret, {
      //   expiresIn: authConfig.expires
      // });
      res.status(200).json({
        responsable: responsable,
        // token: token,
      });

    }).catch(err => {
      res.status(500).json(err);
    });

},

  getResponsables(req, res) {
  return ResponsableDeMesa.findAll({})
    .then((responsables) => res.status(200).send(responsables))
    .catch((error) => {
      res.status(400).send(error);
    });
},
encontrarResponsablePorNombre: async (req, res) => {
  var responsable = await ResponsableDeMesa.findOne({ where: { nombre: req.params.nombre } });
  if (![req.body.values]) {
    res.status(400).json({ err: "No hay responsable con nombre" });
  } else {
    return res.status(200).json(responsable);
  }
},


  delete: async (req, res) => {
    const responsable = await ResponsableDeMesa.findByPk(req.params.id_responsable);
    await responsable.destroy();
    return res.json({ delete: "ResponsableDeMesa eliminado" });
  },

    async update(req, res) {
  const responsable = await ResponsableDeMesa.findByPk(req.params.id_responsable);

  // let password = bcrypt.hashSync(responsable.password, Number.parseInt(authConfig.rounds));
  const resp = {
    id_responsable,
    nombre,
    direccion,
    telefono,
    username,
    email,
    rol,
    password,
    registrado,
  } = await responsable.update(req.body);
  const usuarioEncontrado = await Usuario.findOne({ where: { responsableId: responsable.id_responsable } });
  console.log("usuario encontrado", usuarioEncontrado)
  const usuario = await usuarioEncontrado.update({
    nombre: responsable.nombre, direccion: responsable.direccion,
    telefono: responsable.telefono, username: responsable.username, email: responsable.email,
    rol: responsable.rol, password:responsable.password, registrado: responsable.registrado
  });

  return res
    .json({
      resp,
      usuario,
    
    })
    .res.send(200, "responsable y usuario editado");
},






};
