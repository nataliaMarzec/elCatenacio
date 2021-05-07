"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn("Productos", "pedidoId", {
    //   type: Sequelize.INTEGER,
    //   references: { model: "Pedidos", key: "id", foreingKey: "pedidoId" },
    //   onUpdate: "CASCADE",
    //   onDelete: "SET NULL",
    //   allowNull: true,
    // });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Productos", "pedidoId");
  },
};
