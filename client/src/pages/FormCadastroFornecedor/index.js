import React, { useEffect, useState } from "react";

import { api } from "../../config/configApi";

import { useNavigate } from "react-router-dom";

import './fornecedoresStyle.css'

function FormFornecedores() {

    const [values, setValues] = useState({
        fornec_nivelfornecedor : '',
        fornec_fornecedornome : '',
        fornec_razaosocial : '',
        fornec_telefone : '',
        fornec_email : '',
        fornec_site : '',
        fornec_foto : '',
    })

    const navigate = useNavigate();

    function handleChangeValues(ev){
        const {name, value} = ev.target

        setValues({...values, [name]: value})
    }

    const handleCadastrarFornecedor = async (req, res) => {
        await api.post('fornecedorcadastrado', 
        values, 
        alert('Fornecedor cadastrado!'))
        navigate('/cadastro-fornecedores')
    }

    return(
        <div>
            <form 
            className="was-validated " 
            id="formulario" 
            autoComplete="off" 
            onSubmit={handleCadastrarFornecedor}
            encType="multipart/form-data"
            >
                <h1 className="text-uppercase">Cadastro de Fornecedor</h1>
                <h2 className="text-uppercase p-2">• Preencha os campos obrigatórios!</h2>
                <hr />
                <div className="mb-3 w-100 p-2 form-group">
                    <label htmlFor="customControlValidation1">Nível do fornecedor: </label>
                    <select
                        className="custom-select mr-sm-2"
                        id="validationInput" 
                        placeholder="Campo obrigatório" 
                        required
                        name="fornec_nivelfornecedor"
                        onChange={handleChangeValues}
                    >
                        <option>Selecione...</option>
                        <option value="Final">Final</option>
                        <option value="Intermediário">Intermediário</option>
                        
                    </select>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Nome do forncedor:</label>
                    <input 
                        className="form-control is-valid" 
                        id="validationInput" 
                        placeholder="Campo opcional" 
                        required
                        name="fornec_fornecedornome"
                        onChange={handleChangeValues}
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Razão social:</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório" 
                        required
                        name="fornec_razaosocial"
                        onChange={handleChangeValues}
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Telefone:</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório" 
                        required
                        name="fornec_telefone"
                        onChange={handleChangeValues}
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3 w-100 p-2">
                    <label htmlFor="customControlValidation1">Email:</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo obrigatório" 
                        required
                        name="fornec_email"
                        onChange={handleChangeValues}
                    >
                    </input>
                </div>
                <hr />
                <div className="mb-3w-100 p-2">
                    <label htmlFor="customControlValidation1">Site:</label>
                    <input 
                        className="form-control is-invalid" 
                        id="validationInput" 
                        placeholder="Campo opcional" 
                        name="fornec_site"
                        onChange={handleChangeValues}
                    >
                    </input>
                </div>
                <hr />
                <div className="custom-file mb-3 p-2 w-75">
                    <label>Upload de logo ⇪</label>
                    <input 
                    type="file" 
                    className="custom-file-input form-control is-invalid" 
                    id="validatedCustomFile" 
                    name="fornec_foto"
                    onChange={handleChangeValues}
                    />
                </div>
                <hr />
                <div className="mb-3 p-2">
                    <button 
                        className="btn btn-success" 
                        type="submit"
                        >Cadastrar Fornecedor
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormFornecedores;