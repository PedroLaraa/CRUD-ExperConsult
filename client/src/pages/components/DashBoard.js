import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoDashboardStyle from "../css/paragrafoDashboard.js";

import botaoDashboardStyle from "../css/botaoDashboard";

//list-infosTodo

function DashBoardInterface() {

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const [clientes, setClientes] = useState('');
    const [pesquisarCliente, setPesquisarCliente] = useState('')

    const getInfosTodo = async (req, res) => {
        api.get('list-infosTodo')
        .then((response) => {
            setData(response.data.value)
            setUrl(response.data.url)
        }).catch((err) => {
            console.log(err)
        })
    }

    function handleSetClientes(e){
        setClientes(e.target.value)
    }

    function handlePesquisarCliente() {
        setPesquisarCliente(clientes)
    }

    function handleFiltrar(e){
        handleSetClientes(e)
        handlePesquisarCliente()
    }

    const busca = clientes.toLowerCase();

    const dataFiltrado = data.filter(v => JSON.stringify(v.clientes_obra.clientes_apelido).replaceAll('"', '').toLowerCase().includes(busca));

    //FIXME FILTRO DE NOMES NÃO ESTÁ FUNCIONANDO!

    const nomesFiltrados = data.map(v => JSON.stringify(v.clientes_obra.clientes_apelido).replaceAll('"', '').toLowerCase())

    console.log(nomesFiltrados)

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosTodo()
    }, []);

    return(
            <div 
            className=" vw-100 vh-100 container position-relative p-2 pt-5 d-flex justify-content-center">
                <div className="row d-flex">
                    <div 
                    className=" list-group col-4 overflow-auto" 
                    style={botaoDashboardStyle}>
                        <h4>Consultar:</h4>
                        {data.map((value) =>(
                            <div key={value.id}>                                
                                    <button
                                        type="submit"
                                        value={JSON.stringify(value.clientes_obra.clientes_apelido).replaceAll('"', '')}
                                        className="btn btn-outline-dark"
                                        onClick={handleFiltrar}
                                    >
                                        {JSON.stringify(value.clientes_obra.clientes_apelido).replaceAll('"', '')}
                                    </button>                               
                            </div>
                        ))}
                    </div>
                    {clientes && (
                        <div className="col-8 overflow-auto"
                        style={{maxHeight: "19.95rem", width: "35rem", paddingLeft: "2rem"}}
                        >
                            <h4>➤ Resultado:</h4>
                            {dataFiltrado.map(value => (
                                <div key={value.id} >
                                        <div 
                                        style={paragrafoDashboardStyle}
                                        className="d-flex d-inline justify-content-around"
                                        > 
                                            <p>Conclusão até: {value.todo_dataConclusao}</p>
                                            <p>Evento: {value.todo_eventos}</p>
                                            <p>Autor: {value.todo_autor}</p>
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