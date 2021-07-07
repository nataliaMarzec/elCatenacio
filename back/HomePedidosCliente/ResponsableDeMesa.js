"use strict";

const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const ResponsableDeMesa = sequelize.define(
    "ResponsableDeMesa",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
     
      nombre: DataTypes.STRING,
      email: DataTypes.STRING,
    },

    {
      tableName: "ResponsablesDeMesa",
      modelName: "ResponsableDeMesa",
    }
  );

  return ResponsableDeMesa;
};
