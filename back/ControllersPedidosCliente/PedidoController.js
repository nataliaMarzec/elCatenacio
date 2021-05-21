var { Sequelize, Op } = require("sequelize");
var { encontrarItemsPorPedidoId } = require("./ItemsPedidoController");
const { models } = require("../SequelizeConnection");
const Producto = models.Producto;
const ItemsPedido = models.ItemsPedido;
const Pedido = models.Pedido;
module.exports = {
  guardarPedidoId: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { codigo: req.params.codigo },
    });
    var id=req.params.id
    if (item) {
      const pedido = await Pedido.create({
        id:id,
        include: [
          {
            association:ItemsPedido,
            where:{foreingkey:"pedidoId",targetKey:"id"}
          },
        ],
      });
      var pid = pedido.id;
      var itemPedidoId = await item.update({
        pedidoId:id,
        include: [
          {
            association:Pedido,
            where:{foreingkey:"pedidoId"}
          },
        ],
      });
      console.log("pedidoId", id);
      return res.status(200).json(itemPedidoId);
    } else {
      return res
        .status(404)
        .json("no encontro item", { item, pid, itemPedidoId });
    }
  },
  //funciona!!
  addConItems(req, res) {
    return Pedido.create(
      {
        id: req.body.id,
        codigoPedido: req.body.codigoPedido,
        mesero: req.body.mesero,
        seccion: req.body.seccion,
        ItemsPedido: req.body.ItemsPedido,
      },
      {
        include: [
          {
            model: ItemsPedido,
            as: "ItemsPedido",
            where: { pedidoId: Pedido.id },
            include: [
              {
                model: Producto,
                as: "Productos",
                where: { productoId: ItemsPedido.productoId },
              },
            ],
          },
        ],
      }
    )
      .then((pedido) => res.status(201).send(pedido))
      .catch((error) => res.status(400).send(error));
  },
  //bien
  add(req, res) {
    return Pedido.create({
      id: req.body.id,
      codigoPedido: req.body.codigoPedido,
      mesero: req.body.mesero,
      seccion: req.body.seccion,
    })
      .then((pedido) => res.status(201).send(pedido))
      .catch((error) => res.status(400).send(error));
  },

  //funciona!
  encontrarPedidoConItems: async (req, res) => {
    var pedidosConItems = await Pedido.findAll({
      include: [
        {
          model: ItemsPedido,
          as: "ItemsPedido",
          attributes: [
            "id",
            "pedidoId",
            "productoId",
            "cantidad",
            "importeTotal",
            "montoCobrado",
            "pagado",
          ],
          include: [
            {
              model: Producto,
              as: "Productos",
              attributes: ["id", "descripcion", "precioUnitario"],
            },
          ],
        },
      ],
    });
    // var listaFiltrada = await pedidosConItems.filter(
    //   (pedido) => pedido.ItemsPedido.length > 0
    // );
    // var map=await listaFiltrada.map((pedido)=>pedido.ItemsPedido)

    if (![req.body.values]) {
      res.status(400).json({ err: "No hay pedido con items" });
    } else {
      // console.log("pedido con items___________", listaFiltrada);
      // return res.status(200).json(listaFiltrada);
      return res.status(200).json(pedidosConItems);
    }
  },
  //bien
  getPedidoId: async (req, res) => {
    var pedido = await Pedido.findByPk(req.params.id, {
      include: [
        {
          model: ItemsPedido,
          as: "ItemsPedido",
          include: [
            {
              model: Producto,
              as: "Productos",
            },
          ],
        },
      ],
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay pedido con ID" });
    } else {
      return res.status(200).json(pedido);
    }
  },

  //actualiza el pedido pero no el item
  updateConItems(req, res) {
    console.log(req.body, "items", Pedido.ItemsPedido);
    return Pedido.findByPk(req.params.id, {
      include: [
        {
          model: ItemsPedido,
          as: "ItemsPedido",
        },
      ],
    })
      .then((pedido) => {
        if (!pedido) {
          return res.status(404).send({
            message: "Pedido no encontrado",
          });
        }
        return pedido
          .update(
            {
              id: req.body.id || pedido.id,
              codigoPedido: req.body.codigoPedido || pedido.codigoPedido,
              mesero: req.body.mesero || pedido.mesero,
              seccion: req.body.seccion || pedido.seccion,
              ItemsPedido: req.body.ItemsPedido || pedido.ItemsPedido,
            },
            {
              include: [
                {
                  model: ItemsPedido,
                  as: "ItemsPedido",
                },
              ],
            }
          )
          .then(() => res.status(200).send(pedido))
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  delete: async (req, res) => {
    return await Pedido.findByPk(req.params.id)
      .then((pedido) => {
        if (!pedido) {
          return res.status(400).send({
            message: "Pedido no encontrado",
          });
        }
        return pedido
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  agregarItems(idPedido, items, callback) {
    Pedido.findOne({ id: idPedido }, (error, pedido) => {
      if (error) callback("error");
      else {
        pedido.ItemsPedido.push(items);
        Pedido.replaceOne({ id: idPedido }, pedido, (error, result) => {
          if (error) callback("error");
          else {
            console.log(`Resultado de actualizar: ${JSON.stringify(result)}`);
            callback("ok", items);
          }
        });
      }
    });
  },
  agregar: async (req, res) => {
    var id = req.params.id;
    var items = req.body;
    Pedido.agregarItems(id, items, (result, pedido) => {
      if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200).send(pedido);
      }
    });
  },

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

  getPedidoIdConItemYProducto: async (req, res) => {
    var pedido = await Pedido.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay pedido con ID" });
    } else {
      return res.status(200).json(pedido);
    }
  },

  update: async (req, res) => {
    const pedido = await Pedido.findByPk(req.params.id);
    const { id, codigoPedido, mesero, seccion } = await pedido.update(req.body);

    return res
      .json({
        id,
        codigoPedido,
        mesero,
        seccion,
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
};
