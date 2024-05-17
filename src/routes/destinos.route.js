const { Router, query } = require('express') // 
const Destino = require('../models/Destino')

const { auth } = require('../middleware/auth')

const destinoRoutes = new Router()

destinoRoutes.post('/', auth,  async (req, res) => {
    try {
        const nome = req.body.nome
        const duracao_horas = req.body.duracao_horas

        if (!nome) {
            return res.status(400).json({ message: "O nome é obrigatório" })
        }

            const destino = await Destino.create({
            nome: nome
        })

        res.status(201).json(destino)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível cadastrar o destino' })
    }

})


destinoRoutes.get('/', auth,  async (req, res) => {
    try {
        let params = {}

        if (req.query.nome) {

            params = { ...params, nome: req.query.nome }
        }

        const destinos = await Destino.findAll({
            where: params
        })

        res.json(destinos)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível listar todos os destinos' })
    }
})


destinoRoutes.delete('/:id', auth, (req, res) => {
    const { id } = req.params

    Destino.destroy({
        where: {
            id: id
        }
    })

    res.status(204).json({})
})


destinoRoutes.put('/:id', auth, async (req, res) => {
    const { id } = req.params

    const destino = await Destino.findByPk(id)

    if (!destino) {
        return res.status(404).json({ message: 'Destino não encontrado' })
    }

    destino.update(req.body)

    await destino.save()

    res.json(destino)
})

module.exports = destinoRoutes