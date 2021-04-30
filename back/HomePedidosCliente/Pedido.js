"use strict";
const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const Pedido = sequelize.define(
    "Pedido",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      // pedidoId: {
      //   allowNull: true,
      //   foreignKey: true,
      //   type: DataTypes.UUID,
      //   // unique: true,
      //   onDelete:"SET NULL",
      //   onUpdate:"CASCADE",
      //   // constraints:false,
      // },
      clienteId_pedido: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      codigoPedido: DataTypes.INTEGER,
      mesero: DataTypes.STRING,
      seccion: DataTypes.STRING,
      cantidad:DataTypes.INTEGER,
      importeTotal: DataTypes.INTEGER,
      montoCobrado: DataTypes.INTEGER,
      pagado: DataTypes.STRING,
      //   status: {
      //     type: DataTypes.ENUM('activo', 'inactivo'),
      //     defaultValue: 'inactivo',
      //     allowNull: false
      // }
    },

    {
      tableName: "Pedidos",
      modelName: "Pedido",
      //   indexes: [
      //     {
      //       unique: true,
      //       fields: ['pedidoId']
      //     }
      // ]
    }
  );
  Pedido.associate = () => {
    Pedido.belongsTo(models.Cliente);
    Pedido.hasMany(models.Producto, {
      foreignKey: "productoId",
      as: "Productos",
      through: "ItemsPedido",
      targetKey:"cantidad"
    });

    //  Pedido.hasMany(sequelize.models.Producto)

    // Pedido.hasMany(models.Producto, {
    //   foreignKey: "productoFk",
    //   as: "Productos",
    //   allowNull: true,
    // });
    // Pedido.belongsToMany(models.Producto, {
    //   through: "RegistroPedidoProducto",
    //   as: "productos",
    //   foreignKey: "productoFk"
    // });
  };

  return Pedido;
};
