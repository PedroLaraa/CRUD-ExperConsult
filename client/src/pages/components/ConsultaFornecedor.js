// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import imagemFornecStyle from "../css/imagem";

import containerStyle from "../css/container";

import NotificacoesSetor from "../NotificacoesSetores";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraFornecedores() {

    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const [fornecedor, setFornecedor] = useState('');
    const [pesquisarFornecedor, setPesquisarFornecedor] = useState('')

    const getImagesFornec = async (req, res) => { // REQUISIÇÃO DAS IMAGENS
        await api.get('list-imgf')
            .then((response) => {
                setData(response.data.fornec_foto)
                setUrl(response.data.url)
            }).catch((err) => {
                console.log(err)
            })
    }

    function handleFiltrar(e) {
        e.preventDefault()
        setPesquisarFornecedor(fornecedor)
    }

    const busca = pesquisarFornecedor.toLowerCase()

    const dataFiltrado = data.filter(v => v.fornec_fornecedornome.toLowerCase().includes(busca))

    const verificacaoDeBusca = data.some(el => dataFiltrado.map((value) => (value)).includes(el))

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getImagesFornec()
    }, []);

    useEffect(() => {
        if(pesquisarFornecedor){
            if(verificacaoDeBusca === false || fornecedor === ''){
                alert('Resultado da busca não encontrado!')
            }
        }
    }, [pesquisarFornecedor])

    return (

        <div>
            <NotificacoesSetor />
            <div style={{ padding: '2rem' }}>
                <form style={formStyle} >
                    <input
                        style={inputStyle}
                        type='search'
                        placeholder="Fornecedor:"
                        onChange={(e) => setFornecedor(e.target.value)}
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
            {pesquisarFornecedor && (
                <div>
                    {dataFiltrado.map(value => (
                        <div key={value.id}>
                            <div style={containerStyle}>
                                <div style={paragrafoStyle}>
                                    <div>
                                        <img src={url + value.fornec_foto} alt={value.fornec_foto.id} style={imagemFornecStyle} ></img>
                                    </div>
                                    <p>Nome do fornecedor: {value.fornec_fornecedornome + ''}</p>
                                    <p>Tipo de fornecedor: {value.fornec_nivelfornecedor + ''}</p>
                                    <p>Razão social: {value.fornec_razaosocial + ''}</p>
                                    <p>Telefone: {value.fornec_telefone + ''}</p>
                                    <p>Email: {value.fornec_email + ''}</p>
                                    <p>Site: {value.fornec_site + ''}</p>
                                    <div className="p-2 d-flex d-inline justify-content-around">
                                        <a className="btn btn-outline-dark" href={`edit-fornecedor/${value.id}`}>Editar</a>
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
export default FiltraFornecedores;