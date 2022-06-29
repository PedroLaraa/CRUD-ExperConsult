// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import imagemEqpStyle from "../css/imagemEqp";

import formStyle from "../css/FormStyleEqp";

import inputStyle from "../css/inputStyle";

import containerStyle from "../css/container";

import NotificacoesSetor from "../NotificacoesSetores";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraEquipamentos() {

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

    function handleClickEdit() {
        setOpen(true);
    }

    function handleFiltrar(e) {
        e.preventDefault();
        setPesquisarFornecedor(fornecedor);
    }

    function handleFiltrarEqp(e) {
        e.preventDefault();
        setPesquisarEquipamento(equipamento);
    }

    const busca = pesquisarFornecedor.toLowerCase();

    const busca2 = pesquisarEquipamento.toLowerCase();

    const dataFiltradoFornecedor = data.filter(v => v.fornecedore.fornec_fornecedornome.toLowerCase().includes(busca));

    const dataFiltradoNomeEqp = data.filter(v => v.desceqp_nomeeqp.toLowerCase().includes(busca2));

    const dataFiltradoMarcas = marcaEqp.filter(v => v.desceqp_nomeeqp.toLowerCase().includes(busca2));

    const dataFiltradoMarcas2 = marcaEqp.filter(v => v.fornecedore.fornec_fornecedornome.toLowerCase().includes(busca));

    const verificacaoDeBusca = data.some(el => dataFiltradoNomeEqp.map((value) => (value)).includes(el));

    const verificacaoDeBusca2 = data.some(el => dataFiltradoFornecedor.map((value) => (value)).includes(el));

    const marcas = dataFiltradoMarcas.map((v) => [v.fornecedore.fornec_fornecedornome])

    const marcas2 = dataFiltradoMarcas2.map((v) => [v.fornecedore.fornec_fornecedornome])

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosEqp();
        getInfosMarcas();
    }, []);

    useEffect(() => {
        if (pesquisarFornecedor) {
            if (verificacaoDeBusca2 === false || fornecedor === '') {
                alert('Resultado da busca não encontrado!');
            }
        }

        if (pesquisarEquipamento) {
            if (verificacaoDeBusca === false || equipamento === '') {
                alert('Resultado da busca não encontrado!');
            }
        }
        
    }, [pesquisarFornecedor, pesquisarEquipamento]);

    let increment = 0

    let increment2 = 0

    return (

        <div>
            <NotificacoesSetor />
            <div style={{ padding: '2rem' }}>
                <form style={formStyle} >
                    <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-3 mb-3">
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
                        </div>
                        <div className="p-2 col-md-3 mb-3">
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
                        </div>
                    </div>
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
                                    <a href={url + value.desceqp_pdf} download='pdf' style={{ color: 'red' }}>DOWNLOAD PDF ⤓</a>
                                    <p>• Fornecedor: {value.fornecedore.fornec_fornecedornome} </p>
                                    <p>• Nome do equipamento: {value.desceqp_nomeeqp + ''}</p>
                                    <p>• Modelo: {value.desceqp_modelo + ''}</p>
                                    <p>• Marca: {marcas2[increment]}</p>
                                    <p>• Dados elétricos: {value.desceqp_consumoene + ''}</p>
                                    <p>• Tipo de consumo: {value.desceqp_consumotipo + ''}</p>
                                    <p>• Preço: {value.desceqp_precoeqp + ''}</p>
                                    <p>• Data do último preço: {value.desceqp_dataultpreco.split('-').reverse().join('/')}</p>
                                    <p>• Capacidade produtiva: {value.desceqp_capacidadeprod + ''}</p>
                                    <p>• Comentários sobre equipamento: {value.desceqp_comentario + ''}</p>
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
                                    <a href={url + value.desceqp_pdf} download='pdf' style={{ color: 'red' }}>DOWNLOAD PDF ⤓</a>
                                    <p>• Fornecedor: {value.fornecedore.fornec_fornecedornome} </p>
                                    <p>• Nome do equipamento: {value.desceqp_nomeeqp + ''}</p>
                                    <p>• Modelo: {value.desceqp_modelo + ''}</p>
                                    <p>• Marca: {marcas[increment2]}</p>
                                    <p>• Consumo energético: {value.desceqp_consumoene + ''}</p>
                                    <p>• Tipo de consumo: {value.desceqp_consumotipo + ''}</p>
                                    <p>• Preço: {value.desceqp_precoeqp + ''}</p>
                                    <p>• Data do último preço: {value.desceqp_dataultpreco.replaceAll('-', '/')}</p>
                                    <p>• Capacidade produtiva: {value.desceqp_capacidadeprod + ''}</p>
                                    <p>• Comentários sobre equipamento: {value.desceqp_comentario + ''}</p>
                                    <div className="p-2 d-flex d-inline justify-content-around">
                                        <a className="btn btn-outline-dark" href={`edit-equipamento/${value.id}`}>Editar</a>
                                    </div>
                                </div>
                            </div>
                            <div className="d-none">
                                {increment2++}
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