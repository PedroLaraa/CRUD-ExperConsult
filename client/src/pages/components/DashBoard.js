import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import containerStyle from "../css/container";

import botaoStyle from "../css/botaoEdit";

//list-infosTodo

function DashBoardInterface() {

    const [data, setData] = useState([]);
    const [ur, setUrl] = useState('');

    const [color, setColor] = useState('whitesmoke')

    const getInfosTodo = async (req, res) => {
        api.get('list-infosTodo')
        .then((response) => {
            setData(response.data.value)
            setUrl(response.data.url)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleAlteraCor = (e) =>{
        alert(e.target.id)
    }

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosTodo()
    }, []);

    return(
            <div 
            data-spy="scroll" 
            data-target="#lista-scroll" 
            className=" vw-100 vh-100 container position-relative p-2 pt-5" 
            >
                <div id="scrollzada" className="row d-flex">
                    <div id="lista-scroll" className=" list-group col-4" style={paragrafoStyle}>
                        {data.map((value) =>(
                            <div key={value.id}>
                                    <a 
                                    className="list-group-item list-group-action pr-2" 
                                    href={`#${JSON.stringify(value.clientes_obra.clientes_apelido).replaceAll('"', '')}` + value.id}
                                    >
                                    {JSON.stringify(value.clientes_obra.clientes_apelido).replaceAll('"', '')}
                                    </a>
                            </div>
                        ))}
                    </div>
                    <div 
                    className="scrollspy-example col-8 overflow-auto"
                    style={{maxHeight: "30rem"}}>
                            {data.map((value) =>(
                                <div key={value.id}>
                                    <div style={paragrafoStyle} id={JSON.stringify(value.clientes_obra.clientes_apelido).replaceAll('"', '') + value.id}>
                                        <p>Conclusão até: {value.todo_dataConclusao}</p>
                                        <p>Evento: {value.todo_eventos}</p>
                                        <p>Autor: {value.todo_autor}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
    )
}

export default DashBoardInterface