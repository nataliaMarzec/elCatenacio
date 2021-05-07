"use strict";

const { Pedido } = require("../SequelizeConnection");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Pedidos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      clienteId_pedido: {
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      codigoPedido: {
        type: Sequelize.INTEGER,
      },
      mesero: {
        type: Sequelize.STRING,
      },
      seccion: {
        type: Sequelize.STRING,
      },
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pedidos");
  },
};
