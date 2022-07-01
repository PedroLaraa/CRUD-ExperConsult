
import React, { useEffect, useState } from "react";

import {useParams} from 'react-router-dom'

import api from '../../config/configApi';

import { useNavigate } from "react-router-dom";

function EditarCliente(){

    const {id} = useParams()

    const [cliente, setCliente] = useState([])

    const navigate = useNavigate();

    useEffect(() =>{
        api.get("list-infosClientes")
            .then((response) => {
                setCliente(response.data.clientes_logo);
            }).catch((err) => {
                console.log(err);
            })
    }, [id])

    const clienteFiltrado = cliente.filter(v => JSON.stringify(v.id) == id)

    let initialValue

    if(clienteFiltrado.length > 0){
        initialValue = {
            clientes_razaosocial: clienteFiltrado[0].clientes_razaosocial,
            clientes_nomefantasia: clienteFiltrado[0].clientes_nomefantasia,
            clientes_apelido: clienteFiltrado[0].clientes_apelido,
            clientes_cnpj: clienteFiltrado[0].clientes_cnpj,
            clientes_endereco: clienteFiltrado[0].clientes_endereco,
            clientes_ie: clienteFiltrado[0].clientes_ie,
            clientes_nomeResponsavel: clienteFiltrado[0].clientes_nomeResponsavel,
            clientes_telefone: clienteFiltrado[0].clientes_telefone,
            clientes_email: clienteFiltrado[0].clientes_email,
            clientes_premissasDeProjeto: clienteFiltrado[0].clientes_premissasDeProjeto,
            id: id
        }
    }

    const valoresIniciais = initialValue

    const [values, setValues] = useState()

    if(values == undefined && valoresIniciais != undefined){
        setValues(valoresIniciais)
    }

    function handleChangeValues(ev){
        const {name, value} = ev.target

        setValues({...values, [name]: value})
    }

    function handleSubmit(){
        api.put('cliente-editado', values);
        alert('Editado com sucesso!');
        document.location.reload(true);
    };

    const handleDelete = () => {
        api.delete(`cliente-deletado/${id}`)
        alert('Deletado com sucesso!')
        navigate("/dashboard")
    };

    return(
        <div className="container position-relative">
            <div 
            className=" border background-color vh-101"
            style={{background: 'rgba(50,50,50,0.2)'}}
            >
                <div className="p-2 d-flex justify-content-center text-danger text-uppercase">
                    <h2>▶ É necessário re-inserir todos os dados: </h2>
                </div>
                {clienteFiltrado.map((v) =>(
                    <div key={v.id}>
                        <form className="p-2 ">
                        <h3 className="d-flex justify-content-center">▶ Razão Social</h3>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                type="text" 
                                className="form-control w-50" 
                                name="clientes_razaosocial" 
                                defaultValue={v.clientes_razaosocial}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Nome fantasia</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="clientes_nomefantasia" 
                                defaultValue={v.clientes_nomefantasia}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Apelido</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="clientes_apelido" 
                                defaultValue={v.clientes_apelido}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ CNPJ</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="clientes_cnpj" 
                                defaultValue={v.clientes_cnpj}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Endereço</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="clientes_endereco" 
                                defaultValue={v.clientes_endereco}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ IE</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="clientes_ie" 
                                defaultValue={v.clientes_ie}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Nome do Responsável</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="clientes_nomeResponsavel" 
                                defaultValue={v.clientes_nomeResponsavel}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Telefone</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="clientes_telefone" 
                                defaultValue={v.clientes_telefone}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Email</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="clientes_email" 
                                defaultValue={v.clientes_email}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Premissas de Projeto</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <textarea 
                                type="text" 
                                className="form-control w-50"
                                rows="5"
                                column="50" 
                                name="clientes_premissasDeProjeto" 
                                defaultValue={v.clientes_premissasDeProjeto}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></textarea>
                            </div>
                            <div className="pt-3 d-flex justify-content-around">
                                <button 
                                type="submit" 
                                onClick={handleSubmit}
                                className="btn btn-success"
                                >Salvar Cliente</button>
                                <button 
                                type="submit" 
                                onClick={handleDelete}
                                className="btn btn-outline-danger "
                                >Deletar Cliente</button>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default EditarCliente