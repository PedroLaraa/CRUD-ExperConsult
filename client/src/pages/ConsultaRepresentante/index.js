// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import imagemRepStyle from "../css/imagemRep"

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

const ConsultaRepresentantes = () => {
    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's
    const [listInfosRep, setListInfosRep] = useState([]); // DEFINE UMA LISTA DAS INFOS

    const getImages = async (res, req) => { // REQUISIÇÃO DAS IMAGENS
    await api.get("list-img")
    .then((response) => {
        setData(response.data.representante_imagem)
        setUrl(response.data.url) 
    }).catch((err) => {
        console.log(err);
    })
    }

    const getInfos = async (res, req) => { // REQUISIÇÃO DAS INFORMAÇÕES DE EQUIPAMENTOS
    await api.get('list-infos')
    .then((response) => {
        setListInfosRep(response.data);
    }).catch((err) => {
        console.log(err);
        })
        await api.get('list-img')
        .then((response) => {
        setUrl(response.data.url)
        }).catch((err) => {
        console.log(err)
        })
    }

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
                <hr style={{opacity: '0'}} />
            </div>
            ))}
        </div>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default ConsultaRepresentantes;