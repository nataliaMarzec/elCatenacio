const { models } = require("../SequelizeConnection");
const Usuario = models.Usuario;
const ResponsableDeMesa = models.ResponsableDeMesa
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

module.exports = {

    // Login
    signIn(req, res) {

        let { nombre, username, email, password } = req.body;

        // Buscar usuario
        Usuario.findOne({
            where: {
                email: email,
                nombre: nombre,
                username: username,
            }

        }).then(usuario => {
            if (!usuario || usuario.nombre == undefined || usuario.email == undefined 
                ||usuario.username == undefined) {
                res.status(404).json({ msg: "Usuario con este username no encontrado" });

            } else {
                if (bcrypt.compareSync(password, usuario.password)) {
                    // Creamos el token
                    let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.status(200).json({
                        usuario: usuario,
                        token: token
                    })
                } else {
                    // Unauthorized Access
                    res.status(401).json({ msg: "Contraseña incorrecta" })
                }
            }
        }).catch(err => {
            res.status(500).json(err);
        })

    },

    // Registrarse
    signUp(req, res) {
        //HAY QUE REALIZAR UNA VALIDACION ANTES DE ENCRIPTARLO PARA QUE FUNCIONE EL VALIDATE DEL MODELO
        // Encriptar la contraseña
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        // console.log("PASSWORD",password)
        // Crear un usuario
        Usuario.create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            username: req.body.username,
            email: req.body.email,
            password: password,
            rol: req.body.rol,
           
        }).then(usuario => {
            // Crea el token
            let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            res.json({
                usuario: usuario,
                token: token,
            });

        }).catch(err => {
            res.status(500).json(err);
        });

    },

    signUpResponsable: async (req, res) => {
        var responsable = await ResponsableDeMesa.findOne({
            where: { username: req.params.username, email: req.params.email },
        });
        if (![req.body.values] || !responsable) {
            res.status(400).json({ err: "responsable no existe" });
        } else {
            let password = bcrypt.hashSync(responsable.password, Number.parseInt(authConfig.rounds));
            Usuario.create({
                responsableId:responsable.id_responsable,
                nombre: responsable.nombre,
                direccion: responsable.direccion,
                telefono: responsable.telefono,
                username: responsable.username,
                email: responsable.email,
                password: password,
                rol: responsable.rol,
                registrado: true,
            }).then(usuario => {
                let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                res.json({
                    usuario: usuario,
                    token: token,

                });
                let { nombre, username, email, password } = req.body;
                Usuario.findOne({
                    where: {
                        email: email,
                        nombre: nombre,
                        username: username,
                        rol:"RESPONSABLE"
                    }
                }).then(usuario => {
                    if (!usuario) {
                        res.status(404).json({ msg: "Usuario con este username no encontrado" });

                    } else {
                        if (bcrypt.compareSync(password, usuario.password)) {
                            let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                                expiresIn: authConfig.expires
                            });
                            res.status(200).json({
                                usuario: usuario,
                                token: token
                            })
                        } else {
                            res.status(401).json({ msg: "Contraseña incorrecta" })
                        }
                    }
                }).catch(err => {
                    res.status(500).json(err);
                })

            }).catch(err => {
                res.status(500).json(err);
            });
        }
    },

    delete: async (req, res) => {
        const usuario = await Usuario.findByPk(req.params.id_usuario);
        await usuario.destroy();
        return res.json({ delete: "Usuario eliminado" });
      },

    getUsuarios: async (req, res, next) => {
        const usuarios = await Usuario.findAll();
        if (![req.body.values]) {
            res.status(400).json({ err: "no obtiene lista de usuarios" });
        } else {
            return res.status(200).json(usuarios);
        }
    },

    verificarUsuario: async (req, res) => {
        var usuario = await Usuario.findOne({
            where: { username: req.params.username, email: req.params.email },
        });
        if (![req.body.values]) {
            res.status(400).json({ err: "usuario no encontrado" });
        } else {
            return res.status(200).json(usuario);
        }
    },
}
