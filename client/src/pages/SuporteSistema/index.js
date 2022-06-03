import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import { handleAlterImage } from "../components/function/recuperaUserImg";

import NotificacoesSetor from "../NotificacoesSetores";

function SuporteSistema() {

    const [user, setUser] = useState([]);
    const [username, setUsername] = useState('');

    const userMsg = 1;

    function recuperaLocalStorage() {
        setUser(JSON.parse(localStorage.getItem('user')).usuario.user_nomeUser)
    }
    
    useEffect(() => {
        recuperaLocalStorage()
        handleAlterImage()
    }, []);

    return (

        <div className="p-2">
            <form
            className="was-validated" 
            id="formulario" 
            autoComplete="off" 
            encType="multipart/form-data"
            method="POST"
            action="http://192.168.10.122:1212/report-enviado" // FIXME TO IP SERVER
            onSubmit={(e) => alert('MENSAGEM ENVIADA COM SUCESSO!!!')}
            >
                <NotificacoesSetor />
                <div className="row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Motivo da mensagem: </label> 
                        <select
                            className="form-select form-select-lg mb-3"
                            id="validationInput"
                            required
                            name="notificacoes_motivo"
                        >
                            <option value=''>Selecione...</option>
                            <option value="Bug">Bug</option>
                            <option value="Sugestão">Sugestão</option>
                            <option value="Outros">Outros</option>

                        </select>                        
                    </div>
                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="p-2 col-md-5 mb-3">
                        <label htmlFor="customControlValidation1">Mensagem:</label>
                        <textarea
                            className="form-control is-invalid"
                            id="validationTextArea"
                            placeholder="Campo obrigatório"
                            name="notificacoes_mensagem"
                            cols="75" rows="5"
                            required
                        >
                        </textarea>
                    </div>
                    <div className="p-2 col-md-5 mb-3 d-none">
                        <label htmlFor="customControlValidation1">Usuário:</label>
                        <input
                            className="form-control is-invalid"
                            id="userCritica"
                            placeholder="Campo obrigatório"
                            name="notificacoes_autor"
                            defaultValue={user}
                        >
                        </input>
                    </div>
                    <div className="p-2 col-md-5 mb-3 d-none">
                        <label htmlFor="customControlValidation1">Usuário:</label>
                        <input
                            className="form-control is-invalid"
                            id="userCritica"
                            placeholder="Campo obrigatório"
                            name="notificacoes_destinatario"
                            defaultValue= {userMsg}
                        >
                        </input>
                    </div>

                </div>
                <div className=" row d-flex flex-row justify-content-around">
                    <div className="col-md-1 mb-2">
                        <button
                        type="submit"
                        className="btn btn-success"
                        >Enviar
                        </button>
                    </div>
                </div>
            </form>
        </div>

    )

}

export default SuporteSistema;