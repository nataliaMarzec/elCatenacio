"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ItemsPedido", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      pedidoId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      productoId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      estado: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ItemsPedido");
  },
};
