"use strict";
const { models } = require("../SequelizeConnection");
const Producto = models.Producto;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    if(Producto.length !== 3){
    await queryInterface.bulkInsert(
      "Productos",
      [
        {
          
          descripcion: "postre",
          precioUnitario: 120,
          categoria:"Cocina",
          codigo: 1,
          habilitado: "si",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descripcion: "asado",
          precioUnitario: 300,
          categoria:"Parrilla",
          codigo: 2,
          habilitado: "no",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descripcion: "achuras",
          precioUnitario: 400,
          categoria:"Parrilla",
          codigo: 3,
          habilitado: "si",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descripcion: "tortilla",
          precioUnitario: 400,
          categoria:"Cocina",
          codigo: 3,
          habilitado: "si",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Productos");
  },
};
