// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import imagemEqpStyle from "../css/imagemEqp";

import FiltraEquipamentos from "../components/botaoDeConsulta";

import RetornoEquipamentos from "../components/equipamentosRender";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function ConsultaEquipamentos(){
    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    
    const getInfosEqp = async (res, req) => { // REQUISIÇÃO DAS IMAGENS
    await api.get("list-infosequipamentos")
    .then((response) => {
        setData(response.data.value)
        setUrl(response.data.url) 
    }).catch((err) => {
        console.log(err);
    })
    }

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosEqp()
    },[]); 

    return ( // FIXME NÃOO ESTÁ RENDERIZANDO O HTML

        <div>
            <FiltraEquipamentos />
                
        </div>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default ConsultaEquipamentos;