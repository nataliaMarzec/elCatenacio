var { Op } = require("sequelize");
const { Pedido } = require("../SequelizeConnection");

module.exports = {
  create: async (req, res) => {
    const pedido = req.body;

    const { id, codigo, descripcion, precio,habilitado } = await Pedido.create(pedido);

    return res.json({
      id,
      codigo,
      descripcion,
      precio,
      habilitado,
    });
  },

  getPedidos: async (req, res, next) => {
    const pedidos = await Pedido.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de pedidos" });
    } else {
      return res.status(200).json(pedidos);
    }
  },

  getPedidoId: async (req, res) => {
    var pedido = await Pedido.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay pedido con ID" });
    } else {
      return res.status(200).json(pedido);
    }
  },

  deletePedidoById: async (req, res) => {
    const pedido = await Pedido.findByPk(req.params.id);
    await pedido.destroy();
    return res.json({ delete: "Pedido eliminado" });
  },

  update: async (req, res) => {
    const pedido = await Pedido.findByPk(req.params.id);
    const { id, codigo, descripcion, precio,habilitado } = await pedido.update(req.body);

    return res
      .json({
        id,
        codigo,
        descripcion,
        precio,
        habilitado,
      })
      .res.send(200, "pedido editado");
  },

  encontrarPedidoPorCodigo: async (req, res) => {
    var pedido = await Pedido.findOne({where:{codigo:req.params.codigo}});
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay pedido con codigo" });
    } else {
      return res.status(200).json(pedido)
    }
  },
  
  
    
};
