var { Op } = require("sequelize");
const { Pedido, Producto } = require("../SequelizeConnection");

module.exports = {
  create: async (req, res) => {
    const pedido = req.body;

    const {
      id,
      codigoPedido,
      mesero,
      seccion,
      cantidad,
      precioUnitario,
      importeTotal,
      montoCobrado,
      pagado,
    } = await Pedido.create(pedido);

    return res.json({
      id,
      codigoPedido,
      mesero,
      seccion,
      cantidad,
      precioUnitario,
      importeTotal,
      montoCobrado,
      pagado,
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

  getUnPedido: async (req, res, next) => {
    const pedido = await Pedido.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene unPedido" });
    } else {
      return res.status(200).json(pedido);
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
    const {
      id,
      codigoPedido,
      mesero,
      seccion,
      cantidad,
      precioUnitario,
      importeTotal,
      montoCobrado,
      pagado,
    } = await pedido.update(req.body);

    return res
      .json({
        id,
        codigoPedido,
        mesero,
        seccion,
        cantidad,
        precioUnitario,
        importeTotal,
        montoCobrado,
        pagado,
      })
      .res.send(200, "pedido editado");
  },

  encontrarPedidoPorCodigo: async (req, res) => {
    var pedido = await Pedido.findOne({ where: { codigo: req.params.codigo } });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay pedido con codigo" });
    } else {
      return res.status(200).json(pedido);
    }
  },

  encontrarPedidoPorMesero: async (req, res) => {
    var pedido = await Pedido.findOne({ where: { mesero: req.params.mesero } });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay pedido con mesero" });
    } else {
      return res.status(200).json(pedido);
    }
  },
  encontrarPedidoConProductos: async (req, res) => {
    var pedido = await Pedido.findOne({
      include: [{ association: Producto.Pedido }],
    }).each((pedido) => {
      console.log("pedido", pedido);
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay pedido con mesero" });
    } else {
      return res.status(200).json(pedido);
    }
  },

  // actualizarVentaConProductoId(req,res){
  //  const id_venta = req.params.venta.id;
  //  const productoId_pedido=req.body.productoId_pedido;
  //  const query = "UPDATE pedido SET productoId_pedido = "+productoId_pedido+ "WHERE id"+id_venta;
  //  if (![req.body.values]) {
  //   res.status(400).json({ err: "No hay pedido con productoId_pedido" });
  // } else {
  //   return res.status(200).json(query);
  // }
  // },

  // encontrarPedidoConProductoId(req,res){
  //  const {id}=req.params;
  //  if(id){
  //  const pedido=await Pedido.findOne({
  //    where:{id},
  //    attributes:[
  //     id,
  //     codigo,
  //     mesero,
  //     seccion,
  //     cantidad,
  //     precioUnitario,
  //     importeTotal,
  //     montoCobrado,
  //     pagado,
  //    ],
  //    include:[
  //      {
  //       model:Producto,
  //       as: 'Producto',
  //       attributes: ['productoId_pedido'],

  //      }
  //     ]
  //  });
  //  return res.json(pedido)
  //  }
  // },
};
