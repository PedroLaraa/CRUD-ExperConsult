
// FIXME BOTÃO DE EDITAR COM FORMDIALOG NÃO FUNCIONA (PASSA O ID ERRADO)

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoDashboardStyle from "../css/paragrafoDashboard.js";

import botaoDashboardStyle from "../css/botaoDashboard";

import FormDialog from "../../dialog/ClientesToDo";

import cabecalhoTableDashboard from "../css/cabecalhoTableDashboard";

import FormDialogEdit from "../../dialog/ClientesTodoEdit";
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
                    <div className="col-8 overflow-auto"
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
                                <div className="col-1 ">
                                    <p>ID:</p>
                                </div>
                                <div className="col-3 ">
                                    <p>Data:</p>
                                </div>
                                <div className="col-6 ">
                                    <p>Evento:</p>
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
                                        <div className="col-1 col-md-1 ">
                                            <p>{value.id}</p>
                                        </div>
                                        <div className="col-1">
                                            <p style={{ background: 'rgba(50,50,50,0.5)', height: '13.6rem', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                        </div>
                                        <div className="col-2 col-md-2 ">
                                            <p>{value.createdAt.split('-').reverse().join('/')}</p>
                                        </div>
                                        <div className="col-1">
                                            <p style={{ background: 'rgba(50,50,50,0.5)', height: '13.6rem', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                        </div>
                                        <div className="col-4 col-md-4">
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
                                        <button
                                            onClick={() => handleClickEdit()}
                                            className="btn btn-outline-dark"
                                        >Editar
                                        </button>
                                    </div>
                                </div>
                                <FormDialogEdit
                                    open={openDialog2}
                                    setOpen={setOpenDialog2}
                                    todo_eventos={value.todo_eventos}
                                    todo_autor={value.todo_autor}
                                    todo_dataConclusao={value.todo_dataConclusao}
                                    todo_id={value.id}
                                    updatedAt={value.updatedAt}
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