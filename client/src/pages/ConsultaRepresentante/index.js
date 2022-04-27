// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import FiltraRepresentantes from "../components/ConsultaRepresentantes";

import FormDialog from "../../dialog/RepresentantesDialog";


// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

const ConsultaRepresentantes = () => {

    return (
            <FiltraRepresentantes>
                <FormDialog />
            </FiltraRepresentantes>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default ConsultaRepresentantes;