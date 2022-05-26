import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

function FormUsuario(){

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const [data2, setData2] = useState([]);
    const [url2, setUrl2] = useState('');

    const getInfosPerm = async (req, res) => { // REQUISIÇÃO DAS IMAGENS
        await api.get('list-permissoes')
            .then((response) => {
                setData(response.data.value)
                setUrl(response.data.url)
            }).catch((err) => {
                console.log(err)
            })
    }

    const getInfosUser = async (req, res) => { // REQUISIÇÃO DAS IMAGENS
        await api.get('list-setores')
            .then((response) => {
                setData2(response.data.value)
                setUrl2(response.data.url)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosUser()
        getInfosPerm()
    }, []);

    console.log('DATA', data)
    console.log('DATA2', data2)

    return (
        <div className="">
            <form
                className="was-validated "
                id="formulario"
                autoComplete="off"
                encType="multipart/form-data"
                method="POST"
                action="http://192.168.10.122:1212/usuariocadastrado" 
                onSubmit={(e) => alert('USUÁRIO CADASTRADO COM SUCESSO!!!')}
            >
                <h1 className="text-uppercase" style={{width: '14rem', textAlign: 'center'}}>Cadastro de Usuário</h1>
                <h2 className="text-uppercase p-2">• Preencha os campos obrigatórios!</h2>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Nome:</label>
                        <input
                            className="form-control is-valid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="user_nome"
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Usuário:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                            name="user_nomeUser"
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Senha:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            type="password"
                            name="user_senha"
                            required
                        >
                        </input>
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                <div className="p-2 col-md-3 mb-3 form-group">
                        <label htmlFor="customControlValidation1">Email (Exper):</label>
                        <input
                            className="form-control is-valid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            name="user_email"
                            type="email"
                            required
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Email (Pessoal):</label>
                        <input
                            className="form-control is-invalid"
                            id="validationTextArea"
                            placeholder="Campo obrigatório"
                            name="user_emailPessoal"
                            type="email"
                            required
                        >
                        </input>
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                <div className="p-2 col-md-3 mb-3 form-group">
                        <label htmlFor="customControlValidation1">Telefone:</label>
                        <input
                            className="form-control is-valid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            name="user_telefone"
                            required
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Data nascimento:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationTextArea"
                            placeholder="Campo obrigatório"
                            name="user_dataNasc"
                            type="date"
                            required
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">CPF:</label>
                        <input
                            className="form-control is-invalid"
                            id="validationTextArea"
                            placeholder="Campo obrigatório"
                            name="user_cpf"
                            required
                        >
                        </input>
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                <div className="p-2 col-md-3 mb-3 form-group">
                <label htmlFor="customControlValidation1">Nível: </label>
                        <select
                            className="form-select form-select-lg mb-3 overflow-auto"
                            id="validationInput" 
                            required
                            name="representante_empresasrep"
                        >
                            <option value=''>Selecione...</option>
                            {data.map(value => (
                                <>
                                    <option value={value.id}>• {value.perm_nomeDaPerm}</option>
                                </>
                            ))}
                        
                        </select>
                </div>
                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-1 mb-3">
                        <button
                            className="btn btn-success"
                            type="submit"
                        >Cadastrar Usuário
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default FormUsuario;