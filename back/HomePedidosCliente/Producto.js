"use strict";
const { models } = require("../SequelizeConnection");

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
      // productoId: {
      //   allowNull: true,
      //   foreignKey: true,
      //   type: DataTypes.UUID,
      //   constraints:false,
      //   unique:true,
      //   onDelete:"SET NULL",
      //   onUpdate:"CASCADE",
      // },
      pedidoId: {
        allowNull: true,
        // foreignKey: true,
        // unique:true,
        type: DataTypes.INTEGER,
        constraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        references: {
          // unique: true,
          model: "Pedidos",
          key: "id",
          // constraints:false,
        },
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
      modelName: "Producto",
      //   indexes: [
      //     {
      //       unique: false,
      //       fields: ['productoId']
      //     }
      // ]
    }
  );

  Producto.associate = () => {
    Producto.belongTo(models.Pedido, {
      as: "Pedidos",
      foreignKey: "pedidoId",
      // unique: true,
      constraints: false,
      through: "ItemsPedido",
      targetKey: ["descripcion","precioUnitario"],
    });

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
  };
  return Producto;
};
