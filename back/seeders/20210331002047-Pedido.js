"use strict";

const { Pedido } = require("../SequelizeConnection");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pedidos",
      [
        {
          codigoPedido: 123,
          seccion:"carpa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          codigoPedido: 124,
          seccion:"carpa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          codigoPedido: 125,
          seccion:"carpa",
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
