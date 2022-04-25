// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import FiltraRepresentantes from "../components/ConsultaRepresentantes";


// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

const ConsultaRepresentantes = () => {

    return (

        <div>
            <FiltraRepresentantes />
        </div>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default ConsultaRepresentantes;