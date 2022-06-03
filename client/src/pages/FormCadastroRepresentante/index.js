import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import './representanteStyle.css'

import { handleAlterImage } from "../components/function/recuperaUserImg";

import NotificacoesSetor from "../NotificacoesSetores";

function FormRepresentante(){

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const getImagesFornec = async (req, res) => { // REQUISIÇÃO DAS IMAGENS
        await api.get('list-imgf')
            .then((response) => {
                setData(response.data.fornec_foto)
                setUrl(response.data.url)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getImagesFornec()
        handleAlterImage()
    }, []);

    return (
        <div className="">
            <NotificacoesSetor />
            <form
                className="was-validated "
                id="formulario"
                autoComplete="off"
                encType="multipart/form-data"
                method="POST"
                action="http://192.168.10.122:1212/representantecadastrado" // FIXME TO IP SERVER
                onSubmit={(e) => alert('REPRESENTANTE CADASTRADO COM SUCESSO!!!')}
            >
                <h1 className="text-uppercase" style={{width: '20rem'}}>Cadastro de Representante</h1>                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-2 mb-3 form-group">
                        <label htmlFor="customControlValidation1">Empresas que representa: </label>
                        <select
                            className="form-select form-select-lg mb-3 overflow-auto"
                            id="validationInput" 
                            required
                            multiple
                            name="representante_empresasrep"
                        >
                            <option value=''>Selecione...</option>
                            {data.map(value => (
                                <>
                                    <option value={value.id}>• {value.fornec_fornecedornome}</option>
                                </>
                            ))}
                        
                        </select>
                    </div>
                    <div className="p-2 col-md-2 mb-3 form-group">
                        <label htmlFor="customControlValidation1">Status do representante: </label>
                        <select
                            className="form-select form-select-lg mb-3 overflow-auto"
                            id="validationInput" 
                            required
                            name="representante_status"
                        >
                            <option value=''>Selecione...</option>
                            <option value='Ativo'>• Ativo</option>
                            <option value='Inativo'>• Inativo</option>
                            <option value='Indefinido'>• Indefinido</option>
                        </select>
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Nome do representante:</label>
                        <input
                            className="form-control is-valid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="representante_nome"
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Telefone:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="representante_telefone"
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Site:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo opcional"
                            name="representante_site"
                        >
                        </input>
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                <div className="p-2 col-md-3 mb-3 form-group">
                        <label htmlFor="customControlValidation1">Estados de atuação:</label>
                        <input
                            className="form-control is-valid"
                            id="validationInput"
                            placeholder="Campo opcional"
                            name="representante_estadoatuacao"
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Comentários sobre representante:</label>
                        <textarea
                            className="form-control is-invalid"
                            id="validationTextArea"
                            placeholder="Campo opcional"
                            name="representante_comentarios"
                            cols="75" rows="5"
                        >
                        </textarea>
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-1 mb-3">
                        <button
                            className="btn btn-success"
                            type="submit"
                        >Cadastrar Representante
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default FormRepresentante