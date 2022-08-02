import React, { useContext, useState, useEffect } from "react";

import NotificacoesSetor from "../NotificacoesSetores";

import api from '../../config/configApi';

function GerenciamentoDeObras(){

    const [data, setData] = useState([]);

    return(
        <>
        <NotificacoesSetor />
            <h1>GerenciamentoDeObras</h1>
        </>
    )

}

export default GerenciamentoDeObras;
