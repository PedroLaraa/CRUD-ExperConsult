
//REALIZA OS IMPORTS NECESSÁRIOS (ESTILOS, MÉTODOS...)

import React, { useEffect, useState } from "react";

import { useContext } from "react";

import { AuthContext, AuthProvider } from "../../contexts/auth";

import api from '../../config/configApi';

import paragrafoDashboardStyle from "../css/paragrafoDashboard.js";

import botaoDashboardStyle from "../css/botaoDashboard";

import FormDialog from "../../dialog/ClientesToDo";

import cabecalhoTableDashboard from "../css/cabecalhoTableDashboard";

import FormDialogAddEvent from "../../dialog/DoedEvent";

import paragrafoDoedStyle from "../css/paragrafoDoed";

import paragrafoDivStyle from "../css/paragrafoDiv";

import { handleAlterImage } from "./function/recuperaUserImg";

import NotificacoesSetor from "../NotificacoesSetores";

var clientesEditados 

function DashBoardInterface() {

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const [data2, setData2] = useState([]);
    const [url2, setUrl2] = useState('');
    
    const [clientes, setClientes] = useState('');
    const [pesquisarCliente, setPesquisarCliente] = useState('');

    const [recoveredUsers, setRecoveredUsers] = useState('')

    // SETA OS IDS PARA CONFERÊNCIAS

    const [idsDosClientes, setIdsDosClientes] = useState('');

    const [idsDoed, setIdsDoed] = useState('');

    // SETA OS ESTADOS DOS DIALOGS

    const [openDialog1, setOpenDialog1] = useState(false);

    const [openDialog2, setOpenDialog2] = useState(false);

    // CONVERTE OS IDS DE STR PARA INT

    const idsInteiros = parseInt(idsDosClientes);

    const idsDoedInt = parseInt(idsDoed);

    const { authenticaded, logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    // FAZ UMA REQUISIÇÃO PARA O BACK E RETORNAR O DATABASE COM DADOS (PRÉDIOS)

    const getInfosPredios = async (req, res) => {
        api.get('list-infosPredios')
            .then((response) => {
                setData(response.data.value)
                setUrl(response.data.url)
            }).catch((err) => {
                console.log(err)
            })
    }

    // FAZ UMA REQUISIÇÃO PARA O BACK E RETORNAR O DATABASE COM DADOS (DOED)

    const getInfosDoed = async (req, res) => {
        api.get('list-infosDoed')
            .then((response) => {
                setData2(response.data.value)
                setUrl2(response.data.url)
            }).catch((err) => {
                console.log(err)
            })
    }

    // FUNÇÃO PARA DEFINIR OS CLIENTES

    function handleSetClientes(e) {
        setClientes(e.target.value)
    }

    // FUNÇÃO PARA EXECUTAR AS BUSCAS

    function handlePesquisarCliente() {
        setPesquisarCliente(clientes)
    }

    // FUNÇÃO PARA DISPARAR OS FILTROS

    function handleFiltrar(e) {
        handleSetClientes(e)
        handlePesquisarCliente()
    }

    const busca = clientes.toLowerCase(); // DEFINE O QUE SERÁ BUSCADO

    function findOcc(arr, key) {
        let arr2 = [];

        arr.forEach((x) => {

            if (arr2.some((val) => { return val[key] == x[key] })) {

                arr2.forEach((k) => {
                    if (k[key] === x[key]) {
                        k["occurrence"]++
                    }
                })

            } else {

                let a = {}
                a[key] = x[key]
                a["occurrence"] = 1
                arr2.push(a);
            }
        })
        return arr2;
    }

    const dataFiltrado = data.filter(v => JSON.stringify(v.clientes_obra.clientes_apelido).replaceAll('"', '').toLowerCase().includes(busca)); // RETORNA OS DADOS REFERENTES A BUSCA

    const contadorDeEventos = findOcc(data2, 'predios_clientes')

    const nomesFiltrados = data.map(v => JSON.stringify(v.clientes_obra.clientes_apelido).toLowerCase().replaceAll('"', '')).filter((elem, index, self) => index === self.indexOf(elem)).sort() // RETORNA OS APELIDOS SEM REPETIR

    clientesEditados = nomesFiltrados

    const doedFiltrado = data2.filter(v => v.predios_clientes == idsDoed).reverse() // FILRA OS DOEDS POR PREDIO E COLOCA EM ORDEM CRESCENTE

    const verificacaoDeBusca = doedFiltrado.some(el => data2.map((value) => (value)).includes(el)); // VERIFICA SE AQUELE SETOR POSSUI EVENTOS 

    const nomeDoPredio = dataFiltrado.filter(v => JSON.stringify(v.id) == (idsDoed)).map(v => v.predios_nomeDosPredios).toString() // RETORNA O NOME DO PREDIO

    // FUNÇÃO PARA ABRIR O DIALOG DE ADIÇÃO DE ASSUNTO

    function handleClickAdd() {
        setOpenDialog1(true);
    }

    // PEGA O ID DO CLIENTE PARA REALIZAR O CADASTRO DE FORMA CORRETA

    const idCliente = function (e) {
        setIdsDosClientes(e.target.value);
    }

    // PEGA OS ID's DOS DOED'S PARA FAZER O CADASTRO DE FORMA CORRETA

    const [showEvents, setShowEvents] = useState(false);

    const idDoed = function (e) {
        setIdsDoed(e.target.value);
        if (idsDoed == e.target.value) {
            setShowEvents(false)
            setIdsDoed('')
        } else {
            setShowEvents(true)
            setIdsDoed(e.target.value)
        }
    }

    // FUNÇÃO PARA DISPARAR O DIALOG DE DOED'S E ADICIONAR O EVENTO NO ID CORRETO

    function handleClickAddEvento(e) {
        setOpenDialog2(true);
        idCliente(e);
    }

    // FUNÇÃO PARA DELETAR DOED'S

    function handleRemoveEvent(e) {
        e.preventDefault();
        const id = e.target.value;
        api.delete(`doed-deletado/${id}`);
        alert('Evento deletado');
        document.location.reload(true);
    }

    function handleLogoutUser(e) {
        logout()
    }

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosPredios();
        getInfosDoed();

    }, [openDialog1, openDialog2]); // PARAMETROS PARA ATUALIZAR OS DADOS SEM ATUALIZAR A PÁGINA

    useEffect(() => {
        if (verificacaoDeBusca === false && idsDoed !== '') {
            alert("Nenhum evento registrado!")
        }
    }, [idsDoed]); // VERIFICA A BUSCA SEMPRE QUE OS IDSDOED ALTERAM

    useEffect(() => {

        setRecoveredUsers(JSON.parse(localStorage.getItem('user')))

        handleAlterImage()

    }, []);

    return (
        <div
            className="container vh-100">
            <NotificacoesSetor />
            <div className="row h-auto position-relative pt-5 d-flex justify-content-center">
                <div
                    className="list-group col-4 p-1 overflow-auto"
                    style={botaoDashboardStyle}>
                    <h3>• Cliente:</h3>
                    {nomesFiltrados.map(value => (
                        <div className="p-1" key={value}>
                            <button
                                id={value}
                                type="submit"
                                value={value}
                                className="btn btn-outline-dark"
                                onClick={handleFiltrar}
                                style={{ width: "17rem", fontSize: '1.1rem', fontFamily: 'Raleway' }}
                            >
                                {value}
                            </button>
                        </div>
                    ))}
                </div>
                {clientes && (
                    <div
                        className="col-8 overflow-auto vh-100"
                        style={{ maxHeight: "40rem", width: "60rem", paddingLeft: "2rem" }}
                    >
                        <div className="d-flex d-inline justify-content-around p-3 bg-opacity-25 border border-dark border-1 rounded-3 " style={{ background: "ghostwhite" }}>
                            <h1
                                className="text-uppercase w-100"
                            >• {clientes}</h1>
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => handleClickAdd()}
                                style={{ fontSize: '1.1rem', fontFamily: 'Raleway' }}
                            >Adicionar Assunto
                            </button>
                        </div>
                        <div className="position-relative p-2">
                            <div
                                style={cabecalhoTableDashboard}
                                className="container row text-uppercase m-0"
                            >
                                <div id="topo" className="col-2">
                                    <p>Data:</p>
                                </div>
                                <div className="col-8 ">
                                    <p>Setor / Assunto:</p>
                                </div>
                                <div className="col-2 ">
                                    <p>Autor:</p>
                                </div>
                            </div>
                        </div>
                        {dataFiltrado.map(value => (
                            <div key={value.id}>
                                <FormDialog
                                    open={openDialog1}
                                    setOpen={setOpenDialog1}
                                    predios_dataConclusao={value.predios_dataConclusao}
                                    predios_nomeDosPredios={value.predios_nomeDosPredios}
                                    predios_autor={recoveredUsers.usuario.user_nomeUser}
                                    cliente_id={value.clientes_obra.id}
                                    data={value.data}
                                    setData={value.setData}
                                />
                                <div
                                    className="container pb-1"
                                >
                                    <div>
                                        <div
                                            className="container overflow-auto"
                                            style={{ maxHeight: "30rem", width: "100%" }}
                                        >
                                            <h1>{value.predios_clientes}</h1>
                                            <div
                                                style={paragrafoDivStyle}
                                            >
                                                <div // ID ESTÁ AQUI
                                                    className="row justify-content-around"
                                                    style={paragrafoDashboardStyle}
                                                >
                                                    <div className="col-2 col-md-2">
                                                        <p>{value.updatedAt.split('-').reverse().join('/')}</p>
                                                    </div>
                                                    <div className="col-1">
                                                        <p style={{ background: 'rgba(50,50,50,0.5)', height: '95%', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                                    </div>
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
                                                                            }
                                                                            )}</p>
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
                                                    <div className="col-1 col-md-2">
                                                        <p>{value.predios_autor}</p>
                                                    </div>
                                                </div>
                                                {idsDoedInt === value.id && (
                                                    <div>
                                                        {doedFiltrado.map(value => (
                                                            <div key={value.id}>
                                                                <div
                                                                    style={paragrafoDoedStyle}
                                                                    className="row justify-content-md-center"
                                                                >
                                                                    <div className="col-1 col-md-2">
                                                                        <p>{value.createdAt.split('-').reverse().join('/')}</p>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <p style={{ background: 'rgba(50,50,50,0.5)', height: '100%', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                                                    </div>
                                                                    <div className="col-4 col-md-6">
                                                                        <p>{value.doed_eventos}</p>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <p style={{ background: 'rgba(50,50,50,0.5)', height: '100%', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                                                    </div>
                                                                    <div className="col-1 col-md-2">
                                                                        <p>{value.doed_autor}</p>
                                                                        {value.doed_autor === recoveredUsers.usuario.user_nomeUser && (
                                                                            <>
                                                                                <button
                                                                                    className="btn btn-outline-danger"
                                                                                    value={value.id}
                                                                                    onClick={handleRemoveEvent}
                                                                                    style={{ fontSize: '1.1rem', fontFamily: 'Raleway' }}
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="right"
                                                                                    title="Deletar Evento"
                                                                                >❌
                                                                                </button>
                                                                            </>
                                                                        )}
                                                                        {recoveredUsers.usuario.user_permissoes === 1 && (
                                                                            <>
                                                                                <button
                                                                                    className="btn btn-outline-danger"
                                                                                    value={value.id}
                                                                                    onClick={handleRemoveEvent}
                                                                                    style={{ fontSize: '1.1rem', fontFamily: 'Raleway' }}
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="right"
                                                                                    title="Deletar Evento"
                                                                                >❌
                                                                                </button>
                                                                            </>
                                                                        )}
                                                                        {recoveredUsers.usuario.user_permissoes === 2 && (
                                                                            <>
                                                                                <button
                                                                                    className="btn btn-outline-danger"
                                                                                    value={value.id}
                                                                                    onClick={handleRemoveEvent}
                                                                                    style={{ fontSize: '1.1rem', fontFamily: 'Raleway' }}
                                                                                    data-toggle="tooltip"
                                                                                    data-placement="right"
                                                                                    title="Deletar Evento"
                                                                                >❌
                                                                                </button>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
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
                                                                <a className="btn btn-outline-dark" href={`edit-predio/${value.id}`} style={{ fontSize: '1.1rem', fontFamily: 'Raleway' }}>Editar SETOR / ASSUNTO</a>
                                                                {/* GERA UMA ROTA PARA CADA SETOR SER EDITADO OU DELETADO */}
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
            </div>
        </div>
    )
}

export {clientesEditados}

export default DashBoardInterface
