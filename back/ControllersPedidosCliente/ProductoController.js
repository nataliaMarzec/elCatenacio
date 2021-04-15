var { Op } = require("sequelize");
const { Producto } = require("../SequelizeConnection");

module.exports = {
  create: async (req, res) => {
    const producto = req.body;

    const {
      id,
      productoFk,
      codigo,
      descripcion,
      precio,
      habilitado,
    } = await Producto.create(producto);

    return res.json({
      id,
      productoFk,
      codigo,
      descripcion,
      precio,
      habilitado,
    });
  },

  getProductos: async (req, res, next) => {
    const productos = await Producto.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de productos" });
    } else {
      return res.status(200).json(productos);
    }
  },

  getProductoId: async (req, res) => {
    var producto = await Producto.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay producto con ID" });
    } else {
      return res.status(200).json(producto);
    }
  },

  deleteProductoById: async (req, res) => {
    const producto = await Producto.findByPk(req.params.id);
    await producto.destroy();
    return res.json({ delete: "Producto eliminado" });
  },

  update: async (req, res) => {
    const producto = await Producto.findByPk(req.params.id);
    const {
      id,
      productoFk,
      codigo,
      descripcion,
      precio,
      habilitado,
    } = await producto.update(req.body);

    return res
      .json({
        id,
        productoFk,
        codigo,
        descripcion,
        precio,
        habilitado,
      })
      .res.send(200, "producto editado");
  },

  encontrarProductoPorCodigo: async (req, res) => {
    var producto = await Producto.findOne({
      where: { codigo: req.params.codigo },
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay producto con codigo" });
    } else {
      return res.status(200).json(producto);
    }
  },

  getProductosFk: async (req, res, next) => {
    const productos = await Producto.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de productos" });
    } else {
      return res.status(200).json(productos.descripcion);
    }
  },

  encontrarProductosPorForeingKey: async (req, res) => {
        const productos = await Producto.findOne({where:{productoFk:req.params.productoFk}});
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de productos con fk" });
    } else {
      return res.status(200).json(productos);
    }
  },

  encontrarUnPedidoConPedido:async(req,res)=>{
    var producto = await Producto.findOne({ 
      include:[
    {association:Producto.Pedido}
    ]
   }).each(producto=>{
     console.log("producto",producto)
   });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay producto con pedido" });
    } else {
      return res.status(200).json(producto);
    }
  },
  encontrarProductosConPedido:async(req,res)=>{
    var producto = await Producto.findAll({ 
      include:[
    {association:Producto.Pedido}
    ]
   }).each(producto=>{
     console.log("producto",producto)
   });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay producto con pedido" });
    } else {
      return res.status(200).json(producto);
    }
  }

















}