"use strict";

const { Pedido } = require("../SequelizeConnection");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Pagos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      montoCobrado: Sequelize.INTEGER,
      pagado: Sequelize.BOOLEAN,
    },
    {
      sync: { force: true },
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pagos");
  },
};
