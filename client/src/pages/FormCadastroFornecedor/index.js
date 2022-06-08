import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import './fornecedoresStyle.css'

import { handleAlterImage } from "../components/function/recuperaUserImg";

import NotificacoesSetor from "../NotificacoesSetores";

function FormFornecedores() {    

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    useEffect(() => {
        handleAlterImage()
    } , []);

    return(

        <div>
            <NotificacoesSetor />
            <form 
            className="was-validated " 
            id="formulario" 
            autoComplete="off" 
            encType="multipart/form-data"
            method="POST"
            action="http://192.168.10.122:1212/fornecedorcadastrado" // FIXME TO IP SERVER
            onSubmit={(e) => alert('FORNECEDOR CADASTRADO COM SUCESSO!!!')}
            >
                <h1 className="text-uppercase" style={{width: '20rem'}}>Cadastro de Fornecedor</h1>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-2 mb-3 form-group">
                        <label htmlFor="customControlValidation1">Nível do fornecedor: </label>
                        <select
                            className="form-select form-select-lg mb-3"
                            id="validationInput" 
                            required
                            name="fornec_nivelfornecedor"
                        >
                            <option value=''>Selecione...</option>
                            <option value="Final">Final</option>
                            <option value="Intermediário">Intermediário</option>
                        </select>
                    </div>
                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Nome do forncedor:</label>
                        <input 
                            className="form-control is-valid" 
                            id="validationInput" 
                            placeholder="Campo obrigatório" 
                            required
                            name="fornec_fornecedornome"
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Razão social:</label>
                        <input 
                            className="form-control is-invalid" 
                            id="validationInput" 
                            placeholder="Campo obrigatório" 
                            required
                            name="fornec_razaosocial"
                        >
                        </input>
                    </div>
                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Telefone:</label>
                        <input 
                            className="form-control is-invalid" 
                            id="validationInput" 
                            placeholder="Campo obrigatório" 
                            required
                            name="fornec_telefone"
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Email:</label>
                        <input 
                            className="form-control is-invalid" 
                            id="validationInput" 
                            placeholder="Campo obrigatório" 
                            required
                            name="fornec_email"
                        >
                        </input>
                    </div>
                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Site:</label>
                        <input 
                            className="form-control is-invalid" 
                            id="validationInput" 
                            placeholder="Campo opcional" 
                            name="fornec_site"
                        >
                        </input>
                    </div>
                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label>Upload de logo ⇪</label>
                        <input 
                        type="file" 
                        className="custom-file-input form-control is-invalid" 
                        id="validatedCustomFile" 
                        name="fornec_foto"
                        />
                    </div>
                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="mb-3 col-md-1 p-2">
                        <button 
                            className="btn btn-success" 
                            type="submit"
                            >Cadastrar Fornecedor
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormFornecedores;