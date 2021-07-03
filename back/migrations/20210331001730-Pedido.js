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
        foreignKey: true,
        type: Sequelize.INTEGER,
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
      entregado:Sequelize.BOOLEAN,
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
