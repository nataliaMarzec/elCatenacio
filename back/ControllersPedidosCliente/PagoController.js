var { Sequelize, Op } = require("sequelize");
const { models } = require("../SequelizeConnection");
const Pago=models.Pago;
const ItemsPedido = models.ItemsPedido;
const Pedidos = models.Pedido;

module.exports = {

    create: (async = (req, res) => {
        return Pago.create({
          id: req.body.id,
          montoCobrado: req.body.montoCobrado,
          pagado: req.body.pagado,
        })
          .then((pago) => res.status(201).send(pago))
          .catch((error) => res.status(400).send(error));
      }),
    
}