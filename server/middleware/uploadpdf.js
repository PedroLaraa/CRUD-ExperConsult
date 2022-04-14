const multer = require('multer')

module.exports = (multer({ // EXPORTA A FUNCTION E COLOCA O DESTINO DO ARQUIVO
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, './public/pdf' )
        },
        filename: (req, file, cb) => { // TRANSFORMA O NOME DO ARQUIVO P/ NÃO REPETIR
            cb(null, Date.now().toString() + '_' + file.originalname) 

        }
    })
}))