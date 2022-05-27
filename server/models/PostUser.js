// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

// PostRep() = Insere dados na table
// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostUser = db.sequelize.define('usuarios_dados',{
    user_nomeUser: { //
        type: db.Sequelize.STRING
    },
    user_senha: { //
        type: db.Sequelize.STRING
    },
    user_email: { //
        type: db.Sequelize.STRING
    },
    user_emailPessoal: { //
        type: db.Sequelize.STRING
    },
    
    user_nome: { //
        type: db.Sequelize.STRING
    },
    user_telefone: { //
        type: db.Sequelize.STRING
    },
    user_cargo: { //
        type: db.Sequelize.STRING
    },
    user_dataNasc: { //
        type: db.Sequelize.STRING
    },
    user_cpf: { //
        type: db.Sequelize.STRING
    },
    user_permissoes: { //
        type: db.Sequelize.INTEGER
    },
    user_setor: { //
        type: db.Sequelize.INTEGER
    },
    user_endereco: {
        type: db.Sequelize.STRING
    },
    user_foto: {
        type: db.Sequelize.STRING
    }
})

// EXPORTA A FUNÇÃO PostUser()
module.exports = PostUser