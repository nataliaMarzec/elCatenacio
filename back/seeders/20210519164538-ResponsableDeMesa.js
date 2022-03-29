"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ResponsableDeMesa",
      [
        {
          nombre:"Carlos Alonso",
          direccion:"cordab 111",
          telefono:24786655,
        },
        {
          nombre:"Sofia Escudero",
          direccion:"jujuy 111",
          telefono:24786655,
        },
        {
          nombre:"David Escudero",
          direccion:"lopez gomara 111",
          telefono:24786655,
        },
        {
          nombre:"marina",
          direccion:"lopez gomara 31",
          telefono:24786655,
        },
        {
          nombre:"camila",
          direccion:"españa 111",
          telefono:24786655,
        },
        {
          nombre:"Pedro",
          direccion:"marmol 111",
          telefono:24786655,
        },
        
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ResponsableDeMesa");

  },
};
