import React, { useEffect, useState, createContext, Children } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({chilren}) => {

    const [user, setUser] = useState(null);

    const login = (usuario, senha) => {

        console.log('Login: ', {usuario, senha})

        setUser({id: '321', usuario})
    };

    const logout = () => {
        console.log('Logout')
    };

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, login, logout}}>
            {Children}
        </AuthContext.Provider>
    );
};