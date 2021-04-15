"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Productos",
      [
        {
          productoFk:10,
          codigo: 1,
          descripcion: "asado",
          precio: 500,
          habilitado: "si",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productoFk:11,
          codigo: 2,
          descripcion: "postre",
          precio: 200,
          habilitado: "no",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productoFk:12,
          codigo: 3,
          descripcion: "gaseosa",
          precio: 200,
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
