var { Op } = require("sequelize");
const { Cliente} = require("../SequelizeConnection");

module.exports = {
  create:async(req, res) =>{
    const cliente = req.body;

    const {
      id,
      nombre,
      apellido,
      cuit,
      razonSocial,
      telefono,
      email,
    } = await Cliente.create(cliente);

    return (res.json({
      id,
      nombre,
      apellido,
      cuit,
      razonSocial,
      telefono,
      email,
    }))

  },
 
  getClientes: async (req, res, next) => {
    const clientes = await Cliente.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de clientes" });
    } else {
      return res.status(200).json(clientes);
    }
  },

  getClienteId: async (req, res) => {
    var cliente = await Cliente.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay cliente con ID" });
    } else {
      return res.status(200).json(cliente)
      .then(console.log(cliente instanceof Cliente))  // true
      .then(console.log(cliente.id))
    }
  },

  deleteClienteById: async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    await cliente.destroy();
    return res.json({ delete: "Cliente eliminado" });
  },

  async update(req, res) {
    const cliente = await Cliente.findByPk(req.params.id);
    const {
      id,
      nombre,
      apellido,
      cuit,
      razonSocial,
      telefono,
      email,
    } = await cliente.update(req.body);

    return res.json({
      id,
      nombre,
      apellido,
      cuit,
      razonSocial,
      telefono,
      email,
    }).res.send(200,"cliente editado");
  },


async encontrarClientePorId(req,res){
const cliente = await Cliente.findOne({ where: {id:req.params.id} });
if (cliente === null) {
  console.log('Cliente no encontrado!');
} else {
  return res.status(200).json(cliente.id)
  .then(cliente => res.status(200).send(cliente))
  .then(console.log(cliente instanceof Cliente)) 
  .then(console.log(cliente.id))
}
},

encontrarClientePorDni: async (req, res) => {
  var cliente = await Cliente.findOne({where:{dni:req.params.dni}});
  if (![req.body.values]) {
    res.status(400).json({ err: "No hay cliente con dni" });
  } else {
    return res.status(200).json(cliente)
  }
},





























};