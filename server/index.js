
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

const db = require('./models/db')

const { json } = require('body-parser')

const mysql = require('mysql2')

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

// ROUTES FOR FRONT END INFOS

    // Lista os fornecedores no Form Handlebars dos representantes
    app.get('/cadastro-representante', (req, res) => {
        PostFornec.findAll().then(fornecedores => {
            res.render('formrepresentantes', {fornecedores: fornecedores})
        })
    })


    // Lista os fornecedores no Form Handlebars dos equipamentos
    app.get('/cadastro-equipamentos', (req, res) => {
        PostFornec.findAll().then(fornecedores => {
            res.render('form', {fornecedores: fornecedores})
        })
    })

// ROUTES FOR FRONT END INFOS

    // ROUTE OF IMG REPRESENTANTE

    app.get('/list-img', async (req, res) =>{
        await PostRep.findAll()
        .then((representante_imagem) =>{
            return res.json({
                representante_imagem,
                url: "http://localhost:1212/files/"
            }) 
        }).catch(() =>{
            res.render('erro')
        })
    })

    // ROUTE OF IMG FORNECEDOR

    app.get('/list-imgf', async (req, res) =>{
        await PostFornec.findAll()
        .then((fornec_foto) =>{
            return res.json({
                fornec_foto,
                url: "http://localhost:1212/files/"
            }) 
        }).catch(() =>{
            res.render('erro')
        })
    })

    // ROUTE OF IMG EQUIPMENTS

    app.get('/list-infosequipamentos', async (req, res) =>{
        await Post.findAll()
        .then((value) =>{
            return res.json({
                value,
                url: "http://localhost:1212/files/"
            })
        }).catch(() =>{
            res.render('erro')
        })
    })

    //ROTAS GERAIS

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

    app.get('/cadastro-representante', function(req, res){
        res.render('formrepresentantes')
    });

// ROTAS DE CADASTROS E POSTS

    // INSERT INFOS FORNECEDORES

    app.post('/fornecedorcadastrado', upload.single('fornec_foto'), async function(req, res){

            const dataToInsert = {
                fornec_nivelfornecedor: req.body.fornec_nivelfornecedor,
                fornec_fornecedornome: req.body.fornec_fornecedornome,
                fornec_razaosocial: req.body.fornec_razaosocial,
                fornec_telefone: req.body.fornec_telefone,
                fornec_email: req.body.fornec_email,
                fornec_site: req.body.fornec_site,
                fornec_foto: (typeof req.file !== 'undefined') ? req.file.filename : '',
            }

            try {
                const dbResponse = await PostFornec.create(dataToInsert);
                res.redirect('/cadastro-fornecedor');
            } catch (ex) {
                console.error(ex);
                res.render('erro');
            }
    });

    app.put('/fornecedoreditado', (req, res) =>{

        const dataToInsert = {
            fornec_fornecedornome: req.body.fornec_fornecedornome,
            fornec_nivelfornecedor: req.body.fornec_nivelfornecedor,
            fornec_razaosocial: req.body.fornec_razaosocial,
            fornec_telefone: req.body.fornec_telefone,
            fornec_email: req.body.fornec_email,
            fornec_site: req.body.fornec_site,
            id: req.body.id
        }

        let SQL = 'UPDATE fornecedores SET fornec_nivelfornecedor=?,fornec_fornecedornome=?,fornec_razaosocial=?,fornec_telefone=?,fornec_email=?,fornec_site=?,updatedAt=? WHERE id = ?';

            db.query(SQL, [dataToInsert], (err, result) => {
                if(err) console.log(err)
                else res.send(result)
        })
    });


    // INSERT INFOS EQUIPMENT

    app.post('/equipamentocadastrado', upload.fields([{name: 'desceqp_imagem' , maxCount: 1}, {
        name: 'desceqp_pdf', maxCount: 1}]), async function(req, res){

        const dataToInsert = {
            fornec_nivelfornecedor: req.body.fornec_nivelfornecedor,
            desceqp_nomeeqp: req.body.desceqp_nomeeqp,
            desceqp_modelo: req.body.desceqp_modelo,
            id_fornecedor: req.body.id_fornecedor,
            desceqp_capacidadeprod: req.body.desceqp_capacidadeprod,
            desceqp_consumoene: req.body.desceqp_consumoene,
            desceqp_consumotipo: req.body.desceqp_consumotipo,
            desceqp_comentario: req.body.desceqp_comentario,
            desceqp_precoeqp: req.body.desceqp_precoeqp,
            desceqp_dataultpreco: req.body.desceqp_dataultpreco,
            desceqp_imagem: (typeof req.files.desceqp_imagem !== 'undefined') ? req.files['desceqp_imagem'][0].filename: '',
            desceqp_pdf: (typeof req.files.desceqp_pdf !== 'undefined') ? req.files['desceqp_pdf'][0].filename: '',
        };

        try {
            const dbResponse = await Post.create(dataToInsert);
            res.redirect('/cadastro-equipamentos');
        } catch (ex) {
            console.error(ex);
            res.render('erro');
        }
    });

    // INSERT REPRESENTANTES

    app.post('/representantecadastrado', upload.single('representante_imagem'), async function(req, res){
        
        const dataToInsert = {
            representante_nome: req.body.representante_nome,
            representante_telefone: req.body.representante_telefone,
            representante_site: req.body.representante_site,
            representante_estadoatuacao: req.body.representante_estadoatuacao,
            representante_comentarios: req.body.representante_comentarios,
            representante_empresasrep: req.body.representante_empresasrep + ''.replace('["]', ''), // Remove elementos
            representante_status: req.body.representante_status,
        };
        
        try {
            const dbResponse = await PostRep.create(dataToInsert);
            res.redirect('/cadastro-representante');
        } catch (ex) {
            console.error(ex);
            res.render('erro');
        }
    });

    // PORTA QUE O BACK-END ESTÁ SENDO EXECUTADO

app.listen(1212, function(){
    console.log('SERVIDOR RODANDO')
});

