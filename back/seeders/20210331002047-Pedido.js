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
          observaciones:"cambio de domicilio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          codigoPedido: 124,
          seccion:"carpa",
          observaciones:"nueva dirección",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          codigoPedido: 125,
          seccion:"carpa",
          observaciones:"horario 22 hs",
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
