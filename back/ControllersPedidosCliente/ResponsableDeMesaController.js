var { Sequelize, Op } = require("sequelize");
const { models } = require("../SequelizeConnection");
const ResponsableDeMesa = models.ResponsableDeMesa;
const Pedidos = models.Pedido;

module.exports = {
  create: async = (req, res) => {
    return ResponsableDeMesa.create({
      id: req.body.id,
      nombre: req.body.nombre,
      email: req.body.email,
    })
      .then((responsable) => res.status(201).send(responsable))
      .catch((error) => res.status(400).send(error));
  },

  todosLosResponsablesDeMesa(req, res) {
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
};
