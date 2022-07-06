import React, { useState, useEffect, useContext } from "react";

import api from '../../config/configApi';

import { AuthContext } from "../../contexts/auth";

import './styleToDoList.css';

import FormDialogToDo from "../../dialog/ToDoUsers";

import NotificacoesSetor from "../NotificacoesSetores";

function ToDoList() {

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    const [data, setData] = useState([]);

    const [tasks, setTasks] = useState([]); // Tarefas gerais

    const [user, setUser] = useState(); // Usuário logado

    const [open, setOpen] = useState(false); // Altera o estado do FormDialogToDo

    const [aguardando, setAguardando] = useState(false); // Coloca um delay em algumas renderizações para não ter erros

    const [buscaUser, setBuscaUser] = useState(''); // Busca de usuário

    // Função que faz a requisição para o backend 

    const getInfosToDo = async () => {
        api.get('listTodo-infos')
            .then(response => {
                setTasks(response.data.value);
            }).catch((err) => {
                console.log(err);
            })
    }

    const getUsersList = async () => {
        api.get('list-infosUser')
            .then(response => {
                setData(response.data.value);
            }).catch((err) => {
                console.log(err);
            });
    };

    // Realiza requisições para o backend e retorna os dados

    useEffect(() => {

        getUsersList();

        getInfosToDo();

    }, [open])

    useEffect(() => {

        setUser(JSON.parse(localStorage.getItem('user'))); // Recupera o usuário logado

        setAguardando(!aguardando); // Utilizado para evitar bugs de renderização

    }, []);


    if (user != undefined && buscaUser == '') {
        setBuscaUser(user.usuario.user_nomeUser);
    }

    const todoUserFiltrado = tasks.filter(v => v.todo_destinatario == buscaUser);

    const todoAndamento = todoUserFiltrado.filter(v => v.todo_status == 'Executando' || v.todo_status == 'Pausado' || v.todo_status == 'Atrasado');

    const todoFeito = todoUserFiltrado.filter(v => v.todo_status == 'Feito');

    const todoArquivado = todoUserFiltrado.filter(v => v.todo_status == 'Arquivado');

    // Função para incrementar o andamento da tarefa

    function handleSumAndamento(e) {

        const andamentoConvertido = (e.target.value).split('-')[0];

        const id = parseInt((e.target.value).split('-')[1]);

        const andamento = parseInt(andamentoConvertido) + 25;

        const values = {
            id: id,
            todo_status: 'Executando',
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
    };

    // Função para subtrair o andamento da tarefa

    function handleMinAndamento(e) {

        const andamentoConvertido = (e.target.value).split('-')[0];

        const id = parseInt((e.target.value).split('-')[1]);

        const andamento = parseInt(andamentoConvertido) - 25;

        const values = {
            id: id,
            todo_status: 'Executando',
            todo_andamento: andamento
        };

        if (andamento < 0) {
            alert('Não é possível subtrair uma tarefa com menos de 0%!!!');
        } else if (andamentoConvertido == 100) {
            alert(`Tarefa transferida de volta para ToDo!!!`);
            api.put('todo-updateStatus',  {
                id: id,
                todo_status: 'Executando',
                todo_andamento: 0});
            document.location.reload();
        }
        else {
            alert(`Tarefa ${andamento}% concluída!!!`);
            api.put('todo-updateStatus',values);
            document.location.reload();
        };
    }

    function handlePausaTarefa(e) {

        const status = (e.target.value).split('-')[1];

        const id = parseInt((e.target.value).split('-')[0]);

        const values = {
            id: id,
            todo_status: status != 'Pausado' ? 'Pausado' : 'Executando',
        };

        if (status != 'Pausado') {
            api.put('todo-updateStatus', values);
            alert('Tarefa pausada com sucesso!!!');
            document.location.reload();
        } else {
            api.put('todo-updateStatus', values);
            alert('Tarefa em execução!!!');
            document.location.reload();
        };
    };

    function handleArquivarTodo(e) {

        const id = parseInt(e.target.value);

        const values = {
            id: id,
            todo_status: 'Arquivado',
        };

        api.put('todo-updateStatus', values);

        alert('Tarefa arquivada com sucesso!!!');

        document.location.reload();
    };

    //Função para deletar tarefa

    function handleDeleteTodo(e) {
        const id = e.target.value;

        api.delete(`todo-deletado/${id}`);

        alert('Tarefa deletada com sucesso!!!');

        document.location.reload();
    };

    var incrementTarefas = 1;

    const timeElapsed = Date.now();

    const today = new Date(timeElapsed).toLocaleDateString().split('/').reverse().join('-');

    for (let i = 0; i < todoAndamento.length; i++) {
        if (todoAndamento[i].todo_dataConclusao < today && todoAndamento[i].todo_status != 'Atrasado' && todoAndamento[i].todo_status != 'Pausado') {
            todoAndamento[i].todo_status = 'Atrasado';
            api.put('todo-updateStatus', todoAndamento[i]);
        };
    };

    return (

        <div>
            {aguardando && (
                <div className="d-flex justify-content-center p-2">
                    {user.usuario.user_permissoes == 2 || user.usuario.user_permissoes == 1 ?
                        <>
                            <select id="selectUserTodo" onClick={(e) => setBuscaUser(e.target.value)}>
                                <option value={user.usuario.user_nomeUser}>Busque um usuário:</option>
                                {data.map(v => (
                                    <option key={v.id} value={v.user_nomeUser}>{v.user_nomeUser}</option>
                                ))}
                            </select>
                        </>
                        : ''
                    }
                </div>
            )}
            <div className="row d-flex flex-row justify-content-center h-100 vw-100">
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
                                                : ''
                                            }
                                        </>
                                    )}
                                    <hr />
                                </div>
                                {todoAndamento.reverse().map(v => (
                                    <div id="containerInfosTodo" key={v.id} style={{ backgroundColor: v.todo_status == 'Atrasado' ? 'rgba(230, 30, 0, 0.5)' : 'rgba(169, 210, 215, 0.8)' }} className="col-11 p-2">
                                        {incrementTarefas + 'º | ' + v.todo_obraCliente}
                                        <p className="pt-2">• Tarefa: {v.todo_tarefa}</p>
                                        <p>• Início: {v.createdAt.split('-').reverse().join('/')} - Concluir: {v.todo_dataConclusao.split('-').reverse().join('/')}</p>
                                        <div className="col-12 ">
                                            <hr />
                                            {v.todo_status == 'Executando' || v.todo_status == 'Atrasado' ?
                                                <section className="d-flex justify-content-around">
                                                    <p>• Andamento:</p>
                                                    <div className="progress col-6">
                                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={v.todo_andamento} aria-valuemin="0" aria-valuemax="100" style={{ width: `${v.todo_andamento > 0 ? v.todo_andamento : 5}%` }}> {v.todo_andamento}% </div>
                                                    </div>
                                                    <button style={{ width: 'auto', height: '1.2rem', fontSize: '.8rem', display: 'flex', alignItems: 'center' }} className="btn btn-outline-dark" data-toggle="tooltip" data-placement="top" title={`Última atualização: ${v.updatedAt.split('-').reverse().join('/')}. Status: ${v.todo_status} `}>🛈</button>
                                                    <button style={{ width: 'auto', height: '1.2rem', fontSize: '.8rem', display: 'flex', alignItems: 'center' }} className="btn btn-outline-dark" value={v.todo_andamento + '-' + v.id} onClick={handleSumAndamento}>➕</button>
                                                    <button style={{ width: 'auto', height: '1.2rem', fontSize: '.8rem', display: 'flex', alignItems: 'center' }} className="btn btn-outline-dark" value={v.todo_andamento + '-' + v.id} onClick={handleMinAndamento}>➖</button>
                                                </section>
                                                :
                                                <section className="d-flex justify-content-around">
                                                    <p>• Andamento:</p>
                                                    <div className="progress col-6">
                                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={v.todo_andamento} aria-valuemin="0" aria-valuemax="100" style={{ width: `${v.todo_andamento > 0 ? v.todo_andamento : 5}%`, backgroundColor: 'rgba(255,131,0, 1)', color: 'black' }}> {v.todo_andamento}% </div>
                                                    </div>
                                                    <button style={{ width: 'auto', height: '1.2rem', fontSize: '.8rem', display: 'flex', alignItems: 'center' }} className="btn btn-outline-dark" data-toggle="tooltip" data-placement="top" title={`Última atualização: ${v.updatedAt.split('-').reverse().join('/')}. Status: ${v.todo_status} `}>🛈</button>
                                                </section>}
                                        </div>
                                        <hr />
                                        <div>
                                            {user.usuario.user_permissoes == 2 || user.usuario.user_permissoes == 1 ?
                                                <div className="d-flex justify-content-around p-1">
                                                    {v.todo_status == 'Executando' || v.todo_status == 'Atrasado' ?
                                                        <button value={v.id + '-' + v.todo_status} onClick={handlePausaTarefa} className="btn btn-dark w-25">Pausar</button>
                                                        : <button value={v.id + '-' + v.todo_status} onClick={handlePausaTarefa} className="btn btn-dark w-25">Execução</button>}
                                                    <button value={v.id} onClick={handleDeleteTodo} className="btn btn-danger w-25">Deletar</button>
                                                </div>
                                                :
                                                ''
                                            }
                                        </div>
                                        <div className="d-none">
                                            {incrementTarefas++}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 p-4">
                    <div id="containerBgTodo" className="row d-flex flex-row justify-content-center overflow-auto" style={{ maxHeight: '55rem' }}>
                        <div className="col-12">
                            <h1 id='titlesDoed' style={{ fontSize: '2.4rem' }} className="text-center text-uppercase">Tarefas Concluídas</h1>
                            <hr />
                        </div>
                        {todoFeito.map(v => (
                            <div id="containerInfosTodo" key={v.id} className="col-11 p-2">
                                <p>• Tarefa: {v.todo_tarefa}</p>
                                <p>• Concluído em: {v.updatedAt.split('-').reverse().join('/')}</p>
                                <div className="col-12">
                                    <hr />
                                    <section className="d-flex justify-content-around">
                                        <p>• Andamento:</p>
                                        <div className="progress col-6">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success " role="progressbar" aria-valuenow={v.todo_andamento} aria-valuemin="0" aria-valuemax="100" style={{ width: `${v.todo_andamento}%` }}> {v.todo_andamento}% </div>
                                        </div>
                                        <button className="btn btn-outline-dark w-25" value={v.todo_andamento + '-' + v.id} onClick={handleMinAndamento}>ToDo</button>
                                    </section>
                                </div>
                                <hr />
                                <div >
                                    {user.usuario.user_permissoes == 2 || user.usuario.user_permissoes == 1 ?
                                        <div className="d-flex justify-content-around p-1">
                                            <button value={v.id} onClick={handleArquivarTodo} className="btn btn-warning w-25">Arquivar</button>
                                            <button value={v.id} onClick={handleDeleteTodo} className="btn btn-danger w-25">Deletar</button>
                                        </div>
                                        : ''
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {todoArquivado.length > 0 && (
                    <div className="col-11 p-4">
                        <div id="containerBgTodo" className="row d-flex flex-row justify-content-center overflow-auto" style={{ maxHeight: '55rem' }}>
                            <div className="col-12">
                                <h1 id='titlesDoed' style={{ fontSize: '2.4rem' }} className="text-center text-uppercase">Tarefas Arquivadas</h1>
                                <hr />
                            </div>
                            {todoArquivado.map(v => (
                                <div id="containerInfosTodo" key={v.id} className="col-11 p-2">
                                    <p>• Tarefa: {v.todo_tarefa}</p>
                                    <p>• Arquivado em: {v.updatedAt.split('-').reverse().join('/')}</p>
                                    <div className="col-12">
                                        <hr/>
                                        <section className="d-flex justify-content-around">
                                            <p>• Andamento:</p>
                                            <div className="progress col-6">
                                                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success " role="progressbar" aria-valuenow={v.todo_andamento} aria-valuemin="0" aria-valuemax="100" style={{ width: `${v.todo_andamento}%` }}> {v.todo_andamento}% </div>
                                            </div>
                                        </section>
                                    </div>
                                    <hr />
                                    <div>
                                        {user.usuario.user_permissoes == 2 || user.usuario.user_permissoes == 1 ?
                                            <div className="d-flex justify-content-around p-1">
                                                <button value={v.todo_andamento + '-' + v.id} onClick={handleMinAndamento} className="btn btn-warning w-25">Execução</button>
                                                <button value={v.id} onClick={handleDeleteTodo} className="btn btn-danger w-25">Deletar</button>
                                            </div>
                                            : ''
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {aguardando && (
                    <FormDialogToDo
                        open={open} 
                        setOpen={setOpen}
                        todo_autor={user.usuario.user_nomeUser}
                    />
                )}
            </div>
        </div>

    )

}

// todo_list

export default ToDoList;
