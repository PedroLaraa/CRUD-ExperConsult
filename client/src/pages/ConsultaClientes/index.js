// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import FiltraClientes from "../components/ConsultaClientes";

import './clientesStyle.css'

// FUNÇÃO PARA CONSULTA DE DADOS DOS CLIENTES

function ConsultaClientes(){

    return ( 
        <FiltraClientes />
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default ConsultaClientes;