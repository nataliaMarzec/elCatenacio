"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Menus",
      [
        {
          codigo: 123,
          descripcion: "achuras",
          precio: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          codigo: 124,
          descripcion: "helado",
          precio: 220,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          codigo: 125,
          descripcion: "gasiosa",
          precio: 215,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Menus", null, {});
  },
};
