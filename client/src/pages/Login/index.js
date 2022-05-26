import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import './loginStyle.css'

function Login(){

    const [user, setUser] = useState("");

    const [senha, setSenha] = useState("");

    const [passwordShow, setPasswordShow] = useState(false);


    const { login } = useContext(AuthContext);

    function handleSubmit(e){
        e.preventDefault()

        login(user, senha)

        if(user === "" || senha === ""){
            alert("Preencha todos os campos")
        }

    }

    const passwordShowHandler = () => {
        setPasswordShow(!passwordShow)
    }

    return (
        <div id="container">
            <div className="container d-flex justify-content-center vh-100">
                <div 
                className="form"
                >
                    <form className="form" autoComplete="off">
                        <div className="containerForm">
                            <div className="logo-exper2">
                                <img href="#topo" src="./img/logo-icone.png" />
                            </div>
                            <h3 className="p-2 d-flex justify-content-center">
                                LOGIN NO SISTEMA
                            </h3>
                            <div className="p-2">
                                <label> Usuário:</label>
                                    <input 
                                    style={{"width": "92%"}}
                                    className=""
                                    id="user"
                                    name="user"
                                    type="text"
                                    onChange={(e) => setUser(e.target.value)}
                                    ></input>
                            </div>
                            <div className="p-2">
                                <label>Senha:</label>
                                <div className="d-flex">
                                    <input 
                                    className="w-100"
                                    id="senha"
                                    name="senha"
                                    type={passwordShow ? "text" : "password"}
                                    onChange={(e) => setSenha(e.target.value)}
                                    maxlength="12"
                                    >
                                    </input>
                                    <p 
                                    className='position-relative m-1'
                                    onClick={passwordShowHandler}>👀</p>
                                </div>
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