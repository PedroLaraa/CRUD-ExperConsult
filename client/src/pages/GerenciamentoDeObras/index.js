import React, { useContext, useState, useEffect } from "react";

import NotificacoesSetor from "../NotificacoesSetores";

import api from '../../config/configApi';

function GerenciamentoDeObras(){

    const [obras, setObras] = useState([]);

    const getInfosObras = async (req, res) => {
        api.get('list-infosObras')
            .then((response) => {
                setObras(response.data.value);
            }).catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getInfosObras();
    }, [])

    

    return(
        <>
        <NotificacoesSetor />
            
        </>
    )

}

export default GerenciamentoDeObras;
