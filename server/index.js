// VAR DECLARATION ZONE

const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const post = require ('./models/Post')
const Post = require('./models/Post')
const PostFornec = require('./models/PostFornec')
const PostRep = require('./models/PostRep')
const path = require('path')
const upload = require('./middleware/uploadimg')
const res = require('express/lib/response')
const req = require('express/lib/request')
const multer = require('multer')
var cors = require('cors');

// PUBLIC
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
        app.use(cors());
        next();
    });
    app.use(express.static(path.join(__dirname, 'public')))
    app.use('/files', express.static(path.resolve(__dirname, 'public', 'img')))

// CONFIGS OF HANDLEBARS
    // TEMPLATE ENGINE
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main',  runtimeOptions: {
            allowProtoPropertiesByDefault: true,
    
            allowProtoMethodsByDefault: true,
        }}))
        app.set("view engine", "handlebars")
        

// CONFIGS OD BODY PARSER
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

// ROUTES

    // TEST IMG

    app.get('/list-img', async (req, res) =>{
        await Post.findAll()
        .then((desceqp_imagem, desceqp_nomeeqp) =>{
            return res.json({
                desceqp_imagem,
                url: "http://localhost:1212/files/"
            }) 
        }).catch(() =>{
            res.render('erro')
        })
    })

    // HOMEPAGE

    app.get('', function(req, res){
        res.render('home')
    })

    app.get('/home', function(req, res){
        res.render('home')
    })

    // SUPORTE

    app.get('/suporte', function (req, res){
        res.render('suporte')
    })

    // REGISTER EQUIPMENT
    app.get('/cadastro-equipamentos', function(req, res){
        res.render('form')
    })

    // REGISTER FORNECEDOR

    app.get('/cadastro-fornecedor', function(req, res){
        res.render('formfornecedores')
    })

    // INSERT FORNECEDORES
    app.post('/fornecedorcadastrado', upload.single('fornec_foto'), async function(req, res){
        
        const dataToInsert = {
            fornec_fornecedornome: req.body.fornec_fornecedornome,
            fornec_razaosocial: req.body.fornec_razaosocial,
            fornec_telefone: req.body.fornec_telefone,
            fornec_email: req.body.fornec_email,
            fornec_empint_nome: req.body.fornec_empint_nome,
            fornec_empint_razaosocial: req.body.fornec_empint_razaosocial,
            fornec_empint_site: req.body.fornec_empint_site,
            fornec_empint_telefone: req.body.fornec_empint_telefone,
            fornec_empint_email: req.body.fornec_empint_email,
            fornec_foto: req.file.filename
        };

        try {
            const dbResponse = await PostFornec.create(dataToInsert);
            res.redirect('/cadastro-fornecedor');
        } catch (ex) {
            console.error(ex);
            res.render('erro');
        }
    });

    // INSERT INFOS IN DATABASE

    // INSERT EQUIPMENT
    app.post('/equipamentocadastrado', upload.single('desceqp_imagem'), async function(req, res){
        
        const dataToInsert = {
            desceqp_nomeeqp: req.body.desceqp_nomeeqp,
            desceqp_modelo: req.body.desceqp_modelo,
            desceqp_fabricante: req.body.desceqp_fabricante,
            desceqp_capacidade: req.body.desceqp_capacidade,
            desceqp_potencia: req.body.desceqp_potencia,
            desceqp_consumo: req.body.desceqp_consumo,
            desceqp_imagem: req.file.filename
        };

        try {
            const dbResponse = await Post.create(dataToInsert);
            res.redirect('/cadastro-equipamentos');
        } catch (ex) {
            console.error(ex);
            res.render('erro');
        }
    });

    // REGISTER REPRESENTANTE

    app.get('/cadastro-representante', function(req, res){
        res.render('formrepresentantes')
    })

    // INSERT REPRESENTANTES
    app.post('/representantecadastrado', upload.single('representante_imagem'), async function(req, res){
        
        const dataToInsert = {
            representante_nome: req.body.representante_nome,
            representante_telefone: req.body.representante_telefone,
            representante_site: req.body.representante_site,
            representante_estadoatuacao: req.body.representante_estadoatuacao,
            representante_comentarios: req.body.representante_comentarios,
            representante_empresasrep: req.body.representante_empresasrep,
            representante_imagem: req.file.filename
        };

        try {
            const dbResponse = await PostRep.create(dataToInsert);
            res.redirect('/cadastro-representante');
        } catch (ex) {
            console.error(ex);
            res.render('erro');
        }
    });

    // CONSULTAS

    // CONSULTA EQUIPMENT

    app.get('/equipamentos', (req, res) => {
        res.render('consultaequipamentos')
    })

app.listen(1212, function(){
    console.log('SERVIDOR RODANDO')
})

