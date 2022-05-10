
//TODO TENTAR SETAR VALORES PADRÕES 

//TODO ALTERAR OS DEMAIS SISTEMAS DE EDIT E DELETE COMO O NOVO (PRINCIPAL A RESOLVER)

//TODO GERAR UM POST NO TODO_CLIENTES AUTOMATICAMENTE QUANDO UM NOVO CLIENTE FOR CADASTRADO    

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoDashboardStyle from "../css/paragrafoDashboard.js";

import botaoDashboardStyle from "../css/botaoDashboard";

import FormDialog from "../../dialog/ClientesToDo";

import cabecalhoTableDashboard from "../css/cabecalhoTableDashboard";

//list-infosTodo

function DashBoardInterface() {

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const [clientes, setClientes] = useState('');
    const [pesquisarCliente, setPesquisarCliente] = useState('')

    const [openDialog1, setOpenDialog1] = useState(false);

    const [openDialog2, setOpenDialog2] = useState(false);

    const getInfosTodo = async (req, res) => {
        api.get('list-infosTodo')
            .then((response) => {
                setData(response.data.value)
                setUrl(response.data.url)
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

    function handleClickAdd() {
        setOpenDialog1(true);
    }

    function handleClickEdit() {
        setOpenDialog2(true);
    }



    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosTodo()
    }, []);

    return (
        <div
            className="container">
            <div className="row vh-100 position-relative p-2 pt-5 d-flex justify-content-center">
                <div
                    className="list-group col-4 overflow-auto"
                    style={botaoDashboardStyle}>
                    <h4>• Consultar Eventos:</h4>
                    {nomesFiltrados.map((value) => (
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
                            >Adicionar Evento
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
                                    <p>Evento:</p>
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
                                    todo_dataConclusao={value.todo_dataConclusao}
                                    todo_eventos={value.todo_eventos}
                                    todo_autor={value.todo_autor}
                                    cliente_id={value.clientes_obra.id}
                                    data={value.data}
                                    setData={value.setData}
                                />
                                <div
                                    className="container pb-1"
                                >
                                    <div
                                        style={paragrafoDashboardStyle}
                                        className="row justify-content-md-center"
                                    >
                                        <div className="col-1 col-md-2 ">
                                            <p>{value.updatedAt.split('-').reverse().join('/')}</p>
                                        </div>
                                        <div className="col-1">
                                            <p style={{ background: 'rgba(50,50,50,0.5)', height: '13.6rem', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                        </div>
                                        <div className="col-4 col-md-6">
                                            <p>{value.todo_eventos}</p>
                                        </div>
                                        <div className="col-1">
                                            <p style={{ background: 'rgba(50,50,50,0.5)', height: '13.6rem', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                        </div>
                                        <div className="col-1 col-md-2">
                                            <p>{value.todo_autor}</p>
                                        </div>
                                    </div>
                                    <div className="p-2 d-flex d-inline justify-content-around">
                                        <a className="btn btn-outline-dark" href={`edit-evento/${value.id}`}>Editar</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashBoardInterface