'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let password = bcrypt.hashSync("catenacio21", Number.parseInt(authConfig.rounds));
    await queryInterface.bulkInsert(
      "Usuarios",
      [
        {
        username: "cate21",
        email: "cate21@gmail.com",
        password: password,
        rol:"ADMIN",
        registrado:true,
      },
    ],
    {}
  );
},
down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("Clientes");
},
};
