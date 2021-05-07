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
        references: { model: "Productos", key: "id" },
        onDelete: "CASCADE",
      },
      cantidad: Sequelize.INTEGER,
      importeTotal: {
        type: Sequelize.INTEGER,
      },
      montoCobrado: {
        type: Sequelize.INTEGER,
      },
      pagado: {
        type: Sequelize.STRING,
      },
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
