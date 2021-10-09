"use strict";
const { Sequelize, Op, Model } = require("sequelize");
const { Pedido } = require("../SequelizeConnection");
module.exports = function (sequelize, DataTypes) {
  const Cliente = sequelize.define(
    "Clientes",
    {
      id_cliente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      rolClienteId: {
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Roles", key: "id_rol"},
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Por favor completa tu nombre",
          },
        },
        isAlpha: {
          args: true,
          msg: "El nombre solo puede contener letras",
        },
        len: {
          args: [2, 255],
          msg: "El nombre tiene que ser entre 2 y 255 caracteres",
        },
      },
      direccion: DataTypes.STRING,
      telefono: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      rol:{
        type:DataTypes.STRING,
        defaultValue:"CLIENTE",
      },
      registrado:DataTypes.BOOLEAN,

    },

    {
      tableName: "Clientes",
      modelName: "Clientes",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    
    
    }
  );


  return Cliente;
};
