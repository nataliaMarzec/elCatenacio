var { Op } = require("sequelize");
const { Pedido, Producto, ItemsPedido } = require("../SequelizeConnection");

module.exports = {
  create: async (req, res) => {
    const itemsPedido = req.body;
    // const pedidoID=Producto.find({where:Producto.Pedido.pedidoId})
    const {
      id,
      pedidoId,
      productoId,
      descripcion,
      cantidad,
      precioUnitario,
      estado,
    } = await Producto.create(itemsPedido);

    return res.status(200).json({
      id,
      pedidoId,
      productoId,
      descripcion,
      cantidad,
      precioUnitario,
      estado,
    });
  },

// findAll:async(req,res)=>{
//     const items=
// },
getProductos: async (req, res, next) => {
    const productos = await Producto.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de productos" });
    } else {
      return res.status(200).json(productos);
    }
  },


};
