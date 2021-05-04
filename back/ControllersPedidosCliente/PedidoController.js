var { Sequelize, Op } = require("sequelize");
const { models } = require("../SequelizeConnection");
const Pedido = models.Pedido;
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
    } = await Pedido.create({
      pedido,
      include: [
        {
          model: "ItemsPedido",
          where: { pedidoId:"pedidoId" },
        },
      ],
    });

    return res.status(200).json({
      id,
      codigoPedido,
      mesero,
      seccion,
      cantidad,
      precioUnitario,
      importeTotal,
      montoCobrado,
      pagado,
      // itemsPedido:[itemsPedido]
    });
  },
  encontrarPedidoConItems: async (req, res) => {
    var pedidoConItems = await Pedido.findAll({include:["ItemsPedido"]
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay pedido con items" });
    } else {
      return res.status(200).json(pedidoConItems);
    }
  },
  // Company.findAll ({
  // 	atributos: [['uuid', 'companyId'], 'nombre', 'calle', 'teléfono'],
  // 	incluir: [{
  // 		modelo: Producto,
  // 		donde: {fk_companyid: db.Sequelize.col ('company.uuid')},
  // 		atributos: ['código', 'nombre', 'detalles']
  // 	}]
  // })

  // create:async(req,res)=>{
  //   const pedido=req.body;
  //   const itemPedido=req.body
  //   const item=ItemsPedido.create({id:itemPedido.id,pedidoId:itemPedido.pedidoId,
  //   productoId:itemPedido.productoId,estado:itemPedido.estado})
  //   const pedidoi= await Pedido.create({id:pedido.id,codigoPedido:pedido.codigoPedido,
  //     cantidad:pedido.cantidad,
  //     itemsPedido:[item],
  //     include: [
  //       {
  //         model:"ItemsPedido",
  //         associations: [ItemsPedido,Pedido],
  //         where: { pedidoId: Sequelize.col("ItemsPedido.pedidoId") },
  //       },
  //     ],
  //   })
  //   return res.status(200).json({pedidoi})

  //   },

  //   models.user.create( { username: "Juan",
  //   password: "1234",
  //   quizzes: [ { question: "12345", answer: "6" },
  //              { question: "13579", answer: "11" },
  //              { question: "11235", answer: "8" }
  //            ]
  // },
  // { include: [ models.quiz ]
  // }
  // )
  // .then(user => {
  // console.log('Creado Usuario con varios quizzes.');
  // })
  // .catch(error => {
  // console.log("Error:", error);
  // });

  createItemPedido: async (req, res) => {
    const pedido = req.body;
    const itemsPedido = await Pedido.create(
      {
        pedido,
        items: [{ id: "1", pedidoId: "4", productoId: "2", estado: "true" }],
      },
      { include: ["itemPedido"] }
    );
    return res.status(200).json({ itemsPedido });
  },
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
