"use strict";
const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const Pedido = sequelize.define(
    "Pedidos",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique:true,
      },
      clienteId_pedido: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      codigoPedido: DataTypes.INTEGER,
      mesero: DataTypes.STRING,
      seccion: DataTypes.STRING,
    },

    {
      tableName: "Pedidos",
      modelName: "Pedidos",
    }
  );
  Pedido.associate = () => {
    Pedido.belongsTo(models.Cliente);

    // Pedido.belongsToMany(models.Producto, {
    //   through: "RegistroPedidoProducto",
    //   as: "productos",
    //   foreignKey: "productoFk"
    // });
  };

  return Pedido;
};
