import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import { handleAlterImage } from "../components/function/recuperaUserImg";

import paragrafoDoedStyle from "../css/paragrafoDoed";

import paragrafoDashboardStyle from "../css/paragrafoDashboard.js";

import './setoresNot.css'

function NotificacoesSetor() {

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    const notificacoesBtn = document.getElementById('notificacoesBtn');

    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState('');

    const [recoveredUsers, setRecoveredUsers] = useState('');

    const [show, setShow] = useState(false);

    const getNotificacoesSetores = async (req, res) => {
        api.get('list-notificacoesSetor')
            .then((response) => {
                setData(response.data.value)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        handleAlterImage()

        setRecoveredUsers(JSON.parse(localStorage.getItem('user')))

        getNotificacoesSetores()

    }, [])

    const setoresId = data.map(v => v.notificacoes_destinatario)

    const setoresIdArray = setoresId.map(v => v.split(','))

    const dataFiltrado = []



    for (let i = 0; i < setoresIdArray.length; i++) {
        for (let j = 0; j < setoresIdArray[i].length; j++) {
            if (setoresIdArray[i][j] == recoveredUsers.usuario.user_setor) {
                dataFiltrado.push(data[i])
            } else {
                continue
            }
        }
    }

    function handleShowNotification() {

        setShow(!show)

        const el = document.getElementById('toggleNot')

        el.setAttribute('class', !show ? 'p-2' : 'd-none')

    }

    notificacoesBtn.addEventListener('click', handleShowNotification, false)

    const idsLidos = dataFiltrado.map(v => v.id)

    function handleClearNotification() {

        setShow(!show)

        const values = {

            user_notificacoesLidas: idsLidos.toString(),
    
            id: recoveredUsers.usuario.id
    
        }

        const el = document.getElementById('toggleNot')

        el.setAttribute('class', !show ? 'p-2' : 'd-none')

        if (localStorage.getItem('notificacoesLidas')) {
            localStorage.removeItem('notificacoesLidas')
        }

        localStorage.setItem('notificacoesLidas', idsLidos)

        api.put('notificacao-lida', values)

    }

    const idsLocalStorageLidos = localStorage.getItem('notificacoesLidas').split(',')

    const notificacoesNaoLidas = []

    for (let i = 0; i <= idsLocalStorageLidos.length; i++) {
        for (let j = 0; j <= idsLidos.length; j++) {
            if (idsLocalStorageLidos[i] == idsLidos[j]) {
                delete dataFiltrado[j]
            }
        }
    }

    return (
        <div className="p-2 d-none" id='toggleNot'>
            <div id="containerDiv">
                {show === true && (
                    <div className="overflow-auto" style={{ maxHeight: '20rem' }}>
                        <div className="row d-flex justify-content-around">
                            <div className="col-11 p-4">
                                <button className="w-100 btn btn-dark" onClick={handleClearNotification}>
                                    🧹 Limpar Notificações
                                </button>
                            </div>
                            <div className="col-11" style={{ backgroundColor: '#A2A2A2', height: '4px' }}>
                                <p></p>
                            </div>
                        </div>
                        {dataFiltrado.map(v => (
                            <div key={v.id} className="">
                                <div className="row d-flex justify-content-around ">
                                    <div className="col-11 ">
                                        <p>• Notificação: {v.notificacoes_motivo}</p>
                                    </div>
                                    <div className="col-11 ">
                                        <p>• Mensagem: {v.notificacoes_mensagem}</p>
                                    </div>
                                    <div className="col-11 " style={{ backgroundColor: '#A2A2A2', height: '4px' }}>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )

}

export default NotificacoesSetor;