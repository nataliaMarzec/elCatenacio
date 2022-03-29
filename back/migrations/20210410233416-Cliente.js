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
        nombre: {
          type: Sequelize.STRING,
        },
        direccion: {
          type: Sequelize.STRING,
        },
        telefono: {
          type: Sequelize.STRING,
        },
     
      },

      {
        sync: { force: true },
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Clientes");
  },
};
