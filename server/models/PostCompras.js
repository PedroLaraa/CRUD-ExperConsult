// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS

const db = require('./db')

// PosCompras() = Manipula dados na table

// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostCompras = db.sequelize.define('lista_compras',{
    
    lista_item: {
        type: db.Sequelize.STRING
    },
    lista_categoria: {
        type: db.Sequelize.STRING
    },
    lista_setorDaCompra: {
        type: db.Sequelize.STRING
    },
    lista_quantidade: {
        type: db.Sequelize.INTEGER
    },
});

// EXPORTA A FUNÇÃO PostCompras()

module.exports = PostCompras