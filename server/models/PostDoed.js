// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS

const db = require('./db')

// Post() = Insere dados na table

// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostDoed = db.sequelize.define('doed_clientes',{
    
    doed_eventos: {
        type: db.Sequelize.STRING
    },
    doed_autor: {
        type: db.Sequelize.STRING
    },
    predios_clientes: {
        type: db.Sequelize.INTEGER
    }
})

// EXPORTA A FUNÇÃO Post()

module.exports = PostDoed