"use strict";
const { Sequelize } = require("sequelize/types");

module.exports = function (sequelize, DataTypes) {
  const RegistroPedidoProducto = sequelize.define(
    "RegistroPedidoProducto",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productoFk: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      pedidoFk: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      estado:DataTypes.STRING,
      
    },

    {
      tableName: "RegistroPedidoProducto",
      modelName: "RegistroPedidoProducto",
    }
  );

  return RegistroPedidoProducto;
};
