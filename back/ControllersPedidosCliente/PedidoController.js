var { Sequelize, Op } = require("sequelize");
var { encontrarItemsPorPedidoId } = require("./ItemsPedidoController");
const { models } = require("../SequelizeConnection");
const Producto = models.Producto;
const ItemsPedido = models.ItemsPedido;
const Pedido = models.Pedido;
const Responsable = models.ResponsableDeMesa

module.exports = {
  //usado devuelve id y crea seccion
  create: async (req, res) => {
    console.log("req.body", req.params.id_responsable);
    var responsable = await Responsable.findOne({
      where: { nombre: req.params.nombre },
    });
    const id = req.body.id
    var responsableId = responsable.id_responsable;
    // let responsableId = req.params.id_responsable
    const seccion = req.body.seccion;
    const codigoPedido = req.body.codigoPedido;
    const observaciones = req.body.observaciones;
    const entregado = false;
    const fecha = req.body.fecha;
    const hora = req.body.hora;

    const pedido = {
      id: id,
      responsableId: responsable.id_responsable,
      seccion: seccion,
      codigoPedido: codigoPedido,
      observaciones: observaciones,
      entregado: entregado,
      fecha: fecha,
      hora: hora,
      ItemsPedido: [],
    };
    return await Pedido.create(pedido)
      .then(function (pedido) {
        console.log("pedido+++", pedido.responsableId);
        pedido.save();
        let id = pedido.id;
        let responsableId = pedido.responsableId;
        let seccion = pedido.seccion;
        let observaciones = pedido.observaciones;
        let codigoPedido = pedido.codigoPedido;
        let entregado = pedido.entregado;
        let fecha = pedido.fecha;
        let hora = pedido.hora;

        return res.json({
          message: "se guardo el pedido",
          id,
          responsableId,
          seccion,
          observaciones,
          codigoPedido,
          entregado,
          fecha,
          hora

        });
      })
      .catch(function (error) {
        console.log("pedido", error);
      });
  },

  //usado 
  settearPedidoYProductoAItem: async (req, res) => {
    let id = req.params.id
    console.log("id", id);
    var producto = await Producto.findOne({
      where: { descripcion: req.params.descripcion },
    });
    if(producto.categoria === "Cocina"){
    const item = {
      codigo: req.body.codigo,
      pedidoId: id,
      productoId: producto.id,
      cantidad: req.body.cantidad,
      precioUnitario: req.body.precioUnitario,
      importe: req.body.importe,
      observaciones: req.body.observaciones,
      listoCocina:true,
      listoParrilla:req.body.listoParrilla,
    };
    return await ItemsPedido.create(item)
      .then(function (item) {
        console.log("item+++", item);
        item.save();
        return res.status(200).json({
          message: "se guardo el itemCocina",
          item,
        });
      })
      .catch(function (error) {
        console.log("item", error);
      })
    }
    if(producto.categoria === "Parrilla"){
      const item = {
        codigo: req.body.codigo,
        pedidoId: id,
        productoId: producto.id,
        cantidad: req.body.cantidad,
        precioUnitario: req.body.precioUnitario,
        importe: req.body.importe,
        observaciones: req.body.observaciones,
        listoCocina:req.body.listoCocina,
        listoParrilla:true,
      };
      return await ItemsPedido.create(item)
        .then(function (item) {
          console.log("item+++", item);
          item.save();
          return res.status(200).json({
            message: "se guardo el itemParrilla",
            item,
          });
        })
        .catch(function (error) {
          console.log("item", error);
        })
      }
  },
  updateEntregado: async (req, res) => {
    var pedido = await Pedido.findOne({
      where: { id: req.params.id },
      include: ["ItemsPedido"],
    });
    var entregado = req.params.entregado
    var pedidoEntregado = await pedido.update({ entregado: entregado });
    if (![req.body.values]) {
      res.status(400).json({ err: "no existe id pedido" });
    } else {
      return res.status(200).json(pedidoEntregado);
    }
  },

  editarPedido: async (req, res) => {
      var responsable = await Responsable.findOne({
        where: { nombre: req.params.nombre },
      });
      return Pedido.findByPk(req.params.id)
        .then((pedido) => {
          if (!pedido) {
            return res.status(404).send({
              message: "Pedido no encontrado",
            });
          }
          return pedido
            .update(
              {
                responsableId:responsable.id_responsable,
                seccion:req.body.seccion,
                codigoPedido:req.body.codigoPedido,
                observaciones:req.body.observaciones,
                entregado:req.body.entregado,
                // fecha:req.body.fecha,
                // hora:req.body.hora,
                // ItemsPedido: req.body.ItemsPedido || pedido.ItemsPedido,
              }
            )
            .then(() => res.status(200).send(pedido))
            .catch((error) => {
              console.log(error);
              res.status(400).send(error);
            });
        })
    },

 //no funciona probar otra vez
 editarItemConProductoDePedido: async (req, res) => {
  let id = req.params.id
  let codigo=req.params.codigo
  console.log("id", id);
  var producto = await Producto.findOne({
    where: { descripcion: req.params.descripcion},
  });
  if(producto.categoria == "Cocina"){
    const itemCocina = {
      pedidoId: id,
      productoId: producto.id,
      cantidad: req.body.cantidad,
      importe:req.body.importe,
      observaciones: req.body.observaciones,
      listoCocina:true,
      listoParrilla:req.body.listoParrilla
    };
    console.log("itemCocina",itemCocina)
    // return res.status(200).json(producto)
  return await ItemsPedido.update(itemCocina,{where:{codigo:codigo}})
    .then(function (itemCocina) {
      console.log("item+++", itemCocina);
      // itemCocina.save();
      return res.status(200).json({
        message: "se guardo el itemCocina",
        itemCocina,
      });
    })
    .catch(function (error) {
      console.log("item", error);
    })
  }
  if(producto.categoria == "Parrilla"){
    const itemParrilla = {
      pedidoId:id,
      productoId: producto.id,
      cantidad: req.body.cantidad,
      precioUnitario: req.body.precioUnitario,
      importe: req.body.importe,
      observaciones: req.body.observaciones,
      listoCocina:req.body.listoCocina,
      listoParrilla:true
    };
    return await ItemsPedido.update(itemParrilla,{where:{codigo:codigo}})
      .then(function (itemParrilla) {
        console.log("item+++", itemParrilla);
        // itemParrilla.save();
        return res.status(200).json({
          message: "se guardo el itemParrilla",
          itemParrilla,
        });
      })
      .catch(function (error) {
        console.log("item", error);
      })
    }

},

  //actualiza el pedido pero no el item
  updatePedidoEntregado(req, res) {
    console.log(req.body, "items", Pedido.entregado);
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
              entregado: true,
              ItemsPedido: pedido.ItemsPedido,
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
  },
  //agregar preparado cocina y preparado parrilla
  todoListoPedidoPreparadoDeCocina(req, res) {
    console.log(req.body, "items", Pedido.preparadoCocina);
    return Pedido.findByPk(req.params.id, {
      include: [
        {
          model: ItemsPedido,
          as: "ItemsPedido",
          where: { listoCocina:true,pedidoId:req.params.id },
        },
      ],
    })
      .then((pedido) => {
        if (!pedido) {
          return res.status(404).send({
            message: "Pedido cocina no encontrado",
          });
        }
        return pedido
          .update(
            {
              preparadoCocina: true,
              ItemsPedido: pedido.ItemsPedido,
            },
          )
          .then(() => res.status(200).send(pedido))
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      })
  },
  todoListoPedidoPreparadoDeParrilla(req, res) {
    console.log(req.body, "items", Pedido.preparadoParrilla);
    return Pedido.findByPk(req.params.id, {
      include: [
        {
          model: ItemsPedido,
          as: "ItemsPedido",
          where: { listoParrilla:true,pedidoId:req.params.id },
        },
      ],
    })
      .then((pedido) => {
        if (!pedido) {
          return res.status(404).send({
            message: "Pedido parrilla no encontrado",
          });
        }
        return pedido
          .update(
            {
              preparadoParrilla: true,
              ItemsPedido: pedido.ItemsPedido,
            },
          )
          .then(() => res.status(200).send(pedido))
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      })
  },
 
 
 
 
 
  //usado revisar
  guardarPedidoId: async (req, res) => {
    var item = await ItemsPedido.findOne({
      where: { codigo: req.params.codigo },
    });
    var id = req.params.id;
    if (item) {
      const pedido = await Pedido.create({
        id: id,
        include: [
          {
            association: ItemsPedido,
            where: { foreingkey: "pedidoId", targetKey: "id" },
          },
        ],
      });
      var pid = pedido.id;
      var itemPedidoId = await item.update({
        pedidoId: id,
        include: [
          {
            association: Pedido,
            where: { foreingkey: "pedidoId" },
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

  //probando
  // addConItems(req, res) {
  //   let pedido = Pedido.create({
  //     id: req.body.id,
  //     codigoPedido: req.body.codigoPedido,
  //     seccion: req.body.seccion,
  //     observaciones:req.body.observaciones,
  //     entregado:req.body.entregado,
  //     fecha = req.body.fecha,
  //     hora = req.body.hora,
  //   }).save({ id: pedido.id });
  //   let Id = pedido.id;
  // let Id = Pedido.findOne({ id: pedido.id });
  //  items = ItemsPedido.findAll({
  //   where: { pedidoId: pedido.id },
  //   include: [
  //     {
  //       model: Producto,
  //       as: "Productos",
  //       where: { productoId: ItemsPedido.productoId },
  //     },
  //   ],
  // });
  // let pedidoUpdate= items.forEach((i) => {
  //   i.save({ pedidoId: pedidoId });
  //   Pedidolet.update({ ItemsPedido: req.body.ItemsPedido,
  //     include: [
  //       {
  //         model: ItemsPedido,
  //         as: "ItemsPedido",
  //         where: { pedidoId: Pedido.id },
  //         include: [
  //           {
  //             model: Producto,
  //             as: "Productos",
  //             where: { productoId: ItemsPedido.productoId },
  //           },
  //         ],
  //       },
  //     ],
  //   } );
  // });
  //   console.log("id", Id);
  //   return res.status(200).json(Id);

  //   // .then((pedido) => res.status(201).send(pedido))
  //   // .catch((error) => res.status(400).send(error));
  // },

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
  //bien usado
  busquedaPedidoPorId: async (req, res) => {
    var pedido = await Pedido.findOne({
      where: { id: req.params.id },
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
      res.status(400).json({ err: "No pedido con id" });
    } else {
      return res.status(200).json(pedido);
    }
  },

  // getIdPedido: async (req, res) => {
  //   var pedido = await Pedido.findByOne(req.params.id, {
  //     // include: [
  //     //   {
  //     //     model: ItemsPedido,
  //     //     as: "ItemsPedido",
  //     //     include: [
  //     //       {
  //     //         model: Producto,
  //     //         as: "Productos",
  //     //       },
  //     //     ],
  //     //   },
  //     // ],
  //   });
  //   if (![req.body.values]) {
  //     res.status(400).json({ err: "No hay pedido con ID" });
  //   } else {
  //     return res.status(200).json(pedido);
  //   }
  // },

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
              codigoPedido: req.body.codigoPedido || pedido.codigoPedido,
              seccion: req.body.seccion || pedido.seccion,
              observaciones: req.body.observaciones || pedido.observaciones,
              entregado: req.body.entregado || pedido.entregado,
              fecha: req.body.fecha || pedido.fecha,
              hora: req.body.hora || pedido.hora,
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
    // .catch((error) => {
    //   console.log(error);
    //   res.status(400).send(error);
    // });
  },
  //usado
  eliminarPedidoConItems: async (req, res) => {
    return await Pedido.findOne({
      where: { id: req.params.id }
    })
      .then((pedido) => {
        if (!pedido) {
          return res.status(400).send({
            message: "Pedido no encontrado",
          });
        }
        return pedido
          .destroy()
          .then(() => res.status(204).send())
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
    const pedidos = await Pedido.findAll({
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
      res.status(400).json({ err: "no obtiene lista de pedidos" });
    } else {
      return res.status(200).json(pedidos);
    }
  },

  // getUnPedido: async (req, res, next) => {
  //   const pedido = await Pedido.findAll();
  //   if (![req.body.values]) {
  //     res.status(400).json({ err: "no obtiene unPedido" });
  //   } else {
  //     return res.status(200).json(pedido);
  //   }
  // },

  getPedidoIdConItemYProducto: async (req, res) => {
    var pedido = await Pedido.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay pedido con ID" });
    } else {
      return res.status(200).json(pedido);
    }
  },

  //falta actualizar hora y fecha
  update: async (req, res) => {
    const pedido = await Pedido.findByPk(req.params.id);
    const { id, codigoPedido, seccion, observaciones, entregado, fecha, hora } = await pedido.update(req.body);

    return res
      .json({
        id,
        codigoPedido,
        seccion,
        observaciones,
        entregado,
        fecha,
        hora
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
