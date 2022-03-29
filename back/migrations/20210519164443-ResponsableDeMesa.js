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
      direccion:Sequelize.STRING,
      telefono: Sequelize.INTEGER,
    },
      {
        sync: { force: true },
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ResponsableDeMesa");
  },
};
