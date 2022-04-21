// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import imagemEqpStyle from "../css/imagemEqp";

import FiltraEquipamentos from "../components/botaoDeConsulta";


// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function ConsultaEquipamentos(){

    return ( // FIXME NÃOO ESTÁ RENDERIZANDO O HTML

        <div>
            <FiltraEquipamentos />
        </div>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default ConsultaEquipamentos;