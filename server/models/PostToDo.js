// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

const PostClientes = require('./PostClientes')

// Post() = Insere dados na table
// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostToDo = db.sequelize.define('todo_clientes',{
    todo_eventos: {
        type: db.Sequelize.STRING
    },
    todo_dataConclusao: {
        type: db.Sequelize.STRING
    },
    idCliente: {
        type: db.Sequelize.INTEGER
    },
})

// EXPORTA A FUNÇÃO Post()
module.exports = PostToDo