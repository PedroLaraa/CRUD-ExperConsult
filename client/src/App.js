// IMPORTA O REACT E AS ROTAS

import React, { useEffect, useState } from "react";

import Rotas from './routes'

// CRIA PADÕES DE ROTAS INDICANDO CADA ROTA COMO UMA PÁGINA

function App() {

  return (

    <div style={{backgroundColor: "rgb(189,214,57)", padding:'.5rem'}}>
      <Rotas>
      </Rotas>
    </div>
  );
}

export default App;
