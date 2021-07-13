"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Clientes",
      {
        id_cliente: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        dni: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nombre: {
          type: Sequelize.STRING,
        },
        apellido: {
          type: Sequelize.STRING,
        },
        direccion: {
          type: Sequelize.STRING,
        },
        telefono: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      { sync: { force: true } }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Clientes");
  },
};
