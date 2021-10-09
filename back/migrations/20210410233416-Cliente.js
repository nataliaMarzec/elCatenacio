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
        rolClienteId: {
          allowNull: true,
          foreignKey: true,
          type: Sequelize.INTEGER,
          references: { model: "Roles", key: "id_rol" },
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
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
        },
        rol: {
          type: Sequelize.STRING,
          defaultValue: "cliente",
        },
        registrado:Sequelize.BOOLEAN,

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
