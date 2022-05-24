import React, { useEffect, useState } from "react";

import { api } from "../../config/configApi";

import { useNavigate } from "react-router-dom";

import './equipamentosStyle.css'

function FormEquipamentos() {

    // TODO PARA AMANHÃ:
    // TODO ACABAR FORMULÁRIOS NO FRONT-END
    // TODO TENTAR CRIAR AUTORIZAÇÕES DE USUÁRIO (NÍVEIS DE HIERARQUIA)
    // TODO PREENCHIMENTOS AUTOMÁTICOS DE DADOS VINDOS DO USUÁRIO E SENHA
    // TODO ROTINAS DE BACKUP PARA O BANCO DE DADOS

    return(
        <div className="">
            <form 
            className="was-validated " 
            id="formulario" 
            autoComplete="off" 
            encType="multipart/form-data"
            method="POST"
            action="http://192.168.10.122:1212/equipamentocadastrado"
            onSubmit={(e) => alert('EQUIPAMENTO CADASTRADO COM SUCESSO!!!')}
            >
                <h1 className="text-uppercase">Cadastro de Cliente</h1>
                <h2 className="text-uppercase p-2">• Preencha os campos obrigatórios!</h2>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Razão Social:</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório" 
                        required
                        name="clientes_razaosocial"
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Nome Fantasia:</label>
                    <input 
                        className="form-control is-valid" 
                        id="validationInput" 
                        placeholder="Campo opcional" 
                        name="clientes_nomeFantasia"
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Apelido:</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório" 
                        required
                        name="clientes_apelido"
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">CNPJ:</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório" 
                        required
                        name="clientes_cnpj"
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Endereço:</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório" 
                        required
                        name="clientes_endereco"
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3w-100 p-2">
                    <label htmlFor="customControlValidation1">IE:</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo opcional" 
                        name="clientes_ie"
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Responsável pelo cliente:</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório"
                        required 
                        name="clientes_nomeResponsavel"
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Telefone (Responsável):</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório"
                        required 
                        name="clientes_telefone"
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Email (Responsável):</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório"
                        required 
                        name="clientes_email"
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Premissas de projeto:</label>
                    <textarea 
                        className="form-control is-invalid" 
                        id="validationTextArea" 
                        placeholder="Campo opcional"
                        name="clientes_email"
                        cols="75" rows="5"
                    >
                    </textarea>
                </div>
                <hr />
                <div className="custom-file mb-3 p-2 w-75">
                    <label>Upload de logo ⇪</label>
                    <input 
                    type="file" 
                    className="custom-file-input form-control is-invalid" 
                    id="validatedCustomFile" 
                    name="clientes_logo"
                    />
                </div>
                <hr />
                <div className="mb-3 p-2">
                    <button 
                        className="btn btn-success" 
                        type="submit"
                        >Cadastrar Cliente
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormEquipamentos;