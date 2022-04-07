const db = require('./db')

const PostFornec = db.sequelize.define('fornecedores',{
    fornec_fornecedornome: {
        type: db.Sequelize.STRING
    },
    fornec_razaosocial: {
        type: db.Sequelize.STRING
    },
    fornec_site: {
        type: db.Sequelize.STRING
    },
    fornec_telefone: {
        type: db.Sequelize.STRING
    },
    fornec_email : {
        type: db.Sequelize.STRING
    },
    fornec_empint_nome: {
        type: db.Sequelize.STRING
    },
    fornec_empint_razaosocial: {
        type: db.Sequelize.STRING
    },
    fornec_empint_site: {
        type: db.Sequelize.STRING
    },
    fornec_empint_telefone: {
        type: db.Sequelize.STRING
    },
    fornec_empint_email: {
        type: db.Sequelize.STRING
    },
    fornec_representante_situacao: {
        type: db.Sequelize.STRING
    },
    fornec_representante: {
        type: db.Sequelize.INTEGER
    },
    fornec_foto: {
        type: db.Sequelize.STRING
    }
})

module.exports = PostFornec