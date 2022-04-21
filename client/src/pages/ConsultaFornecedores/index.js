// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import FiltraFornecedores from "../components/botaoConsulta";


// FUNÇÃO PARA CONSULTA DE DADOS DOS FORNECEDORES

function ConsultaFornecedores(){

    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's
    const [listInfosFornec, setListInfosFornec] = useState([]); // DEFINE UMA LISTA DAS INFOS

    const getImagesFornec = async (req, res) => { // REQUISIÇÃO DAS IMAGENS
        await api.get('list-imgf')
        .then((response) =>{
        setData(response.data.fornec_foto)
        setUrl(response.data.url)
        }).catch((err) => {
        console.log(err)
        })
    }

    
    
    const getInfosFornec = async (req, res) =>{ // REQUISIÇÃO DAS INFORMAÇÕES DE EQUIPAMENTOS
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

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getImagesFornec()
        getInfosFornec()

    }, []);

    return(

        <FiltraFornecedores />
    )
}

export default ConsultaFornecedores;