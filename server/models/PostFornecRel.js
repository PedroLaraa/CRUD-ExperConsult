const db = require('./db')

// DB INSERT DESCRIPTION EQUIPMENT

const PostFornecRel = db.sequelize.define('fornecedor_representante_relacao',{
    id_fornecedor: {
        type: db.Sequelize.INTEGER
    }
})

module.exports = PostFornecRel