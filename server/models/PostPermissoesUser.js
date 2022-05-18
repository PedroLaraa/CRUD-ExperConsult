// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

const PostUser = require('./PostUser')

// PostRep() = Insere dados na table
// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostPermissoesUser = db.sequelize.define('permissoes_user',{
    perm_nomeDaPerm: {
        type: db.Sequelize.STRING
    },
    perm_observacao: {
        type: db.Sequelize.STRING
    }
})

PostUser.belongsTo(PostPermissoesUser, {
    foreignKey: 'user_permissoes',
    onDelete: 'CASCADE'
})

// EXPORTA A FUNÇÃO PostUser()
module.exports = PostPermissoesUser