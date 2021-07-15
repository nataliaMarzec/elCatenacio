"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ItemsPedido", {
      codigo: {
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
        unique:false,
        constraints:false,
        references: { model: "Pedidos", key: "id" , constraints:false},

      },
      productoId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Productos", key: "id" },
        onDelete: "CASCADE",
      },
      cantidad: {
        type: Sequelize.INTEGER,
      },
      importe: {
        type: Sequelize.INTEGER,
      },
      observaciones: Sequelize.STRING,
      listo:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ItemsPedido");
  },
};
