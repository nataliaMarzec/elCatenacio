var { Sequelize, Op } = require("sequelize");
const { models } = require("../SequelizeConnection");
const ItemsPedido = models.ItemsPedido;
module.exports = {
  create: async (req, res) => {
    const itemsPedido = req.body;
    const { id, pedidoId, productoId, estado } = await ItemsPedido.create(
      itemsPedido
    );
    return res.status(200).json({
      id,
      pedidoId,
      productoId,
      estado,
    });
  },

  encontrarItemPorId: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { id: req.params.id },
      include: ["Pedidos"],
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay producto con codigo" });
    } else {
      return res.status(200).json(item);
    }
  },

  encontrarItemsPorPedidoId: async (req, res) => {
    var item = await ItemsPedido.findAll({
      where: { pedidoId: req.params.pedidoId },
      include: ["Pedidos"],
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay producto con codigo" });
    } else {
      return res.status(200).json(item);
    }
  },
  // findAll:async(req,res) => {
  //   return await Pedido.findAll({
  //     include: ["ItemsPedido"],
  //   }).then((pedidos) => {
  //     return res.status(
};
