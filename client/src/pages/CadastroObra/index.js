
//REALIZA OS IMPORTS NECESSÁRIOS (ESTILOS, MÉTODOS...)

import React, { useEffect, useState } from "react";

import { useContext } from "react";

import { AuthContext, AuthProvider } from "../../contexts/auth";

import { handleAlterImage } from "../components/function/recuperaUserImg";

import api from '../../config/configApi';

import NotificacoesSetor from "../NotificacoesSetores";

function CadastroObra() {

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    useEffect(() => {
        handleAlterImage()
    }, [])

    const [obras, setObras] = useState([]);

    const getInfosObras = async (req, res) => {
        api.get('list-infosClientes')
            .then((response) => {
                setObras(response.data.clientes_logo)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getInfosObras();
    }, [])

    return (
        <div>
            <NotificacoesSetor />
            <div>
                <form
                    className="was-validated"
                    id="formulario"
                    autoComplete="off"
                    encType="multipart/form-data"
                    method="POST"
                    action="http://192.168.10.122:1212/obracadastrada" // FIXME TO IP SERVER
                    onSubmit={(e) => alert('OBRA CADASTRADA COM SUCESSO!!!')}
                >
                    <h1 className="text-uppercase">Cadastro de Obra</h1>
                    <hr />
                    <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-5 mb-3">
                            <label htmlFor="customControlValidation1">Nome da Obra:</label>
                            <input
                                className="form-control is-invalid "
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="obras_nomeDaObra"
                            >
                            </input>
                        </div>
                        <div className="p-2 col-md-5 mb-3">
                            <label htmlFor="customControlValidation1">Cliente:</label>
                            <select
                                className="form-select form-select-lg mb-3 overflow-auto"
                                id="validationInput"
                                required
                                name="obras_cliente"
                            >
                                <option value=''>Selecione...</option>

                                {obras.map(v => (
                                    <>
                                        <option value={v.id}>{v.clientes_apelido}</option>
                                    </>
                                ))}

                            </select>
                        </div>
                    </div>
                    <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-5 mb-3">
                            <label htmlFor="customControlValidation1">Premissas da Obra:</label>
                            <textarea
                                className="form-control is-invalid "
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="obras_premissasDaObra"
                                rows={8}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-1 mb-3">
                        <button
                            className="btn btn-success"
                            type="submit"
                        >Cadastrar Obra
                        </button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default CadastroObra;