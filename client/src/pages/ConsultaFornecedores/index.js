// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import imagemFornecStyle from "../css/imagem";

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
        
        <div>
            {data.map(value => ( // MAPEIA O DATABASE E PEGA AS INFOS REQUISITADAS
                <div key={value.id}>
                    <div style={paragrafoStyle}>
                        <div>
                            <img src={url + value.fornec_foto} alt={value.fornec_foto.id} style = {imagemFornecStyle} ></img>
                        </div>
                        <p> Nome do fornecedor: {value.fornec_fornecedornome + ''}</p>
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
                        <p>Representante ID: {value.representante_id + ''}</p>
                    </div>
                    <hr style={{opacity: '0'}} />
                </div>
            ))}
            
        </div>
    )
}


export default ConsultaFornecedores;