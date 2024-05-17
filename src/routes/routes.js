const { Router } = require("express");
const usuarioRoutes = require("./usuarios.route.");
const destinoRoutes = require("./destinos.route");
const loginRoutes = require("./login.route");

const routes = Router()

routes.use('/usuarios', usuarioRoutes)
routes.use('/destinos', destinoRoutes)
routes.use('/login', loginRoutes)

module.exports = routes