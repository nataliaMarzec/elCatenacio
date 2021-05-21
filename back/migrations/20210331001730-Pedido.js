"use strict";

const { Pedido } = require("../SequelizeConnection");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Pedidos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        type: Sequelize.INTEGER,
      
      },
      clienteId: {
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
      // indexes:[
      //   {
      //       unique: true,
      //       fields: ['pedidoId']
      //   },
      // ]
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pedidos");
  },
};
