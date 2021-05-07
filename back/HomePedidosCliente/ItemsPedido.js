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
      },
      productoId: {
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Productos", key: "id" },
        onDelete: "CASCADE",
      },
      cantidad:DataTypes.INTEGER,
      importeTotal: DataTypes.INTEGER,
      montoCobrado: DataTypes.INTEGER,
      pagado: DataTypes.STRING,
      //   status: {
      //     type: DataTypes.ENUM('activo', 'inactivo'),
      //     defaultValue: 'inactivo',
      //     allowNull: false
      // }
      estado: DataTypes.STRING,
    },

    {
      tableName: "ItemsPedido",
      modelName: "ItemsPedido",
    }
  );

  return ItemsPedido;
};
