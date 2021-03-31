'use strict'

require('dotenv').config();


const Sequelize = require('sequelize');
const PedidoModel=require('./HomePedidosCliente/Pedido');


const sequelize = process.env.DB_URL
    ? 
      new Sequelize(process.env.DB_URL)
    : 
      new Sequelize(
          process.env.DB,
          process.env.DB_USER,
          process.env.DB_PASS,
          {
              host: process.env.DB_HOST,
              dialect: "mysql",
              operatorsAliases:'false',
                  pool: {
                  max: 10,
                  min: 0,
                  acquire: 30000,
                  idle: 10000
                }
          }
      );

var models={}
models=sequelize
models=Sequelize

const Pedido= PedidoModel(sequelize,Sequelize)


sequelize.authenticate()
 .then(() => {
   console.log('BD_CONECTADA!!');
 })
 .catch(err => {
   console.error('ERROR,_BD_NO_CONECTADA:', err);
 });

sequelize.sync({force:false})
// sequelize.sync({force:true})
  .then(() => {
    console.log(`Base de datos y tablas creadas, modelos sincronizados!`)
  })




module.exports = {
  sequelize,
  Pedido,
  
};
