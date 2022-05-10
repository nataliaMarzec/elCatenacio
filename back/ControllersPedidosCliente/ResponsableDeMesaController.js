var { Sequelize, Op } = require("sequelize");
const { models } = require("../SequelizeConnection");
const ResponsableDeMesa = models.ResponsableDeMesa;
const Pedidos = models.Pedido;
const Usuario = models.Usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

module.exports = {
 
  create: async (req, res) => {
    var responsable = await ResponsableDeMesa.create({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
    })
    if (![req.body.values] || !responsable) {
        res.status(400).json({ err: "no se creo el responsable" });
    } else {
        console.log("RESPONSABLE+++++", responsable);
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        console.log("PASSWORD", password)
        await Usuario.create({
            responsableId: responsable.id_responsable,
            username: req.body.username,
            email: req.body.email,
            password: password,
            rol: "RESPONSABLE",
            registrado: true,
        }).then(usuario => {
            let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            console.log("TOKEN+++++++++", token)

            res.status(200).json({
                usuario: usuario,
                responsable:responsable,
                token: token,
            });
        }).catch(err => {
            res.status(500).json(err);
        });
    }
},


  update: async (req, res) => {
    const responsableEncontrado = await ResponsableDeMesa.findByPk(req.params.id_responsable);
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    const responsable = await responsableEncontrado.update({
      id_responsable: req.body.id_responsable,
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
    });
    const usuarioEncontrado = await Usuario.findOne({ where: { responsableId: responsable.id_responsable } });
    const usuario = await usuarioEncontrado.update({
      username: req.body.username,
      email: req.body.email,
      rol: "RESPONSABLE",
      password: password,
      registrado: true
    });
    let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
      expiresIn: authConfig.expires
    })
    if (responsable) {
      return res.status(200)
        .json({
          responsable,
          usuario,
          token,
        })
    } else {
      return res.status(404).json()
    }
  },

  delete: async (req, res) => {
    const responsable = await ResponsableDeMesa.findByPk(req.params.id_responsable);
    const usuario = await Usuario.findOne({ where: { responsableId: req.params.id_responsable}})
    await responsable.destroy();
    await usuario.destroy();
    return res.json({ delete: "Responsable eliminado" });
  },
//   signupResponsable: async (req, res) => {
//     let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
//     ResponsableDeMesa.create({
//         nombre: req.body.nombre,
//         direccion: req.body.direccion,
//         telefono: req.body.telefono,
//     }).then(responsable => {
//         let token = jwt.sign({ responsable: responsable }, authConfig.secret, {
//             expiresIn: authConfig.expires
//         })
//         if (responsable) {
//             let usuario = Usuario.create({
//                 responsableId: responsable.id_responsable,
//                 username:req.body.username,
//                 email:req.body.email,
//                 password:password,
//                 rol:"RESPONSABLE",
//                 registrado: true,
//             })
//             return res.status(200).json({
//                 responsable: responsable,
//                 usuario: usuario,
//                 token: token,
//             })
//         } else {
//             return res.status(400).json({
//                 message: "No se creo el responsable"
//             })
//         }
//     })
//         .catch(err => {
//             res.status(500).json(err);
//         });
// },

 
//   signupResponsablePrueba: async (req, res) => {
//     let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
//     ResponsableDeMesa.create({
//         nombre: req.body.nombre,
//         direccion: req.body.direccion,
//         telefono: req.body.telefono,
//         rol: "RESPONSABLE",
//     }).then(responsable => {
//         let token = jwt.sign({ responsable: responsable }, authConfig.secret, {
//             expiresIn: authConfig.expires
//         })
//         if (responsable) {
//             let usuario = Usuario.create({
//                 responsableId: responsable.id_responsable,
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: req.password,
//                 rol:responsable.rol,
//                 registrado: true,
//             })
//             return res.status(200).json({
//                 responsable: responsable,
//                 usuario: usuario,
//                 token: token,
//             })
//         } else {
//             return res.status(400).json({
//                 message: "No se creo el responsable"
//             })
//         }
//     })
//         .catch(err => {
//             res.status(500).json(err);
//         });
// },

  getResponsables(req, res) {
    return ResponsableDeMesa.findAll({})
      .then((responsables) => res.status(200).send(responsables))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  
  // encontrarResponsablePorUsername: async (req, res) => {
  //   var responsable = await ResponsableDeMesa.findOne({ where: { nombre: req.params.username } });
  //   if (![req.body.values]) {
  //     res.status(400).json({ err: "No hay responsable con nombre" });
  //   } else {
  //     return res.status(200).json(responsable);
  //   }
  // },
  encontrarResponsablePorUsername: async (req, res) => {
    var usuario = await Usuario.findOne({ where: { username: req.params.username, rol: "RESPONSABLE" } });
    if (!usuario || usuario == null) {
      res.status(400).json({ err: "No hay responsable con userName" });
    } else {
      var responsable = await ResponsableDeMesa.findOne({ where: { id_responsable: usuario.responsableId } });
      return res.status(200).json({ usuario, responsable });
    }
  },


  delete: async (req, res) => {
    const responsable = await ResponsableDeMesa.findByPk(req.params.id_responsable);
    const usuario = await Usuario.findOne({ where: {responsableId: req.params.id_responsable}})
    await responsable.destroy();
    await usuario.destroy();
    return res.json({ delete: "Responsable eliminado" });
  },


  update: async (req, res) => {
    const responsableEncontrado = await ResponsableDeMesa.findByPk(req.params.id_responsable);
    let password= bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    const responsable  = await responsableEncontrado.update({
      id_responsable: req.body.id_responsable,
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      rol: "RESPONSABLE",
    });
    const usuarioEncontrado = await Usuario.findOne({ where: { responsableId: responsable.id_responsable } });
    const usuario = await usuarioEncontrado.update({
      username: req.body.username,
      email: req.body.email,
      rol:"RESPONSABLE", password:password, registrado:true
    });
    let token = jwt.sign({ usuario:usuario }, authConfig.secret, {
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
