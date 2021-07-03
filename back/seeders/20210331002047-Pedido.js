"use strict";

const { Pedido } = require("../SequelizeConnection");
let date=new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pedidos",
      [
        {
          codigoPedido: 123,
          seccion: "carpa",
          observaciones: "cambio de domicilio",
          entregado: true,
          fecha: new Date("06/01/2021"),
          hora: new Date(date.setHours(16,43)),
          createdAt: new Date(),
          updatedAt: new Date(),

        },
        {
          codigoPedido: 124,
          seccion: "carpa",
          observaciones: "nueva dirección",
          entregado: false,
          fecha: new Date("06/05/2021"),
          hora: new Date(date.setHours(14,24)),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          codigoPedido: 125,
          seccion: "carpa",
          observaciones: "horario 22 hs",
          entregado: true,
          fecha: new Date("06/10/2021"),
          hora: new Date(date.getHours(),date.getMinutes()),
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
