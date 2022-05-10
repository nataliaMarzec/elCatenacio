const express = require('express');
var Sequelize = require('sequelize');
bodyParser = require("body-parser");
cors = require("cors")
var path = require("path");
var debug = require('debug')('express-sequelize');
const { sequelize } = require('./SequelizeConnection');
const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(require('./RoutesPedidosCliente/routes.js'));
server.use(require('./RoutesClientes/routes.js'));
server.use('./Tmp', express.static(path.resolve('Tmp')))
server.use('./Uploads', express.static(path.resolve('Uploads')))
server.use(require('./RoutesUsuarios/routes.js'));
server.use(require('./RoutesMulter/multerRoutes.js'))

server.set('port', process.env.PORT || 8383);

server.get("/", (req, res) => res.send('APP UP'));
console.log("AQUI Uploads:", path.join(__dirname, `Uploads`));

sequelize.sync()
  .then(() => {
    server.listen(server.get('port'), () => {
      debug(`Express listening on port ${server.get('port')}`);
    })
  });

exports.server = server
