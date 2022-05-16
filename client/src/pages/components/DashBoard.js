
import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoDashboardStyle from "../css/paragrafoDashboard.js";

import botaoDashboardStyle from "../css/botaoDashboard";

import FormDialog from "../../dialog/ClientesToDo";

import cabecalhoTableDashboard from "../css/cabecalhoTableDashboard";

import FormDialogAddEvent from "../../dialog/DoedEvent";

import paragrafoDoedStyle from "../css/paragrafoDoed";

import paragrafoDivStyle from "../css/paragrafoDiv";

//list-infosTodo

function DashBoardInterface() {

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const [data2, setData2] = useState([]);
    const [url2, setUrl2] = useState('');

    const [clientes, setClientes] = useState('');
    const [pesquisarCliente, setPesquisarCliente] = useState('')

    const [idsDosClientes, setIdsDosClientes] = useState('')

    const [idsDoed, setIdsDoed] = useState('')

    const [openDialog1, setOpenDialog1] = useState(false);

    const [openDialog2, setOpenDialog2] = useState(false);

    const idsInteiros = parseInt(idsDosClientes)

    const idsDoedInt = parseInt(idsDoed)

    const getInfosPredios = async (req, res) => {
        api.get('list-infosPredios')
            .then((response) => {
                setData(response.data.value)
                setUrl(response.data.url)
            }).catch((err) => {
                console.log(err)
            })
    }

    const getInfosDoed = async (req, res) => {
        api.get('list-infosDoed')
            .then((response) => {
                setData2(response.data.value)
                setUrl2(response.data.url)
            }).catch((err) => {
                console.log(err)
            })
    }

    function handleSetClientes(e) {
        setClientes(e.target.value)
    }

    function handlePesquisarCliente() {
        setPesquisarCliente(clientes)
    }

    function handleFiltrar(e) {
        handleSetClientes(e)
        handlePesquisarCliente()
    }

    const busca = clientes.toLowerCase(); // DEFINE O QUE SERÁ BUSCADO

    const dataFiltrado = data.filter(v => JSON.stringify(v.clientes_obra.clientes_apelido).replaceAll('"', '').toLowerCase().includes(busca)); // FILTRA AS BUSCAS

    const nomesFiltrados = data.map(v => JSON.stringify(v.clientes_obra.clientes_apelido).replaceAll('"', '')).filter((elem, index, self) => index === self.indexOf(elem)) // RETORNA OS APELIDOS SEM REPETIR

    const doedFiltrado = data2.filter(v => JSON.stringify(v.predio_cliente).includes(idsDoedInt))

    const verificacaoDeBusca = doedFiltrado.some(el => data2.map((value) => (value)).includes(el))

    function handleClickAdd() {
        setOpenDialog1(true);
    }

    const idCliente = function (e) {
        setIdsDosClientes(e.target.value)
    }

    const idDoed = function (e) {
        setIdsDoed(e.target.value)
    }

    function handleClickAddEvento(e) {
        setOpenDialog2(true);
        idCliente(e)
    }

    function handleRemoveEvent(e){
        const id = e.target.value
        api.delete(`doed-deletado/${id}`)
        alert('Evento deletado')
        document.location.reload(true)
    }

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosPredios()
        getInfosDoed()
    }, []);

    useEffect(() => {
        if(verificacaoDeBusca == false && idsDoed != ''){
            alert("Nenhum evento registrado!")
        }
    }, [idsDoed])

    return (
        <div
            className="container vh-100">
            <div className="row vh-100 position-relative p-2 pt-5 d-flex justify-content-center">
                <div
                    className="list-group col-4 overflow-auto"
                    style={botaoDashboardStyle}>
                    <h4>• Consultar Eventos:</h4>
                    {nomesFiltrados.map(value => (
                        <div className="p-1" key={value}>
                            <button
                                type="submit"
                                value={value}
                                className="btn btn-outline-dark"
                                onClick={handleFiltrar}
                                style={{ width: "18rem" }}
                            >
                                {value}
                            </button>
                        </div>
                    ))}
                </div>
                {clientes && (
                    <div className="col-8 overflow-auto vh-100"
                        style={{ maxHeight: "40rem", width: "55rem", paddingLeft: "2rem" }}
                    >
                        <div className="d-flex d-inline justify-content-around p-3">
                            <h1 className="text-uppercase">• {clientes}</h1>
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => handleClickAdd()}
                            >Adicionar Setor
                            </button>
                        </div>
                        <div className="position-relative p-2">
                            <div
                                style={cabecalhoTableDashboard}
                                className="container row text-uppercase m-0"
                            >
                                <div className="col-2 ">
                                    <p>Data:</p>
                                </div>
                                <div className="col-8 ">
                                    <p>Setor / Evento:</p>
                                </div>
                                <div className="col-1 ">
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
                                        style={{maxHeight: "30rem", width: "50rem"}}
                                        >
                                            <div
                                                style={paragrafoDivStyle}
                                            >
                                                <div className="row justify-content-md-center" style={paragrafoDashboardStyle}>
                                                    <div className="col-1 col-md-2 ">
                                                        <p>{value.updatedAt.split('-').reverse().join('/')}</p>
                                                    </div>
                                                    <div className="col-1">
                                                        <p style={{ background: 'rgba(50,50,50,0.5)', height: '1.5rem', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                                    </div>
                                                    <div className="col-4 col-md-6">
                                                        <p>{value.predios_nomeDosPredios}</p>
                                                    </div>
                                                    <div className="col-1">
                                                        <p style={{ background: 'rgba(50,50,50,0.5)', height: '1.5rem', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                                    </div>
                                                    <div className="col-1 col-md-2">
                                                        <p>{value.predios_autor}</p>
                                                    </div>
                                                </div>    
                                                    {idsDoed == value.id && (
                                                        <div>
                                                            {doedFiltrado.map(value => (
                                                                <div key={value.id}>
                                                                    <div
                                                                        style={paragrafoDoedStyle}
                                                                        className="row justify-content-md-center">
                                                                        <div className="col-1 col-md-2 ">
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
                                                                                data-toggle="tooltip"
                                                                                data-placement="right"
                                                                                title="Deletar Evento"
                                                                                >❌
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>    
                                            </div>
                                        </div>
                                        <div className="p-2 d-flex d-inline justify-content-around ">
                                            <button
                                                value={value.id}
                                                onClick={idDoed}
                                                className="btn btn-outline-dark w-25"
                                            >
                                                Listar Eventos
                                            </button>
                                        </div>
                                        <div className="p-2 d-flex d-inline justify-content-around ">
                                            <button
                                                value={value.id}
                                                className="btn btn-outline-dark w-25"
                                                onClick={handleClickAddEvento}
                                            >Novo Evento
                                            </button>
                                        </div>
                                        <div className="p-2 d-flex d-inline justify-content-around ">
                                            <a className="btn btn-outline-dark w-25" href={`edit-predio/${value.id}`}>Editar SETOR</a>
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