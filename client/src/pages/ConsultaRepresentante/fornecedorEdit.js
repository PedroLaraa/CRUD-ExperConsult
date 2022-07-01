
import React, { useEffect, useState } from "react";

import {useParams} from 'react-router-dom'

import api from '../../config/configApi';

import { useNavigate } from "react-router-dom";

function EditarRepresentante(){

    const {id} = useParams()

    const [representante, setRepresentante] = useState([])

    const navigate = useNavigate();

    useEffect(() =>{
        api.get("list-img")
            .then((response) => {
                setRepresentante(response.data.representante_imagem)
            }).catch((err) => {
                console.log(err);
            })
    }, [id])

    const representanteFiltrado = representante.filter(v => JSON.stringify(v.id) == id)
    
    const initialValue = {
        representante_nome: '',
        representante_empresasrep: ''.replaceAll('"[]{}', ''),
        representante_telefone: '',
        representante_comentarios: '',
        representante_site: '',
        representante_estadoatuacao: '',
        representante_status: '',
        id: id
    }

    const [values, setValues] = useState(initialValue)

    function handleChangeValues(ev){
        const {name, value} = ev.target

        setValues({...values, [name]: value})
    }

    function handleSubmit(){
        api.put('representante-editado', values);
        alert('Editado com sucesso!');
        document.location.reload(true);
    };

    const handleDelete = () => {
        api.delete(`representante-deletado/${id}`)
        alert('Deletado com sucesso!')
        navigate("/dashboard")
    };

    return(
        <div className="container position-relative">
            <div 
            className=" border background-color vh-100"
            style={{background: 'rgba(50,50,50,0.2)'}}
            >
                <div className="p-2 d-flex justify-content-center text-danger text-uppercase">
                    <h2>▶ É necessário re-inserir todos os dados: </h2>
                </div>
                {representanteFiltrado.map((v) =>(
                    <div key={v.id}>
                        <form className="p-2 ">
                            <h4 className="d-flex justify-content-center">▶ Nome do Representante</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="representante_nome" 
                                defaultValue={v.representante_nome}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Empresas que representa</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="representante_empresasrep" 
                                defaultValue={v.representante_empresasrep}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Telefone</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="representante_telefone" 
                                defaultValue={v.representante_telefone}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Comentários</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="representante_comentarios" 
                                defaultValue={v.representante_comentarios}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Site</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="representante_site" 
                                defaultValue={v.representante_site}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Estados de atuação</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="representante_estadoatuacao" 
                                defaultValue={v.representante_estadoatuacao}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Status do representante</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <select 
                                className="form-control form-select w-50"
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                name="representante_status"
                                >
                                    <option>
                                        Selecione
                                    </option>
                                    <option value="Ativo">
                                        Ativo
                                    </option>
                                    <option value="Inativo">
                                        Inativo
                                    </option>
                                    <option value="Indefinido">
                                        Indefinido
                                    </option>
                                </select>
                            </div>
                            <div className="pt-3 d-flex justify-content-around">
                                <button 
                                type="submit" 
                                onClick={handleSubmit}
                                className="btn btn-success"
                                >Salvar Representante</button>
                                <button 
                                type="submit" 
                                onClick={handleDelete}
                                className="btn btn-outline-danger "
                                >Deletar Representante</button>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default EditarRepresentante