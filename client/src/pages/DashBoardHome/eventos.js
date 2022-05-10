
import React, { useEffect, useState } from "react";

import {useParams} from 'react-router-dom'

import api from '../../config/configApi';

import { useNavigate } from "react-router-dom";

function Eventos(){

    const {id} = useParams()

    const [evento, setEvento] = useState([])

    const navigate = useNavigate();

    useEffect(() =>{
        api.get('list-infosTodo')
            .then((response) => {
                setEvento(response.data.value)
            }).catch((err) => {
                console.log(err)
            })
    }, [id])

    const eventoFiltrado = evento.filter(v => JSON.stringify(v.id).includes(id))

    const initialValue = {
        todo_eventos: '',
        todo_autor: '',
        id: id
    }

    const [values, setValues] = useState(initialValue)

    function handleChangeValues(ev){
        const {name, value} = ev.target

        setValues({...values, [name]: value})
    }

    function handleSubmit(req, res){
        api.put('todo-editado', values);
        alert('Cadastrado com sucesso!');
        document.location.reload(true);
    };

    const handleDelete = () => {
        api.delete(`todo-deletado/${id}`)
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
                {eventoFiltrado.map((v) =>(
                    <div key={v.id}>
                        <form className="p-2 ">
                        <h3 className="d-flex justify-content-center">▶ Evento</h3>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <textarea 
                                type="text" 
                                rows="5"
                                cols="50"
                                className="form-control w-50" 
                                name="todo_eventos" 
                                defaultValue={v.todo_eventos}
                                onChange={handleChangeValues}
                                ></textarea>
                            </div>
                            <h3 className="d-flex justify-content-center">▶ Autor</h3>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="todo_autor" 
                                defaultValue={v.todo_autor}
                                onChange={handleChangeValues}
                                ></input>
                            </div>
                            <div className="pt-3 d-flex justify-content-around">
                                <button 
                                type="submit" 
                                onClick={handleSubmit}
                                className="btn btn-success"
                                >Salvar Evento</button>
                                <button 
                                type="submit" 
                                onClick={handleDelete}
                                className="btn btn-outline-danger "
                                >Deletar Evento</button>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Eventos