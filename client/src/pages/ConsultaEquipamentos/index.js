import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

function ConsultaEquipamentos(){
    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');
    const [listInfosEqp, setListInfosEqp] = useState([]);

    const getImages = async (res, req) => {
    await api.get("list-imgd")
    .then((response) => {
        setData(response.data.desceqp_imagem)
        setUrl(response.data.url) 
    }).catch((err) => {
        console.log(err);
    })
    }

    const getInfos = async (res, req) => {
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

    useEffect(() => {
        getImages()
        getInfos()
    },[]);  

    return (

        <div>
        {data.map(value => (
            <div key={value.id}>
                <p>Nome do equipamento: {value.desceqp_nomeeqp + ''}</p>
                <p>Modelo: {value.desceqp_modelo + ''}</p>
                <p>Consumo energético: {value.desceqp_consumoene + ''}</p>
                <p>Tipo de consumo: {value.desceqp_consumotipo+ ''}</p>
                <p>Preço: {value.desceqp_precoeqp+ ''}</p>
                <p>Data do último preço: {value.desceqp_dataultpreco+ ''}</p>
                <p>Capacidade produtiva: {value.desceqp_capacidadeprod + ''}</p>
                <p>Comentários sobre equipamento: {value.desceqp_comentario+ ''}</p>
                <p>Fornecedor: {value.id_fornecedor + ''}</p>
                <img src={url + value.desceqp_imagem} alt={value.desceqp_imagem.id} width='25%'></img>
            </div>
            ))}
        </div>
    )
}

export default ConsultaEquipamentos;