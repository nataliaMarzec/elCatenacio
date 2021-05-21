"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert(
    //   "ItemsPedido",
    //   [
    //     {
    //       pedidoId: 1,
    //       productoId: 1,
    //       cantidad:3,
    //       importe:400,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       pedidoId: 1,
    //       productoId: 2,
    //       cantidad:3,
    //       importe:400,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       pedidoId: 2,
    //       productoId: 3,
    //       cantidad:3,
    //       importe:400,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ItemsPedido", null, {});
  },
};
