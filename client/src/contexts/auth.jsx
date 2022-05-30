import React, { useEffect, useState, createContext, Children, useContext} from "react";

import { Navigator, useNavigate } from "react-router-dom";

import { createSession } from "../config/configApi";

import api from '../config/configApi';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState(null);

    useEffect(() =>{

        const recoverUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if(recoverUser && token){
            setUser(JSON.parse(recoverUser));
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false);

    }, [])

    const login = async (usuario, senha) => {

        const response = await createSession(usuario, senha);
        const loggedUser = response.data;
        const token = response.data.token;

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser);
        navigate('/dashboard');

        if(loggedUser.auth === true){
            alert(`Seja bem vindo(a) ${loggedUser.usuario.user_nome}!`);
            navigate('/dashboard');
            document.location.reload();
        }else if(loggedUser.auth === false){
            alert(`Usuário ou senha inválidos!`);
            localStorage.removeItem('user');
            localStorage.removeItem("token");

            navigate('/login');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        
        navigate('/login');
        document.location.reload();
    };

    return (

        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
        
    );
};