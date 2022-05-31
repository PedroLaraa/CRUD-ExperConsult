// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import { useContext } from "react";

import { AuthContext, AuthProvider } from "../../contexts/auth";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo"; 

import imagemEqpStyle from "../css/imagemEqp";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import containerStyle from "../css/container";

import {handleAlterImage} from "./function/recuperaUserImg";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraEquipamentos(){
    
    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const [marcaEqp, setMarcaEqp] = useState([]); // DEFINE O DATABASE

    const [fornecedor, setFornecedor] = useState('');
    const [pesquisarFornecedor, setPesquisarFornecedor] = useState('')

    const [equipamento, setEquipamento] = useState('');
    const [pesquisarEquipamento, setPesquisarEquipamento] = useState('')

    const [open, setOpen] = React.useState(false);
    
    const getInfosEqp = async (res, req) => { // REQUISIÇÃO DAS IMAGENS E DOS DADOS
    await api.get("list-infosequipamentos")
    .then((response) => {
        setData(response.data.value);
        setUrl(response.data.url);
    }).catch((err) => {
        console.log(err);
    })
    }

    const getInfosMarcas = async (res, req) => { // REQUISIÇÃO DAS IMAGENS E DOS DADOS
        await api.get("list-infosequipamentosMarcas")
        .then((response) => {
            setMarcaEqp(response.data.value);
        }).catch((err) => {
            console.log(err);
        })
        }

    function handleClickEdit(){
        setOpen(true);
    }

    function handleFiltrar(e){
        e.preventDefault();
        setPesquisarFornecedor(fornecedor);
    }

    function handleFiltrarEqp(e){
        e.preventDefault();
        setPesquisarEquipamento(equipamento);
    }

    const busca = pesquisarFornecedor.toLowerCase();

    const busca2 = pesquisarEquipamento.toLowerCase();

    const dataFiltradoFornecedor = data.filter(v => v.fornecedore.fornec_fornecedornome.toLowerCase().includes(busca));

    const dataFiltradoNomeEqp = data.filter(v => v.desceqp_modelo.toLowerCase().includes(busca2));

    const dataFiltradoMarcas = marcaEqp.filter(v => v.desceqp_modelo.toLowerCase().includes(busca));

    const verificacaoDeBusca = data.some(el => dataFiltradoNomeEqp.map((value) => (value)).includes(el));

    const marcas = dataFiltradoMarcas.map((v) => [v.fornecedore.fornec_fornecedornome])

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosEqp();
        getInfosMarcas();
        handleAlterImage();
    },[]);

    useEffect(() => {
        if(pesquisarFornecedor){
            if(verificacaoDeBusca === false || fornecedor === '' ){
                alert('Resultado da busca não encontrado!');
            }
        }
    }, [pesquisarFornecedor]);

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    let increment = 0

    return (

        <div>
            <div style={{padding: '2rem'}} className="w-100 m-0 row d-flex flex-row justify-content-around">
                <form style={formStyle} >
                    <input
                    style={inputStyle}
                    type='search'
                    placeholder="Fornecedor:"
                    onChange={(e) => setFornecedor(e.target.value)}
                    >
                    </input>
                    <button
                        style={inputStyle}
                        type="submit"
                        onClick={handleFiltrar}
                    >
                        Filtrar...
                    </button>
                    <input
                    style={inputStyle}
                    type='search'
                    placeholder="Equipamento:"
                    onChange={(e) => setEquipamento(e.target.value)}
                    >
                    </input>
                    <button
                        style={inputStyle}
                        type="submit"
                        onClick={handleFiltrarEqp}
                    >
                        Filtrar...
                    </button>
                </form>
            </div>
            {pesquisarFornecedor && (
                <div>
                    {dataFiltradoFornecedor.map(value => (
                    <div key={value.id}> 
                        <div style={containerStyle}>   
                            <div style={paragrafoStyle}>
                                <div >
                                    <img src={url + value.desceqp_imagem} alt={value.desceqp_imagem.id} style={imagemEqpStyle}></img>
                                </div>
                                <a href={url + value.desceqp_pdf} download='pdf' style={{color: 'red'}}>DOWNLOAD PDF ⤓</a>
                                <p>• Fornecedor: {value.fornecedore.fornec_fornecedornome} </p>  
                                <p>• Nome do equipamento: {value.desceqp_nomeeqp + ''}</p>
                                <p>• Modelo: {value.desceqp_modelo + ''}</p>
                                <p>• Marca: {marcas[increment]}</p>
                                <p>• Consumo energético: {value.desceqp_consumoene + ''}</p>
                                <p>• Tipo de consumo: {value.desceqp_consumotipo+ ''}</p>
                                <p>• Preço: {value.desceqp_precoeqp+ ''}</p>
                                <p>• Data do último preço: {value.desceqp_dataultpreco+ ''}</p>
                                <p>• Capacidade produtiva: {value.desceqp_capacidadeprod + ''}</p>
                                <p>• Comentários sobre equipamento: {value.desceqp_comentario+ ''}</p>
                                <div className="p-2 d-flex d-inline justify-content-around">
                                    <a className="btn btn-outline-dark" href={`edit-equipamento/${value.id}`}>Editar</a>
                                </div>
                            </div>
                        </div>
                        <div className="d-none">
                            {increment++}
                        </div>  
                    </div>
                    ))}
                </div>
                )}
            {pesquisarEquipamento && (
                <div>
                    {dataFiltradoNomeEqp.map(value => (
                    <div key={value.id}> 
                        <div style={containerStyle}>   
                            <div style={paragrafoStyle}>
                                <div >
                                    <img src={url + value.desceqp_imagem} alt={value.desceqp_imagem.id} style={imagemEqpStyle}></img>
                                </div>
                                <a href={url + value.desceqp_pdf} download='pdf' style={{color: 'red'}}>DOWNLOAD PDF ⤓</a>
                                <p>• Fornecedor: {value.fornecedore.fornec_fornecedornome} </p>  
                                <p>• Nome do equipamento: {value.desceqp_nomeeqp + ''}</p>
                                <p>• Modelo: {value.desceqp_modelo + ''}</p>
                                <p>• Marca: {marcas[increment]}</p>
                                <p>• Consumo energético: {value.desceqp_consumoene + ''}</p>
                                <p>• Tipo de consumo: {value.desceqp_consumotipo+ ''}</p>
                                <p>• Preço: {value.desceqp_precoeqp+ ''}</p>
                                <p>• Data do último preço: {value.desceqp_dataultpreco+ ''}</p>
                                <p>• Capacidade produtiva: {value.desceqp_capacidadeprod + ''}</p>
                                <p>• Comentários sobre equipamento: {value.desceqp_comentario+ ''}</p>
                                <div className="p-2 d-flex d-inline justify-content-around">
                                    <a className="btn btn-outline-dark" href={`edit-equipamento/${value.id}`}>Editar</a>
                                </div>
                            </div>
                        </div>
                        <div className="d-none">
                            {increment++}
                        </div>  
                    </div>
                    ))}
                </div>
                )}
        </div>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default FiltraEquipamentos;