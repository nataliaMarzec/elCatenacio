"use strict";

const { Pedido } = require("../SequelizeConnection");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pedidos",
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
          descripcion: "postre",
          precio: 220,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          codigo: 125,
          descripcion: "gaseosas",
          precio: 215,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Pedidos", null, {});
  },
};
