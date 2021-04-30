var { Op, Sequelize } = require("sequelize");
const { Producto, Pedido } = require("../SequelizeConnection");

module.exports = {
  create: async (req, res) => {
    const producto = req.body;
    // const pedidoID=Producto.find({where:Producto.Pedido.pedidoId})
    const {
      id,
      pedidoId,
      codigo,
      habilitado,
    } = await Producto.create(producto);

    return res.status(200).json({
      id,
      pedidoId,
      codigo,
      habilitado,
    });
  },
  // createProductoConPedido: async (req, res) => {
  //     var pedido = await Pedido.findOne({
  //       where: { pedidoId: req.params.pedidoId },
  //     });
  //   const producto = await Producto.create({
  //     id: req.body.id,
  //     productoId: req.body.productoId,
  //     codigo: req.body.codigo,
  //     habilitado: req.body.habilitado,
  //     pedidoId:pedido.pedidoId,
  //     pedido:{
  //       include: [
  //         {
  //           model: Pedido,
  //           where: { pedidoId: Sequelize.col("Pedidos.pedidoId") },
  //         },
  //       ],
  //     }
  //   });
  //   return res.status(200).json(producto);
  // },

  // const pedidoID=Producto.find({where:Producto.Pedido.pedidoId})

  // create:async (req, resp)=>{
  // 	const producto = req.body;
  // 	producto.pedidoId = req.params.codigo_pedio;
  // 	console.log('Info producto ', producto);
  //   const productoConPedido=Producto.create(producto)
  // 			return res.json({productoConPedido})
  // },

  getProductos: async (req, res, next) => {
    const productos = await Producto.findAll({
      // include: [
      //   {
      //     model: Pedido,
      //     required: true,
      //   },
      // ],
    });
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
    const { id, productoId, codigo, habilitado } = await producto.update(
      req.body
    );

    return res
      .json({
        id,
        productoId,
        codigo,
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
  productoConPedidoId: async (req, res) => {
    const existeProducto = await Producto.findByPk(req.params.id);
    if (!existeProducto) {
      return res.status(400).json({ error: "Producto id no existe" });
    }

    const producto_id = Number(req.params.id);

    const productos = await Producto.findAll({
      where: {
        productoId: producto_id,
      },
    });
    return res.status(200).json(productos);
  },

  //funciona para pedidoid y menus
  getProductosTodos: async (req, res, next) => {
    const productos = await Producto.findAll();
    const fk = await productos.map((producto) => producto.productoId);
    // const productosFks = await Producto.findAll({
    //   where: {
    //     productoId: {
    //       $in: fk,
    //     },
    //   },
    // });
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de productos" });
    } else {
      return res.status(200).json(fk);
    }
  },

  getProductosTodos2: async (req, res, next) => {
    const productos = await Producto.findAll();
    const fk = await productos.filter((producto) => producto.productoId);
    // const productosFks = await Producto.findAll({
    //   where: {
    //     productoId: {
    //       $in: fk,
    //     },
    //   },
    // });
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de productos" });
    } else {
      return res.status(200).json(fk);
    }
  },
  createProductoConPedido: async (req, res, next) => {
    const producto = req.body;
    const productoConPedido = await Producto.create(producto, {
      include: [
        {
          association: Producto,
        },
      ],
    }).then((productoConPedido) => {
      if (!productoConPedido) {
        return res.send({ errors: "Error al registrar el producto." });
      } else {
        return res.json(productoConPedido);
      }
    });
  },
  getInfoProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findOne({
        where: {
          id,
        },
        include: [
          { association: Producto.Pedido, attributes: ["id", "codigo"] },
        ],
      });
      res.send(producto);
    } catch (error) {
      res.sendStatus(error, 400);
    }
  },

  // encontrarProductoPor: async (req, res) => {
  //   var producto = await Producto.findOne({
  //     where: { : req.params. },
  //   });
  //   if (![req.body.values]) {
  //     res.status(400).json({ err: "No hay producto con codigo" });
  //   } else {
  //     return res.status(200).json(producto);
  //   }
  // },
  // encontrarProductoPorPrecio: async (req, res) => {
  //   var producto = await Producto.findOne({
  //     where: { : req.params. },
  //   });
  //   if (![req.body.values]) {
  //     res.status(400).json({ err: "No hay producto con codigo" });
  //   } else {
  //     return res.status(200).json(producto);
  //   }
  // },
  encontrarProductoPorForeingKey: async (req, res) => {
    var producto = await Producto.findOne({
      where: { productoId: req.params.productoId },
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay producto con codigo" });
    } else {
      return res.status(200).json(producto.productoId);
    }
  },

  encontrarUnPedidoConPedido: async (req, res) => {
    var producto = await Producto.findOne({
      include: [{ association: Producto.Pedido }],
    }).each((producto) => {
      console.log("producto", producto);
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay producto con pedido" });
    } else {
      return res.status(200).json(producto);
    }
  },
  encontrarProductosConPedido: async (req, res) => {
    var producto = await Producto.findAll({
      include: [{ association: Producto.Pedido }],
    }).each((producto) => {
      console.log("producto", producto);
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay producto con pedido" });
    } else {
      return res.status(200).json(producto);
    }
  },
  //aca tengo que traer el idDelPedido
  getForeingKeys: async (req, res, next) => {
    var pedidoID = await Pedido.findByPk(req.params.id);
    var foreingKeys = await Producto.findAll({
      attributes: ["productoId"],
      where: { id: pedidoID },
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay fks" });
    } else {
      return res.status(200).json(foreingKeys);
    }
  },

  getProductosFkeys: (req, res) => {
    var query = {};
    if (req.query.productoId) {
      console.log(`Query productos: ${req.query.productoId}`);
      var productoFkey = req.query.productoId;
      query = { productoId: productoFkey };
    }
    producto = Producto["productos"];
    producto.find(query, (allObjects) => {
      res.json(allObjects);
      res.end();
    });
  },

  getFks: async (req, res, next) => {
    const productos = await Producto.findAll({
      include: [
        {
          model: Producto,
          where: { productoId: Sequelize.col("productos.productoId") },
        },
      ],
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de fks" });
    } else {
      return res.status(200).json(productos);
    }
  },
  getPFks: async (req, res, next) => {
    const productos = Producto.findAll({
      where: { productoId: req.params.productoId },
    });
    return res.status(200).json(productos);
  },

  //   const project = await Project.findByPk(123);
  // if (project === null) {
  //   console.log('Not found!');
  // } else {
  //   console.log(project instanceof Project); // true
  //   // Its primary key is 123
  // }

  // getFkey:async(req,res)=>{
  //   Project.findAll({ group: 'name' });
  // }

  // getfkeys:async (req,res) => {
  //   try {
  //       const productos = await Producto.findAll({
  //           include: [{
  //               model: Pedido,
  //               as: 'Pedidos',
  //               attributes: { exclude: ['createdAt', 'updatedAt'] },
  //               through: { attributes: [] },
  //           }],
  //       });
  //       console.log(JSON.stringify(productos));
  //       process.exit();
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }
};
