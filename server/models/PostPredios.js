// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

const PostDoed = require('./PostDoed')

// Post() = Insere dados na table
// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostPredios = db.sequelize.define('predio_clientes',{
    predios_nomeDosPredios: {
        type: db.Sequelize.STRING
    },
    predios_dataConclusao: {
        type: db.Sequelize.STRING
    },
    idCliente: {
        type: db.Sequelize.INTEGER
    },
    predios_autor: {
        type: db.Sequelize.STRING
    }
})

PostDoed.belongsTo(PostPredios, {
    foreignKey: 'predios_clientes',
    onDelete: 'CASCADE'
})

// EXPORTA A FUNÇÃO Post()
module.exports = PostPredios