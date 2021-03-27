"use strict";
module.exports = function (sequelize, DataTypes) {
  const Menus = sequelize.define(
    "Menu",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
   
      codigo: DataTypes.INTEGER,
      descripcion: DataTypes.STRING,
      precio: DataTypes.INTEGER,
    },

    {
      tableName: "Menus",
      modelName: "Menu",
      
    }
  );



  return Menus;
};