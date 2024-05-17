const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')

const Destino = connection.define('destinos', {
    nome: {
        type: DataTypes.STRING,
    },
    descricao: {
        type: DataTypes.STRING,
    },
    localidade: {
        type: DataTypes.STRING,
    },
    cep: {
        type: DataTypes.STRING,
    },
})

module.exports = Destino