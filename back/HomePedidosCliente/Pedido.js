"use strict";
const { models } = require("../SequelizeConnection");
var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const Pedido = sequelize.define(
    "Pedidos",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,

      },
      clienteId: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      codigoPedido: DataTypes.INTEGER,
      seccion: DataTypes.STRING,
      observaciones: DataTypes.STRING,
      entregado: DataTypes.BOOLEAN,
      fecha: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('fecha')).format('DD/MM/YYYY');
        }
      },
      hora: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('hora')).format('HH:mm');
        }
      }

    },

    {
      tableName: "Pedidos",
      modelName: "Pedidos",
    }
  );

  return Pedido;
};
