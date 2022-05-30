import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

import { handleAlterImage } from "../components/function/recuperaUserImg";

import paragrafoDoedStyle from "../css/paragrafoDoed";

import paragrafoDashboardStyle from "../css/paragrafoDashboard.js";

function NotificacoesUser() {

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    const [data, setData] = useState([]); // DEFINE O DATABASE

    const [chamados, setChamados] = useState('');
    const [pesquisarChamados, setPesquisarChamados] = useState('');

    const getNotificacoes = async (req, res) => {
        api.get('list-notificacoesDeveloper')
            .then((response) => {
                setData(response.data.value)
            }).catch((err) => {
                console.log(err)
            })
    }

    function handleSetChamados(e) {
        setChamados(e.target.value)
    }

    // FUNÇÃO PARA EXECUTAR AS BUSCAS

    function handlePesquisarChamados() {
        setPesquisarChamados(chamados)
    }

    // FUNÇÃO PARA DISPARAR OS FILTROS

    function handleFiltrar(e) {
        handleSetChamados(e)
        handlePesquisarChamados()
    }

    const busca = chamados.toLowerCase()

    const tiposDeReport = data.map(v => JSON.stringify(v.notificacoes_motivo).replaceAll('"', '')).filter((elem, index, self) => index === self.indexOf(elem)).sort()

    const dataFiltrado = data.filter(v => JSON.stringify(v.notificacoes_motivo).toLowerCase().includes(busca))

    function handleRemoveEvent(e) {
        e.preventDefault();
        const id = e.target.value;
        api.delete(`chamado-deletado/${id}`);
        alert('Chamado deletado!');
        document.location.reload(true);
    }

    useEffect(() => {
        handleAlterImage()
        getNotificacoes()
    }, [])

    return (
        <div className="row position-relative pt-5 d-flex justify-content-center vh-100 vw-100">
            <div className="list-group col-2 p-1">
                {tiposDeReport.map(value => (
                    <div key={value.id} className="p-1">
                        <button
                            type="submit"
                            value={value}
                            className="btn btn-outline-dark"
                            onClick={handleFiltrar}
                            style={{ width: "17rem", fontSize: '1.1rem', fontFamily: 'Raleway' }}
                        >
                            {value}
                        </button>
                    </div>
                ))}
            </div>
            {chamados && (
                <div
                    className="col-6 vh-100"
                >
                    <div className="position-relative p-2" >
                        <div
                            className="container row text-uppercase m-0"
                            style={paragrafoDashboardStyle}
                        >
                            <div id="topo" className="col-2">
                                <p>Data:</p>
                            </div>
                            <div id="topo" className="col-8">
                                <p>Report ({chamados}) :</p>
                            </div>
                            <div className="col-2 ">
                                <p>Autor:</p>
                            </div>
                        </div>
                    </div>
                    {dataFiltrado.map(value => (
                        <div key={value.id}>
                            <div
                                className="container"
                                style={{ maxHeight: "30rem" }}
                            >
                                <div className="row justify-content-md-center " style={paragrafoDoedStyle}>
                                    <div className="col-1 col-md-2">
                                        <p>{value.createdAt.split('-').reverse().join('/')}</p>
                                    </div>
                                    <div className="col-1">
                                        <p style={{ background: 'rgba(50,50,50,0.5)', height: '100%', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                    </div>
                                    <div className="col-4 col-md-6">
                                        <p>{value.notificacoes_mensagem}</p>
                                    </div>
                                    <div className="col-1">
                                        <p style={{ background: 'rgba(50,50,50,0.5)', height: '100%', width: '.5rem', border: "1px solid whitesmoke", borderRadius: "1rem" }} />
                                    </div>
                                    <div className="col-2 col-md-2">
                                        <p>{value.notificacoes_autor}</p>
                                        <button
                                            className="btn btn-outline-danger"
                                            value={value.id}
                                            onClick={handleRemoveEvent}
                                            style={{ fontSize: '1.1rem', fontFamily: 'Raleway' }}
                                            data-toggle="tooltip"
                                            data-placement="right"
                                            title="Deletar Evento"
                                        >❌
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NotificacoesUser;