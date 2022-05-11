// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import imagemEqpStyle from "../css/imagemEqp";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import containerStyle from "../css/container";

import botaoStyle from "../css/botaoEdit";


// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraClientes() {

    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const [clientes, setClientes] = useState('');
    const [pesquisarCliente, setPesquisarCliente] = useState('')

    const getInfosCliente = async (res, req) => { // REQUISIÇÃO DAS IMAGENS
        await api.get("list-infosClientes")
            .then((response) => {
                setData(response.data.clientes_logo);
                setUrl(response.data.url);
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

    const verificacaoDeBusca = data.some(el => dataFiltrado.map((value) => (value)).includes(el))

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosCliente()
    }, []);

    useEffect(() => {
        if(pesquisarCliente){
            if(verificacaoDeBusca === false || clientes === ''){
                alert('Resultado da busca não encontrado!')
            }
        }
    }, [pesquisarCliente])

    return (

        <div>
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
                                        <img src={url + value.clientes_logo} alt={value.clientes_logo.id} style={imagemEqpStyle}></img>
                                    </div>
                                    <p>Razão social: {value.clientes_razaosocial} </p>
                                    <p>Nome fantasia: {value.clientes_nomefantasia + ''}</p>
                                    <p>Apelido: {value.clientes_apelido + ''}</p>
                                    <p>CNPJ: {value.clientes_cnpj + ''}</p>
                                    <p>Endereço: {value.clientes_endereco + ''}</p>
                                    <p>IE: {value.clientes_ie + ''}</p>
                                    <p>Responsável: {value.clientes_nomeResponsavel + ''}</p>
                                    <p>Telefone (Respoonsável): {value.clientes_telefone + ''}</p>
                                    <p>Email (Responsável): {value.clientes_email + ''}</p>
                                    <p>Premissas de projeto: {value.clientes_premissasDeProjeto + ''}</p>
                                    <div className="p-2 d-flex d-inline justify-content-around">
                                        <a className="btn btn-outline-dark" href={`edit-cliente/${value.id}`}>Editar</a>
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