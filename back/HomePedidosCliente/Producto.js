"use strict";
const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const Producto = sequelize.define(
    "Productos",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      imagenId: {
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Imagen", key: "id_imagen" },
      },
      descripcion: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      precioUnitario: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      categoria: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      codigo: DataTypes.INTEGER,
      habilitado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

    },

    {
      tableName: "Productos",
      modelName: "Productos",
      timestamps: false,
      createdAt: false,
      updatedAt: false,

    }
  );


  return Producto;
};
