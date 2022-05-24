
const express = require('express')

const app = express()

const handlebars = require('express-handlebars')

const bodyParser = require('body-parser')

const post = require ('./models/Post')

const Post = require('./models/Post')

const PostFornec = require('./models/PostFornec')

const PostRep = require('./models/PostRep')

const PostClientes = require('./models/PostClientes')

const PostPredios = require('./models/PostPredios')

const PostDoed = require('./models/PostDoed')

const PostUser = require('./models/PostUser')

const PostPermissoesUser = require('./models/PostPermissoesUser')

const PostSetorUser = require('./models/PostSetorUser')

const path = require('path')

const upload = require('./middleware/uploadimg')

const res = require('express/lib/response')

const req = require('express/lib/request')

const multer = require('multer')

var cors = require('cors');

const db = require('./models/db')

const { json } = require('body-parser')

const mysql = require('mysql2')

const jwt = require('jsonwebtoken')

const { decode } = require('punycode')
const { set } = require('express/lib/response')

const SECRET = 'experconsult'

    // PERMITE ACESSO DO BROWSER AO SISTEMA

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "*");
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

    function verifyJwt(req, res, next){ // FIXME VERIFICAÇÃO FALHANDO, PROVAVEL SOLUÇÃO É PASSAR OS FORMS DO BACK PARA O FRONT... SHIT
        const token = req.headers['Bearer'];
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err) return console.log(err)
            req.id = decoded.id
            next()
        })
    }

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

    app.get('/cadastro-clientes', (req, res) => {
        PostClientes.findAll().then(values => {
            res.render('formClientes', {clientes: values})
        })
    })


    //ROTAS GERAIS

    // SUPORTE

    app.get('/suporte',verifyJwt ,function (req, res){
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
                        res.redirect('http://expertestes:3000/cadastro-fornecedores'); // FIXME TO IP SERVER
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
                url: "http://192.168.10.122:1212/files/" //FIXME TO IP SERVER
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
                    res.redirect('/cadastro-equipamentos');
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

    //TODO CONFERÊNCIA DE ROTAS DANDO ERRO

    app.get('/list-infosequipamentos', async (req, res) =>{
        await Post.findAll()
        .then((value) =>{
            return res.json({
                value,
                url: "http://192.168.10.122:1212/files/" //FIXME TO IP SERVER
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
            representante_empresasrep: req.body.representante_empresasrep + ''.replaceAll('["/]', ''), // Remove elementos
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
                url: "http://192.168.10.122:1212/files/" //FIXME TO IP SERVER
            }) 
        }).catch(() =>{
            res.render('erro')
        })
    })


    //CLIENTES:


    // ROTA - FORMULÁRIO DE CLIENTES

    // ROTA - FAZ A INSERÇÃO DE DADOS DE CLIENTES NO BANCO DE DADOS

    app.post('/clientecadastrado', upload.single('clientes_logo'), async (req, res) => {

        const dataToInsert = {
            clientes_razaosocial:  req.body.clientes_razaosocial ,
            clientes_nomefantasia:  req.body.clientes_nomefantasia ,
            clientes_apelido:  req.body.clientes_apelido,
            clientes_cnpj:  req.body.clientes_cnpj,
            clientes_endereco:  req.body.clientes_endereco ,
            clientes_premissasDeProjeto:  req.body.clientes_premissasDeProjeto + '' ,
            clientes_ie:  req.body.clientes_ie,
            clientes_nomeResponsavel:  req.body.clientes_nomeResponsavel + '',
            clientes_telefone:  req.body.clientes_telefone ,
            clientes_email:  req.body.clientes_email + '',
            clientes_logo: (typeof req.file !== 'undefined') ? req.file.filename : '',
        };

        const cnpjCliente = await PostClientes.findAll({attributes: ['clientes_cnpj']})
        
        const clientes_cnpj = req.body.clientes_cnpj

        try {
                if(cnpjCliente.map((v) =>(v.clientes_cnpj)) != clientes_cnpj){
                    const dbResponse = await PostClientes.create(dataToInsert);
                    res.redirect('http://192.168.10.122:3000/cadastro-clientes') // FIXME TO IP SERVER
                    
                }else{
                    res.json('Cliente já cadastrado no sistema!')
                }
            } catch (ex) {
                console.error(ex);
                res.render('erro');
            }
    });

    // ROTA - FAZ O UPDATE DOS DADOS DE CLIENTES

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
                url: "http://192.168.10.122:1212/files/" //FIXME TO IP SERVER
            })  
        }).catch(() =>{
            res.render('erro')
        })
    })

    // ROTA - FAZ OS CADASTROS DOS EVENTOS NO BD (PREDIOS)

    app.post('/predio-cadastrado', async (req, res) => {
        const dataToInsert = {
            predios_dataConclusao: req.body.predios_dataConclusao,
            predios_nomeDosPredios: req.body.predios_nomeDosPredios,
            predios_autor: req.body.predios_autor,
            idCliente: req.body.cliente_id
        }

        try{
            const dbResponse = await PostPredios.create(dataToInsert)
            res.redirect('192.168.10.122:3000/dashboard') //FIXME TO IP SERVER
        }catch{
            res.render('erro')
        }
    })

    // ROTA - FAZ O EDIT DOS EVENTOS (PREDIOS)

    app.put('/predio-editado', async function(req, res){

        const dataToInsert = {
            predios_nomeDosPredios: req.body.predios_nomeDosPredios,
            predios_autor: req.body.predios_autor,
        };

        const {id} = req.body
        
        try{
            const dbResponse = await PostPredios.update(dataToInsert, {
                where: {
                    id: id
                }
            })
        } catch (ex) {
            console.error(ex);
            res.render('erro')
        }
        
    });

    // ROTA - DELETA O EVENTO PELO ID (PREDIOS)

    app.delete('/predio-deletado/:id', async function(req, res) {

        const {id} = req.params

        const dbResponse = await PostPredios.destroy({where:{id: id}})
    })

    // ROTA - RECEBE UMA REQ DO FRONT E ENVIA DADOS (PREDIOS)

    app.get('/list-infosPredios', async (req, res) =>{
        await PostPredios.findAll({
            include: [{
                model: PostClientes,
                attributes: ['clientes_apelido', 'id']
            }] 
        })
        .then((value) => {
            res.json({
                value,
                url: "http://192.168.10.122:1212/files/" //FIXME TO IP SERVER
            })
        }).catch((err) => {
            console.log(err)
            res.render('erro')
        })
    })

    // ROTA - FAZ A INSERÇÃO NO BANCO DE DADOS DOS HISTÓRICOS (DOED)

    app.post('/doed-cadastrado', async (req, res) => {
        const dataToInsert = {
            doed_eventos: req.body.doed_eventos,
            doed_autor: req.body.doed_autor,
            predios_clientes: req.body.predios_clientes,
        }

        try{
            const dbResponse = await PostDoed.create(dataToInsert)
            res.redirect('192.168.10.122:3000/dashboard') //FIXME TO IP SERVER
        }catch{
            res.render('erro')
        }
    })

    // ROTA - FAZ O EDIT DOS EVENTOS (DOED)

    app.put('/doed-editado', async function(req, res){

        const dataToInsert = {
            predios_nomeDosPredios: req.body.predios_nomeDosPredios,
            predios_autor: req.body.predios_autor,
        };

        const {id} = req.body
        
        try{
            const dbResponse = await PostDoed.update(dataToInsert, {
                where: {
                    id: id
                }
            })
        } catch (ex) {
            console.error(ex);
            res.render('erro')
        }
        
    });

    // ROTA - DELETA O EVENTO PELO ID (DOED)

    app.delete('/doed-deletado/:id', async function(req, res) {

        const {id} = req.params

        const dbResponse = await PostDoed.destroy({where:{id: id}})
    })

    // ROTA - RECEBE UMA REQ DO FRONT E ENVIA DADOS (DOED)

    app.get('/list-infosDoed', async (req, res) =>{
        await PostDoed.findAll({
            include: [{
                model: PostPredios,
                attributes: ['predios_nomeDosPredios', 'predios_autor', 'id']
            }] 
        })
        .then((value) => {
            res.json({
                value,
                url: "http://192.168.10.122:1212/files/" //FIXME TO IP SERVER
            })
        }).catch((err) => {
            console.log(err)
            res.render('erro')
        })
    })

    // ROTAS DOS USUÁRIOS

    //ROTA DE PPOST PARA VERIFICAR EXISTENCIA DO USER

    // POST DOS DADOS DE USUÁRIO PARA VERIFICAÇÃO DE AUTORIZAÇÃO DO LOGIN

    //FIXME VERIFICAR MOTIVO DAS ROTAS PRIVADAS DO BACK-END NÃO FUNCIONAREM

    app.post('/login-auth', async (req, res) => {

        const usersdb = await PostUser.findAll({attributes: ['user_nomeUser', 'id']})

        const senhadb = await PostUser.findAll({attributes: ['user_senha']})

        for(let i = 0; i < usersdb.length; i++){

            if(req.body.usuario === usersdb[i].user_nomeUser && 
            req.body.senha === senhadb[i].user_senha){
                const id = usersdb[i].id
                const token = jwt.sign({id: id}, SECRET, {expiresIn: 1200});
                return res.json({auth: true, token});
            }
        }
    })

    // LISTAGEM DE DADOS DOS USUÁRIOS
    
    app.get('/list-infosUserPerm', async (req, res) => {
        await PostUser.findAll({
            include: [{
                model: PostPermissoesUser,
                attributes: ['id', 'perm_nomeDaPerm']
            }]
        })
        .then((value) => {
            res.json({
                value,
                url: "http://192.168.10.228:1212/files/" // FIXME TO IP SERVER
            })
            console.log(req.id + 'fez esta chamada')
        }).catch((err) => {
            console.log(err)
            res.render('erro')
        });
    });

    // PORTA QUE O BACK-END ESTÁ SENDO EXECUTADO

app.listen(1212, function(){
    console.log('Servidor rodando na porta: 1212'.toUpperCase())
});

