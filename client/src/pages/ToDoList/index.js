import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import { handleAlterImage } from "../components/function/recuperaUserImg";

import api from '../../config/configApi';

import './styleToDoList.css'

import FormDialogToDo from "../../dialog/ToDoUsers";

function ToDoList() {

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    useEffect(() => {
        handleAlterImage();
    }, []);

    const [tasks, setTasks] = useState([]);

    const [user, setUser] = useState();

    const [open, setOpen] = useState(false);

    const [aguardando, setAguardando] = useState(false);

    const getInfosToDo = async () => {
        api.get('listTodo-infos')
            .then(response => {
                setTasks(response.data.value);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {

        getInfosToDo();

        setUser(JSON.parse(localStorage.getItem('user')));

        setAguardando(!aguardando);

    }, []);

    const todoUserFiltrado = tasks.filter(v => v.todo_destinatario == user.usuario.user_nomeUser);

    const todoAndamento = todoUserFiltrado.filter(v => v.todo_status == 'ToDo');

    const todoFeito = todoUserFiltrado.filter(v => v.todo_status == 'Feito');

    function handleSumAndamento(e) {

        const andamentoConvertido = (e.target.value).split('-')[0];

        const id = parseInt((e.target.value).split('-')[1]);

        const andamento = parseInt(andamentoConvertido) + 25;

        const values = {
            id: id,
            todo_status: 'ToDo',
            todo_andamento: andamento
        };

        const valuesConcluido = {
            id: id,
            todo_status: 'Feito',
            todo_andamento: andamento
        };

        if (andamento == 100) {
            alert('Tarefa concluída com sucesso!!!');
            api.put('todo-updateStatus', valuesConcluido);
        }
        else {
            alert(`Tarefa ${andamento}% concluída!!!`);
            api.put('todo-updateStatus', values);
        };

        if (andamento > 100) {
            alert('Não é possível realizar a tarefa acima de 100%!!!');
        };

        document.location.reload();
    }

    function handleMinAndamento(e) {

        const andamentoConvertido = (e.target.value).split('-')[0];

        const id = parseInt((e.target.value).split('-')[1]);

        const andamento = parseInt(andamentoConvertido) - 25;

        const values = {
            id: id,
            todo_status: 'ToDo',
            todo_andamento: andamento
        };

        if (andamento < 0) {
            alert('Não é possível subtrair uma tarefa com menos de 0%!!!');
        }
        else {
            alert(`Tarefa ${andamento}% concluída!!!`);
            api.put('todo-updateStatus', values);
            document.location.reload();
        };
    }

    function handleDeleteTodo(e){
        const id = e.target.value;

        api.delete(`todo-deletado/${id}`)

        alert('Tarefa deletada com sucesso!!!');

        document.location.reload();
    }

    return (

        <div className="row d-flex flex-row justify-content-center vh-100 vw-100">
            <div className="col-6 p-4">
                <div className="row d-flex flex-row justify-content-center overflow-auto" style={{paddingLeft: '1rem', maxHeight: '55rem'}}>
                    <div className="col-12">
                        <div id="containerBgTodo" className="row d-flex flex-row justify-content-center">
                            <div className="col-12">
                                <h1 className="text-uppercase text-center">To-Do</h1>
                                {aguardando && (
                                    <>
                                        {user.usuario.user_permissoes == 2 || user.usuario.user_permissoes == 1 ? 
                                        <button onClick={() => setOpen(!open)} className="btn btn-outline-dark w-100 h-50 ">Adicionar Tarefa para Usúario</button> : 
                                        ''}
                                    </>
                                )}
                                <hr />
                            </div>
                            {todoAndamento.map(v => (
                                <div id="containerInfosTodo" key={v.id} className="col-12">
                                    <p>Tarefa: {v.todo_tarefa}</p>
                                    <p>Data para conclusão: {v.todo_dataConclusao.replaceAll('-', '/')}</p>
                                    <div className="col-12">
                                        <section>
                                            <p>Andamento:</p>
                                            <input id="rangeInputTodo" type='range' className='form-range w-50' min={0} max={100} value={v.todo_andamento}></input>
                                            <button className="btn btn-outline-dark" value={v.todo_andamento + '-' + v.id} onClick={handleSumAndamento}>➕</button>
                                            <button className="btn btn-outline-dark" value={v.todo_andamento + '-' + v.id} onClick={handleMinAndamento}>➖</button>
                                        </section>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-around">
                                        <button className="btn btn-outline-dark">
                                            Editar
                                        </button>
                                        <button value={v.id} onClick={handleDeleteTodo} className="btn btn-outline-dark">
                                            Deletar
                                        </button>
                                    </div>
                                    <hr />
                                    <FormDialogToDo
                                    open={open}
                                    setOpen={setOpen}
                                    id={v.id}
                                    
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6 p-4">
                <div id="containerBgTodo" className="row d-flex flex-row justify-content-center overflow-auto" style={{maxHeight: '55rem'}}>
                    <div className="col-12">
                        <h1 className="text-center text-uppercase">Feito</h1>
                        <hr />
                    </div>
                    {todoFeito.map(v => (
                        <div id="containerInfosTodo" key={v.id} className="col-12">
                            <p>Tarefa: {v.todo_tarefa}</p>
                            <p>Data para conclusão: {v.todo_dataConclusao.replaceAll('-', '/')}</p>
                            <div className="col-12">
                                <section>
                                    <p>Andamento:</p>
                                    <input id="rangeInputTodo" type='range' className='form-range w-50' min={0} max={100} value={v.todo_andamento}></input>
                                    <button className="btn btn-outline-dark" value={v.todo_andamento + '-' + v.id} onClick={handleMinAndamento}>ToDo</button>
                                </section>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-outline-dark">
                                    Editar
                                </button>
                                <button value={v.id} onClick={handleDeleteTodo} className="btn btn-outline-dark">
                                    Deletar
                                </button>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )

}

// todo_list

export default ToDoList;
