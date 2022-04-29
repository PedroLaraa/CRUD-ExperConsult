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

    // FIXME SCROLLPSY NÃO ESTÁ FUNCIONANDO!!!
    return(
        <div>
            <div id="list-example" className="list-group w-25">
                {data.map((value) => (
                    <div key={value.id}>
                        <a className="list-group-item list-group-item-action"
                        href={`#${JSON.stringify(value.clientes_obra.clientes_apelido).replaceAll('"', '')}`}
                        >{JSON.stringify(value.clientes_obra.clientes_apelido).replaceAll('"', '')}</a>
                    </div>
                ))}
            </div>
            <body data-spy="scroll" data-target="#list-example">
                <ul>
                {data.map((value) => (
                    <div key={value.id}>
                        <li>
                            <p></p>
                        </li>
                    </div>
                ))}
                </ul>
            </body>
        </div>
    )
}

export default DashBoardInterface