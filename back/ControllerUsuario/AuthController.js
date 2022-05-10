const { models } = require("../SequelizeConnection");
var { Op } = require("sequelize");
const Usuario = models.Usuario;
const ResponsableDeMesa = models.ResponsableDeMesa
const Cliente = models.Cliente
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

module.exports = {
    //login para todos
    login(req, res) {

        let { username, email, password } = req.body;
        Usuario.findOne({
            where: {
                username:username
                // [Op.or]: [
                //     { username:username ,
                //     email:email}
                //   ]
            } 
        }).then(usuario => {
            if (username == null || ![req.body.values]) {
                Usuario.findOne({
                    where: {
                        email:email
                     
                    }
                }).then(usuario => {
                    if (!usuario.email || ![req.body.values]) {
                        res.status(404).json({ msg: "Usuario con este email no encontrado" });
        
                    } else {
                        if (bcrypt.compareSync(password, usuario.password)) {
                            console.log("++++us+++",usuario)
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

            } else {
                if (bcrypt.compareSync(password, usuario.password)) {
                    console.log("++++us+++",usuario)
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
        })


    },

    // login(req, res) {
    //     let { username, email, password } = req.body;
    //     Usuario.findOne({
    //         where: { username: username }
    //     } || {
    //         where: { email: email }
    //     }).then(usuario => {
    //         if (!usuario || usuario.email == undefined
    //             || usuario.username == undefined) {
    //             res.status(404).json({ msg: "Usuario con este username no encontrado" });
    //         } else {
    //             if (bcrypt.compareSync(password, usuario.password)) {
    //                 let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
    //                     expiresIn: authConfig.expires
    //                 });
    //                 res.status(200).json({
    //                     usuario: usuario,
    //                     token: token
    //                 })
    //             } else {
    //                 res.status(401).json({ msg: "Acceso no autorizado" })
    //             }
    //         }
    //     }).catch(err => {
    //         res.status(500).json(err);
    //     })
    // },

    // Registro solo para Admin
    signUp(req, res) {
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        Usuario.create({
            username: req.body.username,
            email: req.body.email,
            password: password,
            rol: "ADMIN",
            registrado: true,
        }).then(usuario => {
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

    signupResponsable: async (req, res) => {
        var responsable = await ResponsableDeMesa.create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
        })
        if (![req.body.values] || !responsable) {
            res.status(400).json({ err: "no se creo el responsable" });
        } else {
            console.log("RESPONSABLE+++++", responsable);
            let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
            console.log("PASSWORD", password)
            await Usuario.create({
                responsableId: responsable.id_responsable,
                username: req.body.username,
                email: req.body.email,
                password: password,
                rol: "RESPONSABLE",
                registrado: true,
            }).then(usuario => {
                let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                console.log("TOKEN+++++++++", token)

                res.status(200).json({
                    usuario: usuario,
                    token: token,
                });
            }).catch(err => {
                res.status(500).json(err);
            });
        }
    },


    signupCliente: async (req, res) => {
        var cliente = await Cliente.create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
        })
        if (![req.body.values] || !cliente) {
            res.status(400).json({ err: "no se creo el cliente" });
        } else {
            console.log("CLIENTE+++++", cliente);
            let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
            console.log("PASSWORD", password)
            await Usuario.create({
                clienteId: cliente.id_cliente,
                username: req.body.username,
                email: req.body.email,
                password: password,
                rol: "CLIENTE",
                registrado: true,
            }).then(usuario => {
                let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                console.log("TOKEN+++++++++", token)

                res.status(200).json({
                    usuario: usuario,
                    token: token,
                });
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
    //ver /corregir 
    deleteCliente: async (req, res) => {
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
        var usernameOrEmail = req.params.usernameOrEmail
        var usuarioUsername = await Usuario.findOne({
            where: { username: usernameOrEmail },
        });
        if (![req.body.values] || usuarioUsername == null) {
            var usuarioEmail = await Usuario.findOne({
                where: { email: usernameOrEmail }
            });
            return res.status(200).json(usuarioEmail);
        }
        else {
            if (![req.body.values]) {
                res.status(400).json({ err: " email no encontrado" });
            }
        }
        return res.status(200).json(usuarioUsername);
    },


    registerResponsable: async (req, res) => {
        // var responsable = await ResponsableDeMesa.findOne({
        //     where: { username: req.params.username, email: req.params.email },
        // });
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        ResponsableDeMesa.create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            username: req.body.username,
            email: req.body.email,
            password: password,
            rol: "RESPONSABLE",
        }).then(responsable => {
            let token = jwt.sign({ responsable: responsable }, authConfig.secret, {
                expiresIn: authConfig.expires
            })
            if (responsable) {
                let usuario = Usuario.create({
                    responsableId: responsable.id_responsable,
                    nombre: responsable.nombre,
                    direccion: responsable.direccion,
                    telefono: responsable.telefono,
                    username: responsable.username,
                    email: responsable.email,
                    password: responsable.password,
                    rol: responsable.rol,
                    registrado: true,
                })
                return res.status(200).json({
                    responsable: responsable,
                    usuario: usuario,
                    token: token,
                })
            } else {
                return res.status(400).json({
                    message: "No se creo el responsable"
                })
            }
        })
            .catch(err => {
                res.status(500).json(err);
            });
    },


    updateResponsable: async (req, res) => {
        var responsable = await ResponsableDeMesa.findOne({
            where: { id_responsable: req.params.id_responsable },
        });
        var usuario = await Usuario.findOne({
            where: {
                responsableId: responsable.id_responsable,
                username: responsable.username, email: responsable.email
            },
        });
        if (![req.body.values]) {
            res.status(400).json({ err: "usuario y responsable no encontrado" });
        } else {
            let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

            var usuarioUpdate = await usuario.update({
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                username: req.body.telefono.username,
                email: req.body.email,
                password: password,
                rol: req.body.rol,
                registrado: true,
            });
            let token = jwt.sign({ usuario: usuarioUpdate }, authConfig.secret, {
                expiresIn: authConfig.expires
            })
            return res.status(200).json(usuarioUpdate, token);
        }
    },
    verificarPassword: async (req, res) => {
        var usuario = await Usuario.findOne({
            where: { username: req.params.username, password: req.params.password },
        });
        if (![req.body.values]) {
            res.status(400).json({ err: "usuario no encontrado" });
        } else {
            return res.status(200).json(usuario);
        }
    },
    // A PRUEBA
    loginPassword(req, res) {
        let { username, email, password } = req.body;
        Usuario.findOne({
            where: {
                // [Op.or]: [{
                $or: [{ email: email }, { username: username }]
                //    email:email,username:username
                // }]
            }
        }).then(usuario => {
            if (!usuario || usuario.email == undefined
                || usuario.username == undefined) {
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


















}
