"use strict";
const { models } = require("../SequelizeConnection");

module.exports = function (sequelize, DataTypes) {
    const Mesa = sequelize.define(
        "Mesas",
        {
            id_mesa: {
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
            cantidadPersonas: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            habilitada: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            tableName: "Mesas",
            modelName: "Mesas",
            timestamps: false,
            createdAt: false,
            updatedAt: false,

        }
    );


    return Mesa;
};
