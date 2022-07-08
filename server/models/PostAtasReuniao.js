// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS

const db = require('./db')

// PosCompras() = Manipula dados na table

// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostAtasReuniao = db.sequelize.define('atas_de_reuniao',{
    
    atas_reuniao: {
        type: db.Sequelize.STRING
    },
    atas_objetivo: {
        type: db.Sequelize.STRING
    },
    atas_liderReuniao: {
        type: db.Sequelize.STRING
    },
    atas_dataReuniao: {
        type: db.Sequelize.STRING
    },
    atas_horarioReuniao: {
        type: db.Sequelize.STRING
    },
    atas_localReuniao: {
        type: db.Sequelize.STRING
    },
    atas_participantesReuniao: {
        type: db.Sequelize.STRING
    },
    atas_participantesAusentes: {
        type: db.Sequelize.STRING
    },
    atas_assuntos: {
        type: db.Sequelize.STRING
    },
    atas_pendencias: {
        type: db.Sequelize.JSON
    },
    atas_responsavel: {
        type: db.Sequelize.JSON
    },
    atas_prazo: {
        type: db.Sequelize.JSON
    }
});

// EXPORTA A FUNÇÃO PostCompras()

module.exports = PostAtasReuniao