const { Router } = require('express') 

const { auth } = require('../middleware/auth')

const UsuarioController = require('../controllers/UsuarioController')

const usuarioRoutes = new Router()

usuarioRoutes.post('/', UsuarioController.cadastrar)
usuarioRoutes.get('/', auth, UsuarioController.listarTodos)
usuarioRoutes.get('/:id', auth, UsuarioController.listarUm)

module.exports = usuarioRoutes