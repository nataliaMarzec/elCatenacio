"use strict";

const { Pedido, Producto } = require("../SequelizeConnection");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ItemsPedido",
      [
        {
          pedidoId: 1,
          productoId: 1,
          descripcion: "postre",
          cantidad: 3,
          precioUnitario: "200",
          estado: "true",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pedidoId: 1,
          productoId: 2,
          descripcion: "asado",
          cantidad: 2,
          precioUnitario: "500",
          estado: "true",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pedidoId: 2,
          productoId: 3,
          descripcion: "achuras",
          cantidad: 1,
          precioUnitario: "400",
          estado: "true",
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
