import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

function Login(){

    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");

    function handleSubmit(e){
        e.preventDefault()

        console.log("Submit", user, senha)
    }

    return (
        <div>
            <div className="container d-flex justify-content-center vh-100">
                <div 
                className="bg-light"
                style={{}}
                >
                    <form className="">
                        <div className="p-2">
                            <label>Usuário:</label>
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
                        <div className="p-2">
                            <button 
                            type="submit"
                            className="btn btn-outline-success"
                            onClick={handleSubmit}
                            >Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login