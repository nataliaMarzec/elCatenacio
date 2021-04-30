"use strict";
// const { Sequelize } = require("sequelize/types");
const { Pedido, Producto } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const ItemsPedido = sequelize.define(
    "ItemsPedido",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      pedidoId: {
        allowNull: true,
        // foreignKey: true,
        // unique: true,
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
        // unique: true,
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
        type: DataTypes.STRING,
        // references: {
        //   model: "Productos",
        //   // name: "descripcion",
        // },
      },
      cantidad: DataTypes.INTEGER,
      precioUnitario: {
        allowNull: true,
        type: DataTypes.INTEGER,
        // references: {
        //   model: "Productos",
        //   // name: "precioUnitario",
        // },
      },
      estado: DataTypes.STRING,
    },

    {
      tableName: "ItemsPedido",
      modelName: "ItemsPedido",
    }
  );

  return ItemsPedido;
};
