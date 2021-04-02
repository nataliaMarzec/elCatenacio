"use strict";

const { Pedido } = require("../SequelizeConnection");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pedidos",
      [
        {
          codigo: 123,
          descripcion: "asado",
          precio: 300,
          habilitado:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          codigo: 124,
          descripcion: "postre",
          precio: 220,
          habilitado:true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          codigo: 125,
          descripcion: "gaseosas",
          precio: 215,
          habilitado:false,
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
