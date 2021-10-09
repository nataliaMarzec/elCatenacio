module.exports = (sequelize, DataTypes) => {

  const Rol = sequelize.define('Roles', {
    id_rol: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    rol: DataTypes.STRING,
    activo: DataTypes.BOOLEAN,
  }, {
    tableName: "Roles",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  // Role.associate = function(models) {
  //   Role.belongsToMany(models.Usuario, { as: "Usuarios", through: "usuario_rol", foreignKey: "role_id" });
  // };

  return Rol;
};

