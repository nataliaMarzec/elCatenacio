"use strict";
const { Pedido, Producto } = require("../SequelizeConnection");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ItemsPedido", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pedidoId: {
        allowNull: true,
        // foreignKey: true,
        type: DataTypes.INTEGER,
        // constraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        references: {
          // unique: true,
          model: "Pedidos",
          key: "id",
          // constraints: false,
        },
      },
      productoId: {
        allowNull: true,
        // foreignKey: true,
        type: DataTypes.INTEGER,
        // constraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        references: {
          // unique: true,
          model: "Productos",
          key: "id",
          // constraints: false,
        },
      },
      descripcion: {
        allowNull: true,
        type: Sequelize.STRING,
        // references: {
        //   model: "Productos",
        //   // name: "descripcion",
        // },
      },
      cantidad: Sequelize.INTEGER,
      precioUnitario: {
        allowNull: true,
        type: Sequelize.STRING,
        // references: {
        //   model: "Productos",
        //   // name: "precioUnitario",
        // },
      },
      estado: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ItemsPedido");
  },
};
