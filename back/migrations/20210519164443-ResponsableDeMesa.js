"use strict";


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ResponsableDeMesa", {
      id_responsable: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      rolResponsableId: {
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Roles", key: "id_rol" },
      },
      nombre: Sequelize.STRING,
      direccion:Sequelize.STRING,
      telefono: Sequelize.INTEGER,
      username:Sequelize.STRING,
      email: Sequelize.STRING,
      rol: Sequelize.STRING,
      password:Sequelize.STRING,
      registrado:Sequelize.BOOLEAN,
    },
      {
        sync: { force: true },
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ResponsableDeMesa");
  },
};
