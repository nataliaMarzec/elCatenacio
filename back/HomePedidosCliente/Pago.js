"use strict";

const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const Pago = sequelize.define(
    "Pago",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },

      montoCobrado: DataTypes.INTEGER,
      pagado: DataTypes.BOOLEAN,
    },

    {
      tableName: "Pagos",
      modelName: "Pago",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return Pago;
};
