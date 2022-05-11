// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

const PostToDo = require('./PostToDo')

// Post() = Insere dados na table
// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostClientes = db.sequelize.define('clientes_obras',{
    clientes_razaosocial: {
        type: db.Sequelize.STRING
    },
    clientes_nomefantasia: {
        type: db.Sequelize.STRING
    },
    clientes_apelido: {
        type: db.Sequelize.STRING
    },
    clientes_cnpj: {
        type: db.Sequelize.STRING
    },
    clientes_endereco: {
        type: db.Sequelize.STRING
    },
    clientes_premissasDeProjeto: {
        type: db.Sequelize.STRING
    },
    clientes_ie: {
        type: db.Sequelize.STRING
    },
    clientes_nomeResponsavel: {
        type: db.Sequelize.STRING
    },
    clientes_telefone: {
        type: db.Sequelize.STRING
    },
    clientes_email: {
        type: db.Sequelize.STRING
    },
    clientes_logo: {
        type: db.Sequelize.STRING
    }
})

PostToDo.belongsTo(PostClientes, {foreignKey: 'idCliente'})

// EXPORTA A FUNÇÃO Post()
module.exports = PostClientes