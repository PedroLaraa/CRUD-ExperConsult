
//REALIZA OS IMPORTS NECESSÁRIOS (ESTILOS, MÉTODOS...)

import React, { useEffect, useState, useContext } from "react";

import api from '../../config/configApi';

import { AuthContext } from "../../contexts/auth";

import paragrafoDashboardStyle from "../css/paragrafoDashboard.js";

import botaoDashboardStyle from "../css/botaoDashboard";

import FormDialog from "../../dialog/ClientesToDo";

import cabecalhoTableDashboard from "../css/cabecalhoTableDashboard";

import FormDialogAddEvent from "../../dialog/DoedEvent";

import paragrafoDoedStyle from "../css/paragrafoDoed";

import paragrafoDivStyle from "../css/paragrafoDiv";

import NotificacoesSetor from "../NotificacoesSetores";

var clientesEditados;

var prediosEditados;

function DashBoardInterface() {

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const [data2, setData2] = useState([]);
    const [url2, setUrl2] = useState('');

    const [obras, setObras] = useState([]);

    const [clientes, setClientes] = useState('');
    const [pesquisarCliente, setPesquisarCliente] = useState('');

    const [recoveredUsers, setRecoveredUsers] = useState('');

    // SETA OS IDS PARA CONFERÊNCIAS

    const [idsDosClientes, setIdsDosClientes] = useState('');

    const [idsDoed, setIdsDoed] = useState('');

    // SETA OS ESTADOS DOS DIALOGS

    const [openDialog1, setOpenDialog1] = useState(false);

    const [openDialog2, setOpenDialog2] = useState(false);

    const [loading, setLoading] = useState(false);

    const [permissoes, setPermissoes] = useState();

    // CONVERTE OS IDS DE STR PARA INT

    const idsInteiros = parseInt(idsDosClientes);

    const idsDoedInt = parseInt(idsDoed);

    // FAZ UMA REQUISIÇÃO PARA O BACK E RETORNAR O DATABASE COM DADOS (PRÉDIOS)

    const getInfosObras = async (req, res) => {
        api.get('list-infosObras')
            .then((response) => {
                setObras(response.data.value);
            }).catch((err) => {
                console.log(err);
            });
    };

    const getInfosPredios = async (req, res) => {
        api.get('list-infosPredios')
            .then((response) => {
                setData(response.data.value);
                setUrl(response.data.url);
            }).catch((err) => {
                console.log(err);
            });
    };

    // FAZ UMA REQUISIÇÃO PARA O BACK E RETORNAR O DATABASE COM DADOS (DOED)

    const getInfosDoed = async (req, res) => {
        api.get('list-infosDoed')
            .then((response) => {
                setData2(response.data.value);
                setUrl2(response.data.url);
            }).catch((err) => {
                console.log(err);
            });
    };

    // FUNÇÃO PARA DEFINIR OS CLIENTES

    function handleSetClientes(e) {
        setClientes(e.target.value);
    };

    // FUNÇÃO PARA EXECUTAR AS BUSCAS

    function handlePesquisarCliente() {
        setPesquisarCliente(clientes);
    };

    // FUNÇÃO PARA DISPARAR OS FILTROS

    function handleFiltrar(e) {
        handleSetClientes(e);
        handlePesquisarCliente();
    };

    function findOcc(arr, key) {
        let arr2 = [];

        arr.forEach((x) => {

            if (arr2.some((val) => { return val[key] == x[key] })) {

                arr2.forEach((k) => {
                    if (k[key] === x[key]) {
                        k["occurrence"]++
                    };
                })

            } else {
                let a = {}
                a[key] = x[key]
                a["occurrence"] = 1
                arr2.push(a);
            };
        })
        return arr2;
    };

    function recebeDadosDoDB(){
        getInfosObras();
        getInfosPredios();
        getInfosDoed();
    };

    function atualizaOsDados(){
        let cont = 0;
        setInterval(() => {
            while (cont < 1) {
                recebeDadosDoDB()
                cont++
            };
        }, 200);
    };

    const busca = clientes.toLowerCase(); // DEFINE O QUE SERÁ BUSCADO

    const dataFiltrado = data.filter(v => JSON.stringify(v.obras_cliente.obras_nomeDaObra).replaceAll('"', '').toLowerCase().includes(busca.split(' - ')[1])); // RETORNA OS DADOS REFERENTES A BUSCA

    const contadorDeEventos = findOcc(data2, 'predios_clientes');

    const nomesFiltrados = obras.map(v => JSON.stringify(v.clientes_obra.clientes_apelido + ' - ' + v.obras_nomeDaObra).toLowerCase().replaceAll('"', '')).filter((elem, index, self) => index === self.indexOf(elem)).sort(); // RETORNA OS APELIDOS SEM REPETIR

    clientesEditados = nomesFiltrados;

    const doedFiltrado = data2.filter(v => v.predios_clientes == idsDoed).reverse(); // FILRA OS DOEDS POR PREDIO E COLOCA EM ORDEM CRESCENTE

    const verificacaoDeBusca = doedFiltrado.some(el => data2.map((value) => (value)).includes(el)); // VERIFICA SE AQUELE SETOR POSSUI EVENTOS 

    const nomeDoPredio = dataFiltrado.filter(v => JSON.stringify(v.id) == (idsDoed)).map(v => v.predios_nomeDosPredios).toString(); // RETORNA O NOME DO PREDIO

    const prediosFiltrados = data.map(v => JSON.stringify(v.predios_nomeDosPredios).toLowerCase().replaceAll('"', '') + v.id);

    prediosEditados = prediosFiltrados;

    // FUNÇÃO PARA ABRIR O DIALOG DE ADIÇÃO DE ASSUNTO

    function handleClickAdd() {
        setOpenDialog1(true);
    };

    // PEGA O ID DO CLIENTE PARA REALIZAR O CADASTRO DE FORMA CORRETA

    const idCliente = function (e) {
        setIdsDosClientes(e.target.value);
    };

    // PEGA OS ID's DOS DOED'S PARA FAZER O CADASTRO DE FORMA CORRETA

    const [showEvents, setShowEvents] = useState(false);

    const idDoed = function (e) {
        setIdsDoed(e.target.value);
        if (idsDoed == e.target.value) {
            setShowEvents(false);
            setIdsDoed('');
        } else {
            setShowEvents(true);
            setIdsDoed(e.target.value);
        };
    };

    // FUNÇÃO PARA DISPARAR O DIALOG DE DOED'S E ADICIONAR O EVENTO NO ID CORRETO

    function handleClickAddEvento(e) {
        setOpenDialog2(true);
        idCliente(e);
    };

    // FUNÇÃO PARA DELETAR DOED'S

    function handleRemoveEvent(e) {
        e.preventDefault();
        const id = e.target.value;
        api.delete(`doed-deletado/${id}`);
        alert('Evento deletado');
        atualizaOsDados();
    };

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO

        getInfosPredios();
        getInfosDoed();
        getInfosObras();

    }, [openDialog1, openDialog2]); // PARAMETROS PARA ATUALIZAR OS DADOS SEM ATUALIZAR A PÁGINA

    useEffect(() => {
        if (verificacaoDeBusca === false && idsDoed !== '') {
            alert("Nenhum evento registrado!")
        };
    }, [idsDoed]); // VERIFICA A BUSCA SEMPRE QUE OS IDSDOED ALTERAM

    useEffect(() => {
        setRecoveredUsers(JSON.parse(localStorage.getItem('user'))); // RECUPERA OS DADOS DO USUÁRIO LOGADO
    }, []);

    return (
        <div className="container">
            {/* Renderiza o componente de notificações */}
            <NotificacoesSetor />
            <div className="row h-auto position-relative pt-5 d-flex justify-content-center">
                {/* Local onde será efetuada as pesquisas Cliente - Obra através de botões */}
                <div
                    className="list-group col-4 p-1 overflow-auto"
                    style={botaoDashboardStyle}>
                    <h3> Cliente / Obra :</h3>
                    {nomesFiltrados.map(value => (
                        <div className="p-1" key={value}>
                            <button
                                id={value}
                                type="submit"
                                value={value}
                                className="btn btn-outline-dark text-uppercase"
                                onClick={handleFiltrar}
                                style={{ width: "17rem", fontSize: '1.1rem', fontFamily: 'Raleway' }}
                            >
                                { value.split('-')[0].toString()+ ' - ' + value.split('-')[1].toString().replace(/[0-9]/g, '') }
                            </button>
                        </div>
                    ))}
                </div>
                {/* Cabeçalho padrão para as buscas de eventos */}
                {clientes && (
                    <div
                        className="col-8 overflow-auto vh-100"
                        style={{ maxHeight: "40rem", width: "60rem", padding: "2rem", backgroundColor: 'rgba(232,234,242,0.9)', 
                        border: '4px solid rgba(169,210,215,1 )', borderRadius: '.4rem' }}>
                        <div className="d-flex d-inline justify-content-around p-3 bg-opacity-25 " style={{ backgroundColor: "rgba(236, 237, 245, 0.9)", border: '4px solid rgba(169,210,215,1 )', borderRadius: '.4rem'}}>
                            <h1 className="text-uppercase w-100"> {clientes.toString().replace(/[0-9]/g, '')}</h1>
                            {/* Adiciona um novo setor / assunto naquele cliente - obra */}
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => handleClickAdd()}
                                style={{ fontSize: '1.1rem', fontFamily: 'Raleway' }}
                            >Adicionar Assunto
                            </button>
                        </div>
                        <div className="position-relative p-2">
                            <div style={cabecalhoTableDashboard} className="container row text-uppercase m-0">
                                <div className="col-8 ">
                                    <p>Setor / Assunto:</p>
                                </div>
                                <div className="col-3 ">
                                    <p>Dados:</p>
                                </div>
                            </div>
                        </div>
                        {/* Responsável por gerar os quadros de eventos naquela obra */}
                        {dataFiltrado.map(value => (
                            <div key={value.id}>
                                <FormDialog
                                    open={openDialog1}
                                    setOpen={setOpenDialog1}
                                    predios_dataConclusao={value.predios_dataConclusao}
                                    predios_nomeDosPredios={value.predios_nomeDosPredios}
                                    predios_autor={recoveredUsers.usuario.user_nomeUser}
                                    cliente_id={value.obras_cliente.id}
                                    data={value.data}
                                    setData={value.setData}
                                />
                                <div>
                                    <div>
                                        <div className="container overflow-auto" style={{ maxHeight: "30rem", width: "100%" }}>
                                            <div
                                                style={paragrafoDivStyle}
                                            >
                                                <div // ID ÚNICO PARA CADA DIV ALTERAR SUA COR AO GERAR NOTIFICAÇÃO !!!
                                                    className="row justify-content-around"
                                                    style={paragrafoDashboardStyle}
                                                    id={(value.predios_nomeDosPredios + value.id).toLowerCase()}
                                                >
                                                    <div className="col-4 col-md-6">
                                                        <p
                                                            className="d-flex justify-content-between">{value.predios_nomeDosPredios}
                                                            <p className="d-flex justify-content-between">
                                                                <button
                                                                    value={value.id}
                                                                    onClick={idDoed}
                                                                    className="btn btn-outline-dark "
                                                                    style={{ fontSize: '1rem', fontFamily: 'Raleway' }}>
                                                                    Listar Eventos
                                                                </button>
                                                                {/* Exibe a quantidade de eventos naquele Setor / Assunto */}
                                                                <button
                                                                    value={value.id}
                                                                    onClick={idDoed}
                                                                    className="btn btn-outline-dark " >
                                                                    {contadorDeEventos.map(v => v.predios_clientes).includes(value.id) && (
                                                                        <div key={value.id}>
                                                                            <p>{contadorDeEventos.map((v) => {
                                                                                if (JSON.stringify(v.predios_clientes) == (value.id)) {
                                                                                    return <p>{v.occurrence}</p>
                                                                                }
                                                                            })}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                    {contadorDeEventos.map(v => v.predios_clientes).includes(value.id) == false && (
                                                                        <div key={value.id}>
                                                                            <p>0</p>
                                                                        </div>
                                                                    )}
                                                                </button>
                                                            </p>
                                                        </p>
                                                    </div>
                                                    <div className="col-1">
                                                        <p style={{ background: 'rgba(50,50,50,0.5)', height: '95%', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                                    </div>
                                                    <div className="col-3 d-flex justify-content-end">
                                                        <p>{value.predios_autor}
                                                            <button type="button" className="btn btn-secondary" data-toggle="tooltip" data-placement="top" title={`Data: ${value.createdAt.split('-').reverse().join('/')}`}>
                                                                🛈
                                                            </button>
                                                        </p>
                                                    </div>
                                                </div>
                                                {idsDoedInt === value.id && (
                                                    <div>
                                                        {/* Lista os eventos daquele Setor / Prédio */}
                                                        {doedFiltrado.map(value => (
                                                            <div key={value.id} className='pt-1'>
                                                                <div style={paragrafoDoedStyle} className="row justify-content-md-center">
                                                                    <div className="col-6">
                                                                        <p>{value.doed_eventos}</p>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <p style={{ background: 'rgba(50,50,50,0.5)', height: '98%', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                                                    </div>
                                                                    <div className="col-3 d-flex justify-content-end">
                                                                        <p className="col-3 d-flex justify-content-end">{value.doed_autor}
                                                                            <button type="button" style={{ height: '2.4rem' }} className="btn btn-secondary" data-toggle="tooltip" data-placement="top" title={`Data: ${value.createdAt.split('-').reverse().join('/')}`}>
                                                                                🛈
                                                                            </button>
                                                                        </p>
                                                                        {/* Da permissão para deletar o evento somente ao autor ou supervisores / developers */}
                                                                        {value.doed_autor === recoveredUsers.usuario.user_nomeUser || recoveredUsers.usuario.user_permissoes === 2 || recoveredUsers.usuario.user_permissoes === 1 ?
                                                                            <button
                                                                                className="btn btn-outline-danger"
                                                                                value={value.id}
                                                                                onClick={handleRemoveEvent}
                                                                                style={{ fontSize: '1rem', fontFamily: 'Raleway', width: '2.8rem', height: '2.4rem', paddingRight: '.6rem' }}
                                                                                data-toggle="tooltip"
                                                                                data-placement="right"
                                                                                title="Deletar Evento"
                                                                            >❌
                                                                            </button>
                                                                            : ''
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {/* Adiciona novos eventos */} 
                                                        <div className="d-flex d-inline justify-content-around ">
                                                            <div className="p-2 ">
                                                                <button
                                                                    value={value.id}
                                                                    className="btn btn-outline-dark"
                                                                    onClick={handleClickAddEvento}
                                                                    style={{ fontSize: '1.1rem', fontFamily: 'Raleway' }}
                                                                >Novo Evento
                                                                </button>
                                                            </div>
                                                            <div className="p-2 ">
                                                                {/* GERA UMA ROTA PARA CADA SETOR SER EDITADO OU DELETADO */}
                                                                <a className="btn btn-outline-dark" href={`edit-predio/${value.id}`} style={{ fontSize: '1.1rem', fontFamily: 'Raleway' }}>Editar SETOR / ASSUNTO</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* FormDialog para adicionar eventos com valores padrões */}
                        {data2.map(value => (
                            <div key={value.id}>
                                <FormDialogAddEvent
                                    open={openDialog2}
                                    setOpen={setOpenDialog2}
                                    predios_clientes={idsInteiros}
                                    doed_eventos={value.doed_eventos}
                                    doed_autor={recoveredUsers.usuario.user_nomeUser}
                                    id={value.id}
                                    nomeDoPredio={nomeDoPredio}
                                    nomeDoCliente={busca}
                                    data={value.data}
                                    setData={value.setData}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {/* Calendário de agendamentos - renderizado pela API do Google */}
                <div className="m-4" >
                    <div className="p-1" style={{ border: '4px solid rgba(168,208,213,1)', borderRadius: '.3rem', backgroundColor: 'rgba(168,208,213,1)' }}>
                        <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FSao_Paulo&src=dmRiZzk2M3QyYWZzdjZqNWk4dGpuM3NpaTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=Y281b2YxbWhvZm1lcHBibnA4cWdmcmhzbzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=cHQuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23F6BF26&color=%230B8043&color=%233F51B5" style={{width: "100%", height: "50vh", frameborder: "0", scrolling: "no", position: 'relative', top: '.2rem' }}></iframe>
                    </div>
                    {recoveredUsers.usuario && (
                        <>
                            {recoveredUsers.usuario.user_permissoes === 2 || recoveredUsers.usuario.user_permissoes === 1 ? 
                                <div className="pt-2">
                                    <a href="https://calendar.google.com"><button className="btn btn-outline-dark w-25 text-uppercase">Adicionar Evento</button></a>
                                </div>
                                : 
                                ''
                            }
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export { clientesEditados, prediosEditados } // Exportação de variáveis para uso das notificações

export default DashBoardInterface; // Exportação da função / component DashBoardInterface
