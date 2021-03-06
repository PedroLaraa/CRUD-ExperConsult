
const express = require('express');

const app = express();

const handlebars = require('express-handlebars');

const bodyParser = require('body-parser');

const post = require('./models/Post');

const Post = require('./models/Post');

const PostFornec = require('./models/PostFornec');

const PostRep = require('./models/PostRep');

const PostClientes = require('./models/PostClientes');

const PostPredios = require('./models/PostPredios');

const PostDoed = require('./models/PostDoed');

const PostUser = require('./models/PostUser');

const PostPermissoesUser = require('./models/PostPermissoesUser');

const PostSetorUser = require('./models/PostSetorUser');

const PostNotificaUser = require('./models/PostNotificaUser');

const PostMarcasEqp = require('./models/PostMarcasEqp');

const PostNotificaSetor = require('./models/PostNotificaSetor');

const PostObras = require('./models/PostObras');

const PostCompras = require('./models/PostCompras');

const PostToDo = require('./models/PostToDo');

const PostAtasReuniao = require('./models/PostAtasReuniao');

const PostSetorObra = require('./models/PostSetorObra');

const PostSetorEqp = require('./models/PostSetorEqp');

const path = require('path');

const upload = require('./middleware/uploadimg');

const res = require('express/lib/response');

const req = require('express/lib/request');

const multer = require('multer');

var cors = require('cors');

const db = require('./models/db');

const { json } = require('body-parser');

const mysql = require('mysql2');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const SECRET = 'experconsult';

const PDFKit = require('pdfkit');

const fs = require('fs');

const pdf = new PDFKit();

// PERMITE ACESSO DO BROWSER AO SISTEMA

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    app.use(cors());
    next();
});

// DEFINE AS CONSULTAS DE ARQUIVOS PARA PASTA PUBLIC

app.use(express.static(path.join(__dirname, 'public')));
app.use('/files', express.static(path.resolve(__dirname, 'public', 'upload')));

// CONFIGS OF HANDLEBARS
// TEMPLATE ENGINE MAIN HANDLEBARS
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set("view engine", "handlebars");

// CONFIGS DO BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ROUTES FOR FRONT END INFOS

// Lista os fornecedores no Form Handlebars dos representantes
app.get('/cadastro-representante', (req, res) => {
    PostFornec.findAll().then(fornecedores => {
        res.render('formrepresentantes', { fornecedores: fornecedores });
    });
});


// Lista os fornecedores no Form Handlebars dos equipamentos
app.get('/cadastro-equipamentos', (req, res) => {
    PostFornec.findAll().then(fornecedores => {
        res.render('form', { fornecedores: fornecedores });
    });
});

app.get('/cadastro-clientes', (req, res) => {
    PostClientes.findAll().then(values => {
        res.render('formClientes', { clientes: values });
    });
});


//ROTAS GERAIS

// SUPORTE

app.get('/suporte', function (req, res) {
    res.render('suporte');
});

// ROTAS DE CRUD

// FORNECEDORES:


// ROTA - RENDERIZA FORMUL??RIO DE REGISTRO DOS FORNECEDORES

app.get('/cadastro-fornecedor', function (req, res) {
    res.render('formfornecedores');
});

app.post('/fornecedorcadastrado', upload.single('fornec_foto'), async function (req, res) {

    const dataToInsert = {
        fornec_nivelfornecedor: req.body.fornec_nivelfornecedor,
        fornec_fornecedornome: req.body.fornec_fornecedornome,
        fornec_razaosocial: req.body.fornec_razaosocial,
        fornec_telefone: req.body.fornec_telefone,
        fornec_email: req.body.fornec_email,
        fornec_site: req.body.fornec_site,
        fornec_foto: (typeof req.file !== 'undefined') ? req.file.filename : '',
    };

    const nomeFornecedor = await PostFornec.findAll({ attributes: ['fornec_fornecedornome'] });
    const fornec_fornecedornome = req.body.fornec_fornecedornome;

    try {
        if (nomeFornecedor.map((v) => (v.fornec_fornecedornome).toLowerCase()) != fornec_fornecedornome.toLowerCase()) {
            const dbResponse = await PostFornec.create(dataToInsert);
            res.redirect('http://expertestes:3000/cadastro-fornecedores'); // FIXME TO IP SERVER
        } else {
            res.json('Fornecedor j?? cadastrado no sistema!');
        };
    } catch (ex) {
        console.error(ex);
        res.render('erro');
    };
});

// ROTA - EDITAR FORNECEDORES

app.put('/fornecedor-editado', async function (req, res) {

    const dataToInsert = {
        fornec_fornecedornome: req.body.fornec_fornecedornome,
        fornec_nivelfornecedor: req.body.fornec_nivelfornecedor,
        fornec_razaosocial: req.body.fornec_razaosocial,
        fornec_telefone: req.body.fornec_telefone,
        fornec_email: req.body.fornec_email,
        fornec_site: req.body.fornec_site,
    };

    const { id } = req.body;

    try {
        const dbResponse = await PostFornec.update(dataToInsert, {
            where: {
                id: id
            }
        });
    } catch (ex) {
        console.error(ex);
        res.render('erro');
    };

});

// ROTA - DELETA FORNECEDORES

app.delete('/fornecedor-deletado/:id', async function (req, res) {

    const { id } = req.params;

    const dbResponse = await PostFornec.destroy({ where: { id: id } });

});

// ROTA - RECEBE REQ DO FRONT(INFOS FORNECEDORES)

app.get('/list-imgf', async (req, res) => {
    await PostFornec.findAll()
        .then((fornec_foto) => {
            return res.json({
                fornec_foto,
                url: "http://192.168.10.127:1212/files/" //FIXME TO IP SERVER
            })
        }).catch(() => {
            res.render('erro');
        });
});

//EQUIPAMENTOS:

// ROTA - RENDERIZA FORMUL??RIO DE REGISTRO DOS EQUIPAMENTOS

app.get('/cadastro-equipamentos', function (req, res) {
    res.render('form');
});

// ROTA - REGISTRAR EQUIPAMENTOS

app.post('/equipamentocadastrado', upload.fields([{ name: 'desceqp_imagem', maxCount: 1 }, {
    name: 'desceqp_pdf', maxCount: 1
}]), async function (req, res) {

    const dataToInsert = {
        desceqp_nomeeqp: req.body.desceqp_nomeeqp,
        desceqp_modelo: req.body.desceqp_modelo,
        desceqp_capacidadeprod: req.body.desceqp_capacidadeprod,
        desceqp_consumoene: req.body.desceqp_consumoene,
        desceqp_consumotipo: req.body.desceqp_consumotipo,
        desceqp_comentario: req.body.desceqp_comentario,
        desceqp_precoeqp: req.body.desceqp_precoeqp,
        desceqp_dataultpreco: req.body.desceqp_dataultpreco,
        desceqp_marca: req.body.desceqp_marca,
        fornecedor_idfk: req.body.fornecedor_idfk,
        desceqp_moeda: req.body.desceqp_moeda,
        desceqp_imagem: (typeof req.files.desceqp_imagem !== 'undefined') ? req.files['desceqp_imagem'][0].filename : '',
        desceqp_pdf: (typeof req.files.desceqp_pdf !== 'undefined') ? req.files['desceqp_pdf'][0].filename : '',
    };

    const nomeEquipamento = await Post.findAll({ attributes: ['desceqp_nomeeqp'] });
    const desceqp_nomeeqp = req.body.desceqp_nomeeqp;

    try {
        if (nomeEquipamento.map((v) => (v.desceqp_nomeeqp).toLowerCase()) != desceqp_nomeeqp.toLowerCase()) {
            const dbResponse = await Post.create(dataToInsert);
            res.redirect('http://192.168.10.127:3000/cadastro-equipamentos'); // FIXME TO IP SERVER
        } else {
            res.json('Equipamento j?? cadastrado no sistema!');
        };
    } catch (ex) {
        console.error(ex);
        res.render('erro');
    };
});

// ROTA - EDITAR EQUIPAMENTO

app.put('/equipamento-editado', async function (req, res) {

    const dataToInsert = {
        desceqp_nomeeqp: req.body.desceqp_nomeeqp,
        desceqp_modelo: req.body.desceqp_modelo,
        desceqp_consumoene: req.body.desceqp_consumoene,
        desceqp_consumotipo: req.body.desceqp_consumotipo,
        desceqp_precoeqp: req.body.desceqp_precoeqp,
        desceqp_dataultpreco: req.body.desceqp_dataultpreco,
        desceqp_capacidadeprod: req.body.desceqp_capacidadeprod,
        desceqp_comentario: req.body.desceqp_comentario,
        desceqp_moeda: req.body.desceqp_moeda,
    };

    const { id } = req.body;

    try {
        const dbResponse = await Post.update(dataToInsert, {
            where: {
                id: id
            }
        });
    } catch (ex) {
        console.error(ex);
        res.render('erro')
    };

});

// ROTA - DELETAR EQUIPAMENTO

app.delete('/equipamento-deletado/:id', async function (req, res) {

    const { id } = req.params;

    const dbResponse = await Post.destroy({ where: { id: id } });

});

// ROTA - RECEBE REQ DO FRONT (INFOS EQUIPAMENTOS)

app.get('/list-infosequipamentos', async (req, res) => {
    await Post.findAll({
        include: [{
            model: PostFornec,
            attributes: ['fornec_fornecedornome']
        }]
    })
        .then((value) => {
            return res.json({
                value,
                url: "http://192.168.10.127:1212/files/" //FIXME TO IP SERVER
            })
        }).catch(() => {
            res.render('erro');
        });
});

app.get('/list-infosequipamentosMarcas', async (req, res) => {
    await PostMarcasEqp.findAll({
        include: [{
            model: PostFornec,
            attributes: ['fornec_fornecedornome'],
        }]
    })
        .then((value) => {
            return res.json({
                value,
                url: "http://192.168.10.127:1212/files/" //FIXME TO IP SERVER
            })
        }).catch(() => {
            res.render('erro');
        });
});

//REPRESENTANTES:


// ROTA - RENDERIZA FORMUL??RIO DE REGISTRO DOS REPRESENTANTES 

app.get('/cadastro-representante', function (req, res) {
    res.render('formrepresentantes');
});

// ROTA - REGISTRAR REPRESENTANTES

app.post('/representantecadastrado', upload.single('representante_imagem'), async function (req, res) {

    const dataToInsert = {
        representante_nome: req.body.representante_nome,
        representante_telefone: req.body.representante_telefone,
        representante_site: req.body.representante_site,
        representante_estadoatuacao: req.body.representante_estadoatuacao,
        representante_comentarios: req.body.representante_comentarios,
        representante_empresasrep: req.body.representante_empresasrep + ''.replace(',', '-'), // Remove elementos
        representante_status: req.body.representante_status,
    };

    const nomeRepresentante = await PostRep.findAll({ attributes: ['representante_nome'] });
    const representante_nome = req.body.representante_nome;

    try {
        if (nomeRepresentante.map((v) => (v.representante_nome)) != representante_nome) {
            const dbResponse = await PostRep.create(dataToInsert);
            res.redirect('http://expertestes:3000/cadastro-representante'); // FIXME TO IP SERVER
        } else {
            res.json('Representante j?? cadastrado no sistema!')
        };
    } catch (ex) {
        console.error(ex);
        res.render('erro');
    };
});

// ROTA - EDITAR REPRESENTANTE

app.put('/representante-editado', async function (req, res) {

    const dataToInsert = {
        representante_nome: req.body.representante_nome,
        representante_telefone: req.body.representante_telefone,
        representante_site: req.body.representante_site,
        representante_estadoatuacao: req.body.representante_estadoatuacao,
        representante_comentarios: req.body.representante_comentarios,
        representante_empresasrep: req.body.representante_empresasrep + ''.replaceAll('["/]', ''), // Remove elementos
        representante_status: req.body.representante_status,
    };

    const { id } = req.body;

    try {
        const dbResponse = await PostRep.update(dataToInsert, {
            where: {
                id: id
            }
        });
    } catch (ex) {
        console.error(ex);
        res.render('erro');
    };

});

// ROTA - DELETAR REPRESENTANTE

app.delete('/representante-deletado/:id', async function (req, res) {

    const { id } = req.params;

    const dbResponse = await PostRep.destroy({ where: { id: id } });
})

// ROTA - RECEBE REQ DO FRONT (INFOS REPRESENTANTES)

app.get('/list-img', async (req, res) => {
    await PostRep.findAll({
        include: [{
            model: PostFornec,
            attributes: ['fornec_fornecedornome', 'id']
        }]
    })
        .then((representante_imagem) => {
            return res.json({
                representante_imagem,
                url: "http://192.168.10.127:1212/files/" //FIXME TO IP SERVER
            });
        }).catch(() => {
            res.render('erro')
        });
});

//CLIENTES:

// ROTA - FORMUL??RIO DE CLIENTES

// ROTA - FAZ A INSER????O DE DADOS DE CLIENTES NO BANCO DE DADOS

app.post('/clientecadastrado', upload.single('clientes_logo'), async (req, res) => {

    const dataToInsert = {
        clientes_razaosocial: req.body.clientes_razaosocial,
        clientes_nomefantasia: req.body.clientes_nomefantasia,
        clientes_apelido: req.body.clientes_apelido,
        clientes_cnpj: req.body.clientes_cnpj,
        clientes_endereco: req.body.clientes_endereco + ''.replace('[""]', ' '),
        clientes_premissasDeProjeto: req.body.clientes_premissasDeProjeto + '',
        clientes_ie: req.body.clientes_ie,
        clientes_nomeResponsavel: req.body.clientes_nomeResponsavel + '',
        clientes_telefone: req.body.clientes_telefone,
        clientes_email: req.body.clientes_email + '',
        clientes_logo: (typeof req.file !== 'undefined') ? req.file.filename : '',
    };

    const cnpjCliente = await PostClientes.findAll({ attributes: ['clientes_cnpj'] });

    const clientes_cnpj = req.body.clientes_cnpj;

    try {
        if (cnpjCliente.map((v) => (v.clientes_cnpj)) != clientes_cnpj) {
            const dbResponse = await PostClientes.create(dataToInsert);
            res.redirect('http://expertestes:3000/cadastro-clientes'); // FIXME TO IP SERVER

        } else {
            res.json('Cliente j?? cadastrado no sistema!');
        };
    } catch (ex) {
        console.error(ex);
        res.render('erro');
    };
});

// ROTA - FAZ O UPDATE DOS DADOS DE CLIENTES

app.put('/cliente-editado', async function (req, res) {

    const dataToInsert = {
        clientes_razaosocial: req.body.clientes_razaosocial,
        clientes_nomefantasia: req.body.clientes_nomefantasia,
        clientes_apelido: req.body.clientes_apelido,
        clientes_cnpj: req.body.clientes_cnpj,
        clientes_endereco: req.body.clientes_endereco + '',
        clientes_premissasDeProjeto: req.body.clientes_premissasDeProjeto,
        clientes_ie: req.body.clientes_ie,
        clientes_nomeResponsavel: req.body.clientes_nomeResponsavel,
        clientes_telefone: req.body.clientes_telefone,
        clientes_email: req.body.clientes_email,
    };

    const { id } = req.body;

    try {
        const dbResponse = await PostClientes.update(dataToInsert, {
            where: {
                id: id
            }
        });
    } catch (ex) {
        console.error(ex);
        res.render('erro')
    };
});

app.delete('/cliente-deletado/:id', async function (req, res) {

    const { id } = req.params;

    const dbResponse = await PostClientes.destroy({ where: { id: id } });

});

// ROTA - RECEBE REQ DO FRONT (INFOS CLIENTES)

app.get('/list-infosClientes', async (req, res) => {
    await PostClientes.findAll()
        .then((clientes_logo) => {
            return res.json({
                clientes_logo,
                url: "http://192.168.10.127:1212/files/" //FIXME TO IP SERVER
            })
        }).catch((err) => {
            console.log(err);
            res.render('erro');
        });
});

// ROTAS - OBRAS:

// ROTA - FAZ O CADASTRO DA OBRA NO BD (OBRAS):

app.post('/obracadastrada', upload.single(), async (req, res) => {

    const dataToInsert = {
        obras_nomeDaObra: req.body.obras_nomeDaObra + req.body.obras_cliente,
        obras_premissasDaObra: req.body.obras_premissasDaObra,
        obras_cliente: req.body.obras_cliente
    };

    try {
        const dbResponse = await PostObras.create(dataToInsert);
        res.redirect('http://expertestes:3000/cadastro-obra'); // FIXME TO IP SERVER
    }
    catch (err) {
        console.error(err);
        res.render('erro');
    }
});

// ROTA - RECEBE A REQUISI????O DO FRONT (INFOS OBRAS):

app.get('/list-infosObras', async (req, res) => {

    await PostObras.findAll({
        include: [{
            model: PostClientes,
            attributes: ['clientes_apelido', 'clientes_logo', 'id']
        }]
    })
        .then((value) => {
            return res.json({
                value,
                url: "http://192.168.10.127:1212/files/" //FIXME TO IP SERVER
            })
        })
        .catch((err) => {
            console.error(err);
            res.render('erro');
        });
});

app.put('/obra-editada', async function (req, res) {

    const dataToInsert = {
        obras_premissasDaObra: req.body.obras_premissasDaObra,
    };

    const { id } = req.body;

    try {
        const dbResponse = await PostObras.update(dataToInsert, {
            where: {
                id: id
            }
        })
    } catch (err) {
        console.error(err);
        res.render('erro');
    };
});

// ROTA - FAZ O DELETE DOS DADOS DE OBRAS

app.delete('/obra-deletada/:id', async function (req, res) {

    const { id } = req.params;

    const dbResponse = await PostClientes.destroy({ where: { id: id } });

});

// ROTA - FAZ OS CADASTROS DOS EVENTOS NO BD (PREDIOS)

app.post('/predio-cadastrado', async (req, res) => {
    const dataToInsert = {
        predios_dataConclusao: req.body.predios_dataConclusao,
        predios_nomeDosPredios: req.body.predios_nomeDosPredios,
        predios_autor: req.body.predios_autor,
        idCliente: req.body.cliente_id
    };

    try {
        const dbResponse = await PostPredios.create(dataToInsert);
        res.redirect('192.168.10.127:3000/dashboard'); //FIXME TO IP SERVER
    } catch {
        res.render('erro');
    };
});

// ROTA - FAZ O EDIT DOS EVENTOS (PREDIOS)

app.put('/predio-editado', async function (req, res) {

    const dataToInsert = {
        predios_nomeDosPredios: req.body.predios_nomeDosPredios,
        predios_autor: req.body.predios_autor,
    };

    const { id } = req.body;

    try {
        const dbResponse = await PostPredios.update(dataToInsert, {
            where: {
                id: id
            }
        })
    } catch (ex) {
        console.error(ex);
        res.render('erro')
    };

});

// ROTA - DELETA O EVENTO PELO ID (PREDIOS)

app.delete('/predio-deletado/:id', async function (req, res) {

    const { id } = req.params;

    const dbResponse = await PostPredios.destroy({ where: { id: id } });
});

// ROTA - RECEBE UMA REQ DO FRONT E ENVIA DADOS (PREDIOS)

app.get('/list-infosPredios', async (req, res) => {
    await PostPredios.findAll({
        include: [{
            model: PostObras,
            attributes: ['obras_nomeDaObra', 'id']
        }]
    })
        .then((value) => {
            res.json({
                value,
                url: "http://192.168.10.127:1212/files/" //FIXME TO IP SERVER
            })
        }).catch((err) => {
            console.log(err)
            res.render('erro')
        });
});

// ROTA - FAZ A INSER????O NO BANCO DE DADOS DOS HIST??RICOS (DOED)

app.post('/doed-cadastrado', async (req, res) => {

    const dataToInsert = {
        doed_eventos: req.body.doed_eventos,
        doed_autor: req.body.doed_autor,
        predios_clientes: req.body.predios_clientes,
    };

    try {
        const dbResponse = await PostDoed.create(dataToInsert)
        res.redirect('http://expertestes:3000/dashboard'); //FIXME TO IP SERVER
    } catch {
        res.render('erro');
    };

});

// ROTA - FAZ O EDIT DOS EVENTOS (DOED)

app.put('/doed-editado', async function (req, res) {

    const dataToInsert = {
        predios_nomeDosPredios: req.body.predios_nomeDosPredios,
        predios_autor: req.body.predios_autor,
    };

    const { id } = req.body;

    try {
        const dbResponse = await PostDoed.update(dataToInsert, {
            where: {
                id: id
            }
        });
    } catch (ex) {
        console.error(ex);
        res.render('erro')
    };

});

// ROTA - DELETA O EVENTO PELO ID (DOED)

app.delete('/doed-deletado/:id', async function (req, res) {

    const { id } = req.params;

    const dbResponse = await PostDoed.destroy({ where: { id: id } });
})

// ROTA - RECEBE UMA REQ DO FRONT E ENVIA DADOS (DOED)

app.get('/list-infosDoed', async (req, res) => {
    await PostDoed.findAll({
        include: [{
            model: PostPredios,
            attributes: ['predios_nomeDosPredios', 'predios_autor', 'id']
        }]
    })
        .then((value) => {
            res.json({
                value,
                url: "http://192.168.10.127:1212/files/" //FIXME TO IP SERVER
            })
        }).catch((err) => {
            console.log(err);
            res.render('erro');
        });
});

// ROTAS DOS USU??RIOS

//ROTA DE POST PARA VERIFICAR EXISTENCIA DO USER

// POST DOS DADOS DE USU??RIO PARA VERIFICA????O DE AUTORIZA????O DO LOGIN

app.post('/login-auth', async (req, res) => {

    try {

        const usersdb = await PostUser.findAll({ attributes: ['user_nomeUser'] });

        const senhadb = await PostUser.findAll({ attributes: ['user_senha'] });

        const idsdb = await PostUser.findAll({ attributes: ['id'] });

        const usersData = await PostUser.findAll({ attributes: ['user_notificacoesLidas', 'user_setor', 'user_nomeUser', 'user_nome', 'user_cargo', 'user_permissoes', 'user_foto', 'id'] });

        var usuarioEncontrado = false;

        for (let i = 0; i < usersdb.length; i++) {

            if (req.body.usuario == usersdb[i].user_nomeUser &&
                bcrypt.compareSync(req.body.senha, senhadb[i].user_senha)) {
                const id = idsdb[i].id;
                const token = jwt.sign({ id: id }, SECRET, { expiresIn: 1200 });
                const usuario = usersData[i];
                return res.json({ auth: true, token, usuario }), usuarioEncontrado = true;
            };
        };

        if (usuarioEncontrado == false) {
            return res.json({ auth: false })
        };

    } catch (err) {
        console.log(err)
    };

});

//ROTA - FAZ O CADASTRO DE USU??RIO

app.post('/usuariocadastrado', upload.single('user_foto'), async (req, res) => {

    const saltRounds = 10;
    const myPlaintextPassword = req.body.user_senha;

    const hashPassword = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    const dataToInsert = {
        user_nome: req.body.user_nome,
        user_nomeUser: req.body.user_nomeUser,
        user_senha: hashPassword,
        user_email: req.body.user_email,
        user_emailPessoal: req.body.user_emailPessoal,
        user_telefone: req.body.user_telefone,
        user_dataNasc: req.body.user_dataNasc,
        user_cpf: req.body.user_cpf,
        user_permissoes: req.body.user_permissoes,
        user_setor: req.body.user_setor,
        user_cargo: req.body.user_cargo,
        user_endereco: req.body.user_endereco,
        user_foto: (typeof req.file !== 'undefined') ? req.file.filename : '',
    };

    try {
        const dbResponse = await PostUser.create(dataToInsert);
        res.redirect('http://expertestes:3000/dashboard'); //FIXME TO IP SERVER
    } catch (err) {
        console.log(err);
        res.render('erro');
    };
});

//ROTA - FAZ O EDIT DE USU??RIO

app.put('/user-editado', async function (req, res) {

    const saltRounds = 10;
    const myPlaintextPassword = req.body.user_senha;

    const hashPassword = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    const dataToInsert = {
        user_senha: hashPassword,
        user_emailPessoal: req.body.user_emailPessoal,
    };

    const id = req.body.id;

    try {
        const dbResponse = await PostUser.update(dataToInsert, {
            where: {
                id: id
            }
        })
    } catch (err) {
        console.log(err);
        res.render('erro');
    };

});


// ROTA - DESTINADA A DEFINIR AS NOTIFICA????ES LIDAS PELO USU??RIO

app.put('/notificacao-lida', async function (req, res) {

    const dataToInsert = {
        user_notificacoesLidas: req.body.user_notificacoesLidas,
    };

    const id = req.body.id;

    try {
        const dbResponse = await PostUser.update(dataToInsert, {
            where: {
                id: id
            }
        })
    } catch (err) {
        console.log(err);
        res.render('erro');
    };

});

// LISTAGEM DE DADOS DOS USU??RIOS

app.get('/list-infosUser', async (req, res) => {
    await PostUser.findAll({})
        .then((value) => {
            res.json({
                value,
                url: "http://192.168.10.127:1212/files/" //FIXME TO IP SERVER
            })
        }).catch((err) => {
            console.log(err)
            res.render('erro')
        });
});

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
                url: "http://192.168.10.127:1212/files/" // FIXME TO IP SERVER
            })
        }).catch((err) => {
            console.log(err);
            res.render('erro');
        });
});

app.get('/list-permissoes', async (req, res) => {
    await PostPermissoesUser.findAll()
        .then((value) => {
            res.json({
                value
            })
        }).catch((err) => {
            console.log(err);
            res.render('erro');
        });
});

app.get('/list-setores', async (req, res) => {
    await PostSetorUser.findAll()
        .then((value) => {
            res.json({
                value
            })
        }).catch((err) => {
            console.log(err)
            res.render('erro')
        });
});

// ROTA - FAZ O CADASTRO DE UMA NOVA MENSAGEM PARA SUPORTE

app.post('/report-enviado', upload.single(''), async (req, res) => {

    const dataToInsert = {

        notificacoes_mensagem: req.body.notificacoes_mensagem,
        notificacoes_motivo: req.body.notificacoes_motivo,
        notificacoes_autor: req.body.notificacoes_autor,
        notificacoes_destinatario: req.body.notificacoes_destinatario,
    };

    try {
        const dbResponse = await PostNotificaUser.create(dataToInsert)
        res.redirect('http://expertestes:3000/dashboard') //FIXME TO IP SERVER
    } catch (err) {
        console.log(err);
        res.render('erro');
    };
});

app.get('/list-notificacoesDeveloper', async (req, res) => {

    PostNotificaUser.findAll({
        where: {
            notificacoes_destinatario: 1
        }
    })
        .then((value) => {
            res.json({
                value
            });
        });

});

app.delete('/chamado-deletado/:id', async function (req, res) {

    const { id } = req.params;

    const dbResponse = await PostNotificaUser.destroy({ where: { id: id } });

});

// ROTAS NOTIFICA????ES DE SETORES:

// ROTA - INSERE NOTIFICA????ES DE SETORES

app.post('/notificacoes-setores', async (req, res) => {
    const dataToInsert = {
        notificacoes_mensagem: req.body.notificacoes_mensagem,
        notificacoes_motivo: req.body.notificacoes_motivo,
        notificacoes_autor: req.body.notificacoes_autor,
        notificacoes_destinatario: req.body.notificacoes_destinatario,
        notificacoes_clienteNotificado: req.body.notificacoes_clienteNotificado,
        notificacoes_predioNotificado: req.body.notificacoes_predioNotificado,
    };

    try {
        const dbResponse = await PostNotificaSetor.create(dataToInsert);
    }
    catch (err) {
        console.log(err);
        res.render('erro');
    };
});

app.get('/list-notificacoesSetor', async (req, res) => {

    PostNotificaSetor.findAll({})
        .then((value) => {
            res.json({
                value
            })
        }).catch((err) => {
            console.log(err)
            res.render('erro')
        });
});

// ROTAS - COMPRAS EXPER

// ROTA - INSERE COMPRAS NO DB

app.post('/compracadastrada', async (req, res) => {

    const dataToInsert = {
        lista_item: req.body.lista_item,
        lista_quantidade: req.body.lista_quantidade,
        lista_categoria: req.body.lista_categoria,
        lista_setorDaCompra: req.body.lista_setorDaCompra,
    };

    try {
        const dbResponse = await PostCompras.create(dataToInsert)
    } catch (err) {
        console.log(err)
        res.render('erro')
    };

});

// ROTA - ATUALIZA AS COMPRAS NO DB

app.put('/compras-updateSoma', async (req, res) => {

    const id = req.body.id;

    const lista_quantidade = await PostCompras.findAll({
        where: {
            id: id
        }
    });

    const dataToInsert = {
        lista_quantidade: lista_quantidade[0].lista_quantidade + 1
    };

    try {
        const dbResponse = await PostCompras.update(dataToInsert, {
            where: {
                id: parseInt(id)
            }
        })
    } catch (err) {
        console.log(err);
        res.render('erro');
    };
});

app.put('/compras-updateSubtrai', async (req, res) => {

    const id = req.body.id;

    const lista_quantidade = await PostCompras.findAll({
        where: {
            id: id
        }
    });

    const dataToInsert = {
        lista_quantidade: lista_quantidade[0].lista_quantidade - 1
    };

    try {
        const dbResponse = await PostCompras.update(dataToInsert, {
            where: {
                id: parseInt(id)
            }
        })
    } catch (err) {
        console.log(err);
        res.render('erro');
    };
});

// ROTA - DELETAR COMPRAS NO DB

app.delete('/compras-delete/:id', async function (req, res) {

    const { id } = req.params;

    const dbResponse = await PostCompras.destroy({ where: { id: id } });

});

// ROTA - LISTAGEM DE COMPRAS

app.get('/list-compras', async (req, res) => {

    PostCompras.findAll({})
        .then((value) => {
            res.json({
                value
            })
        }).catch((err) => {
            console.log(err);
            res.render('erro');
        });
});

// ROTAS - ToDoList

// ROTA - INSERE ToDo NO DB

app.post('/todo-cadastrado', async (req, res) => {

    const dataToInsert = {
        todo_tarefa: req.body.todo_tarefa,
        todo_dataConclusao: req.body.todo_dataConclusao,
        todo_autor: req.body.todo_autor,
        todo_status: req.body.todo_status,
        todo_andamento: req.body.todo_andamento,
        todo_destinatario: req.body.todo_destinatario,
        todo_obraCliente: req.body.todo_obraCliente,
    };

    try {
        const dbResponse = await PostToDo.create(dataToInsert)
    } catch (err) {
        console.log(err)
        res.render('erro')
    };
});

// ROTA - RECEBE REQ DO FRONT E LISTA DADOS 

app.get('/listTodo-infos', async (req, res) => {
    PostToDo.findAll({})
        .then((value) => {
            res.json({
                value
            })
        }).catch((err) => {
            console.log(err)
            res.render('erro')
        });
});

// ROTA - ATUALIZA O STATUS DE TODO NO DB

app.put('/todo-updateStatus', async (req, res) => {

    const id = req.body.id;

    const dataToInsert = {
        todo_status: req.body.todo_status,
        todo_andamento: req.body.todo_andamento,
    };

    try {
        const dbResponse = await PostToDo.update(dataToInsert, {
            where: {
                id: parseInt(id)
            }
        })
    } catch (err) {
        console.log(err);
        res.render('erro');
    };
});

//ROTA - DELETAR TODO NO DB

app.delete('/todo-deletado/:id', async function (req, res) {

    const { id } = req.params;

    const dbResponse = await PostToDo.destroy({ where: { id: id } });

});

// ROTAS - ATAS DE REUNI??O

app.post('/atas-cadastrada', upload.single(''), async (req, res) => {

    const data = {
        atas_reuniao: req.body.atas_reuniao,
        atas_objetivo: req.body.atas_objetivo,
        atas_liderReuniao: req.body.atas_liderReuniao,
        atas_dataReuniao: req.body.atas_dataReuniao,
        atas_horarioReuniao: req.body.atas_horarioReuniao,
        atas_localReuniao: req.body.atas_localReuniao,
        atas_participantesReuniao: req.body.atas_participantesReuniao,
        atas_participantesAusentes: req.body.atas_participantesAusentes,
        atas_assuntos: req.body.atas_assuntos,
        atas_pendencias: req.body.atas_pendencias,
        atas_responsavel: req.body.atas_responsavel,
        atas_prazo: req.body.atas_prazo,
    };

    // pdf.text(data.atas_assuntos);

    // pdf.text(data.atas_pendencias);

    // pdf.pipe(fs.createWriteStream(data.atas_reuniao + '.pdf'));

    // pdf.end();

    try {
        const dbResponse = await PostAtasReuniao.create(data);
        res.redirect('http://expertestes:3000/atas-de-reuniao'); // FIXME TO IP SERVER
    } catch (err) {
        console.log(err);
        res.render('erro');
    };
});

// Rota - Recebe req do front e retorna os dados do DB

app.get('/listAtas-infos', async (req, res) => {

    PostAtasReuniao.findAll({})
        .then((value) => {
            res.json({
                value
            })
        }).catch((err) => {
            console.log(err);
            res.render('erro');
        });
});

// SETORES DAS OBRAS

// ROTA - POST SETORES DAS OBRAS

app.post('/setor-de-obra-cadastrado', upload.single(''), async (req, res) => {

    const data = {
        equipamentos_setor: req.body.equipamentos_setor,
        equipamentos_tag: req.body.equipamentos_tag,
        equipamentos_equipamento: req.body.equipamentos_equipamento,
    }

    try {
        const dbResponse = await PostSetorObra.create(data);
        res.redirect('http://expertestes:3000/gerenciar-obras'); // FIXME TO IP SERVER
    } catch (err) {
        console.log(err);
        res.render('erro');
    }
})

app.get('/listSetorObras-infos', async (req, res) => {
    PostSetorObra.findAll({
        include: [{
            model: PostObras,
            attributes: ['obras_nomeDaObra']
        }]
    })
        .then((value) => {
            res.json({
                value
            })
        }).catch((err) => {
            console.log(err);
            res.render('erro');
        }); 
});

// EQUIPAMENTOS DAS OBRAS

// ROTA - POST SETORES DAS OBRAS

app.post('/equipamentoDeObraCadastrado', upload.single(''), async (req, res) => {

    const data = {
        equipamentos_setor: req.body.equipamentos_setor,
        equipamentos_tag: req.body.equipamentos_tag,
        equipamentos_equipamento: req.body.equipamentos_equipamento,
    }

    try {
        const dbResponse = await PostSetorEqp.create(data);
        res.redirect('http://expertestes:3000/gerenciar-obras'); // FIXME TO IP SERVER
    } catch (err) {
        console.log(err);
        res.render('erro');
    }

})

app.get('/listEqpObras-infos', async (req, res) => {

    PostSetorEqp.findAll({
        include: [{
            model: Post,
            attributes: ['desceqp_nomeeqp', 'desceqp_marca', 'desceqp_consumoene', 'desceqp_moeda', 'desceqp_precoeqp']
        }]
    })
        .then((value) => {
            res.json({
                value
            })
        }).catch((err) => {
            console.log(err);
            res.render('erro');
        }); 
});

// PORTA QUE O BACK-END EST?? SENDO EXECUTADO

app.listen(1212, function () {
    console.log('Servidor rodando na porta: 1212'.toUpperCase());
});
