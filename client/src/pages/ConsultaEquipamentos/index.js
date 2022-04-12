// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import imagemEqpStyle from "../css/imagemEqp";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function ConsultaEquipamentos(){
    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's
    const [listInfosEqp, setListInfosEqp] = useState([]); // DEFINE UMA LISTA DAS INFOS

    const getImages = async (res, req) => { // REQUISIÇÃO DAS IMAGENS
    await api.get("list-imgd")
    .then((response) => {
        setData(response.data.desceqp_imagem)
        setUrl(response.data.url) 
    }).catch((err) => {
        console.log(err);
    })
    }

    const getInfos = async (res, req) => { // REQUISIÇÃO DAS INFORMAÇÕES DE EQUIPAMENTOS
    await api.get('list-infoseqp')
    .then((response) => {
        setListInfosEqp(response.data);
    }).catch((err) => {
        console.log(err);
        })
        await api.get('list-imgd')
        .then((response) => {
        setUrl(response.data.url)
        }).catch((err) => {
        console.log(err)
        })
    }

    console.log(data)

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getImages()
        getInfos()
    },[]);  

    return (

        <div>
        {data.map(value => ( // MAPEIA O DATABASE E PEGA AS INFOS REQUISITADAS
            <div key={value.id}>
                <div style={paragrafoStyle}>
                    <div>
                        <img src={url + value.desceqp_imagem} alt={value.desceqp_imagem.id} style={imagemEqpStyle}></img>
                    </div>
                    <p>Nome do equipamento: {value.desceqp_nomeeqp + ''}</p>
                    <p>Modelo: {value.desceqp_modelo + ''}</p>
                    <p>Consumo energético: {value.desceqp_consumoene + ''}</p>
                    <p>Tipo de consumo: {value.desceqp_consumotipo+ ''}</p>
                    <p>Preço: {value.desceqp_precoeqp+ ''}</p>
                    <p>Data do último preço: {value.desceqp_dataultpreco+ ''}</p>
                    <p>Capacidade produtiva: {value.desceqp_capacidadeprod + ''}</p>
                    <p>Comentários sobre equipamento: {value.desceqp_comentario+ ''}</p>
                    <p>Fornecedor: {value.id_fornecedor + ''}</p>   
                </div>         
            </div>
            ))}
        </div>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default ConsultaEquipamentos;