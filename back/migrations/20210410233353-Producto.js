"use strict";

const { Producto } = require("../SequelizeConnection");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Productos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
        allowNull:true,
        // foreignKey: true,
        type: DataTypes.INTEGER,
        // constraints:false,
        onDelete:"SET NULL",
        onUpdate:"CASCADE",
        references: {
          // unique: true,
          model:"Pedidos",
          key: "id",
          // constraints:false,
        },
      },
      descripcion:{
      allowNull:true,
      type:Sequelize.STRING,
    },
      precioUnitario:{
        allowNull:true,
        type:Sequelize.INTEGER,
      },
      codigo: {
        type: Sequelize.INTEGER,
      },
      habilitado: {
        type: Sequelize.STRING,
      },
    })
    // .then(() => {
    //   queryInterface.addConstraint('Productos', ['pedidoId'], {
    //     type: 'foreign key',
    //     references: {
    //       name: 'Pedidos_ibfk_1',
    //       table: 'Pedidos',
    //       field: 'pedidoId'
    //     },
    //   })
    // })
;
    // await queryInterface.addColumn("Productos", "pedidoId", {
    //   type: Sequelize.INTEGER,
    //   references: { model: "Pedidos", key: "id", foreingKey: "pedidoId",constraints:false  },
    //   onUpdate: "CASCADE",
    //   onDelete: "SET NULL",
    //   allowNull: true,
    // });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Productos");
  },
};
