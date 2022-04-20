// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo"; 

import imagemEqpStyle from "../css/imagemEqp";


// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraEquipamentos(){
    
    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const [fornecedor, setFornecedor] = useState();
    const [pesquisarFornecedor, setPesquisarFornecedor] = useState()
    
    const getInfosEqp = async (res, req) => { // REQUISIÇÃO DAS IMAGENS
    await api.get("list-infosequipamentos")
    .then((response) => {
        setData(response.data.value)
        setUrl(response.data.url) 
    }).catch((err) => {
        console.log(err);
    })
    }

    function handleFiltrar(e){
        e.preventDefault()
        setPesquisarFornecedor(fornecedor)
        console.log(fornecedor)
    }

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosEqp()
    },[]);

    return (

        <div>
            <form>
                <input
                type='search'
                placeholder="Fornecedor:"
                onChange={(e) => setFornecedor(e.target.value)}
                >
                </input>
                <button
                    type="submit"
                    onClick={handleFiltrar}
                >
                    Filtrar...
                </button>
            </form>
            {pesquisarFornecedor && ( //FIXME NÃO ESTÁ FILTRANDO OS VALORES TENTAR USAR O .FILTER()
                <div>
                    {data.map(value => (
                    <div key={value.id_fornecedor}>    
                        <h1>{value.id_fornecedor}</h1>
                    </div>
                    ))}
                </div>
                )}
        </div>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default FiltraEquipamentos;