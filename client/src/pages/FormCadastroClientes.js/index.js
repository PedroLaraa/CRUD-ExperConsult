import React, { useEffect, useState } from "react";

import { api } from "../../config/configApi";

import { useNavigate } from "react-router-dom";

import './clientesStyle.css'

function FormClientes() {

    const [values, setValues] = useState({
        clientes_razaoSocial : '',
        clientes_nomeFantasia : '',
        clientes_apelido : '',
        clientes_cnpj : '',
        clientes_endereco : '',
        clientes_ie : '',
        clientes_premissasDeProjeto : '',
        clientes_telefone : '',
        clientes_email : '',
        clientes_logo : '',
    })

    const navigate = useNavigate();

    function handleChangeValues(ev){
        const {name, value} = ev.target

        setValues({...values, [name]: value})
    }

    const handleCadastrarCliente = async (req, res) => {
        await api.post('clientecadastrado', 
        values, 
        alert('Cliente cadastrado!'))
        navigate('/dashboard')
    }

    return(
        <div className="">
            <form 
            className="was-validated " 
            id="formulario" 
            autoComplete="off" 
            onSubmit={handleCadastrarCliente}
            encType="multipart/form-data"
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
                        onChange={handleChangeValues}
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
                        onChange={handleChangeValues}
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
                        onChange={handleChangeValues}
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
                        onChange={handleChangeValues}
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
                        onChange={handleChangeValues}
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
                        onChange={handleChangeValues}
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
                        onChange={handleChangeValues}
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
                        onChange={handleChangeValues}
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
                        onChange={handleChangeValues}
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
                        onChange={handleChangeValues}
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
                    onChange={handleChangeValues}
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

export default FormClientes;