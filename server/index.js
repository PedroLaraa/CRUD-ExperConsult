
const express = require('express')

const app = express()

const handlebars = require('express-handlebars')

const bodyParser = require('body-parser')

const post = require ('./models/Post')

const Post = require('./models/Post')

const PostFornec = require('./models/PostFornec')

const PostRep = require('./models/PostRep')

const PostClientes = require('./models/PostClientes')

const PostToDo = require('./models/PostToDo')

const path = require('path')

const upload = require('./middleware/uploadimg')

const res = require('express/lib/response')

const req = require('express/lib/request')

const multer = require('multer')

var cors = require('cors');

const db = require('./models/db')

const { json } = require('body-parser')

const mysql = require('mysql2')

    // PERMITE ACESSO DO BROWSER AO SISTEMA

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
        app.use(cors());
        next();
    });

    // DEFINE AS CONSULTAS DE ARQUIVOS PARA PASTA PUBLIC

    app.use(express.static(path.join(__dirname, 'public')))
    app.use('/files', express.static(path.resolve(__dirname, 'public', 'upload')))

// CONFIGS OF HANDLEBARS
    // TEMPLATE ENGINE MAIN HANDLEBARS
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main',  runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }}))
        app.set("view engine", "handlebars")
        

// CONFIGS DO BODY PARSER
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


    //ROTAS GERAIS

    // SUPORTE

    app.get('/suporte', function (req, res){
        res.render('suporte')
    })

// ROTAS DE CRUD


    // FORNECEDORES:


    // ROTA - RENDERIZA FORMULÁRIO DE REGISTRO DOS FORNECEDORES

    app.get('/cadastro-fornecedor', function(req, res){
        res.render('formfornecedores')
    })

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

            const nomeFornecedor = await PostFornec.findAll({attributes: ['fornec_fornecedornome']})
            const fornec_fornecedornome = req.body.fornec_fornecedornome

                try {
                    if(nomeFornecedor.map((v) =>(v.fornec_fornecedornome).toLowerCase()) != fornec_fornecedornome.toLowerCase()){
                        const dbResponse = await PostFornec.create(dataToInsert);
                        res.redirect('/cadastro-fornecedor');
                    }else{
                        res.json('Fornecedor já cadastrado no sistema!')
                    }
                } catch (ex) {
                    console.error(ex);
                    res.render('erro');
                }
    });

    // ROTA - EDITAR FORNECEDORES

    app.put('/fornecedor-editado', async function(req, res){

        const dataToInsert ={
            fornec_fornecedornome: req.body.fornec_fornecedornome,
            fornec_nivelfornecedor: req.body.fornec_nivelfornecedor,
            fornec_razaosocial: req.body.fornec_razaosocial,
            fornec_telefone: req.body.fornec_telefone,
            fornec_email: req.body.fornec_email,
            fornec_site: req.body.fornec_site,
        }

        const {id} = req.body
        
        try{
            const dbResponse = await PostFornec.update(dataToInsert, {
                where: {
                    id: id
                }
            })
        } catch (ex) {
            console.error(ex);
            res.render('erro')
        }
        
    });

    // ROTA - DELETA FORNECEDORES

    app.delete('/fornecedor-deletado/:id', async function(req, res) {

        const {id} = req.params

        const dbResponse = await PostFornec.destroy({where:{id: id}})
    })

    // ROTA - RECEBE REQ DO FRONT(INFOS FORNECEDORES)

    app.get('/list-imgf', async (req, res) =>{
        await PostFornec.findAll()
        .then((fornec_foto) =>{
            return res.json({
                fornec_foto,
                url: "http://192.168.10.228:1212/files/"
            }) 
        }).catch(() =>{
            res.render('erro')
        })
    })


    //EQUIPAMENTOS:


    // ROTA - RENDERIZA FORMULÁRIO DE REGISTRO DOS EQUIPAMENTOS

    app.get('/cadastro-equipamentos', function(req, res){
        res.render('form')
    })

    // ROTA - REGISTRAR EQUIPAMENTOS

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
            desceqp_marca: req.body.desceqp_marca,
            desceqp_imagem: (typeof req.files.desceqp_imagem !== 'undefined') ? req.files['desceqp_imagem'][0].filename: '',
            desceqp_pdf: (typeof req.files.desceqp_pdf !== 'undefined') ? req.files['desceqp_pdf'][0].filename: '',
        };

        const nomeEquipamento = await Post.findAll({attributes: ['desceqp_nomeeqp']})
        const desceqp_nomeeqp = req.body.desceqp_nomeeqp

            try {
                if(nomeEquipamento.map((v) =>(v.desceqp_nomeeqp).toLowerCase()) != desceqp_nomeeqp.toLowerCase()){
                    const dbResponse = await Post.create(dataToInsert);
                    res.redirect('/cadastro-equipamento');
                }else{
                    res.json('Equipamento já cadastrado no sistema!')
                }
            } catch (ex) {
                console.error(ex);
                res.render('erro');
            }
});

    // ROTA - EDITAR EQUIPAMENTO

    app.put('/equipamento-editado', async function(req, res){

        const dataToInsert ={
            id_fornecedor: req.body.id_fornecedor,
            desceqp_nomeeqp: req.body.desceqp_nomeeqp,
            desceqp_modelo: req.body.desceqp_modelo,
            desceqp_consumoene: req.body.desceqp_consumoene,
            desceqp_consumotipo: req.body.desceqp_consumotipo,
            desceqp_precoeqp: req.body.desceqp_precoeqp,
            desceqp_dataultpreco: req.body.desceqp_dataultpreco,
            desceqp_capacidadeprod: req.body.desceqp_capacidadeprod,
            desceqp_comentario: req.body.desceqp_comentario,
        }

        const {id} = req.body
        
        try{
            const dbResponse = await Post.update(dataToInsert, {
                where: {
                    id: id
                }
            })
        } catch (ex) {
            console.error(ex);
            res.render('erro')
        }
        
    });

    // ROTA - DELETAR EQUIPAMENTO

    app.delete('/equipamento-deletado/:id', async function(req, res) {

        const {id} = req.params

        const dbResponse = await Post.destroy({where:{id: id}})
    })

    // ROTA - RECEBE REQ DO FRONT (INFOS EQUIPAMENTOS)

    app.get('/list-infosequipamentos', async (req, res) =>{
        await Post.findAll()
        .then((value) =>{
            return res.json({
                value,
                url: "http://192.168.10.228:1212/files/"
            })
        }).catch(() =>{
            res.render('erro')
        })
    })


    //REPRESENTANTES:


    // ROTA - RENDERIZA FORMULÁRIO DE REGISTRO DOS REPRESENTANTES 

    app.get('/cadastro-representante', function(req, res){
        res.render('formrepresentantes')
    });

    // ROTA - REGISTRAR REPRESENTANTES

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

        const nomeRepresentante = await PostRep.findAll({attributes: ['representante_nome']})
        const representante_nome = req.body.representante_nome

            try {
                if(nomeRepresentante.map((v) =>(v.representante_nome)) != representante_nome){
                    const dbResponse = await PostRep.create(dataToInsert);
                    res.redirect('/cadastro-representante');
                }else{
                    res.json('Representante já cadastrado no sistema!')
                }
            } catch (ex) {
                console.error(ex);
                res.render('erro');
            }
});

    // ROTA - EDITAR REPRESENTANTE

    app.put('/representante-editado', async function(req, res){

        const dataToInsert = {
            representante_nome: req.body.representante_nome,
            representante_telefone: req.body.representante_telefone,
            representante_site: req.body.representante_site,
            representante_estadoatuacao: req.body.representante_estadoatuacao,
            representante_comentarios: req.body.representante_comentarios,
            representante_empresasrep: req.body.representante_empresasrep + ''.replaceAll('["]', ''), // Remove elementos
            representante_status: req.body.representante_status,
        };
        
        const {id} = req.body
        
        try{
            const dbResponse = await PostRep.update(dataToInsert, {
                where: {
                    id: id
                }
            })
        } catch (ex) {
            console.error(ex);
            res.render('erro')
        }
        
    });

    // ROTA - DELETAR REPRESENTANTE

    app.delete('/representante-deletado/:id', async function(req, res) {

        const {id} = req.params

        const dbResponse = await PostRep.destroy({where:{id: id}})
    })

    // ROTA - RECEBE REQ DO FRONT (INFOS REPRESENTANTES)

    app.get('/list-img', async (req, res) =>{
        await PostRep.findAll()
        .then((representante_imagem) =>{
            return res.json({
                representante_imagem,
                url: "http://192.168.10.228:1212/files/"
            }) 
        }).catch(() =>{
            res.render('erro')
        })
    })


    //CLIENTES:


    // ROTA - CRIA CLIENTE
    
    app.get('/cadastro-clientes', function(req, res){
        res.render('formClientes')
    });

    app.post('/clientecadastrado', upload.single('clientes_logo'), async (req, res) => {

        const dataToInsert = {
            clientes_razaosocial:  req.body.clientes_razaosocial ,
            clientes_nomefantasia:  req.body.clientes_nomefantasia ,
            clientes_apelido:  req.body.clientes_apelido ,
            clientes_cnpj:  req.body.clientes_cnpj,
            clientes_endereco:  req.body.clientes_endereco ,
            clientes_premissasDeProjeto:  req.body.clientes_premissasDeProjeto + '' ,
            clientes_ie:  req.body.clientes_ie,
            clientes_nomeResponsavel:  req.body.clientes_nomeResponsavel + '',
            clientes_telefone:  req.body.clientes_telefone ,
            clientes_email:  req.body.clientes_email ,
            clientes_logo: (typeof req.file !== 'undefined') ? req.file.filename : '',
        };

        const cnpjCliente = await PostClientes.findAll({attributes: ['clientes_cnpj']})
        const clientes_cnpj = req.body.clientes_cnpj

        try {
                if(cnpjCliente.map((v) =>(v.clientes_cnpj)) != clientes_cnpj){
                    const dbResponse = await PostClientes.create(dataToInsert);
                    res.redirect('/cadastro-clientes');
                }else{
                    res.json('Cliente já cadastrado no sistema!')
                }
            } catch (ex) {
                console.error(ex);
                res.render('erro');
            }
});

    app.put('/cliente-editado', async function(req, res){

        const dataToInsert = {
            clientes_razaosocial: req.body.clientes_razaosocial,
            clientes_nomefantasia: req.body.clientes_nomefantasia,
            clientes_apelido: req.body.clientes_apelido,
            clientes_cnpj: req.body.clientes_cnpj,
            clientes_endereco: req.body.clientes_endereco,
            clientes_premissasDeProjeto: req.body.clientes_premissasDeProjeto,
            clientes_ie: req.body.clientes_ie,
            clientes_nomeResponsavel: req.body.clientes_nomeResponsavel,
            clientes_telefone: req.body.clientes_telefone,
            clientes_email: req.body.clientes_email,
        };
        const {id} = req.body
        
        try{
            const dbResponse = await PostClientes.update(dataToInsert, {
                where: {
                    id: id
                }
            })
        } catch (ex) {
            console.error(ex);
            res.render('erro')
        }
        
    });

    app.delete('/cliente-deletado/:id', async function(req, res) {

        const {id} = req.params

        const dbResponse = await PostClientes.destroy({where:{id: id}})
    })

    // ROTA - RECEBE REQ DO FRONT (INFOS CLIENTES)

    app.get('/list-infosClientes', async (req, res) =>{
        await PostClientes.findAll()
        .then((clientes_logo) =>{
            return res.json({
                clientes_logo,
                url: "http://192.168.10.228:1212/files/"
            }) 
        }).catch(() =>{
            res.render('erro')
        })
    })

    app.post('/todo-cadastrado', async (req, res) => {
        const dataToInsert = {
            todo_dataConclusao: req.body.todo_dataConclusao,
            todo_eventos: req.body.todo_eventos,
            todo_autor: req.body.todo_autor,
            idCliente: req.body.cliente_id
        }

        try{
            const dbResponse = await PostToDo.create(dataToInsert)
            res.redirect('192.168.10.228:3000/dashboard')
        }catch{
            res.render('erro')
        }
    })

    app.put('/todo-editado', async function(req, res){

        const dataToInsert = {
            todo_dataConclusao: req.body.todo_dataConclusao,
            todo_eventos: req.body.todo_eventos,
            todo_autor: req.body.todo_autor,
        };

        const {todo_id} = req.body
        
        try{
            const dbResponse = await PostToDo.update(dataToInsert, {
                where: {
                    id: todo_id
                }
            })
        } catch (ex) {
            console.error(ex);
            res.render('erro')
        }
        
    });

    app.delete('/todo-deletado/:id', async function(req, res) {

        const {id} = req.params

        const dbResponse = await PostToDo.destroy({where:{id: id}})
    })

    app.get('/list-infosTodo', async (req, res) =>{
        await PostToDo.findAll({
            include: [{
                attributes: ['clientes_apelido', 'id'],
                model: PostClientes
            }] 
        })
        .then((value) => {
            res.json({
                value,
                url: "http://192.168.10.228:1212/files/"
            })
        }).catch(() => {
            res.render('erro')
        })
    })

    // PORTA QUE O BACK-END ESTÁ SENDO EXECUTADO

app.listen(1212, function(){
    console.log('SERVIDOR RODANDO')
});

