// MIDDLEWARE QUE PERMITE "ENVIO" DE ARQUIVOS PARA O BANCO DE DADOS

const multer = require('multer') // REQUISIÇÃO DO MULTER MULTIPAR-FORM-DATA

module.exports = (multer({ // EXPORTA A FUNCTION E COLOCA O DESTINO DO ARQUIVO
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, './public/img' )
        },
        filename: (req, file, cb) => { // TRANSFORMA O NOME DO ARQUIVO P/ NÃO REPETIR
            cb(null, Date.now().toString() + '_' + file.originalname) 

        }
    }),
    fileFilter: (req, file, cb) => { // FILTRA/RESTRINGE O UPLOAD DOS ARQUIVOS
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find
        (formatoAceito => formatoAceito == file.mimetype)

        if(extensaoImg){
            return cb(null, true)
        }
        return cb(null, false)
    }
}))