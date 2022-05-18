// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

const PostUser = require('./PostUser')

// PostRep() = Insere dados na table
// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostSetorUser = db.sequelize.define('setores_user',{
    setores_nomeSetor: {
        type: db.Sequelize.STRING
    },
    setores_observacao: {
        type: db.Sequelize.STRING
    }
})

PostUser.belongsTo(PostSetorUser, {
    foreignKey: 'user_setor',
    onDelete: 'CASCADE'
})

// EXPORTA A FUNÇÃO PostSetorUser()
module.exports = PostSetorUser