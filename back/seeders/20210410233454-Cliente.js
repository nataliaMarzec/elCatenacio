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
        username:"brand1",
        email: "b_adam@gmail.com",

      },
      {
        nombre: "Samira",
        direccion: "Rivadavia 675",
        telefono: "2478101010",
        username:"sam3",
        email: "samirastone@gmail.com",

      },
      {
        nombre: "Diego",
        direccion: "Jose Marmol 543",
        telefono: "2478123456",
        username:"die8",
        email: "diegolopez@gmail.com",
        
   
      },
    ],
    {}
  );
},
down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("Clientes");
},
};