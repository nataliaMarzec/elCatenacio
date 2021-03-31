var { Op } = require("sequelize");
const { Pedido } = require("../SequelizeConnection");

module.exports = {
  create: async (req, res) => {
    const pedido = req.body;

    const { id, codigo, descripcion, precio } = await Pedido.create(pedido);

    return res.json({
      id,
      codigo,
      descripcion,
      precio,
    });
  },

  getMenus: async (req, res, next) => {
    const pedidos = await Pedido.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de pedidos" });
    } else {
      return res.status(200).json(pedidos);
    }
  },

  getMenuId: async (req, res) => {
    var pedido = await Pedido.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay pedido con ID" });
    } else {
      return res.status(200).json(pedido);
    }
  },

  deleteMenuById: async (req, res) => {
    const pedido = await Pedido.findByPk(req.params.id);
    await pedido.destroy();
    return res.json({ delete: "Pedido eliminado" });
  },

  update: async (req, res) => {
    const pedido = await Pedido.findByPk(req.params.id);
    const { id, codigo, descripcion, precio } = await pedido.update(req.body);

    return res
      .json({
        id,
        codigo,
        descripcion,
        precio,
      })
      .res.send(200, "pedido editado");
  },
};
