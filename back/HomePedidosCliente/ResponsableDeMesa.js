"use strict";

const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const ResponsableDeMesa = sequelize.define(
    "ResponsableDeMesa",
    {
      id_responsable: {
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
      tableName: "ResponsableDeMesa",
      modelName: "ResponsableDeMesa",
    }
  );

  return ResponsableDeMesa;
};
