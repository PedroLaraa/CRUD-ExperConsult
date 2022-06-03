import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import './equipamentosStyle.css'

import { handleAlterImage } from "../components/function/recuperaUserImg";

import NotificacoesSetor from "../NotificacoesSetores";

function FormEquipamentos() {

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

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    return (
        <div className="">
            <NotificacoesSetor />
            <form
                className="was-validated "
                id="formulario"
                autoComplete="off"
                encType="multipart/form-data"
                method="POST"
                action="http://192.168.10.122:1212/equipamentocadastrado" // FIXME TO IP SERVER
                onSubmit={(e) => alert('EQUIPAMENTO CADASTRADO COM SUCESSO!!!')}
            >
                <h1 className="text-uppercase" style={{width: '20rem'}}>Cadastro de Equipamento</h1>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-2 mb-3 form-group">
                        <label htmlFor="customControlValidation1">Fornecedor do equipamento: </label>
                        <select
                            className="form-select form-select-lg mb-3 overflow-auto"
                            id="validationInput" 
                            required
                            name="fornecedor_idfk"
                        >
                            <option value=''>Selecione...</option>

                            {data.map(v => (
                                <>
                                    <option value={v.id}>• {v.fornec_fornecedornome}</option>
                                </>
                            ))}
                        
                        </select>
                    </div>
                    <div className="p-2 col-md-2 mb-3 form-group">
                        <label htmlFor="customControlValidation1">Marca do equipamento: </label>
                        <select
                            className="form-select form-select-lg mb-3 overflow-auto"
                            id="validationInput" 
                            required
                            name="desceqp_marca"
                        >
                            <option value=''>Selecione...</option>

                            {data.map(v => (
                                <>
                                    <option value={v.id}>• {v.fornec_fornecedornome}</option>
                                </>
                            ))}
                        
                        </select>
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Nome do equipamento:</label>
                        <input
                            className="form-control is-valid"
                            id="validationInput"
                            placeholder="Campo opcional"
                            required
                            name="desceqp_nomeeqp"
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Modelo do equipamento:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="desceqp_modelo"
                        >
                        </input>
                    </div>
                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Capacidade produtiva:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            name="desceqp_capacidadeprod"
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Consumo energético (KW):</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            name="desceqp_consumoene"
                        >
                        </input>
                    </div>
                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Tipo de consumo:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo opcional"
                            name="desceqp_consumotipo"
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Preço do equipamento (R$):</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            name="desceqp_precoeqp"
                        >
                        </input>
                    </div>
                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Data do valor registrado:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            type="date"
                            name="desceqp_dataultpreco"
                        >
                        </input>
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Comentários sobre equipamento:</label>
                        <textarea
                            className="form-control is-invalid"
                            id="validationTextArea"
                            placeholder="Campo opcional"
                            name="desceqp_comentario"
                            cols="75" rows="5"
                        >
                        </textarea>
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label>Upload de imagem ⇪</label>
                        <input
                            type="file"
                            className="custom-file-input form-control is-invalid"
                            id="validatedCustomFile"
                            name="desceqp_imagem"
                        />
                    </div>
                    <div className="p-2 col-md-5 mb-3">
                        <label>Upload de pdf ⇪</label>
                        <input
                            type="file"
                            className="custom-file-input form-control is-invalid"
                            id="validatedCustomFile"
                            name="desceqp_pdf"
                        />
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-1 mb-3">
                        <button
                            className="btn btn-success"
                            type="submit"
                        >Cadastrar Equipamento
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormEquipamentos;