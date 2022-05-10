"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Mesas", {
      id_mesa: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    responsableId: {
        allowNull: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
        references: { model: "ResponsableDeMesa", key: "id_responsable" },
    },
    cantidadPersonas: {
        allowNull: true,
        type: Sequelize.INTEGER,
    },
    habilitada: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    },
      {
        sync: { force: true },
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Mesas");
  },
};

