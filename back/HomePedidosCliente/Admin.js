"use strict";
const { Sequelize, Op, Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const Admin = sequelize.define(
    "Admin",
    {
      id_admin: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      rol: {
        type: DataTypes.STRING,
        defaultValue: "admin",
      },

    },

    {
      tableName: "Admin",
      modelName: "Admin",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );


  return Admin;
};
