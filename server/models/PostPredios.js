// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

const PostToDo = require('./PostToDo')

// Post() = Insere dados na table
// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostPredios = db.sequelize.define('predios_clientes',{
    predios_nomeDosPredios: {
        type: db.Sequelize.STRING
    },
    predios_clientes: {
        type: db.Sequelize.INTEGER
    },
})

PostToDo.belongsTo(PostPredios, {foreignKey: 'idCliente'})

// EXPORTA A FUNÇÃO Post()
module.exports = PostToDo