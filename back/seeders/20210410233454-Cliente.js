"use strict";


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Clientes",
      [
        {
        nombre: "Brandon",
        direccion: "Jujuy 245",
        telefono: "2478302010",
      },
      {
        nombre: "Samira",
        direccion: "Rivadavia 675",
        telefono: "2478101010",
      },
      {
        nombre: "Diego",
        direccion: "Jose Marmol 543",
        telefono: "2478123456",
   
      },
    ],
    {}
  );
},
down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("Clientes");
},
};