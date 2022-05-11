// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import FiltraClientes from "../components/ConsultaClientes";

// FUNÇÃO PARA CONSULTA DE DADOS DOS CLIENTES

function ConsultaClientes(){

    return ( 
        <FiltraClientes />
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default ConsultaClientes;