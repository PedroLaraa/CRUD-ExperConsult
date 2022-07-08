import react, { useState, useEffect } from "react";

import { api } from "../../config/configApi";

import NotificacoesSetor from "../NotificacoesSetores";

import './atasStyle.css'


function AtasDeReuniao() {

    function ataComponent() {
        return (
            `
            <hr />
            <div id="atasAdicionaisInput" className=" row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Pendências: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo opcional"
                                required
                                name="atas_pendencias"
                            >
                            </input>
                        </div>
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Responsável(Nome e Empresa): </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo opcional"
                                required
                                name="atas_responsavel"
                            >
                            </input>
                        </div>
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Prazo: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo opcional"
                                required
                                name="atas_prazo"
                            >
                            </input>
                        </div>
                    </div>`
        )
    }

    function handleAddAta(e) {

        e.preventDefault();

        var div = document.createElement('div');

        div.innerHTML = ataComponent();

        const divAtas = document.getElementById('atasAdicionaisInput');

        divAtas.append(div);

    }

    return (
        <div>
            <NotificacoesSetor />
            <form
                className="was-validated"
                id="formulario"
                autoComplete="off"
                encType="multipart/form-data"
                method="POST"
                action="http://192.168.10.122:1212/atas-cadastrada" // FIXME TO IP SERVER
                onSubmit={(e) => alert('EQUIPAMENTO CADASTRADO COM SUCESSO!!!')}
            >
                <div id='atasAddNewAta'>

                    <h1>Atas de Reunião:</h1>
                    <hr />
                    <div className=" row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Reunião / Cliente: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_reuniao"
                            >
                            </input>
                        </div>
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Objetivo da reunião: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_objetivo"
                            >
                            </input>
                        </div>
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Líder da reunião: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_liderReuniao"
                            >
                            </input>
                        </div>
                    </div>
                    <div className=" row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Data: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_dataReuniao"
                            >
                            </input>
                        </div>
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Horário: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_horarioReuniao"
                            >
                            </input>
                        </div>
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Local: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_localReuniao"
                            >
                            </input>
                        </div>
                    </div>
                    <div className=" row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-3 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Participantes Presentes: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_participantesReuniao"
                            >
                            </input>
                        </div>
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Ausentes: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_participantesAusentes"
                            >
                            </input>
                        </div>
                    </div>
                    <div className=" row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-6 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Assuntos tratados: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_assuntos"
                            >
                            </input>
                        </div>
                    </div>
                    <div className=" row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Pendências: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_pendencias"
                            >
                            </input>
                        </div>
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Responsável(Nome e Empresa): </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_responsavel"
                            >
                            </input>
                        </div>
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Prazo: </label>
                            <input
                                className="form-control is-valid"
                                id="validationInput"
                                placeholder="Campo obrigatório"
                                required
                                name="atas_prazo"
                            >
                            </input>
                        </div>
                    </div>
                    <hr />
                    <div id="atasAdicionaisInput" className=" row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-2 mb-3 form-group">
                            <label htmlFor="customControlValidation1">Mais campos: </label>
                            <button className="btn btn-outline-dark" onClick={handleAddAta} >➕</button>
                        </div>
                    </div>
                    <hr />
                    <div className=" row d-flex flex-row justify-content-around">
                        <div className="p-2 col-md-1 mb-3">
                            <button
                                className="btn btn-success"
                                type="submit"
                            >Registrar Ata
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default AtasDeReuniao