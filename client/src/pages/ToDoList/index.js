import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import { handleAlterImage } from "../components/function/recuperaUserImg";

import api from '../../config/configApi';

import './styleToDoList.css'

import FormDialogToDo from "../../dialog/ToDoUsers";

import NotificacoesSetor from "../NotificacoesSetores";

function ToDoList() {

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    useEffect(() => {
        handleAlterImage();
    }, []);

    const [tasks, setTasks] = useState([]); // Tarefas gerais

    const [user, setUser] = useState(); // Usuário logado

    const [open, setOpen] = useState(false); // Altera o estado do FormDialogToDo

    const [aguardando, setAguardando] = useState(false);

    // Função que faz a requisição para o backend 

    const getInfosToDo = async () => {
        api.get('listTodo-infos')
            .then(response => {
                setTasks(response.data.value);
            }).catch((err) => {
                console.log(err);
            })
    }

    // Realiza requisições para o backend e retorna os dados

    useEffect(() => {

        getInfosToDo();

        setUser(JSON.parse(localStorage.getItem('user'))); // Recupera o usuário logado

        setAguardando(!aguardando); // Utilizado para evitar bugs de renderização

    }, []);

    const todoUserFiltrado = tasks.filter(v => v.todo_destinatario == user.usuario.user_nomeUser);

    const todoAndamento = todoUserFiltrado.filter(v => v.todo_status == 'ToDo');

    const todoFeito = todoUserFiltrado.filter(v => v.todo_status == 'Feito');

    // Função para incrementar o andamento da tarefa

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

    // Função para subtrair o andamento da tarefa

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
        } else if (andamentoConvertido == 100) {
            alert(`Tarefa transferida de volta para ToDo!!!`);
            api.put('todo-updateStatus', values);
            document.location.reload();
        }
        else {
            alert(`Tarefa ${andamento}% concluída!!!`);
            api.put('todo-updateStatus', values);
            document.location.reload();
        };
    }

    //Função para deletar tarefa

    function handleDeleteTodo(e) {
        const id = e.target.value;

        api.delete(`todo-deletado/${id}`);

        alert('Tarefa deletada com sucesso!!!');

        document.location.reload();
    }

    return (

        <div className="row d-flex flex-row justify-content-center vh-100 vw-100">
            <NotificacoesSetor />
            <div className="col-6 p-4">
                <div className="row d-flex flex-row justify-content-center overflow-auto" style={{ paddingLeft: '1rem', maxHeight: '55rem' }}>
                    <div className="col-12">
                        <div className="row d-flex flex-row justify-content-center" id="containerBgTodo">
                            <div className="col-12">
                                <h1 className="text-uppercase text-center" id='titlesDoed'>To-Do</h1>
                                {aguardando && (
                                    <>
                                        {user.usuario.user_permissoes == 2 || user.usuario.user_permissoes == 1 ?
                                            <button onClick={() => setOpen(!open)} className="btn btn-outline-dark w-100 h-50 text-uppercase text-bold">Adicionar Tarefa para Usuário</button> 
                                            :''
                                        }
                                    </>
                                )}
                                <hr />
                            </div>
                            {todoAndamento.map(v => (
                                <div id="containerInfosTodo" key={v.id} className="col-12">
                                    <p className="pt-2">• Tarefa: {v.todo_tarefa}</p>
                                    <p>• Data para conclusão: {v.todo_dataConclusao.split('-').reverse().join('/')}</p>
                                    <div className="col-12">
                                        <section className="d-flex justify-content-around">
                                            <p>• Andamento:</p>
                                            <input id="rangeInputTodo" type='range' className='form-range w-50 mt-1' min={0} max={100} value={v.todo_andamento}></input>
                                            <button className="btn btn-outline-dark" data-toggle="tooltip" data-placement="top" title={`${v.todo_andamento}% Concluído.`}>🛈</button>
                                            <button className="btn btn-outline-dark" value={v.todo_andamento + '-' + v.id} onClick={handleSumAndamento}>➕</button>
                                            <button className="btn btn-outline-dark" value={v.todo_andamento + '-' + v.id} onClick={handleMinAndamento}>➖</button>
                                        </section>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-around">
                                        <button value={v.id} onClick={handleDeleteTodo} className="btn btn-outline-danger w-25">
                                            Deletar
                                        </button>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6 p-4">
                <div id="containerBgTodo" className="row d-flex flex-row justify-content-center overflow-auto" style={{ maxHeight: '55rem' }}>
                    <div className="col-12">
                        <h1 id='titlesDoed' style={{fontSize: '2.4rem'}} className="text-center text-uppercase">Tarefas Concluídas</h1>
                        <hr />
                    </div>
                    {todoFeito.map(v => (
                        <div id="containerInfosTodo" key={v.id} className="col-12">
                            <p>• Tarefa: {v.todo_tarefa}</p>
                            <p>• Data de conclusão: {v.updatedAt.split('-').reverse().join('/')}</p>
                            <div className="col-12">
                                <section className="d-flex justify-content-around">
                                    <p>• Andamento:</p>
                                    <input id="rangeInputTodo" type='range' className='form-range w-50' min={0} max={100} value={v.todo_andamento} ></input>
                                    <button className="btn btn-outline-dark w-25" value={v.todo_andamento + '-' + v.id} onClick={handleMinAndamento}>ToDo</button>
                                </section>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-around">
                                <button value={v.id} onClick={handleDeleteTodo} className="w-25 btn btn-outline-danger">
                                    Deletar
                                </button>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
            {aguardando && (
                <FormDialogToDo
                    open={open}
                    setOpen={setOpen}
                    todo_autor={user.usuario.user_nomeUser}
                />
            )}
        </div>

    )

}

// todo_list

export default ToDoList;
