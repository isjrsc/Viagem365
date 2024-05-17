const Usuario = require('../models/Usuario')

class UsuarioController {

    async listarTodos(req, res) {
        try {
            const usuarios = await Usuario.findAll()
            res.json(usuarios)
        } catch (error) {
            res.status(500).json({ error: 'Não possível listar os usuarios' })
        }
    }

    async cadastrar(req, res) {
        try {

            const email = req.body.email
            const password = req.body.password
            const nome = req.body.nome
            const sexo = req.body.sexo
            const cpf = req.body.cpf
            const endereco = req.body.endereco
            const data_nascimento = req.body.data_nascimento
            
            if (!nome) {
                return res.status(400).json({ message: 'O nome é obrigatório' })
            }

            if (!data_nascimento) {
                return res.status(400).json({ message: 'A data de nascimento é obrigatória' })
            }

            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ message: 'A data de nascimento é não está no formato correto' })
            }

            const usuario = await Usuario.create({
                email: email,
                password: password,
                nome: nome,
                sexo: sexo,
                cpf: cpf,
                endereco: endereco,
                data_nascimento: data_nascimento,
            })

            res.status(201).json(usuario)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não possível cadastrar o usuario' })
        }
    }

    async listarUm(req, res) {
        try {

            const { id } = req.params

            const usuario = await Usuario.findByPk(id)

            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado!" })
            }

            res.json(usuario)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: 'Não possível listar o usuario especifico',
                error: error
            })
        }
    }
}

module.exports = new UsuarioController()

