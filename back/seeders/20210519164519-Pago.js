"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pagos",
      [
        {
          montoCobrado: 100,
          pagado: true,

        },
        {
          montoCobrado: 200,
          pagado: false,

        },
        {
          montoCobrado: 300,
          pagado: true,

        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pagos");

  },
};
