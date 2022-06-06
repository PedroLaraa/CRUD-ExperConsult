// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

const PostNotificaSetor = db.sequelize.define('notificacoes_setores',{
    
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
    },
    notificacoes_clienteNotificado: {
        type: db.Sequelize.STRING
    }
})

// EXPORTA A FUNÇÃO PostNotificaSetor()
module.exports = PostNotificaSetor