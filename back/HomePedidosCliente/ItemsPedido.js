"use strict";

const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const ItemsPedido = sequelize.define(
    "ItemsPedido",
    {
      codigo: {
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
        references: { model: "Pedidos", key: "id", constraints:false, },
      },
      productoId: {
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Productos", key: "id" },
        onDelete: "CASCADE",
      },
      cantidad: {
        type: DataTypes.INTEGER,
      },
      importe: DataTypes.INTEGER,
      observaciones: DataTypes.STRING,
      listoCocina:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
      },
      listoParrilla:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
      },
    },

    {
      tableName: "ItemsPedido",
      modelName: "ItemsPedido",
    }
  );

  return ItemsPedido;
};
