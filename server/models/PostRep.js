const db = require('./db')

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
        type: db.Sequelize.STRING
    },
    representante_imagem: {
        type: db.Sequelize.STRING
    }
})

module.exports = PostRep