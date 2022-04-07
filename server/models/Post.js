const db = require('./db')

// DB INSERT DESCRIPTION EQUIPMENT

const Post = db.sequelize.define('descricao_equipamentos',{
    desceqp_nomeeqp: {
        type: db.Sequelize.STRING
    },
    desceqp_modelo: {
        type: db.Sequelize.STRING
    },
    id_fornecedor: {
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
    }
})

module.exports = Post