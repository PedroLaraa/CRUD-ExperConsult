import React, { useEffect, useState, createContext, Children } from "react";

import { Navigator, useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)

    useEffect(() =>{

        const recoverUser = localStorage.getItem('user');

        if(recoverUser){
            setUser(JSON.parse(recoverUser));
        }

        setLoading(false)

    }, [])

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const login = (usuario, senha) => {

        const loggedUser = {
            id: '123',
            usuario,
        }

        localStorage.setItem("user", JSON.stringify(loggedUser))

        if (senha === 'secret'){
            setUser(loggedUser)
            navigate('/dashboard')
        }
    };

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        navigate('/login')
    };

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};