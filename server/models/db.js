const Sequelize = require('sequelize')

// MAKES THE CONEXION TO THE DATA BASE
const sequelize = new Sequelize('experconsultdb', 'root', 'Lilpump157@',{
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize ,
    sequelize: sequelize
}