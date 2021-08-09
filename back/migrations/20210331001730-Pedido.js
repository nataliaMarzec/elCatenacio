"use strict";

const { Pedido } = require("../SequelizeConnection");
var moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Pedidos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        type: Sequelize.INTEGER,
      },
      clienteId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Clientes", key: "id_cliente", constraints:false, },
      },
      responsableId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "ResponsableDeMesa", key: "id_responsable", constraints:false, },
      },
      codigoPedido: {
        type: Sequelize.INTEGER,
      },
      seccion: {
        type: Sequelize.STRING,
      },
      observaciones: {
        type: Sequelize.STRING,
      },
      preparadoCocina:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
      },
      preparadoParrilla:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
      },
      entregado:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
      },
      fecha:{
        type:Sequelize.DATE,
        get() {
          return moment(this.getDataValue('fecha')).format('DD/MM/YYYY');
      }
      },
      hora:{
        type:Sequelize.DATE,
        get() {
          return moment(this.getDataValue('hora')).format('HH:mm');
      }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pedidos");
  },
};
