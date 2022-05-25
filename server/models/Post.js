// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

// Post() = Insere dados na table
// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const Post = db.sequelize.define('descricao_equipamentos',{
    desceqp_nomeeqp: {
        type: db.Sequelize.STRING
    },
    desceqp_modelo: {
        type: db.Sequelize.STRING
    },
    desceqp_capacidadeprod: {
        type: db.Sequelize.STRING
    },
    desceqp_consumoene: {
        type: db.Sequelize.STRING
    },
    desceqp_consumotipo: {
        type: db.Sequelize.STRING
    },
    desceqp_comentario: {
        type: db.Sequelize.STRING
    },
    desceqp_precoeqp: {
        type: db.Sequelize.STRING
    },
    desceqp_dataultpreco: {
        type: db.Sequelize.STRING
    },
    desceqp_imagem: {
        type: db.Sequelize.STRING
    },
    desceqp_pdf:{
        type: db.Sequelize.STRING
    },
    desceqp_marca:{
        type: db.Sequelize.INTEGER
    },
    fornecedor_idfk:{
        type: db.Sequelize.INTEGER
    }
})

// EXPORTA A FUNÇÃO Post()
module.exports = Post