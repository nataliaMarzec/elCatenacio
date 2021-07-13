"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ResponsableDeMesa",
      [
        {
          nombre:"Carlos Alonso",
          email:"carlos16@hotmail.com",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre:"Sofia Escudero",
          email:"sofia02@gmail.com",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre:"David Escudero",
          email:"david13@gmail.com",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ResponsableDeMesa");

  },
};
