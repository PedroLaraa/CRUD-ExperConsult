import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import NotificacoesSetor from "../NotificacoesSetores";

function FormUsuario(){

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

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

    return (
        <div className="">
            <NotificacoesSetor />
            <form
                className="was-validated"
                id="formulario"
                encType="multipart/form-data"
                method="POST"
                action="http://192.168.10.127:1212/usuariocadastrado" // FIXME TO IP SERVER
                onSubmit={(e) => alert('USUÁRIO CADASTRADO COM SUCESSO!!!')}
            >
                <h1 className="text-uppercase" style={{width: '18rem', textAlign: 'center'}}>Cadastro de Usuário</h1>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Nome:</label>
                        <input
                            className="form-control is-valid"
                            name="user_nome"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Usuário:</label>
                        <input
                            className="form-control is-invalid"
                            name="user_nomeUser"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            required
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Senha:</label>
                        <input
                            className="form-control is-invalid"
                            name="user_senha"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            type="password"
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
                            name="user_email"
                            className="form-control is-valid"
                            id="validationInput"
                            placeholder="Campo obrigatório"
                            type="email"
                            required
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Email (Pessoal):</label>
                        <input
                            name="user_emailPessoal"
                            className="form-control is-invalid"
                            id="validationTextArea"
                            placeholder="Campo obrigatório"
                            type="email"
                            required
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Endereço:</label>
                        <input
                            name="user_endereco"
                            className="form-control is-invalid"
                            id="validationTextArea"
                            placeholder="Campo obrigatório"
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
                            name="user_telefone"
                            className="form-control is-valid"
                            id="validationInput"
                            type='tel'
                            pattern="+55[(0-9)]{2}[0-9]{5}-[0-9]{4}"
                            placeholder="+55(__)_____-____"
                            maxLength="17"
                            required
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">Data nascimento:</label>
                        <input
                            name="user_dataNasc"
                            className="form-control is-invalid"
                            id="validationTextArea"
                            placeholder="Campo obrigatório"
                            type="date"
                            required
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3">
                        <label htmlFor="customControlValidation1">CPF:</label>
                        <input
                            name="user_cpf"
                            className="form-control is-invalid"
                            id="validationTextArea"
                            placeholder="Campo obrigatório"
                            required
                        >
                        </input>
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-3 mb-3 form-group">
                    <label htmlFor="customControlValidation1">Nível de usuário: </label>
                            <select
                                name="user_permissoes"
                                className="form-select form-select-lg mb-3 overflow-auto"
                                id="validationInput" 
                                required
                            >
                                <option value=''>Selecione...</option>
                                {data.map(value => (
                                    <>
                                        <option key={value.id} value={value.id}>• {value.perm_nomeDaPerm}</option>
                                    </>
                                ))}
                            
                            </select>
                    </div>
                    <div className="p-2 col-md-3 mb-3 form-group">
                        <label htmlFor="customControlValidation1">Cargo: </label>
                        <input 
                        name="user_cargo"
                        className="form-control is-invalid"
                        id="validationTextArea"
                        placeholder="Campo obrigatório"
                        required
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-3 mb-3 form-group">
                    <label htmlFor="customControlValidation1">Setor: </label>
                            <select
                                name="user_setor"
                                className="form-select form-select-lg mb-3 overflow-auto"
                                id="validationInput" 
                                required
                            >
                                <option value=''>Selecione...</option>
                                {data2.map(value => (
                                    <>
                                        <option key={value.id} value={value.id}>• {value.setores_nomeSetor}</option>
                                    </>
                                ))}
                            
                            </select>
                    </div>
                </div>
                <hr />
                <div className=" row d-flex flex-row justify-content-around">
                    <div className=" row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-5 mb-3">
                            <label>Upload de foto ⇪</label>
                            <input 
                            type="file" 
                            className="custom-file-input form-control is-invalid" 
                            id="validatedCustomFile" 
                            name="user_foto"
                            />
                        </div>
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