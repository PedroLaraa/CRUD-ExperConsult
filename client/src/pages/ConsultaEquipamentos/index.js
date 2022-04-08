import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

function ConsultaEquipamentos(){
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

    console.log(listInfosRep)

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
                <h2>Nome: {value.representante_nome + ''}</h2>
                <h3>Telefone: {value.representante_telefone + ''}</h3>
                <img src={url + value.representante_imagem} alt={value.representante_imagem.id} width='25%'></img>
            </div>
            ))}
        </div>
    )
}

export default ConsultaEquipamentos;