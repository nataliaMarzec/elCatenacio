"use strict";

require("dotenv").config();
const Sequelize = require("sequelize");
const PedidoModel = require("./HomePedidosCliente/Pedido");
const ProductoModel = require("./HomePedidosCliente/Producto");
const ItemsPedidoModel = require("./HomePedidosCliente/ItemsPedido");
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
    });

const models = {};
models.Sequelize = Sequelize;
models.sequelize = sequelize;

models.Producto = ProductoModel(sequelize, Sequelize);
models.ItemsPedido = ItemsPedidoModel(sequelize, Sequelize);
models.Pedido = PedidoModel(sequelize, Sequelize);
models.Cliente = ClienteModel(sequelize, Sequelize);


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
  constraints:false,

});
models.ItemsPedido.belongsTo(models.Pedido, {
  as: "Pedidos",
  foreignKey: "pedidoId",
  targetKeys: "id",
  unique:false,
  constraints: false,
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
