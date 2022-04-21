// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo"; 

import imagemRepStyle from "../css/imagemRep";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import containerStyle from "../css/container";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraRepresentantes(){
    
    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const [fornecedor, setFornecedor] = useState('');
    const [pesquisarFornecedor, setPesquisarFornecedor] = useState('')
    
    const getImages = async (res, req) => { // REQUISIÇÃO DAS IMAGENS
        await api.get("list-img")
        .then((response) => {
            setData(response.data.representante_imagem)
            setUrl(response.data.url) 
        }).catch((err) => {
            console.log(err);
        })
        }

    function handleFiltrar(e){
        e.preventDefault()
        setPesquisarFornecedor(fornecedor)
        console.log(fornecedor)
    }

    const busca = pesquisarFornecedor.toLowerCase()

    var dataFiltrado = data.filter(v => v.representante_empresasrep.toLowerCase().includes(busca))

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getImages()
    },[]);

    return (

        <div>
            <div style={containerStyle}>
                <form style={formStyle}>
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
                <div style={containerStyle}>
                    {dataFiltrado.map(value => (
                    <div key={value.id_fornecedor}> 
                        <div>
                            <div style={paragrafoStyle}>
                                <div>
                                    <img src={url + value.representante_imagem} alt={value.representante_imagem.id} style={imagemRepStyle} ></img>
                                </div>
                                <p>Nome: {value.representante_nome + ''}</p>
                                <p>Representa: {value.representante_empresasrep + ''}</p>
                                <p>Telefone: {value.representante_telefone + ''}</p>
                                <p>Comentários: {value.representante_comentarios + ''}</p>
                                <p>Site: {value.representante_site + ''}</p>
                                <p>Estados de atuação: {value.representante_estadoatuacao + ''}</p>
                                <p>Status: {value.representante_status}</p>
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
export default FiltraRepresentantes;