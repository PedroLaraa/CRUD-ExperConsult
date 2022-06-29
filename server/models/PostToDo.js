// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS

const db = require('./db');

// PostToDo() = Insere dados na table

// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostToDo = db.sequelize.define('todo_list',{
    todo_tarefa: {
        type: db.Sequelize.STRING
    },
    todo_dataConclusao: {
        type: db.Sequelize.STRING
    },
    todo_autor: {
        type: db.Sequelize.STRING
    },
    todo_status: {
        type: db.Sequelize.STRING
    },
    todo_andamento: {
        type: db.Sequelize.STRING
    },
    todo_destinatario: {
        type: db.Sequelize.STRING
    },
    todo_setor: {
        type: db.Sequelize.STRING
    },
    todo_obraCliente: {
        type: db.Sequelize.STRING
    },
});

// EXPORTA A FUNÇÃO PostToDo()

module.exports = PostToDo;