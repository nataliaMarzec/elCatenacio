"use strict";

const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const ItemsPedido = sequelize.define(
    "ItemsPedido",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      pedidoId: {
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
        // onDelete: "SET NULL",
        // onUpdate: "CASCADE",
      },
      productoId: {
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
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
