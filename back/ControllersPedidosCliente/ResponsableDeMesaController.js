var { Sequelize, Op } = require("sequelize");
const { models } = require("../SequelizeConnection");
const ResponsableDeMesa = models.ResponsableDeMesa;
const Pedidos = models.Pedido;
const Usuario = models.Usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

module.exports = {
 
  signupResponsable: async (req, res) => {
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    ResponsableDeMesa.create({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        username: req.body.username,
        email: req.body.email,
        password: password,
        rol: "RESPONSABLE",
    }).then(responsable => {
        let token = jwt.sign({ responsable: responsable }, authConfig.secret, {
            expiresIn: authConfig.expires
        })
        if (responsable) {
            let usuario = Usuario.create({
                responsableId: responsable.id_responsable,
                nombre: responsable.nombre,
                direccion: responsable.direccion,
                telefono: responsable.telefono,
                username: responsable.username,
                email: responsable.email,
                password: responsable.password,
                rol: responsable.rol,
                registrado: true,
            })
            return res.status(200).json({
                responsable: responsable,
                usuario: usuario,
                token: token,
            })
        } else {
            return res.status(400).json({
                message: "No se creo el responsable"
            })
        }
    })
        .catch(err => {
            res.status(500).json(err);
        });
},

 
  signupResponsablePrueba: async (req, res) => {
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    ResponsableDeMesa.create({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        // username: req.body.username,
        // email: req.body.email,
        // password: password,
        rol: "RESPONSABLE",
    }).then(responsable => {
        let token = jwt.sign({ responsable: responsable }, authConfig.secret, {
            expiresIn: authConfig.expires
        })
        if (responsable) {
            let usuario = Usuario.create({
                responsableId: responsable.id_responsable,
                // nombre: responsable.nombre,
                // direccion: responsable.direccion,
                // telefono: responsable.telefono,
                username: req.body.username,
                email: req.body.email,
                password: req.password,
                rol:responsable.rol,
                registrado: true,
            })
            return res.status(200).json({
                responsable: responsable,
                usuario: usuario,
                token: token,
            })
        } else {
            return res.status(400).json({
                message: "No se creo el responsable"
            })
        }
    })
        .catch(err => {
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

  update: async (req, res) => {
    const responsableEncontrado = await ResponsableDeMesa.findByPk(req.params.id_responsable);
    let password= bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    const responsable  = await responsableEncontrado.update({
      id_responsable: req.body.id_responsable,
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      username: req.body.username,
      email: req.body.email,
      rol: "RESPONSABLE",
      password: password,
      registrado: req.body.registrado,
    });
    const usuarioEncontrado = await Usuario.findOne({ where: { responsableId: responsable.id_responsable } });
    const usuario = await usuarioEncontrado.update({
      nombre: responsable.nombre, direccion: responsable.direccion,
      telefono: responsable.telefono, username: responsable.username, email: responsable.email,
      rol: responsable.rol, password: responsable.password, registrado: responsable.registrado
    });
    let token = jwt.sign({ responsable: responsable }, authConfig.secret, {
      expiresIn: authConfig.expires
  })
    if(responsable){
    return res.status(200)
      .json({
        responsable,
        usuario,
        token,
      })
    }else{
      return res.status(404).json()
    }
  },






};
