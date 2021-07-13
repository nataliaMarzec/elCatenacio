"use strict";


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ResponsableDeMesa", {
      id_responsable: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },

      nombre: Sequelize.STRING,
      apellido:Sequelize.STRING,
      email: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ResponsableDeMesa");
  },
};
