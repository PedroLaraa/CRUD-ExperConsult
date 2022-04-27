// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import FiltraEquipamentos from "../components/ConsultaEquipamentos";

import FormDialog from "../../dialog/EquipamentosDialog";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function ConsultaEquipamentos(){

    return ( 
            <FiltraEquipamentos>
                <FormDialog />
            </FiltraEquipamentos>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default ConsultaEquipamentos;