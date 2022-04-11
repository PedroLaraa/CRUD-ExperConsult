import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../paragrafo";

import imagemRepStyle, { height } from "../imagemRep";

const ConsultaRepresentantes = () => {
    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');
    const [listInfosRep, setListInfosRep] = useState([]);

    const getImages = async (res, req) => {
    await api.get("list-img")
    .then((response) => {
        setData(response.data.representante_imagem)
        setUrl(response.data.url) 
    }).catch((err) => {
        console.log(err);
    })
    }

    const getInfos = async (res, req) => {
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

    useEffect(() => {
        getImages()
        getInfos()
    },[]);  

    return (

        <div>
        {data.map(value => (
            <div key={value.id}>
                <div style={paragrafoStyle}>
                    <div>
                        <img src={url + value.representante_imagem} alt={value.representante_imagem.id} style={imagemRepStyle} ></img>
                    </div>
                    <p>Nome: {value.representante_nome + ''}</p>
                    <p>Telefone: {value.representante_telefone + ''}</p>
                    <p>Comentários: {value.representante_comentarios + ''}</p>
                    <p>Representa: {value.representante_empresasrep + ''}</p>
                    <p>Site: {value.representante_site + ''}</p>
                    <p>Estados de atuação: {value.representante_estadoatuacao + ''}</p>
                    <p>ID do representante: {value.id + ''}</p>
                </div>
                <hr style={{opacity: '0'}} />
            </div>
            ))}
        </div>
    )
}

export default ConsultaRepresentantes;