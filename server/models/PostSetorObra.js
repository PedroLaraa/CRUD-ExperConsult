const db = require('./db')

const PostSetorObra = db.sequelize.define('setores_das_obras',{
    setor_nomeSetor: {
        type: db.Sequelize.STRING
    },
    setor_obraDoSetor: {
        type: db.Sequelize.STRING
    }
})

// EXPORTA A FUNÇÃO PostRep()
module.exports = PostSetorObra
