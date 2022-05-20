import React, { useEffect, useState } from "react";

import { api } from "../../config/configApi";

import './clientesStyle.css'

function FormClientes() {

    const cadastraCliente = async (req, res) => {
        await api.post('clientecadastrado')
    }

    return(
        <div className="">
            <form className="was-validated">
                <div className="mb-3 w-25 p-2">
                    <label htmlFor="customControlValidation1">Razão Social</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório" 
                        required
                        name="clientes_razaosocial"
                    >
                    </input>
                </div>
                <div className="mb-3 w-25 p-2">
                    <label htmlFor="customControlValidation1">Nome Fantasia</label>
                    <input 
                        className="form-control is-valid" 
                        id="validationInput" 
                        placeholder="Campo opcional" 
                        name="clientes_nomeFantasia"
                    >
                    </input>
                </div>
                <div className="mb-3 w-25 p-2">
                    <label htmlFor="customControlValidation1">Apelido</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório" 
                        required
                        name="clientes_apelido"
                    >
                    </input>
                </div>
                <div className="mb-3 w-25 p-2">
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
                <div className="mb-3 w-25 p-2">
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
                <div className="mb-3 w-25 p-2">
                    <label htmlFor="customControlValidation1">IE:</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo opcional" 
                        name="clientes_ie"
                    >
                    </input>
                </div>
                <div className="mb-3 w-25 p-2">
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
                <div className="mb-3 w-25 p-2">
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
                <div className="mb-3 p-2">
                    <button className="btn btn-success" type="submit">Cadastrar Cliente</button>
                </div>
            </form>
        </div>
    )
}

export default FormClientes;