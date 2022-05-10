var { Op } = require("sequelize");
const { models } = require("../SequelizeConnection");
const Cliente = models.Cliente;
const Usuario = models.Usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

module.exports = {
  
  create: async (req, res) => {
    var cliente = await Cliente.create({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
    })
    if (![req.body.values] || !cliente) {
        res.status(400).json({ err: "no se creo el cliente" });
    } else {
        console.log("CLIENTE+++++", cliente);
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        console.log("PASSWORD", password)
        await Usuario.create({
            clienteId: cliente.id_cliente,
            username: req.body.username,
            email: req.body.email,
            password: password,
            rol: "CLIENTE",
            registrado: true,
        }).then(usuario => {
            let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            console.log("TOKEN+++++++++", token)

            res.status(200).json({
                usuario: usuario,
                cliente:cliente,
                token: token,
            });
        }).catch(err => {
            res.status(500).json(err);
        });
    }
},


  update: async (req, res) => {
    const clienteEncontrado = await Cliente.findByPk(req.params.id_cliente);
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    const cliente = await clienteEncontrado.update({
      id_cliente: req.body.id_cliente,
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
    });
    const usuarioEncontrado = await Usuario.findOne({ where: { clienteId: cliente.id_cliente } });
    const usuario = await usuarioEncontrado.update({
      username: req.body.username,
      email: req.body.email,
      rol: "CLIENTE",
      password: password,
      registrado: true
    });
    let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
      expiresIn: authConfig.expires
    })
    if (cliente) {
      return res.status(200)
        .json({
          cliente,
          usuario,
          token,
        })
    } else {
      return res.status(404).json()
    }
  },


  updateDireccion: async (req, res) => {
    const clienteEncontrado = await Cliente.findByPk(req.params.id_cliente);
    const cliente = await clienteEncontrado.update({
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
    });
    if (cliente) {
      return res.status(200)
        .json({
          cliente,
        })
    } else {
      return res.status(404).json()
    }
  },

  delete: async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id_cliente);
    const usuario = await Usuario.findOne({ where: { clienteId: req.params.id_cliente}})
    await cliente.destroy();
    await usuario.destroy();
    return res.json({ delete: "Cliente eliminado" });
  },

  getClientes: async (req, res, next) => {
    const clientes = await Cliente.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de clientes" });
    } else {
      return res.status(200).json(clientes);
    }
  },

  getClienteId: async (req, res) => {
    var cliente = await Cliente.findByPk(req.params.id_cliente);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay cliente con ID" });
    } else {
      return res
        .status(200)
        .json(cliente)
        .then(console.log(cliente instanceof Cliente)) // true
        .then(console.log(cliente.id_cliente));
    }
  },
  async encontrarClientePorId(req, res) {
    const cliente = await Cliente.findOne({ where: { id_cliente: req.params.id_cliente } });
    if (cliente === null) {
      console.log("Cliente no encontrado!");
    } else {
      return res
        .status(200)
        .json(cliente.id_cliente)
        .then((cliente) => res.status(200).send(cliente))
        .then(console.log(cliente instanceof Cliente))
        .then(console.log(cliente.id_cliente));
    }
  },

  encontrarClientePorUsername: async (req, res) => {
    var usuario = await Usuario.findOne({ where: { username: req.params.username, rol: "CLIENTE" } });
    if (!usuario || usuario == null) {
      res.status(400).json({ err: "No hay cliente con userName" });
    } else {
      var cliente = await Cliente.findOne({ where: { id_cliente: usuario.clienteId } });
      return res.status(200).json({ usuario, cliente });
    }
  },


};
