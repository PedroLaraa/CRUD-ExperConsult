// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS

const db = require('./db')

const PostPredios = require('./PostPredios')

const PostSetorObra = require('./PostSetorObra')

// Post() = Insere dados na table

// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostObras = db.sequelize.define('obras_clientes',{
    
    obras_nomeDaObra: {
        type: db.Sequelize.STRING
    },
    obras_premissasDaObra: {
        type: db.Sequelize.STRING
    },
    obras_cliente: {
        type: db.Sequelize.INTEGER
    }
})

PostPredios.belongsTo(PostObras, {
    foreignKey: 'idCliente',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

PostSetorObra.belongsTo(PostObras, {
    foreignKey: 'setor_obraDoSetor',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

// EXPORTA A FUNÇÃO Post()

module.exports = PostObras