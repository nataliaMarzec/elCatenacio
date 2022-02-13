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
        nombre: {
          type: Sequelize.STRING,
          allowNull: true,
          validate: {
            notNull: {
              msg: "Por favor completa tu nombre",
            },
          },
          isAlpha: {
            args: true,
            msg: "El nombre solo puede contener letras",
          },
          len: {
            args: [2, 255],
            msg: "El nombre tiene que ser entre 2 y 255 caracteres",
          },
        },
        direccion: {
          type: Sequelize.STRING,
        },
        telefono: {
          type: Sequelize.STRING,
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
