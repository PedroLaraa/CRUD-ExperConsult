
import React, { useEffect, useState } from "react";

import {useParams} from 'react-router-dom'

import api from '../../config/configApi';

import { useNavigate } from "react-router-dom";

function EditarEquipamentos(){

    const {id} = useParams()

    const [equipamento, setEquipamento] = useState([])

    const navigate = useNavigate();

    useEffect(() =>{
        api.get("list-infosequipamentos")
    .then((response) => {
        setEquipamento(response.data.value);
    }).catch((err) => {
        console.log(err);
    })
    }, [id])

    const equipamentoFiltrado = equipamento.filter(v => JSON.stringify(v.id) == id)

    let initialValue

    if(equipamentoFiltrado.length > 0){
        initialValue = {
            id: id,
            desceqp_nomeeqp: equipamentoFiltrado[0].desceqp_nomeeqp,
            desceqp_modelo: equipamentoFiltrado[0].desceqp_modelo,
            desceqp_marca: equipamentoFiltrado[0].desceqp_marca,
            desceqp_consumoene: equipamentoFiltrado[0].desceqp_consumoene,
            desceqp_consumotipo: equipamentoFiltrado[0].desceqp_consumotipo,
            desceqp_precoeqp: equipamentoFiltrado[0].desceqp_precoeqp,
            desceqp_dataultpreco: equipamentoFiltrado[0].desceqp_dataultpreco,
            desceqp_capacidadeprod: equipamentoFiltrado[0].desceqp_capacidadeprod,
            desceqp_comentario: equipamentoFiltrado[0].desceqp_comentario,
            desceqp_moeda: equipamentoFiltrado[0].desceqp_moeda,
        }
    }

    const valoresIniciais = initialValue

    const [values, setValues] = useState()

    if(values == undefined && valoresIniciais != undefined){
        setValues(valoresIniciais)
    }

    // FUNÇÃO PARA ARMAZENAR OS DADOS ALTERADOS
    function handleChangeValues(ev){

        const {name, value} = ev.target

        setValues({...values, [name]: value})
    }

    function handleSubmit(){
        api.put('equipamento-editado', values);
        alert('Editado com sucesso!');
        document.location.reload(true);
    };

    const handleDelete = () => {
        api.delete(`equipamento-deletado/${id}`);
        
        alert('Deletado com sucesso!');
        
        navigate("/dashboard");
        
    };

    console.log(values)

    return(
        <div className="container position-relative">
            <div 
            className=" border background-color vh-100"
            style={{background: 'rgba(50,50,50,0.2)'}}
            >
                <div className="p-2 d-flex justify-content-center text-danger text-uppercase">
                    <h2>▶ É necessário re-inserir todos os dados: </h2>
                </div>
                {equipamentoFiltrado.map((v) =>(
                    <div key={v.id}>
                        <form className="p-2 ">
                        <h3 className="d-flex justify-content-center">▶ Fornecedor</h3>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                disabled 
                                type="text" 
                                className="form-control w-50" 
                                name="id_fornecedor" 
                                defaultValue={v.id_fornecedor}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Nome do Equipamento</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                    type="text" 
                                    className="form-control w-50" 
                                    name="desceqp_nomeeqp" 
                                    defaultValue={v.desceqp_nomeeqp}
                                    onChange={handleChangeValues}
                                    onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Modelo</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                    type="text" 
                                    className="form-control w-50" 
                                    name="desceqp_modelo" 
                                    defaultValue={v.desceqp_modelo}
                                    onChange={handleChangeValues}
                                    onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Marca</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                    disabled 
                                    type="text" 
                                    className="form-control w-50" 
                                    name="desceqp_marca" 
                                    defaultValue={v.desceqp_marca}
                                    onChange={handleChangeValues}
                                    onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Consumo Energético</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                    type="text" 
                                    className="form-control w-50" 
                                    name="desceqp_consumoene" 
                                    defaultValue={v.desceqp_consumoene}
                                    onChange={handleChangeValues}
                                    onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Tipo de consumo</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                    type="text" 
                                    className="form-control w-50" 
                                    name="desceqp_consumotipo" 
                                    defaultValue={v.desceqp_consumotipo}
                                    onChange={handleChangeValues}
                                    onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Preço do equipamento</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                    type="text" 
                                    className="form-control w-50" 
                                    name="desceqp_precoeqp" 
                                    defaultValue={v.desceqp_precoeqp}
                                    onChange={handleChangeValues}
                                    onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Data do valor</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                    type="text" 
                                    className="form-control w-50" 
                                    name="desceqp_dataultpreco" 
                                    defaultValue={v.desceqp_dataultpreco}
                                    onChange={handleChangeValues}
                                    onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Capacidade Produtiva</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                    type="text" 
                                    className="form-control w-50" 
                                    name="desceqp_capacidadeprod" 
                                    defaultValue={v.desceqp_capacidadeprod}
                                    onChange={handleChangeValues}
                                    onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Comentários</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                    type="text" 
                                    className="form-control w-50" 
                                    name="desceqp_comentario" 
                                    defaultValue={v.desceqp_comentario}
                                    onChange={handleChangeValues}
                                    onClick={handleChangeValues}
                                ></input>
                            </div>
                            <div className="pt-3 d-flex justify-content-around">
                                <button 
                                type="submit" 
                                onClick={handleSubmit}
                                className="btn btn-success"
                                >Salvar Equipamento</button>
                                <button 
                                type="submit" 
                                onClick={handleDelete}
                                className="btn btn-outline-danger "
                                >Deletar Equipamento</button>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default EditarEquipamentos