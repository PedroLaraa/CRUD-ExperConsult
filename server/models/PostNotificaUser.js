// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

const PostNotificaUser = db.sequelize.define('notificacoes_users',{
    notificacoes_mensagem: {
        type: db.Sequelize.STRING
    },
    notificacoes_motivo: {
        type: db.Sequelize.STRING
    },
    notificacoes_autor: {
        type: db.Sequelize.STRING
    },
    notificacoes_destinatario: {
        type: db.Sequelize.INTEGER
    }
})

// EXPORTA A FUNÇÃO PostNotificaUser()
module.exports = PostNotificaUser