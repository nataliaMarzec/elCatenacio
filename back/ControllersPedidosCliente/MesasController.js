var { Op, Sequelize } = require("sequelize");
const { models } = require("../SequelizeConnection");
const Producto = models.Producto;
const ItemsPedido = models.ItemsPedido;
const Mesa = models.Mesa;
const ResponsableDeMesa = models.ResponsableDeMesa;
const Usuario = models.Usuario;

module.exports = {
    create: async (req, res) => {
        const id_mesa=req.body.id_mesa;
        // const responsableId=req.body.responsableId;
        const cantidadPersonas = req.body.cantidadPersonas;
        const habilitada = req.body.habilitada;

        const mesa = {
            id_mesa:id_mesa,
            // responsableId:responsableId,
            cantidadPersonas: cantidadPersonas,
            habilitada: habilitada,
        };
        return await Mesa.create(mesa)
            .then(function (mesa) {
                console.log("mesa+++", mesa);
                mesa.save();
                let id_mesa = mesa.id;
                let responsableId =null;
                let cantidadPersonas = mesa.cantidadPersonas;
                let habilitada = mesa.habilitada;

                return res.json({
                    message: "se guardo la mesa",
                    id_mesa,
                    responsableId,
                    cantidadPersonas,
                    habilitada,

                });
            })
            .catch(function (error) {
                console.log("mesa", error);
            });
    },

    createConResponsableId: async (req, res) => {
        var usuario = await Usuario.findOne({
            where: { responsableId: req.params.responsableId },
        });

        const id = req.body.id_mesa
        var responsableId = usuario.responsableId;
        const cantidadPersonas = req.body.cantidadPersonas;
        const habilitada = req.body.habilitada;

        const mesa = {
            id_mesa: id,
            responsableId: responsableId,
            cantidadPersonas: cantidadPersonas,
            habilitada: habilitada,
        };
        return await Mesa.create(mesa)
            .then(function (mesa) {
                mesa.save();
                let id_mesa = mesa.id;
                let responsableId = mesa.responsableId;
                let cantidadPersonas = mesa.cantidadPersonas;
                let habilitada = mesa.habilitada;

                return res.json({
                    message: "se guardo la mesa",
                    id_mesa,
                    responsableId,
                    cantidadPersonas,
                    habilitada,

                });
            })
            .catch(function (error) {
                console.log("mesa", error);
            });
    },

    delete: async (req, res) => {
        const mesa = await Mesa.findByPk(req.params.id_mesa);
        if (mesa) {
            await mesa.destroy();
            return res.status(200).json({ delete: "Mesa eliminado" });
        } else {
            return res.status(404).json({ messagge: "No exite mesa con id" })
        }
    },

    update: async (req, res) => {
        const mesa = await Mesa.findByPk(req.params.id_mesa);
        if (mesa.id) {
            const { id_mesa, responsableId, cantidadPersonas, habilitada } =
                await mesa.update(req.body);
            return res.status(200)
                .json({
                    id_mesa,
                    responsableId,
                    cantidadPersonas,
                    habilitada
                })
        } else {
            return res.status(404).json({ messagge: "No encontró mesa con id" })
        }
    },

    getMesas: async (req, res, next) => {
        const mesas = await Mesa.findAll({});
        if (![req.body.values]) {
            res.status(400).json({ err: "no obtiene lista de mesas" });
        } else {
            return res.status(200).json(mesas);
        }
    },

    getMesasHabilitados: async (req, res, next) => {
        const mesas = await Mesa.findAll({ where: { habilitada: true } });
        if (![req.body.values]) {
            res.status(400).json({ err: "no obtiene lista de mesas" });
        } else {
            return res.status(200).json(mesas);
        }
    },

    getMesaId: async (req, res) => {
        var mesa = await Mesa.findByPk(req.params.id_mesa);
        if (![req.body.values]) {
            res.status(400).json({ err: "No hay mesa con ID" });
        } else {
            return res.status(200).json(mesa);
        }
    },

    encontrarMesaPorId: async (req, res) => {
        var mesa = await Mesa.findOne({ where: {id_mesa: req.params.id_mesa } });
        if (![req.body.values]) {
            res.status(400).json({ err: "No hay mesa con id" });
        } else {
            return res.status(200).json(mesa);
        }
    },





};
