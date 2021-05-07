var { Sequelize, Op } = require("sequelize");
const { models } = require("../SequelizeConnection");
const ItemsPedido = models.ItemsPedido;
const Productos = models.Producto;
const Pedidos = models.Pedido;

module.exports = {
  //bien
  create: (async = (req, res) => {
    return ItemsPedido.create({
      id: req.body.id,
      pedidoId: req.body.pedidoId,
      productoId: req.body.productoId,
      cantidad: req.body.cantidad,
      precioUnitario: req.body.precioUnitario,
      importeTotal: req.body.importeTotal,
      montoCobrado: req.body.montoCobrado,
      pagado: req.body.pagado,
    })
      .then((item) => res.status(201).send(item))
      .catch((error) => res.status(400).send(error));
  }),

  addConProducto(req, res) {
    return ItemsPedido.create(
      {
      id: req.body.id,
      pedidoId: req.body.pedidoId,
      productoId: req.body.productoId,
      cantidad: req.body.cantidad,
      precioUnitario: req.body.precioUnitario,
      importeTotal: req.body.importeTotal,
      montoCobrado: req.body.montoCobrado,
      pagado: req.body.pagado,
      Productos: req.body.Productos,
 
      },
      {
        include: [
          {
            model:Productos,
            as: "Productos",
            where: { productoId:ItemsPedido.productoId },
          },
        ],
      }
    )
      .then((items) => res.status(201).send(items))
      .catch((error) => res.status(400).send(error));
  },

  //bien
  encontrarItemPorId: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { id: req.params.id },
      include: ["Productos"],
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay producto con codigo" });
    } else {
      return res.status(200).json(item);
    }
  },
  //bien
  encontrarProductoPorProductoId: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { productoId: req.params.productoId },
      include: ["Productos"],
    });
    var producto = await item.Productos;

    if (![req.body.values]) {
      res.status(400).json({ err: "No hay producto con codigo" });
    } else {
      return res.status(200).json(producto);
    }
  },

  //bien no tocar
  addProducto: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { id: req.params.id },
      include: ["Productos"],
    });
    var prod = await item.Productos;
    if (prod === null) {
      var producto = await Productos.findOne({
        where: { descripcion: req.params.descripcion },
      });
      var id = prod.id;
      var itemProd = await item.update({ productoId: id }).save();

      console.log("producto", producto.id, "pid", itemProd);
      return res.status(200).json(itemProd);
    } else {
      return res.status(200).json({ err: "item ya tiene producto", item });
    }
  },

  updateProducto: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { id: req.params.id },
      include: ["Productos"],
    });
    var prod = await item.Productos;
    if (prod === null) {
      var producto = await Productos.findOne({
        where: { descripcion: req.params.descripcion },
      });
      var id = prod.id;
      var itemProd = await item.update({ productoId: id }).save();

      console.log("producto", producto.id, "pid", itemProd);
      return res.status(200).json(itemProd);
    } else {
      return res.status(200).json({ err: "item ya tiene producto", item });
    }
  },


  //bien
  todosLosItems(req, res) {
    return ItemsPedido.findAll({
      include: [
        {
          model: Productos,
          as: "Productos",
        },
      ],
    })
      .then((items) => res.status(200).send(items))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  //bien
  todosLosItemsDePedidos(req, res) {
    return ItemsPedido.findAll({
      include: [
        {
          model: Pedidos,
          as: "Pedidos",
        },
      ],
    })
      .then((items) => res.status(200).send(items))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  //bien con onUpdate=SET NULL
  update: async (req, res) => {
    const item = await ItemsPedido.findByPk(req.params.id, {
      include: ["Pedidos", "Productos"],
    });
    const {
      id,
      pedidoId,
      productoId,
      cantidad,
      precioUnitario,
      importeTotal,
      montoCobrado,
      pagado,
    } = await item.update(req.body);

    return res
      .json({
        id,
        pedidoId,
        productoId,
        cantidad,
        precioUnitario,
        importeTotal,
        montoCobrado,
        pagado,
      })
      .res.send(200, "item editado");
  },
  //bien
  updatePorId(req, res) {
    return ItemsPedido.findOne(
      { where: { id: req.params.id } },
      {
        include: [
          {
            model: Pedidos,
            as: "Pedidos",
          },
        ],
      }
    )
      .then((item) => {
        if (!item) {
          return res.status(404).send({
            message: "Item no encontrado",
          });
        }
        return item
          .update({
            id: req.body.id,
            pedidoId: req.body.pedidoId,
            productoId: req.body.productoId,
            cantidad: req.body.cantidad,
            precioUnitario: req.body.precioUnitario,
            importeTotal: req.body.importeTotal,
            montoCobrado: req.body.montoCobrado,
            pagado: req.body.pagado,
          })
          .then(() => res.status(200).send(item))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return ItemsPedido.findOne({ where: { id: req.params.id },include:["Productos"] })
      .then((item) => {
        if (!item) {
          return res.status(400).send({
            message: "item no encontrado",
          });
        }
        return item
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  //bien
  encontrarItemsPorPedidoId: async (req, res, id) => {
    var item = await ItemsPedido.findAll({
      where: { pedidoId: req.params.pedidoId },
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay Item con pedidoId" });
    } else {
      return res.status(200).json(item);
    }
  },

  encontrarItemsPorProductoId: async (req, res) => {
    var item = await ItemsPedido.findAll({
      where: { productoId: req.params.productoId },
      include: ["Productos"],
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No Item con productoId" });
    } else {
      return res.status(200).json(item);
    }
  },
};
