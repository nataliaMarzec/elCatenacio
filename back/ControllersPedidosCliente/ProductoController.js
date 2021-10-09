var { Op, Sequelize } = require("sequelize");
const { models } = require("../SequelizeConnection");
const Producto = models.Producto;
const ItemsPedido = models.ItemsPedido;
const Imagen = models.Imagen;
var {cargarImagen}=require("../ControllerMulter/controllerImagen")

module.exports = {
  //usado devuelve id y crea seccion
  create: async (req, res) => {
    var image= await Imagen.findOne({
      where: { id_imagen: req.params.id_imagen },
    });
    // id,id_imagen, descripcion, precioUnitario, categoria, habilitado
  
  const id = req.body.id
  var imagenId =image.id_imagen;
  const descripcion = req.body.descripcion;
  const precioUnitario = req.body.precioUnitario;
  const categoria = req.body.categoria;
  const habilitado =req.body.habilitado;

  const producto = {
    id: id,
    imagenId:imagenId,
    descripcion: descripcion,
    precioUnitario: precioUnitario,
    categoria: categoria,
    habilitado: habilitado,
  };
  return await Producto.create(producto)
    .then(function (producto) {
      console.log("producto+++", producto.imagenId);
      producto.save();
      let id = producto.id;
      let imagenId = producto.imagenId;
      let descripcion = producto.descripcion;
      let precioUnitario = producto.precioUnitario;
      let categoria = producto.categoria;
      let habilitado = producto.habilitado;

      return res.json({
        message: "se guardo el producto",
        id,
        imagenId,
        descripcion,
        precioUnitario,
        categoria,
        habilitado,

      });
    })
    .catch(function (error) {
      console.log("producto", error);
    });
},
  delete: async (req, res) => {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      await producto.destroy();
      return res.status(200).json({ delete: "Producto eliminado" });
    } else {
      return res.status(404).json({ messagge: "No exite producto con id" })
    }
  },

  update: async (req, res) => {
    const producto = await Producto.findByPk(req.params.id);
    if (producto.id) {
      const { id, descripcion, precioUnitario, categoria, codigo, habilitado } = await producto.update(
        req.body
      );
      return res.status(200)
        .json({
          id,
          descripcion,
          precioUnitario,
          categoria,
          codigo,
          habilitado,
        })
    } else {
      return res.status(404).json({ messagge: "No encontró producto con id" })
    }
  },


  productosConItems(req, res) {
    return Producto
      .findAll({
        include: [{
          model: ItemsPedido,
          as: 'ItemsPedido'
        }],
      })
      .then((Producto) => res.status(200).send(Producto))
      .catch((error) => { res.status(400).send(error); });

  },

  getProductos: async (req, res, next) => {
    const productos = await Producto.findAll({});
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de productos" });
    } else {
      return res.status(200).json(productos);
    }
  },
  getProductosHabilitados: async (req, res, next) => {
    const productos = await Producto.findAll({ where: { habilitado: true } });
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

  getProductosDescripciones: async (req, res, next) => {
    const productos = await Producto.findAll();
    const descripciones = await productos.map(
      (producto) => producto.descripcion
    );
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
      return res.status(200).json(descripciones);
    }
  },

  //funciona para pedidoid y menus|
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

 

  //           include: [{
  //               model: Pedido,
  //               as: 'Pedidos',
  //               attributes: { exclude: ['createdAt', 'updatedAt'] },
  //               through: { attributes: [] },
  //           }],
  //       });




  
    


















};
