
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

function DashBoardInterface() {

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const [data2, setData2] = useState([]);
    const [url2, setUrl2] = useState('');

    const [clientes, setClientes] = useState('');
    const [pesquisarCliente, setPesquisarCliente] = useState('');

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

    // FAZ UMA REQUISIÇÃO PARA O BACK E RETORNAR O DATABASE COM DADOS (PREDIOS)

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

    const dataFiltrado = data.filter(v => JSON.stringify(v.clientes_obra.clientes_apelido).replaceAll('"', '').toLowerCase().includes(busca)); // RETORNA OS DADOS REFERENTES A BUSCA

    const nomesFiltrados = data.map(v => JSON.stringify(v.clientes_obra.clientes_apelido).replaceAll('"', '')).filter((elem, index, self) => index === self.indexOf(elem)).sort() // RETORNA OS APELIDOS SEM REPETIR

    const doedFiltrado = data2.filter(v => v.predios_clientes == idsDoed)

    function ordemDecrescente(a, b) {
        return a.createdAt > b.createdAt
    }

    doedFiltrado.sort(ordemDecrescente)

    const verificacaoDeBusca = doedFiltrado.some(el => data2.map((value) => (value)).includes(el)); // VERIFICA SE AQUELE SETOR POSSUI EVENTOS 

    // FUNÇÃO PARA ABRIR O DIALOG DE ADIÇÃO DE ASSUNTO

    function handleClickAdd() {
        setOpenDialog1(true);
    }

    // PEGA O ID DO CLIENTE PARA REALIZAR O CADASTRO DE FORMA CORRETA

    const idCliente = function (e) {
        setIdsDosClientes(e.target.value);
    }

    // PEGA OS ID's DOS DOED'S PARA FAZER O CADASTRO DE FORMA CORRETA

    const idDoed = function (e) {
        setIdsDoed(e.target.value);
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
    }, [openDialog2, openDialog1]); // PARAMETROS PARA ATUALIZAR OS DADOS SEM ATUALIZAR A PÁGINA

    useEffect(() => {
        if (verificacaoDeBusca === false && idsDoed !== '') {
            alert("Nenhum evento registrado!")
        }
    }, [idsDoed]) // VERIFICA A BUSCA SEMPRE QUE OS IDSDOED ALTERAM

    useEffect(() => { // TODO USUARIO SENDO RETORNADO COM SUCESSO =D USE E ABUSE

        let recoveredUsers = JSON.parse(localStorage.getItem('user'))

        console.log('RoverUser', recoveredUsers)
    }, [])

    return (
        <div
            className="container vh-100">
            <div className="row h-auto position-relative pt-5 d-flex justify-content-center">
                <div
                    className="list-group col-4 p-1 overflow-auto"
                    style={botaoDashboardStyle}>
                    <h4>• Cliente:</h4>
                    {/* <div>
                        <button
                            className="btn btn-outline-dark"
                            onClick={handleLogoutUser}
                        >Logout</button>
                    </div> */}
                    {nomesFiltrados.map(value => (
                        <div className="p-1" key={value}>
                            <button
                                type="submit"
                                value={value}
                                className="btn btn-outline-dark"
                                onClick={handleFiltrar}
                                style={{ width: "18rem", fontSize: '1.1rem', fontFamily: 'Raleway' }}
                            > 
                                {value}
                            </button>
                        </div>
                    ))}
                </div>
                {clientes && (
                    <div
                        className="col-8 overflow-auto vh-100"
                        style={{ maxHeight: "40rem", width: "55rem", paddingLeft: "2rem" }}
                    >
                        <div className="d-flex d-inline justify-content-around p-3 bg-white bg-opacity-75 border border-dark border-1 rounded-3 ">
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
                                    predios_autor={value.predios_autor}
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
                                            <div
                                                style={paragrafoDivStyle}
                                            >
                                                <div
                                                    className="row justify-content-center"
                                                    style={paragrafoDashboardStyle}>
                                                    <div className="col-2 col-md-2">
                                                        <p>{value.updatedAt.split('-').reverse().join('/')}</p>
                                                    </div>
                                                    <div className="col-1">
                                                        <p style={{ background: 'rgba(50,50,50,0.5)', height: '2rem', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                                    </div>
                                                    <div className="col-4 col-md-6">
                                                        <p className="d-flex justify-content-between">{value.predios_nomeDosPredios} <button value={value.id} onClick={idDoed} className="btn btn-outline-dark " style={{ fontSize: '1rem', fontFamily: 'Raleway' }}>Listar Eventos</button></p>
                                                    </div>
                                                    <div className="col-1">
                                                        <p style={{ background: 'rgba(50,50,50,0.5)', height: '2rem', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
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
                                                                    className="row justify-content-md-center">
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
                                    doed_autor={value.doed_autor}
                                    id={value.id}
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

export default DashBoardInterface