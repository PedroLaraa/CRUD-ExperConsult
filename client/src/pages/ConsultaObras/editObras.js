
import React, { useEffect, useState } from "react";

import { useParams } from 'react-router-dom'

import api from '../../config/configApi';

import { useNavigate } from "react-router-dom";

function EditarObra() {

    const { id } = useParams();

    const [obra, setObra] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        api.get("list-infosObras")
            .then((response) => {
                setObra(response.data.value);
            }).catch((err) => {
                console.log(err);
            })
    }, [id])

    const obraFiltrada = obra.filter(v => JSON.stringify(v.id) == id)

    let initialValue

    if (obraFiltrada.length > 0) {
        initialValue = {
            id: id,
            obras_premissasDaObra: obraFiltrada[0].obras_premissasDaObra,
        }
    }

    const valoresIniciais = initialValue

    const [values, setValues] = useState()

    if (values == undefined && valoresIniciais != undefined) {
        setValues(valoresIniciais)
    }

    function handleChangeValues(ev) {

        const { name, value } = ev.target

        setValues({ ...values, [name]: value });
    };

    function handleSubmit() {
        api.put('obra-editada', values);
        alert('Editado com sucesso!');
        document.location.reload(true);
    };

    return (
        <div className="container position-relative">
            <div className=" border background-color vh-100" style={{ background: 'rgba(50,50,50,0.2)' }}>
                <div className="row justify-content-center align-items-center h-100">
                    {obraFiltrada.map(v => (
                        <div key={v.id}>
                            <form className="p-2">
                            <h3 className="d-flex justify-content-center">▶ Cliente - Obra</h3>
                                <div className="form-group pt-2 d-flex justify-content-center">
                                    <input
                                    disabled
                                    type='text'
                                    className="form-control w-50"
                                    name="id"
                                    defaultValue={v.clientes_obra.clientes_apelido + ' - ' + v.obras_nomeDaObra.replace(/[0-9]/g, '')}
                                    onChange={handleChangeValues}
                                    ></input>
                                </div>
                                <h3 className="d-flex justify-content-center">▶ Premissa de projeto</h3>
                                <div className="form-group pt-2 d-flex justify-content-center">
                                    <textarea
                                    type='text'
                                    className="form-control w-50"
                                    name="obras_premissasDaObra"
                                    defaultValue={v.obras_premissasDaObra}
                                    onChange={handleChangeValues}
                                    rows={8}
                                    >
                                    </textarea>
                                </div>
                                <div className="pt-3 d-flex justify-content-around">
                                    <button 
                                    type="submit" 
                                    onClick={handleSubmit}
                                    className="btn btn-success"
                                    >Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default EditarObra;
