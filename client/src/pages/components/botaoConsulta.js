// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import imagemFornecStyle from "../css/imagem";

import containerStyle from "../css/container";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraFornecedores(){
    
    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const [fornecedor, setFornecedor] = useState('');
    const [pesquisarFornecedor, setPesquisarFornecedor] = useState('')
    
    const getImagesFornec = async (req, res) => { // REQUISIÇÃO DAS IMAGENS
        await api.get('list-imgf')
        .then((response) =>{
        setData(response.data.fornec_foto)
        setUrl(response.data.url)
        }).catch((err) => {
        console.log(err)
        })
    }

    function handleFiltrar(e){
        e.preventDefault()
        setPesquisarFornecedor(fornecedor)
        console.log(fornecedor)
    }

    const busca = pesquisarFornecedor.toLowerCase()

    var dataFiltrado = data.filter(v => v.fornec_fornecedornome.toLowerCase().includes(busca))

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getImagesFornec()
    },[pesquisarFornecedor]);

    return (

        <div>
            <div style={containerStyle}>
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
                    <div key={value.fornec_fornecedornome}>
                        <div style={containerStyle}>    
                            <div style={paragrafoStyle}>
                                <div>
                                    <img src={url + value.fornec_foto} alt={value.fornec_foto.id} style = {imagemFornecStyle} ></img>
                                </div>
                                <p>Nome do fornecedor: {value.fornec_fornecedornome + ''}</p>
                                <p>Tipo de fornecedor: {value.fornec_nivelfornecedor + ''}</p>
                                <p>Razão social: {value.fornec_razaosocial + ''}</p>
                                <p>Telefone: {value.fornec_telefone + ''}</p>
                                <p>Email: {value.fornec_email + ''}</p>
                                <p>Site: {value.fornec_site + ''}</p>
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