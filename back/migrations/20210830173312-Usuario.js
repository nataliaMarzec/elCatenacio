"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Usuarios",
      {
        id_usuario: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        responsableId: {
          allowNull: true,
          foreignKey: true,
          type: Sequelize.INTEGER,
          references: { model: "ResponsableDeMesa", key: "id_responsable" },
        },
        clienteId: {
          allowNull: true,
          foreignKey: true,
          type: Sequelize.INTEGER,
          references: { model: "Clientes", key: "id_cliente" },
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              msg: "El email tiene que ser un correo valido"
            }
          }
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [6, 255],
              msg: "La contraseña tiene que tener minimamente 6 caracteres"
            }
          }
        },
        rol: {
          type: Sequelize.STRING,
        },
        registrado: {
          type: Sequelize.BOOLEAN,
        },
      },
      {
        sync: { force: true },
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Usuarios");
  },
};
