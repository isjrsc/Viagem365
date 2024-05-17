const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')
const {hash}  = require('bcryptjs')

const Usuario = connection.define('usuarios', {
    email:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    nome: {
        type: DataTypes.STRING,
    },
    sexo: {
        type: DataTypes.STRING,
    },
    cpf: {
        type: DataTypes.STRING,
    },
    endereco: {
        type: DataTypes.STRING,
    },
    data_nascimento: {
        type: DataTypes.DATE
    },
})

Usuario.beforeSave(async (usuario) => {
    usuario.password =  await hash(usuario.password, 8)
})

module.exports = Usuario


