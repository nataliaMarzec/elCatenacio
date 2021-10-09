"use strict";

const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const Imagen = sequelize.define(
    "Imagen",
    {
      id_imagen: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      imagenPath: DataTypes.STRING,
      data: {
        type: DataTypes.BLOB("long"),
      },

    },

    {
      tableName: "Imagen",
      modelName: "Imagen",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return Imagen;
};
