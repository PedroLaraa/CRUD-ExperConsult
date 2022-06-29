// IMPORTA O REACT E AS ROTAS

import React, { useState, useEffect, useContext } from "react";

import Rotas from './routes'

import { AuthContext } from "./contexts/auth";

import { handleAlterImage } from "./pages/components/function/recuperaUserImg";

// CRIA PADÕES DE ROTAS INDICANDO CADA ROTA COMO UMA PÁGINA

function App() {

  useEffect(() => {

    if(localStorage.getItem('user') != undefined){
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
