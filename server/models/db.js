// IMPORTA O SEQUELIZE P/ FAZER MAPEAMENTO DO BANCO DE DADOS

const Sequelize = require('sequelize')

// FAZ A CONEXÃO COM O BANCO DE DADOS INDICADO

// NOME BD, USER, SENHA
const sequelize = new Sequelize('experconsultdb', 'root', 'Lilpump157@',{
    host: "localhost",
    dialect: 'mysql'
})

// EXPORTA A FUNÇÃO PARA REQUISIÇÕES
module.exports = {
    Sequelize: Sequelize ,
    sequelize: sequelize
}