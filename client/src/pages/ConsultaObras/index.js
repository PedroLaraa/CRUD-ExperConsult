// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import NotificacoesSetor from "../NotificacoesSetores";

import inputStyle from "../css/inputStyle";

import paragrafoStyle from "../css/paragrafo";

function ConsultaObras(){

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    const [obras, setObras] = useState([]);

    const [pesquisarObra, setPesquisarObra] = useState('');

    const [ buscaObra, setBuscaObra ] = useState('');

    const [clientes, setClientes] = useState([]);
    const [url, setUrl] = useState('');

    const getInfosObras = async(req, res) => {
        api.get('/list-infosObras')
            .then((response) => {
                setObras(response.data.value);
                setUrl(response.data.url);
            }).catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getInfosObras();
    }, []);

    function handleFiltraObras(e){

        e.preventDefault();

        setBuscaObra(pesquisarObra);
    };

    const obrasFiltradas = obras.filter(v => v.clientes_obra.clientes_apelido.toString().toLowerCase().includes(pesquisarObra) || v.obras_nomeDaObra.toString().toLowerCase().includes(pesquisarObra));

    if(obrasFiltradas.length === 0 && pesquisarObra != ''){
        alert('Nenhuma obra encontrada');
    };

    console.log(obras)

    return(
        <>
            <NotificacoesSetor />
            <div style={{padding: '2rem'}}>
                <form>
                    <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-3 mb-3">
                            <input
                                style={inputStyle}
                                type='search'
                                placeholder="Cliente - Obra:"
                                onChange={(e) => setPesquisarObra(e.target.value)}
                            >
                            </input>
                            <button
                                style={inputStyle}
                                type="submit"
                                onClick={handleFiltraObras}
                            >
                                Filtrar...
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    {pesquisarObra && (
                        <>
                            {obrasFiltradas.map(v => (
                                <div key={v.id} className="p-2">
                                    <div style={paragrafoStyle}>
                                        <p>• <label>{v.clientes_obra.clientes_apelido + ' - ' + v.obras_nomeDaObra.replace(/[0-9]/g, '')}</label></p>
                                        <p>• Premissas: <label>{v.obras_premissasDaObra}</label></p>
                                        <div className="p-2 d-flex justify-content-end">
                                            <a className="btn btn-outline-dark" href={`edit-obra/${v.id}`}>Editar</a>
                                        </div> 
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ConsultaObras;
