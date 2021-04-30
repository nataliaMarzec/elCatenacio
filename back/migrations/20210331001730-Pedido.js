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
      },
      // pedidoId: {
      //   allowNull: true,
      //   foreignKey: true,
      //   unique:true,
      //   type: DataTypes.UUID,
      // },
      clienteId_pedido: {
        foreignKey: true,
        type: DataTypes.INTEGER,
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
      cantidad:Sequelize.INTEGER,
      importeTotal: {
        type: Sequelize.INTEGER,
      },
      montoCobrado: {
        type: Sequelize.INTEGER,
      },
      pagado: {
        type: Sequelize.STRING,
      },
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pedidos");
  },
};
