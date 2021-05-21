"use strict";

require("dotenv").config();
const Sequelize = require("sequelize");
const PedidoModel = require("./HomePedidosCliente/Pedido");
const ProductoModel = require("./HomePedidosCliente/Producto");
const ItemsPedidoModel = require("./HomePedidosCliente/ItemsPedido");
const PagoModel=require("./HomePedidosCliente/Pago")
const ResponsableDeMesaModel=require("./HomePedidosCliente/ResponsableDeMesa")
const ClienteModel = require("./HomeClientes/Cliente");

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST,
      dialect: "mysql",
      operatorsAliases: "false",
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      tableOptions: {
        ENGINE: 'innodb',
         // SET FOREIGN_KEY_CHECKS=0;
      }
     
    });

const models = {};
models.Sequelize = Sequelize;
models.sequelize = sequelize;

models.Producto = ProductoModel(sequelize, Sequelize);
models.ItemsPedido = ItemsPedidoModel(sequelize, Sequelize);
models.Pedido = PedidoModel(sequelize, Sequelize);
models.Cliente = ClienteModel(sequelize, Sequelize);
models.Pago= PagoModel(sequelize,Sequelize)
models.ResponsableDeMesa=ResponsableDeMesaModel(sequelize,Sequelize)

models.Producto.hasOne(models.ItemsPedido, {
  foreignKey: "productoId",
  as: "ItemsPedido",
  onDelete: "SET NULL",
  onUpdate:"SET NULL"
});

models.ItemsPedido.belongsTo(models.Producto, {
  foreignKey: "productoId",
  as: "Productos",
  onDelete: "CASCADE",
  onUpdate:"CASCADE",
  constraints:false,
});

models.Pedido.hasMany(models.ItemsPedido, {
  as: "ItemsPedido",
  foreignKey: "pedidoId",
  sourceKey:"id",
  // unique:false,
  constraints:false,

});
models.ItemsPedido.belongsTo(models.Pedido, {
  as: "Pedidos",
  foreignKey: "pedidoId",
  targetKey: "id",
  constraints:false,
  // unique:false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("BD_CONECTADA!!");
  })
  .catch((err) => {
    console.error("ERROR,_BD_NO_CONECTADA:", err);
  });

sequelize
  .sync()
  // sequelize.sync({ force: true })
  .then(() => {
    console.log(`Base de datos y tablas creadas, modelos sincronizados!`);
  });

module.exports = {
  models,
  sequelize,
};
