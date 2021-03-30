var { Op } = require("sequelize");
const { Menu } = require("../SequelizeConnection");

module.exports = {
  create: async (req, res) => {
    const menu = req.body;

    const { id, codigo, descripcion, precio } = await Menu.create(menu);

    return res.json({
      id,
      codigo,
      descripcion,
      precio,
    });
  },

  getMenus: async (req, res, next) => {
    const menus = await Menu.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de menus" });
    } else {
      return res.status(200).json(menus);
    }
  },

  getMenuId: async (req, res) => {
    var menu = await Menu.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay menu con ID" });
    } else {
      return res.status(200).json(menu);
    }
  },

  deleteMenuById: async (req, res) => {
    const menu = await Menu.findByPk(req.params.id);
    await menu.destroy();
    return res.json({ delete: "Menu eliminado" });
  },

  update: async (req, res) => {
    const menu = await Menu.findByPk(req.params.id);
    const { id, codigo, descripcion, precio } = await menu.update(req.body);

    return res
      .json({
        id,
        codigo,
        descripcion,
        precio,
      })
      .res.send(200, "menu editado");
  },
};
