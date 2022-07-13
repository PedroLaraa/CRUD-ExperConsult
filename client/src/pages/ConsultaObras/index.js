// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import NotificacoesSetor from "../NotificacoesSetores";

import inputStyle from "../css/inputStyle";

import paragrafoStyle from "../css/paragrafo";

import imagemObraStyle from "../css/imagemObraStyle";

function ConsultaObras(){

    // REALIZA O LOGOUT DO USUÁRIO

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    // DECLARAÇÃO DE VARIÁVEIS

    const [obras, setObras] = useState([]);

    const [pesquisarObra, setPesquisarObra] = useState(''); // PESQUISA DE OBRA

    const [ buscaObra, setBuscaObra ] = useState(''); // PESQUISA DE OBRA AUXILIAR

    const [url, setUrl] = useState(''); // LOCAL ONDE OS ARQUIVOS FICAM SALVOS

    // FUNÇÃO PARA REQUISIÇÃO AO BACK-END DOS DADOS DA OBRA

    const getInfosObras = async(req, res) => {
        api.get('/list-infosObras')
            .then((response) => {
                setObras(response.data.value); // VARIAVEL QUE RECEBE OS DADOS
                setUrl(response.data.url); // VARIAVEL QUE RECEBE O LOCAL ONDE OS AQUIVOS FICAM SALVOS
            }).catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getInfosObras(); // EXECUTA A FUNÇÃO SEMPRE QUE A PÁGINA É CARREGADA
    }, []);

    function handleFiltraObras(e){

        e.preventDefault();
        
        setBuscaObra(pesquisarObra); // PESQUISA DE OBRA AUXILIAR
    };

    // FILTRA AS OBRAS CONFORME

    const obrasFiltradas = obras.filter(v => v.clientes_obra.clientes_apelido.toString().toLowerCase().includes(pesquisarObra) || v.obras_nomeDaObra.toString().toLowerCase().includes(pesquisarObra));

    // VERIFICA SE A BUSCA NÃO RETORNA NADA

    if(obrasFiltradas.length === 0 && pesquisarObra != ''){
        alert('Nenhuma obra encontrada');
    };

    return(
        <>
            <NotificacoesSetor />
            <div style={{padding: '2rem'}}>
                <form>
                    <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-3 mb-3">
                            {/* Inmput para busca de obra */}
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
                        {/* Listagem dos dados de obras */}
                            {obrasFiltradas.map(v => (
                                <div key={v.id} className="p-2">
                                    <div style={paragrafoStyle}>
                                        <div>
                                            <img src={url + v.clientes_obra.clientes_logo} alt={v.clientes_obra.clientes_logo} style={imagemObraStyle}></img>
                                        </div>
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
