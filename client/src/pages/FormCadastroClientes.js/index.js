import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import './clientesStyle.css'

function FormClientes() {

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    return (

        <div className="">
            <form
                className="was-validated"
                id="formulario"
                autoComplete="off"
                encType="multipart/form-data"
                method="POST"
                action="http://192.168.10.122:1212/clientecadastrado"
                onSubmit={(e) => alert('CLIENTE CADASTRADO COM SUCESSO!!!')}
            >
                <h1 className="text-uppercase">Cadastro de Cliente</h1>
                <h2 className="text-uppercase p-2">• Preencha os campos obrigatórios!</h2>
                <hr />
                <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Razão Social:</label>
                        <input
                            className="form-control is-invalid "
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="clientes_razaosocial"
                        >
                        </input>
                    </div>
                    <div className=" p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Nome Fantasia:</label>
                        <input
                            className="form-control is-valid "
                            id="validationInput"
                            placeholder="Campo opcional"
                            name="clientes_nomeFantasia"
                        >
                        </input>
                    </div>
                </div>
                <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                    <div className=" p-2 col-md-5 mb-3">
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
                    <div className=" p-2 col-md-5 mb-3">
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
                </div>
                <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                    <div className="mb-3 col-md-5 p-2">
                        <label htmlFor="customControlValidation1">IE:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo opcional"
                            name="clientes_ie"
                        >
                        </input>
                    </div>
                    <div className="mb-3 col-md-5 p-2">
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
                </div>
                <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                    <div className="mb-3 col-md-5 p-2">
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
                    <div className="mb-3 col-md-5 p-2">
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
                </div>
                <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                    <div className="mb-3 col-md-2 p-2">
                        <label htmlFor="customControlValidation1">Cidade:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="clientes_endereco"
                        >
                        </input>
                    </div>
                    <div className="mb-3 col-md-2 p-2">
                        <label htmlFor="customControlValidation1">Estado:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="clientes_endereco"
                        >
                        </input>
                    </div>
                    <div className="mb-3 col-md-2 p-2">
                        <label htmlFor="customControlValidation1">País:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="clientes_endereco"
                        >
                        </input>
                    </div>
                    <div className="mb-3 col-md-2 p-2" >
                        <label htmlFor="customControlValidation1">CEP:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="clientes_endereco"
                        >
                        </input>
                    </div>
                </div>
                <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                    <div className="mb-3 col-md-3 p-2">
                        <label htmlFor="customControlValidation1">Logradouro:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="clientes_endereco"
                        >
                        </input>
                    </div>
                    <div className="mb-3 col-md-3 p-2">
                        <label htmlFor="customControlValidation1">Bairro:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="clientes_endereco"
                        >
                        </input>
                    </div>
                    <div className="mb-3 col-md-3 p-2">
                        <label htmlFor="customControlValidation1">Nº:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="clientes_endereco"
                        >
                        </input>
                    </div>
                </div>
                <div className="w-100 m-0 row d-flex flex-row justify-content-center">
                    <div className="mb-3 col-md-6 p-2">
                        <label htmlFor="customControlValidation1" className="position-relative d-flex justify-content-center">Premissas de projeto:</label>
                        <textarea
                            className="form-control is-invalid"
                            id="validationTextArea"
                            placeholder="Campo opcional"
                            name="clientes_premissasDeProjeto"
                            cols="75" rows="5"
                        >
                        </textarea>
                    </div>
                </div>
                <div className="w-100 m-0 row d-flex flex-row justify-content-center">
                <div className="custom-file mb-3 col-md-6 p-2 ">
                    <label className="d-flex justify-content-center">Upload de logo ⇪</label>
                    <input
                        type="file"
                        className="custom-file-input form-control is-invalid"
                        id="validatedCustomFile"
                        name="clientes_logo"
                    />
                </div>
                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="mb-3 col-md-1 p-2">
                        <button
                            className="btn btn-success"
                            type="submit"
                        >CADASTRAR CLIENTE
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormClientes;