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
      rolResponsableId: {
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Roles", key: "id_rol" },
      },
      nombre: DataTypes.STRING,
      direccion:DataTypes.STRING,
      telefono: DataTypes.INTEGER,
      username:DataTypes.STRING,
      email: DataTypes.STRING,
      rol: DataTypes.STRING,
      password:DataTypes.STRING,
      registrado:DataTypes.BOOLEAN,
     
    },

    {
      tableName: "ResponsableDeMesa",
      modelName: "ResponsableDeMesa",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return ResponsableDeMesa;
};
