"use strict";
const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const Pedido = sequelize.define(
    "Pedidos",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        type: DataTypes.INTEGER,

      },
      clienteId: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      codigoPedido: DataTypes.INTEGER,
      seccion: DataTypes.STRING,
      observaciones:DataTypes.STRING
    },

    {
      tableName: "Pedidos",
      modelName: "Pedidos",
    }
  );

  return Pedido;
};
