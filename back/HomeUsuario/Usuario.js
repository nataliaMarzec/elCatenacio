"use strict";
const { Sequelize, Op, Model } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const Usuario = sequelize.define(
    "Usuarios",
    {
      id_usuario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      responsableId: {
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: { model: "ResponsableDeMesa", key: "id_responsable" },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefono: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "El email tiene que ser un correo valido"
          }
        }

      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: "La contraseña tiene que tener minimamente 6 caracteres"
          }
        }
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      registrado: {
        type: DataTypes.BOOLEAN,
      },

    },

    {
      tableName: "Usuarios",
      modelName: "Usuarios",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  // Usuario.associate = function(models) {
  //   User.hasMany(models.Post, { as: "posts", foreignKey: "userId" });
  //   User.belongsToMany(models.Role, { as: "roles", through: "user_role", foreignKey: "user_id" });
  // };

  Usuario.isAdmin = function (roles) {
    let tmpArray = [];
    roles.forEach(role => tmpArray.push(role.role));

    return tmpArray.includes('admin');
  }


  return Usuario;
};
