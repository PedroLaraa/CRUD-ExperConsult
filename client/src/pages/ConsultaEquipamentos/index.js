// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import imagemEqpStyle from "../css/imagemEqp";

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

    function handleFiltrarResultados(e) {
        e.preventDefault()
        console.log('Dando certo!')
    }

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosEqp()
    },[]); 

    return ( // FIXME NÃOO ESTÁ RENDERIZANDO O HTML

        <div>
            {data.map (value => (
                <div key={value.id_fornecedor}> 
                    <form onSubmit={handleFiltrarResultados}>
                        <button
                        type="submit"
                        value={value.id_fornecedor}
                        >{value.id_fornecedor}
                        </button>
                    </form>
                </div>
        ))}
        </div>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default ConsultaEquipamentos;