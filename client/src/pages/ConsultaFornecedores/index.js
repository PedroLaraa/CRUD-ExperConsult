// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import FiltraFornecedores from "../components/ConsultaFornecedor";

import FormDialog from "../../dialog/dialog";

// FUNÇÃO PARA CONSULTA DE DADOS DOS FORNECEDORES

function ConsultaFornecedores(){

    return(
        <FiltraFornecedores>
            <FormDialog />
        </FiltraFornecedores>
    )
}

export default ConsultaFornecedores;