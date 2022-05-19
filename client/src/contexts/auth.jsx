import React, { useEffect, useState, createContext, Children } from "react";

import { Navigator, useNavigate } from "react-router-dom";

import { createSession } from "../config/configApi";

import api from '../config/configApi';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState(null);

    useEffect(() =>{

        const recoverUser = localStorage.getItem('user');

        if(recoverUser){
            setUser(JSON.parse(recoverUser));
        }

        setLoading(false)

    }, [])

    const navigate = useNavigate();

    
    const login = async (usuario, senha) => {

        const response = await createSession(usuario, senha);

        const loggedUser = response.data;
        const token = response.data.token;

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);

        api.defaults.headers.Authorization = `x-acess-token ${token}`;

        setUser(loggedUser);
        navigate('/dashboard');

    };

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        navigate('/login')
    };

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};