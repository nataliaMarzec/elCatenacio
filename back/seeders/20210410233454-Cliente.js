"use strict";


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Clientes",
      [
        {
        cuit: "27350268263",
        nombre: "Brandon",
        apellido: "Adam",
        direccion: "Jujuy 245",
        telefono: "2478302010",
        email: "b_adam@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cuit: "27308887773",
        nombre: "Samira",
        apellido: "Stone",
        direccion: "Rivadavia 675",
        telefono: "2478101010",
        email: "samirastone@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cuit: "23308887771",
        nombre: "Diego",
        apellido: "Lopez",
        direccion: "Jose Marmol 543",
        telefono: "2478123456",
        email: "diegolopez@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
   
      },
    ],
    {}
  );
},
down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("Clientes");
},
};