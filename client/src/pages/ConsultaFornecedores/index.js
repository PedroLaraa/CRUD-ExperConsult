import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import parStyle from "../css/paragrafo";

import ConsultaRepresentantes from "../ConsultaRepresentante";

const axios = require('axios')

function ConsultaFornecedores(){

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');
    const [listInfosFornec, setListInfosFornec] = useState([]);

    const getImagesFornec = async (req, res) => {
        await api.get('list-imgf')
        .then((response) =>{
        setData(response.data.fornec_foto)
        setUrl(response.data.url)
        }).catch((err) => {
        console.log(err)
        })
    }

    
    
    const getInfosFornec = async (req, res) =>{
        await api.get('list-infosfornecedor')
        .then((response) => {
        setListInfosFornec(response.data)
        }).catch((err) => {
        console.log(err)
        })
        await api.get('list-imgf')
        .then((response) =>{
        setUrl(response.data.url)
        }).catch((err) => {
        console.log(err)
        })
    }

    const [listInfosRep, setListInfosRep] = useState();

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

    console.log(listInfosRep) //FIXME retornar no front os dados do rep


    useEffect(() => {
        getImagesFornec()
        getInfosFornec()
        getInfos()
    }, []);


    return(
        <div>
            {data.map(value => (
                <div key={value.id}>
                    <p style={parStyle}>Nome do fornecedor: {value.fornec_fornecedornome + ''}</p>
                    <p>ID da empresa: {value.id}</p>
                    <p>Razão social: {value.fornec_razaosocial + ''}</p>
                    <p>Telefone: {value.fornec_telefone + ''}</p>
                    <p>Email: {value.fornec_email + ''}</p>
                    <p>Site: {value.fornec_site + ''}</p>
                    <p>Empresa intermediária (nome): {value.fornec_empint_nome + ''}</p>
                    <p>Empresa intermediária(Razão social): {value.fornec_empint_razaosocial + ''}</p>
                    <p>Empresa intermediária (Telefone): {value.fornec_empint_telefone + ''}</p>
                    <p>Empresa intermediária (email): {value.fornec_empint_email + ''}</p>
                    <p>Empresa intermediária (site): {value.fornec_empint_site + ''}</p>
                    <p>Representante do fornecedor (situação): {value.fornec_representante_situacao + ''}</p>
                    <p>Nome: {value.nome_representante}</p>
                    <img src={url + value.fornec_foto} alt={value.fornec_foto.id} width='25%'></img>
                    <hr></hr>
                </div>
            ))}
            
        </div>
    )
}

export default ConsultaFornecedores;