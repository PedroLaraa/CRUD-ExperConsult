// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import { useContext } from "react";

import { AuthContext, AuthProvider } from "../../contexts/auth";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import containerStyle from "../css/container";

import {handleAlterImage} from "./function/recuperaUserImg";

import NotificacoesSetor from "../NotificacoesSetores";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraRepresentantes() {

    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const [fornecedor, setFornecedor] = useState('');
    const [pesquisarFornecedor, setPesquisarFornecedor] = useState('')

    const [fornecedoresRep, setFornecedoresRep] = useState([]);

    const [open, setOpen] = React.useState(false);

    const getInfosFornecedores = async (res, req) => { // REQUISIÇÃO DAS IMAGENS
        await api.get("list-imgf")
            .then((response) => {
                setFornecedoresRep(response.data.fornec_foto);
            }).catch((err) => {
                console.log(err);
            })
    }

    const getInfosRepresentante = async (res, req) => { // REQUISIÇÃO DAS IMAGENS
        await api.get("list-img")
            .then((response) => {
                setData(response.data.representante_imagem);
                setUrl(response.data.url);
            }).catch((err) => {
                console.log(err);
            })
    }

    function handleFiltrar(e) {
        e.preventDefault();
        setPesquisarFornecedor(fornecedor);
    }

    function handleClickEdit() {
        setOpen(true);
    }

    const busca = pesquisarFornecedor.toLowerCase()

    const dataFiltrado = data.filter(v => v.representante_nome.toLowerCase().includes(busca))

    const verificacaoDeBusca = data.some(el => dataFiltrado.map((value) => (value)).includes(el))

    const empresasRepresenta = dataFiltrado.map(v => (v.representante_empresasrep).split(','))

    const idsFornecedores = fornecedoresRep.map(v => v.id)

    const nomesDosFornecedores = fornecedoresRep.map(v => v.fornec_fornecedornome)


    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosRepresentante()
        getInfosFornecedores()
    }, []);

    useEffect(() => {
        if(pesquisarFornecedor){
            if(verificacaoDeBusca === false || fornecedor === ''){
                alert('Resultado da busca não encontrado!')
            }
        }
    }, [pesquisarFornecedor])

    var empresasFinais = [];

        for(let i = 0; i < empresasRepresenta.length; i++) {
            for(let j = 0; j < empresasRepresenta[i].length; j++) {
                for(let k = 0; k < idsFornecedores.length; k++) {
                    if(empresasRepresenta[i][j] == idsFornecedores[k]) {
                        empresasFinais.push(' '+ nomesDosFornecedores[k])
                    };
                };
            };
        };

    let increment = 0;

    return (
        <div>
            <NotificacoesSetor />
            <div style={{ padding: '2rem' }}>
                <form style={formStyle}>
                    <input
                        style={inputStyle}
                        type='search'
                        placeholder="Representante:"
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
                </form>
            </div>
            {pesquisarFornecedor && (
                <div style={containerStyle}>
                    {dataFiltrado.map(value => (
                        <div key={value.id}>
                            <div>
                                <div style={paragrafoStyle}>
                                    <p>Nome: {value.representante_nome + ''}</p>
                                    <p>Representa: {empresasFinais + ''}</p>
                                    <p>Telefone: {value.representante_telefone + ''}</p>
                                    <p>Comentários: {value.representante_comentarios + ''}</p>
                                    <p>Site: {value.representante_site + ''}</p>
                                    <p>Estados de atuação: {value.representante_estadoatuacao + ''}</p>
                                    <p>Status: {value.representante_status}</p>
                                    <div className="p-2 d-flex d-inline justify-content-around">
                                        <a className="btn btn-outline-dark" href={`edit-representante/${value.id}`}>Editar</a>
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
export default FiltraRepresentantes;