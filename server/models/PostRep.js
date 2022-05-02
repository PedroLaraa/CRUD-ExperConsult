// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

// PostRep() = Insere dados na table
// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostRep = db.sequelize.define('representantes_fornecedores',{
    representante_nome: {
        type: db.Sequelize.STRING
    },
    representante_telefone: {
        type: db.Sequelize.STRING
    },
    representante_site: {
        type: db.Sequelize.STRING
    },
    representante_estadoatuacao: {
        type: db.Sequelize.STRING
    },
    representante_comentarios: {
        type: db.Sequelize.STRING
    },
    representante_empresasrep: {
        type: db.Sequelize.JSON
    },
    representante_status: {
        type: db.Sequelize.STRING
    }
})

// EXPORTA A FUNÇÃO PostRep()
module.exports = PostRep