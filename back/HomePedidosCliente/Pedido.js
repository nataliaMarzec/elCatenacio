"use strict";
module.exports = function (sequelize, DataTypes) {
  const Pedidos = sequelize.define(
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
      tableName: "Pedidos",
      modelName: "Pedido",
      
    }
  );



  return Pedidos;
};