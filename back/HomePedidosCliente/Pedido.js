"use strict";

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
      // pedidoFk: {
      //   allowNull: false,
      //   foreignKey: true,
      //   type: DataTypes.INTEGER,
      // },
      clienteId_pedido: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      codigo: DataTypes.INTEGER,
      mesero: DataTypes.STRING,
      seccion: DataTypes.STRING,
      cantidad: DataTypes.INTEGER,
      precioUnitario: DataTypes.INTEGER,
      importeTotal: DataTypes.INTEGER,
      montoCobrado: DataTypes.INTEGER,
      pagado: DataTypes.STRING,
    },

    {
      tableName: "Pedidos",
      modelName: "Pedido",
    }
  );

  Pedido.associate = (models) => {
    Pedido.belongsTo(models.Cliente);
    Pedido.hasMany(models.Producto, {
      foreignKey: "productoFk",
      as: "Productos",
    });
    // Pedido.belongsToMany(models.Producto, {
    //   through: "RegistroPedidoProducto",
    //   as: "productos",
    //   foreignKey: "productoFk"
    // });

  };
  

  return Pedido;
};
