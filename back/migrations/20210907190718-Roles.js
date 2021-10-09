"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Roles", {
      id_rol: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      rol: Sequelize.STRING,
      activo:Sequelize.BOOLEAN,
    },
    {
      sync: { force: true },
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Roles");
  },
};
