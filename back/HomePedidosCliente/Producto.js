"use strict";
const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
  const Producto = sequelize.define(
    "Productos",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      descripcion: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      precioUnitario: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      codigo: DataTypes.INTEGER,
      habilitado: DataTypes.STRING,
    
    },

    {
      tableName: "Productos",
      modelName: "Productos",
     
    }
  );

  // Producto.associate = () => {
  //   Producto.belongTo(models.Pedido, {
  //     as: "Pedidos",
  //     foreignKey: "pedidoId_producto",
  //     // unique: true,
  //     constraints: false,
  //     // through: "ItemsPedido",
  //     targetKey: ["descripcion","precioUnitario"],
  //   });

    //   Producto.belongsTo(models.Pedido, {
    //     through: "ItemsPedido",
    //     as: "Pedidos",
    //     foreignKey: "pedidoId",
    //     constraints: false,
    //     // foreignKey: {
    //     //   fieldName: "pedidoId",
    //     //   allowNull: true,
    //     //   as: "Pedidos",
    //     // },
    //     // targetKey: "pedidoId",
    //   });

    //  Producto.belongsTo(models.Pedido,{
    //     foreignKey: "id",
    //     as: "productos",

    //   })
    // Producto.belongsTo(models.Pedido);
    // Producto.belongsToMany(models.Pedido, {
    //   through: "RegistroPedidoProducto",
    //   as: "pedidos",
    //   foreignKey: "pedidoFk"
    // });
  // };
  return Producto;
};
