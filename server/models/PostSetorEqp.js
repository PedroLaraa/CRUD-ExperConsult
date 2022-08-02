const db = require('./db')

const PostSetorEqp = db.sequelize.define('equipamentos_das_obras',{
    equipamentos_setor: {
        type: db.Sequelize.STRING
    },
    equipamentos_tag: {
        type: db.Sequelize.STRING
    },
    equipamentos_equipamento: {
        type: db.Sequelize.INTEGER
    },
})

// EXPORTA A FUNÇÃO PostRep()
module.exports = PostSetorEqp
