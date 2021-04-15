"use strict";
const { Pedido } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const Producto = sequelize.define(
    "Producto",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productoFk: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      codigo: DataTypes.INTEGER,
      descripcion: DataTypes.STRING,
      precio: DataTypes.INTEGER,
      habilitado: DataTypes.STRING,
    },

    {
      tableName: "Productos",
      modelName: "Producto",
    }
  );
  Producto.associate = (models) => {
    Producto.Pedido=Producto.belongsTo(models.Pedido)
    // Producto.belongsTo(models.Pedido);
    // Producto.belongsToMany(models.Pedido, {
    //   through: "RegistroPedidoProducto",
    //   as: "pedidos",
    //   foreignKey: "pedidoFk"
    // });

  };
  return Producto;
};
