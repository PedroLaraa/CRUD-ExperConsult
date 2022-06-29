// IMPORTA O REACT E AS ROTAS

import React, { useState, useEffect, useContext } from "react";

import Rotas from './routes'

import { AuthContext } from "./contexts/auth";

import { handleAlterImage } from "./pages/components/function/recuperaUserImg";

// CRIA PADÕES DE ROTAS INDICANDO CADA ROTA COMO UMA PÁGINA

function App() {

    const logout = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    const [user, setUser] = useState();

  useEffect(() => {

    setUser(JSON.parse(localStorage.getItem('user'))); // Recupera o usuário logado

    if(user != undefined){
      handleAlterImage()
    }

  }, [])

  return (

    <div>
      <Rotas>
      </Rotas>
    </div>
  );
}

export default App;
