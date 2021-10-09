const express = require('express');
var Sequelize = require('sequelize');
bodyParser = require("body-parser");
cors = require("cors")
var path = require("path");
var debug = require('debug')('express-sequelize');
const { sequelize } = require('./SequelizeConnection');
const server = express();

var fs = require("fs")

const crypto = require('crypto');
const message = "With node.js we can create hash with several algoritms";
const puerto = 443
//Inicializamos socketio

// const http = require("http");
// const app = express();
// const socketio = require("socket.socketio");
// const serverChat = http.createServer(app);

// const socketio = require(socket)(serverChat, {
//   cors: {
//     origin: "https://localhost:5000",
//   }
// });
// const io = socketio(serverChat);



//HTTPSEGURO
// https.createServer({
//   cert:fs.readFileSync('mi_certicado.crt'),
//   key:fs.readFileSync('mi_certificado.key')
// },server).listen(puerto,function(){
//   console.log("puerto https 443")
// })
//   
// result = crypto.createHash("sha256").update(message).digest();
// console.log("SHA256", result ,result.length, result.toString('hex'));
server.use(cors());
server.use(bodyParser.json());
server.use(require('./RoutesPedidosCliente/routes.js'));
server.use(require('./RoutesClientes/routes.js'));
// server.use(function (req, res, next) {
//   res.set({
//     "Content-Security-Policy": "default-src 'none';img-src 'none'",
//   });
//   next();
// });

server.use('./Tmp', express.static(path.resolve('Tmp')))
server.use('./Uploads', express.static(path.resolve('Uploads')))
server.use(require('./RoutesUsuarios/routes.js'));
server.use(require('./RoutesMulter/multerRoutes.js'))
server.set('port', process.env.PORT || 8383);


//Funcionalidad de socket.socketio en el serverChat
// io.on("connection", (socket) => {
//   let nombre;

//   socket.on("conectado", (nomb) => {
//     nombre = nomb;
//     //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
//     socket.broadcast.emit("mensajes", {
//       nombre: nombre,
//       mensaje: `${nombre} ha entrado en la sala del chat`,
//     });
//   });

//   socket.on("mensaje", (nombre, mensaje) => {
//     //socketio.emit manda el mensaje a todos los clientes conectados al chat
//     socketio.emit("mensajes", { nombre, mensaje });
//   });

//   socket.on("disconnect", () => {
//     socketio.emit("mensajes", {
//       serverChat: "ServerChat",
//       mensaje: `${nombre} ha abandonado la sala`,
//     });
//   });
// });

server.get("/", (req, res) => res.send('APP UP'));
//HTTP

console.log("AQUI Uploads:", path.join(__dirname, `Uploads`));
// serverChat.listen(5000, () => console.log("Servidor inicializado++++++++++++++++++++++++++++++++++++"));
// serverChat.listen(5000,function(){
//   console.log("SERVERCHAT CONECTADO+++++++++++")
//   socketio.on("connection",function(socket){
//     console.log("Usuario conectado" +socket.id )
//   })
// })
sequelize.sync()
  .then(() => {
    server.listen(server.get('port'), () => {
      debug(`Express listening on port ${server.get('port')}`);

    })
   
      });



 // ,serverChat
    exports.server = server
   