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
          username:"carlos12",
          email:"carlos@hotmail.com",
          password:"carlos1212",
          rol:"RESPONSABLE"

        },
        {
          nombre:"Sofia Escudero",
          direccion:"jujuy 111",
          telefono:24786655,
          username:"sofia12",
          email:"sofia@hotmail.com",
          password:"sofia1212",
          rol:"RESPONSABLE"
        },
        {
          nombre:"David Escudero",
          direccion:"lopez gomara 111",
          telefono:24786655,
          username:"david12",
          email:"david@hotmail.com",
          password:"david1212",
          rol:"RESPONSABLE"

        },
        {
          nombre:"marina",
          direccion:"lopez gomara 31",
          telefono:24786655,
          username:"marina12",
          email:"marina@hotmail.com",
          password:"marina12",
          rol:"RESPONSABLE"

        },
        {
          nombre:"camila",
          direccion:"españa 111",
          telefono:24786655,
          username:"camila12",
          email:"camila@hotmail.com",
          password:"camila12",
          rol:"RESPONSABLE"

        },
        {
          nombre:"Pedro",
          direccion:"marmol 111",
          telefono:24786655,
          username:"pedro12",
          email:"pedro@hotmail.com",
          password:"pedro1212",
          rol:"RESPONSABLE"

        },
        
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ResponsableDeMesa");

  },
};
