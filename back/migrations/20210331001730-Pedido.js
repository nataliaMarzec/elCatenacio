"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Pedidos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clienteId_pedido: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      codigo: {
        type: Sequelize.INTEGER,
      },
      mesero: {
        type: Sequelize.STRING,
      },
      seccion: {
        type: Sequelize.STRING,
      },
      cantidad: {
        type: Sequelize.INTEGER,
      },
      precioUnitario: {
        type: Sequelize.INTEGER,
      },
      importeTotal: {
        type: Sequelize.INTEGER,
      },
      montoCobrado: {
        type: Sequelize.INTEGER,
      },
      pagado: {
        type: Sequelize.STRING,
      },
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pedidos");
  },
};
