// IMPORTA O SEQUELIZE DO DB PARA ENVIAR DADOS
const db = require('./db')

const Post = require('./Post')

const PostRep = require('./PostRep')

// PostFornec() = Insere dados na table
// DEFINE A TABLE PARA INSERÇÃO DE DADOS E OS TIPOS DE DADOS DE CADA COLUMN

const PostFornec = db.sequelize.define('fornecedores',{
    fornec_fornecedornome: {
        type: db.Sequelize.STRING
    },
    fornec_razaosocial: {
        type: db.Sequelize.STRING
    },
    fornec_site: {
        type: db.Sequelize.STRING
    },
    fornec_telefone: {
        type: db.Sequelize.STRING
    },
    fornec_email : {
        type: db.Sequelize.STRING
    },
    fornec_foto: {
        type: db.Sequelize.STRING
    },
    fornec_nivelfornecedor: {
        type: db.Sequelize.STRING
    }
})

// PostFornec.associate = (models) => {
    Post.belongsTo(PostFornec, {
        foreignKey: 'fornecedor_idfk',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    Post.belongsTo(PostFornec, {
        foreignKey: 'desceqp_marca',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    PostRep.belongsTo(PostFornec, {
        foreignKey: 'representante_empresasrep',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
// }

// EXPORTA A FUNÇÃO PostFornec()
module.exports = PostFornec