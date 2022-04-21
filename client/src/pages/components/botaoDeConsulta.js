// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo"; 

import imagemEqpStyle from "../css/imagemEqp";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import containerStyle from "../css/container";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraEquipamentos(){
    
    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const [fornecedor, setFornecedor] = useState('');
    const [pesquisarFornecedor, setPesquisarFornecedor] = useState('')
    
    const getInfosEqp = async (res, req) => { // REQUISIÇÃO DAS IMAGENS
    await api.get("list-infosequipamentos")
    .then((response) => {
        setData(response.data.value)
        setUrl(response.data.url) 
    }).catch((err) => {
        console.log(err);
    })
    }

    function handleFiltrar(e){
        e.preventDefault()
        setPesquisarFornecedor(fornecedor)
    }

    const busca = pesquisarFornecedor.toLowerCase()

    var dataFiltrado = data.filter(v => v.id_fornecedor.toLowerCase().includes(busca))

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosEqp()
    },[pesquisarFornecedor]);

    return (

        <div>
            <div style={{padding: '2rem'}}>
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
                                <div >
                                    <img src={url + value.desceqp_imagem} alt={value.desceqp_imagem.id} style={imagemEqpStyle}></img>
                                </div>
                                <a href={url + value.desceqp_pdf} download='pdf' style={{color: 'red'}}>DOWNLOAD PDF ⤓</a>
                                <p>Fornecedor: {value.id_fornecedor} </p>  
                                <p>Nome do equipamento: {value.desceqp_nomeeqp + ''}</p>
                                <p>Modelo: {value.desceqp_modelo + ''}</p>
                                <p>Consumo energético: {value.desceqp_consumoene + ''}</p>
                                <p>Tipo de consumo: {value.desceqp_consumotipo+ ''}</p>
                                <p>Preço: {value.desceqp_precoeqp+ ''}</p>
                                <p>Data do último preço: {value.desceqp_dataultpreco+ ''}</p>
                                <p>Capacidade produtiva: {value.desceqp_capacidadeprod + ''}</p>
                                <p>Comentários sobre equipamento: {value.desceqp_comentario+ ''}</p>
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
export default FiltraEquipamentos;