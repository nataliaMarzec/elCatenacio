var { Sequelize, Op } = require("sequelize");
const Pedido = require("../HomePedidosCliente/Pedido");
const { models } = require("../SequelizeConnection");
const ItemsPedido = models.ItemsPedido;
const Productos = models.Producto;
const Pedidos = models.Pedido;

module.exports = {
  //bien
  create: (async = (req, res) => {
    return ItemsPedido.create({
      codigo: req.body.codigo,
      pedidoId: req.body.pedidoId,
      productoId: req.body.productoId,
      cantidad: req.body.cantidad,
      precioUnitario: req.body.precioUnitario,
      importe: req.body.importe,
      observaciones: req.body.observaciones,
      listo:false,
    })
      .then((item) => res.status(201).send(item))
      .catch((error) => res.status(400).send(error));
  }),

  addConProducto(req, res) {
    return ItemsPedido.create(
      {
        codigo: req.body.codigo,
        pedidoId: req.body.pedidoId,
        productoId: req.body.productoId,
        cantidad: req.body.cantidad,
        precioUnitario: req.body.precioUnitario,
        importe: req.body.importe,
        observaciones: req.body.observaciones,
        Productos: req.body.Productos,
      },
      {
        include: [
          {
            model: Productos,
            as: "Productos",
            where: { productoId: ItemsPedido.productoId },
          },
        ],
      }
    )
      .then((items) => res.status(201).send(items))
      .catch((error) => res.status(400).send(error));
  },
  updateListo: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { codigo: req.params.codigo },
      include: ["Productos"],
    });
    var listo = req.params.listo
    var itemListo = await item.update({ listo: listo });
    if (![req.body.values]) {
      res.status(400).json({ err: "no existe codigo item" });
    } else {
      return res.status(200).json(itemListo);
    }
  },

  updateItemsListos: async (req, res) => {
    let id=req.params.id
    var pedido= await Pedidos.findOne({where:{id:id}})
    let pedidoId=pedido.id
    if (pedidoId) {
      var items = await ItemsPedido.update(
        {listo:true},
        {where: { pedidoId:pedidoId }},
      )
      console.log("ItemsListos",pedido.id,items);
      return res.status(200).json(items);
    } else {
      return res
        .status(404)
        .json("no encontro ", {id});
    }
  },
  

  //bien
  encontrarItemPorId: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { codigo: req.params.codigo },
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
      where: { codigo: req.params.codigo },
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
  //usado
  buscarDescripcion: async (req, res) => {
    return await Productos.findOne({
      where: { descripcion: req.params.descripcion },
    })
      .then((producto) => {
        var idp = producto.id;
        if (producto) {
          return res.status(200).send({
            message: "idp",
            idp,
          });
        }
      })
      .catch((error) =>
        res.status(400).send({ error, message: " no existe descripcion" })
      );
  },
  //usado 2
  getProductoAItem: async (req, res) => {
    var pedido = await Pedidos.findOne({
      where: { id: req.params.id },
    });
    var idPedido = pedido.id;
    var producto = await Productos.findOne({
      where: { descripcion: req.params.descripcion },
    });
    var idp = producto.id;
    return ItemsPedido.create(
      {
        codigo: req.body.codigo,
        pedidoId: pedido.id,
        productoId: producto.id,
        cantidad: req.body.cantidad,
        precioUnitario: req.body.precioUnitario,
        importe: req.body.importe,
        observaciones: req.body.observaciones,
      },
      {
        include: [

          {
            model: Productos,
            as: "Productos",
          },
        ],
      }
    )
      .then((item) => res.status(201).send(item))
      .catch((error) => res.status(400).send(error));
  },
  //usado
  updateCantidadItem: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { productoId: req.params.productoId },
    });
    var itemCantidad = await item.update({
      cantidad: req.body.cantidad,
      pedidoId: req.body.pedidoId,
    });
    console.log("cantidad", itemCantidad.cantidad, "item", item, item.pedidoId);
    return res.status(200).json(itemCantidad);
  },
  // updateCantidadItem: async (req, res) => {
  //     var item = await ItemsPedido.findOne({
  //       where: { productoId: req.params.productoId },
  //     });
  //     var itemCantidad = await item.update({
  //       cantidad: req.body.cantidad,
  //       pedidoId: req.body.pedidoId,
  //     });
  //     console.log("cantidad", itemCantidad.cantidad, "item", item,item.pedidoId);
  //     return res.status(200).json(itemCantidad);
  //   },

  //usado
  updateImporteItem: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { productoId: req.params.productoId },
    });
    var itemImporte = await item.update({ importe: req.params.importe });
    console.log("importe", itemImporte.importe, "item", item);
    return res.status(200).json(itemImporte);
  },
  //usado
  updateObservaciones: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { productoId: req.params.productoId },
    });
    var itemObservaciones = await item.update({
      observaciones: req.body.observaciones,
    });
    console.log("observaciones", itemObservaciones.observaciones, "item", item);
    return res.status(200).json(itemObservaciones);
  },

  updateProducto: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { codigo: req.params.codigo },
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

  //usado
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
    const item = await ItemsPedido.findOne(req.params.codigo, {
      include: ["Pedidos", "Productos"],
    });
    const {
      codigo,
      pedidoId,
      productoId,
      cantidad,
      precioUnitario,
      importe,
      observaciones,
    } = await item.update(req.body);

    return res
      .json({
        codigo,
        pedidoId,
        productoId,
        cantidad,
        precioUnitario,
        importe,
        observaciones,
      })
      .res.send(200, "item editado");
  },
  //bien
  updatePorId(req, res) {
    return ItemsPedido.findOne(
      { where: { codigo: req.params.codigo } },
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
            codigo: req.body.codigo,
            pedidoId: req.body.pedidoId,
            productoId: req.body.productoId,
            cantidad: req.body.cantidad,
            precioUnitario: req.body.precioUnitario,
            importe: req.body.importe,
            observaciones: req.body.observaciones,
          })
          .then(() => res.status(200).send(item))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
 
  delete(req, res) {
    return ItemsPedido.findOne({
      where: { codigo: req.params.codigo },
    })
      .then((item) => {
        if (!item) {
          return res.status(400).send({
            message: "item no encontrado",
          });
        }
        return item
          .destroy()
          .then(() => res.status(200).send())
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
