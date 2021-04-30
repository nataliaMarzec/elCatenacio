"use strict";
module.exports = {
  up: async (migration, Sequelize, done) => {
    await migration
      .createTable(
        "Clientes",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          cuit: {
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
      )
      .complete(done);
  },
  down: async (migration, Sequelize) => {
    await migration.dropTable("Clientes").complete(done);
  },
};
