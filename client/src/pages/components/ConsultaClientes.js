// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import imagemClienteStyle from "../css/imagemCliente";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import containerStyle from "../css/container";

import NotificacoesSetor from "../NotificacoesSetores";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraClientes() {

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const [clientes, setClientes] = useState('');
    const [pesquisarCliente, setPesquisarCliente] = useState('');

    const [obras, setObras] = useState([]);

    const getInfosCliente = async (res, req) => { 
        await api.get("list-infosClientes")
            .then((response) => {
                setData(response.data.clientes_logo);
                setUrl(response.data.url);
            }).catch((err) => {
                console.log(err);
            })
    }

    const getInfosObras = async (res, req) => {
        await api.get("list-infosObras")
            .then((response) => {
                setObras(response.data.value);
            }).catch((err) => {
                console.log(err);
            })
    } 

    function handleFiltrar(e) {
        setPesquisarCliente(clientes)

        e.preventDefault();
    }

    const busca = pesquisarCliente.toLowerCase();

    const dataFiltrado = data.filter(v => v.clientes_razaosocial.toLowerCase().includes(busca));

    const verificacaoDeBusca = data.some(el => dataFiltrado.map((value) => (value)).includes(el));

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosCliente();
    }, []);

    useEffect(() => {
        if (pesquisarCliente) {
            if (verificacaoDeBusca === false || clientes === '') {
                alert('Resultado da busca não encontrado!')
            }
        }
    }, [pesquisarCliente])

    return (

        <div>
            <NotificacoesSetor />
            <div style={{ padding: '2rem' }}>
                <form style={formStyle} >
                    <input
                        style={inputStyle}
                        type='search'
                        placeholder="Razão social:"
                        onChange={(e) => setClientes(e.target.value)}
                    >
                    </input>
                    <button
                        style={inputStyle}
                        type="submit"
                        onClick={handleFiltrar}
                    >
                        Filtrar...
                    </button>
                </form>
            </div>
            {pesquisarCliente && (
                <div>
                    {dataFiltrado.map(value => (
                        <div key={value.id}>
                            <div style={containerStyle}>
                                <div style={paragrafoStyle}>
                                    <div >
                                        <img src={url + value.clientes_logo} alt={value.clientes_logo} style={imagemClienteStyle}></img>
                                    </div>
                                    <div style={{padding: '1.7rem'}}>
                                        <p style={{ fontWeight: 'bold'}}>Razão social: <label>{value.clientes_razaosocial}</label></p>
                                        <p style={{ fontWeight: 'bold'}}>Nome fantasia: <label>{value.clientes_nomefantasia + ''}</label></p>
                                        <p style={{ fontWeight: 'bold'}}>Apelido: <label>{value.clientes_apelido + ''}</label></p>
                                        <p style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>CNPJ: <label>{value.clientes_cnpj + ''}</label></p>
                                        <div className="breakText">
                                            <p style={{ fontWeight: 'bold'}}>Endereço: <label>{value.clientes_endereco + ''}</label></p>
                                        </div>
                                        <p style={{ fontFamily: 'Arial', fontWeight: 'bold'}}>IE: <label>{value.clientes_ie + ''}</label></p>
                                        <p style={{ fontWeight: 'bold'}}>Responsável: <label>{value.clientes_nomeResponsavel + ''}</label></p>
                                        <p style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Telefone (Responsável): <label> {value.clientes_telefone + ''}</label> </p>
                                        <p style={{ fontFamily: 'Arial', fontWeight: 'bold'}}>Email (Responsável): <label>{value.clientes_email + ''}</label></p>
                                        <div className="breakText">
                                            <p style={{ fontWeight: 'bold'}}>Premissas de projeto: <label>{value.clientes_premissasDeProjeto + ''}</label></p>
                                        </div>
                                        <div 
                                        className="p-2 d-flex justify-content-end"
                                        >
                                            <a className="btn btn-outline-dark" href={`edit-cliente/${value.id}`}>Editar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default FiltraClientes;