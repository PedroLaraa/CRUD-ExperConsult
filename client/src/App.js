// IMPORTA O REACT E AS ROTAS

import React, { useEffect } from "react";

import Rotas from './routes'

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
