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
      descripcion: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      precioUnitario: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      codigo: DataTypes.INTEGER,
      habilitado: DataTypes.STRING,
    
    },

    {
      tableName: "Productos",
      modelName: "Productos",
     
    }
  );

  
  return Producto;
};
