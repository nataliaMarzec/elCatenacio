"use strict";
const timezone = 'America/Argentina/Buenos_Aires';
require('moment').tz.setDefault(timezone)


require("dotenv").config();
const Sequelize = require("sequelize");
const PedidoModel = require("./HomePedidosCliente/Pedido");
const ProductoModel = require("./HomePedidosCliente/Producto");
const ItemsPedidoModel = require("./HomePedidosCliente/ItemsPedido");
const PagoModel = require("./HomePedidosCliente/Pago")
const ResponsableDeMesaModel = require("./HomePedidosCliente/ResponsableDeMesa")
const ClienteModel = require("./HomeClientes/Cliente");
const ImagenModel = require("./HomePedidosCliente/Imagen")
const UsuarioModel = require("./HomeUsuario/Usuario")
const RolModel = require("./HomeUsuario/Roles")


const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: "false",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    tableOptions: {
      ENGINE: 'innodb',
    },
    timezone: timezone


  });

const models = {};
models.Sequelize = Sequelize;
models.sequelize = sequelize;

models.Producto = ProductoModel(sequelize, Sequelize);
models.ResponsableDeMesa = ResponsableDeMesaModel(sequelize, Sequelize)
models.ItemsPedido = ItemsPedidoModel(sequelize, Sequelize);
models.Pedido = PedidoModel(sequelize, Sequelize);
models.Cliente = ClienteModel(sequelize, Sequelize);
models.Pago = PagoModel(sequelize, Sequelize)
models.Imagen = ImagenModel(sequelize, Sequelize)
models.Usuario = UsuarioModel(sequelize, Sequelize)
models.Rol = RolModel(sequelize, Sequelize)




models.Producto.hasOne(models.ItemsPedido, {
  foreignKey: "productoId",
  as: "ItemsPedido",
  onDelete: "SET NULL",
  onUpdate: "SET NULL"
});

models.ItemsPedido.belongsTo(models.Producto, {
  foreignKey: "productoId",
  as: "Productos",
  constraints: false,
});

models.Pedido.hasMany(models.ItemsPedido, {
  as: "ItemsPedido",
  foreignKey: "pedidoId",
  sourceKey: "id",
  constraints: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE"

});
models.ItemsPedido.belongsTo(models.Pedido, {
  as: "Pedidos",
  foreignKey: "pedidoId",
  targetKey: "id",
  constraints: false,
  onDelete: "SET NULL",
  onUpdate: "SET NULL"
});

models.ResponsableDeMesa.hasMany(models.Pedido, {
  as: "Pedidos",
  foreignKey: "responsableId",
  sourceKey: "id_responsable",
  constraints: false,
  onDelete: "SET NULL",
  onUpdate: "CASCADE"

});
models.Pedido.belongsTo(models.ResponsableDeMesa, {
  as: "ResponsableDeMesa",
  foreignKey: "responsableId",
  targetKey: "id_responsable",
  constraints: false,

});

models.Cliente.hasMany(models.Pedido, {
  as: "Pedidos",
  foreignKey: "clienteId",
  sourceKey: "id_cliente",
  constraints: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE"

});
models.Pedido.belongsTo(models.Cliente, {
  as: "Clientes",
  foreignKey: "clienteId",
  targetKey: "id_cliente",
  constraints: false,
});

models.Imagen.hasOne(models.Producto, {
  foreignKey: "imagenId",
  as: "Productos",
  onDelete: "SET NULL",
  onUpdate: "SET NULL"
});

models.Producto.belongsTo(models.Imagen, {
  foreignKey: "imagenId",
  as: "Imagen",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  constraints: false,
});

models.Rol.hasMany(models.ResponsableDeMesa, {
  as: "ResponsableDeMesa",
  foreignKey: "rolResponsableId",
  sourceKey: "id_rol",
  constraints: false,
  onDelete: "SET NULL",
  onUpdate: "CASCADE"

});
models.ResponsableDeMesa.belongsTo(models.Rol, {
  as: "Roles",
  foreignKey: "rolResponsableId",
  targetKey: "id_rol",
  constraints: false,
});

models.Rol.hasMany(models.Cliente, {
  as: "Clientes",
  foreignKey: "rolClienteId",
  sourceKey: "id_rol",
  constraints: false,
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});
models.Cliente.belongsTo(models.Rol, {
  as: "Roles",
  foreignKey: "rolClienteId",
  targetKey: "id_rol",
  constraints: false,
});



models.ResponsableDeMesa.hasOne(models.Usuario, {
  foreignKey: "responsableId",
  as: "Usuarios",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  constraints: false,
});

models.Usuario.belongsTo(models.ResponsableDeMesa, {
  foreignKey: "responsableId",
  as: "ResponsableDeMesa",
  onDelete: "CASCADE",
  // onUpdate: "CASCADE",
  constraints: false,
});


sequelize
  .authenticate()
  .then(() => {
    console.log("BD_CONECTADA!!");
  })
  .catch((err) => {
    console.error("ERROR,_BD_NO_CONECTADA:", err);
  });

sequelize.sync()
// sequelize.sync({ force: true })
  .then(() => {
    console.log(`Base de datos y tablas creadas, modelos sincronizados!`);
  });

module.exports = {
  models,
  sequelize,
};
