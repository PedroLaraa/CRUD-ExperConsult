import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import './setoresNot.css';

import { clientesEditados } from "../components/DashBoard";

function NotificacoesSetor() {

    // Pega o botão de notificações no HTML
    const notificacoesBtn = document.getElementById('notificacoesBtn');

    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState('');

    const [recoveredUsers, setRecoveredUsers] = useState('');

    const [show, setShow] = useState(false);

    // Manda a requisição para o backend e retorna os dados das notificações
    const getNotificacoesSetores = async (req, res) => { // RECUPERA AS NOTIFICAÇÕES DO BANCO DE DADOS POR UMA ROTA BACK-END
        api.get('list-notificacoesSetor')
            .then((response) => {
                setData(response.data.value);
            }).catch((err) => { 
                console.log(err);
            });
    };

    //  Hook de efeito para executar a função de requisição ao carregar a página
    useEffect(() => { // CARREGA AS NOTIFICAÇÕES E ETC

        setRecoveredUsers(JSON.parse(localStorage.getItem('user')));

        getNotificacoesSetores();

    }, []);

    const setoresId = data.map(v => v.notificacoes_destinatario); // RECUPERA O ID DOS SETORES

    const setoresIdArray = setoresId.map(v => v.split(',')); // TRANSFORMA O STRING EM ARRAY

    const autoresNotificacao = data.map(v => v.notificacoes_autor); // RECUPERA OS AUTORES DAS NOTIFICAÇÕES

    const dataFiltrado = [];

    // FILTRA OS DADOS PARA APARECER SOMENTE OS SETORES QUE O USUÁRIO ESTÁ LOGADO
    for (let i = 0; i < setoresIdArray.length; i++) { 
        for (let j = 0; j < setoresIdArray[i].length; j++) {
            if (setoresIdArray[i][j] == recoveredUsers.usuario.user_setor && recoveredUsers.usuario.user_nomeUser != autoresNotificacao[i] ) {
                dataFiltrado.push(data[i]);
            } else {
                continue;
            }
        }
    }

    // FUNÇÃO PARA MOSTRAR / OCULTAR A NOTIFICAÇÃO
    function handleShowNotification() { 

        setShow(!show);

        const el = document.getElementById('toggleNot');

        el.setAttribute('class', !show ? 'p-2' : 'd-none');

    }

    notificacoesBtn.addEventListener('click', handleShowNotification, false); // EVENTO PARA ABRIR A NOTIFICAÇÃO

    const idsLidos = dataFiltrado.map(v => v.id); // RECUPERA OS IDS DAS NOTIFICÇÕES

    function handleClearNotification() { // FUNÇÃO PARA LIMPAR TODAS AS NOTIFICAÇÕES

        setShow(!show);

        const values = {
            user_notificacoesLidas: idsLidos.toString(),
            id: recoveredUsers.usuario.id
        };

        const el = document.getElementById('toggleNot');

        el.setAttribute('class', !show ? 'p-2' : 'd-none');

        if (localStorage.getItem('notificacoesLidas')) {
            localStorage.removeItem('notificacoesLidas');
        };

        localStorage.setItem('notificacoesLidas', idsLidos);

        api.put('notificacao-lida', values);

        document.location.reload();
    };

    function handleClearUniqueNotification(e) { // FUNÇÃO PARA LIMPAR UMA NOTIFICAÇÃO ÚNICA

        setShow(!show);

        let idTask = e.target.value;

        if (localStorage.getItem('notificacoesLidas')){
            
            idTask = localStorage.getItem('notificacoesLidas') + ',' + idTask;

            localStorage.removeItem('notificacoesLidas');

            localStorage.setItem('notificacoesLidas', idTask);

            const values = {
                user_notificacoesLidas: idTask,
                id: recoveredUsers.usuario.id
            };

            api.put('notificacao-lida', values);

            document.location.reload();
        };
    };

    const idsLocalStorageLidos = localStorage.getItem('notificacoesLidas').split(','); // RECUPERA OS IDS LIDOS

    const notificacoesNaoLidas = [];

    for (let i = 0; i <= idsLocalStorageLidos.length; i++) { // VERIFICA SE AS NOTIFICAÇÕES NÃO FORAM LIDAS
        for (let j = 0; j <= idsLidos.length; j++) {
            if (idsLocalStorageLidos[i] == idsLidos[j]) {
                delete dataFiltrado[j];
            };
        };
    };

    const iconeNotificacao = document.getElementById('iconeNotificacao'); // DEFINE O ÍCONE DA NOTIFICAÇÃO

    iconeNotificacao.innerHTML = `🔔 ${dataFiltrado.length - idsLocalStorageLidos.length}`; // ALTERA O ÍCONE DE NOTIFICAÇÕES PARA O NÚMERO DE NOTIFICAÇÕES NÃO LIDAS

    const clientesNotificados = dataFiltrado.map(v => (v.notificacoes_clienteNotificado).toLowerCase()).filter(v => v != null); // RECUPERA OS CLIENTES NOTIFICADOS

    const prediosNotificados = dataFiltrado.map(v => (v.notificacoes_predioNotificado).toLowerCase()).filter(v => v != null); // RECUPERA OS PREDIOS NOTIFICADOS

    function botoesNotificados() { // VERIFICA SE OS CLIENTES E PRÉDIOS FORAM EDITADOS E MUDA A COR DO BOTÃO
        for (let i = 0; i < clientesNotificados.length; i++) {
            for (let j = 0; j < clientesEditados.length; j++) {
                if (clientesNotificados[i] == clientesEditados[j]) {
                    document.getElementById(clientesNotificados[i]).style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
                };
            };
        };
        for(let i = 0; i < prediosNotificados.length; i++){
            if(document.getElementById(prediosNotificados[i]) === null){
                continue;
            }else{
                document.getElementById(prediosNotificados[i]).style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
            };
        };
    };

    // FUNÇÃO PARA DISPARAR A LEITURA DOS BOTÕES APÓS O DOCUMENTO CARREGAR, EVITA ERROS!!!

    var eventTriggeredFlag = false;

    window.addEventListener('DOMContentLoaded', botoesNotificados, true);

    setTimeout(function () {
        if (!eventTriggeredFlag) {
            botoesNotificados();
        }
    }, 100);

    return (
        <div className="p-2 d-none" id='toggleNot'>
            <div id="containerDiv">
                {show === true && (
                    <div className="overflow-auto" style={{ maxHeight: '20rem' }}>
                        <div className="row d-flex justify-content-around m-auto" style={{width: '99%'}}>
                            <div className="col-5 p-4">
                                <button className="btn btn-dark" onClick={handleClearNotification}>
                                    🧹 Limpar Notificações 
                                </button>
                            </div>
                            <div className="col-12" style={{ backgroundColor: '#A2A2A2', height: '4px' }}>
                                <p></p>
                            </div>
                        </div>
                        {dataFiltrado.reverse().map(v => (
                            <div key={v.id} className="m-auto" style={{width: '95%'}}>
                                <div className="row d-flex justify-content-around ">
                                    <div className="col-12 ">
                                        <p>• Notificação: {v.notificacoes_motivo}</p>
                                    </div>
                                    <div className="col-12 ">
                                        <p>• Evento: {v.notificacoes_mensagem}</p>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button value={v.id} onClick={handleClearUniqueNotification} className="btn btn-outline-dark m-1">❌</button>
                                    </div>
                                    <div className="col-12 " style={{ backgroundColor: '#A2A2A2', height: '4px' }}>
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
