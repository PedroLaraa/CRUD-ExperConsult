const db = require('./db')

// DB INSERT DESCRIPTION EQUIPMENT

const Post = db.sequelize.define('descricao_equipamentos',{
    desceqp_nomeeqp: {
        type: db.Sequelize.STRING
    },
    desceqp_modelo: {
        type: db.Sequelize.STRING
    },
    desceqp_fabricante: {
        type: db.Sequelize.STRING
    },
    desceqp_capacidade: {
        type: db.Sequelize.STRING
    },
    desceqp_potencia : {
        type: db.Sequelize.STRING
    },
    desceqp_consumo: {
        type: db.Sequelize.STRING
    },
    desceqp_imagem: {
        type: db.Sequelize.STRING
    }
})

module.exports = Post