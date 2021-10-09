"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Imagen",
      {
        id_imagen: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        titulo: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        tipo: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        descripcion: {
          type: Sequelize.STRING,
        },
        imagenPath: {
          type: Sequelize.STRING,
        },
        data: {
          type: Sequelize.BLOB("long"),
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
    await queryInterface.dropTable("Imagen");
  },
};
