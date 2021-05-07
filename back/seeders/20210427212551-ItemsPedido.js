"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ItemsPedido",
      [
        {
          pedidoId: 1,
          productoId: 1,
          estado: "true",
          cantidad:3,
          importeTotal:400,
          montoCobrado:400,
          pagado:"si",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pedidoId: 1,
          productoId: 2,
          estado: "true",
          cantidad:3,
          importeTotal:400,
          montoCobrado:400,
          pagado:"si",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pedidoId: 2,
          productoId: 3,
          estado: "true",
          cantidad:3,
          importeTotal:400,
          montoCobrado:400,
          pagado:"no",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ItemsPedido", null, {});
  },
};
