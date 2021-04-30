"use strict";

require("dotenv").config();
// const { applyExtraSetup } = require('./HomePedidosCliente/Asociaciones');

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



// models = sequelize;
// models = Sequelize;



const Pedido = PedidoModel(sequelize, Sequelize);
const Producto = ProductoModel(sequelize, Sequelize);
const Cliente = ClienteModel(sequelize, Sequelize);
const ItemsPedido = ItemsPedidoModel(sequelize, Sequelize);


Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log("BD_CONECTADA!!");
  })
  .catch((err) => {
    console.error("ERROR,_BD_NO_CONECTADA:", err);
  });

sequelize.sync({ force: false })
// sequelize.sync({ force: true })
  .then(() => {
    console.log(`Base de datos y tablas creadas, modelos sincronizados!`);
  });

// applyExtraSetup(sequelize);

module.exports = {
  models,
  sequelize,
  Pedido,
  Cliente,
  Producto,
  ItemsPedido,
  
};
