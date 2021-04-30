"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Productos",
      [
        {
          // productoId:50,
          pedidoId:1,
          codigo: 1,
          descripcion:"postre",
          precioUnitario:120,
          habilitado: "si",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // productoId:51,
          pedidoId:1,
          descripcion:"asado",
          precioUnitario:300,
          codigo: 2,
          habilitado: "no",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // productoId:52,
          pedidoId:2,
          descripcion:"achuras",
          precioUnitario:400,
          codigo: 3,
          habilitado: "si",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Productos");
  },
};
