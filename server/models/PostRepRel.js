const db = require('./db')

// DB INSERT DESCRIPTION EQUIPMENT

const PostRepRel = db.sequelize.define('fornecedor_representante_relacao',{
    id_representante: {
        type: db.Sequelize.INTEGER
    }
})

module.exports = PostRepRel