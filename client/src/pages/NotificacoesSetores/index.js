import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import { handleAlterImage } from "../components/function/recuperaUserImg";

import paragrafoDoedStyle from "../css/paragrafoDoed";

import paragrafoDashboardStyle from "../css/paragrafoDashboard.js";

import './setoresNot.css'

function NotificacoesSetor() {

    // Contexto de autenticação

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    const notificacoesBtn = document.getElementById('notificacoesBtn');

    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState('');

    const [recoveredUsers, setRecoveredUsers] = useState('');

    const [show, setShow] = useState(false);

    const getNotificacoesSetores = async (req, res) => { // RECUPERA AS NOTIFICAÇÕES DO BANCO DE DADOS POR UMA ROTA BACK-END
        api.get('list-notificacoesSetor')
            .then((response) => {
                setData(response.data.value)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => { // CARREGA AS NOTIFICAÇÕES E ETC
        handleAlterImage()

        setRecoveredUsers(JSON.parse(localStorage.getItem('user')))

        getNotificacoesSetores()

    }, [])

    const setoresId = data.map(v => v.notificacoes_destinatario) // RECUPERA O ID DOS SETORES

    const setoresIdArray = setoresId.map(v => v.split(',')) // TRANSFORMA O STRING EM ARRAY

    const dataFiltrado = []

    for (let i = 0; i < setoresIdArray.length; i++) { // FILTRA OS DADOS PARA RETORNAR APENAS AS NOTIFICAÇÕES DE SETORES QUE O USUARIO TEM ACESSO
        for (let j = 0; j < setoresIdArray[i].length; j++) {
            if (setoresIdArray[i][j] == recoveredUsers.usuario.user_setor) {
                dataFiltrado.push(data[i])
            } else {
                continue
            }
        }
    }

    function handleShowNotification() { // FUNÇÃO PARA MOSTRAR / OCULTAR A NOTIFICAÇÃO

        setShow(!show)

        const el = document.getElementById('toggleNot')

        el.setAttribute('class', !show ? 'p-2' : 'd-none')

    }

    notificacoesBtn.addEventListener('click', handleShowNotification, false) // EVENTO PARA ABRIR A NOTIFICAÇÃO

    const idsLidos = dataFiltrado.map(v => v.id) // RECUPERA OS IDS DAS NOTIFICÇÕES

    function handleClearNotification() { // FUNÇÃO PARA LIMPAR AS NOTIFICAÇÕES

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

    const idsLocalStorageLidos = localStorage.getItem('notificacoesLidas').split(',') // RECUPERA OS IDS LIDOS

    const notificacoesNaoLidas = []

    for (let i = 0; i <= idsLocalStorageLidos.length; i++) { // VERIFICA SE AS NOTIFICAÇÕES NÃO FORAM LIDAS
        for (let j = 0; j <= idsLidos.length; j++) {
            if (idsLocalStorageLidos[i] == idsLidos[j]) {
                delete dataFiltrado[j]
            }
        }
    }

    const iconeNotificacao = document.getElementById('iconeNotificacao') // DEFINE O ICONE DA NOTIFICAÇÃO

    iconeNotificacao.innerHTML = `🔔 ${dataFiltrado.length - idsLocalStorageLidos.length}` // ALTERA O ÍCONE DE NOTIFICAÇÕES PARA O NÚMERO DE NOTIFICAÇÕES NÃO LIDAS

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