"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pagos",
      [
        {
          montoCobrado: 100,
          pagado: true,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          montoCobrado: 200,
          pagado: false,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          montoCobrado: 300,
          pagado: true,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pagos");

  },
};
