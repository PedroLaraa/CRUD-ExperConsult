// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo"; 

import imagemEqpStyle from "../css/imagemEqp";


// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraEquipamentos(){
    
    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const qualFornec = []
    
    const getInfosEqp = async (res, req) => { // REQUISIÇÃO DAS IMAGENS
    await api.get("list-infosequipamentos")
    .then((response) => {
        setData(response.data.value)
        setUrl(response.data.url) 
    }).catch((err) => {
        console.log(err);
    })
    }

    function dataFilter() {
        data.map(value => {
            if(value.id_fornecedor === qualFornec){
                setData([
                    ...data,
                    {
                        id_fornecedor: qualFornec
                    }
                ])
            }
        })
    }

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosEqp()
        dataFilter()
    },[]);

    return ( // FIXME NÃOO ESTÁ RENDERIZANDO O HTML

        <div>
            {data.map (value => (
                <div key={value.id_fornecedor}> 
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        qualFornec.push(value.id_fornecedor)
                        console.log(qualFornec)
                    }}>
                        <button
                        id="valorFornecedor"
                        type="submit"
                        value={value.id_fornecedor}
                        onClick={dataFilter}
                        >{value.id_fornecedor}
                        </button>
                    </form>
                    <ul>
                        <li>{value.id_fornecedor}</li>
                    </ul>
                </div>
            ))}
        </div>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default FiltraEquipamentos;