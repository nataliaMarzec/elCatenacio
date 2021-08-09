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
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Clientes", key: "id_cliente", constraints:false, },
      },
      responsableId: {
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: { model: "ResponsableDeMesa", key: "id_responsable", constraints:false, },
      },
      codigoPedido: DataTypes.INTEGER,
      seccion: DataTypes.STRING,
      observaciones: DataTypes.STRING,
      preparadoCocina:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
      },
      preparadoParrilla:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
      },
      entregado:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
      },
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
