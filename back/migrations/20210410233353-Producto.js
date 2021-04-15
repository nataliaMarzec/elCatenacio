"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Productos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productoFk: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      codigo: {
        type: Sequelize.INTEGER,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      precio: {
        type: Sequelize.INTEGER,
      },
      habilitado: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Productos");
  },
};
