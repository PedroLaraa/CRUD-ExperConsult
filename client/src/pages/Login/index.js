import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import './style.css'

function Login(){

    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");

    const {authenticated, login} = useContext(AuthContext);

    function handleSubmit(e){
        e.preventDefault()
        console.log("Submit", {user, senha})

        login(user, senha)
    }

    return (
        <div id="container">
            <div className="container d-flex justify-content-center vh-100">
                <div 
                className="form"
                >
                    <form className="form">
                        <div className="containerForm">
                            <div className="logo-exper2">
                                <img href="#topo" src="./img/logo-icone.png" />
                            </div>
                            <h3 className="p-2 d-flex justify-content-center">
                                LOGIN NO SISTEMA
                            </h3>
                            <p>{String(authenticated)}</p>
                            <div className="p-2">
                                <label> Usuário:</label>
                                    <input 
                                    className="w-100"
                                    id="user"
                                    name="user"
                                    type="text"
                                    onChange={(e) => setUser(e.target.value)}
                                    ></input>
                            </div>
                            <div className="p-2">
                                <label>Senha:</label>
                                    <input 
                                    className="w-100"
                                    id="senha"
                                    name="senha"
                                    type="password"
                                    onChange={(e) => setSenha(e.target.value)}
                                    ></input>
                            </div>
                            <div className="p-2 d-flex justify-content-center">
                                <button 
                                type="submit"
                                className="btn btn-success w-25"
                                onClick={handleSubmit}
                                >Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login