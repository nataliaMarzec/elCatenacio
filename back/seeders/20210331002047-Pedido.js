"use strict";

const { Pedido } = require("../SequelizeConnection");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pedidos",
      [
        {
          // pedidoId:60,
          codigoPedido: 123,
          mesero:"Oscar Lopez",
          seccion:"carpa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // pedidoId:61,
          codigoPedido: 124,
          mesero:"Sofia Escudero",
          seccion:"carpa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // pedidoId:62,
          codigoPedido: 125,
          mesero:"David Escudero",
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
