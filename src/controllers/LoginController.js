const Usuario = require('../models/Usuario')
const { sign } = require('jsonwebtoken')

class LoginController {

    async login(req, res) {
        try {
            const email = req.body.email
            const password = req.body.password

            if (!email) {
                return res.status(400).json({ message: 'O email é obrigatório' })
            }

            if (!password) {
                return res.status(400).json({ message: 'O password é obrigatório' })
            }

            const usuario = await Usuario.findOne({
                where: { email: email, password: password }
            })

            if (!usuario) {
                return res.status(404).json({ error: 'Nenhum usuario corresponde a email e senha fornecidos!' })
            }

            const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome }

            const token = sign(payload, process.env.SECRET_JWT, {
                expiresIn: '24h'
            })

            res.status(200).json({ Token: token })

        } catch (error) {
            return res.status(500).json({ error: error, message: 'Algo deu errado!' })
        }
    }
}

module.exports = new LoginController()