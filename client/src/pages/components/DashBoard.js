import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import containerStyle from "../css/container";

import botaoStyle from "../css/botaoEdit";

import Scrollspy from 'react-scrollspy';

//list-infosTodo

function DashBoardInterface() {

    const [data, setData] = useState([]);
    const [ur, setUrl] = useState('');

    const getInfosTodo = async (req, res) => {
        api.get('list-infosTodo')
        .then((response) => {
            setData(response.data.value)
            setUrl(response.data.url)
        }).catch((err) => {
            console.log(err)
        })
    }

    console.log(data)

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosTodo()
    }, []);

    // FIXME SCROLLSPY NÃO ESTÁ FUNCIONANDO!!!
    return(
        <body className="position-relative">
            <div className="container">
                <div className="row">
                    <nav>
                        <ul class="nav nav-pills nav-stacked">
                            {data.map((value) => (
                                <div className="list-group col-sm-3" id="list-example" key={value.id}>
                                    <li className="list-group-item list-group-item-action" >
                                        <a href={`#${JSON.stringify(value.clientes_obra.clientes_apelido).replaceAll('"', '')}`}>
                                            {JSON.stringify(value.clientes_obra.clientes_apelido).replaceAll('"', '')}</a>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </nav>
                    <div data-spy="scroll" data-target="#list-example" data-offset="0" className=" text-primary scrollspy-example">
                    {data.map((value) => ( 
                        <div key={value.id}>
                            <div id={JSON.stringify(value.clientes_obra.clientes_apelido).replaceAll('"', '')}>
                                <h1>{JSON.stringify(value.clientes_obra.clientes_apelido).replaceAll('"', '')}</h1>
                                <h2>{value.todo_eventos}</h2>
                                <h2>{value.todo_eventos}</h2>
                                <h2>{value.todo_eventos}</h2>
                                <h2>{value.todo_eventos}</h2>
                                <h2>{value.todo_eventos}</h2>
                                <h2>{value.todo_eventos}</h2>
                                <h2>{value.todo_eventos}</h2>
                                <h2>{value.todo_eventos}</h2>
                                <h2>{value.todo_eventos}</h2>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </body>
    )
}

export default DashBoardInterface