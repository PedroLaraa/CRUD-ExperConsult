
import React, { useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';

import ListItemText from '@mui/material/ListItemText';

import DialogTitle from '@mui/material/DialogTitle';

import { InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';

import api from '../config/configApi';

import './doedStyle.css';

export default function FormDialogToDo(value) {

    const [editValue, setEditValue] = useState({
        todo_tarefa: value.todo_tarefa,
        todo_dataConclusao: value.todo_dataConclusao,
        todo_destinatario: value.todo_destinatario,
        todo_setor: value.todo_setor,
        todo_autor: value.todo_autor,
        todo_obraCliente: value.todo_obraCliente,
    });

    const [user, setUser] = useState([]);

    const [userNotificado, setUserNotificado] = useState('');

    const [obraTodo, setObraTodo] = useState('');

    const [obras, setObras] = useState([]);

    const [atualizar, setAtualizar] = useState(false);

    const handleClose = () => {
        value.setOpen(false);
    };

    const handleChangeValue = value => {
        setEditValue(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    };

    const handleCriarEvento = async (params, callback, err) => {

        const values = {
            todo_tarefa: editValue.todo_tarefa,
            todo_dataConclusao: editValue.todo_dataConclusao,
            todo_destinatario: userNotificado,
            todo_setor: editValue.todo_setor,
            todo_autor: value.todo_autor,
            todo_status: 'Executando',
            todo_andamento: 0,
            todo_obraCliente: obraTodo,
        };

        try {
            api.post('todo-cadastrado', values);
            setTimeout(() => {
                setAtualizar(true);
            }, 300)
        } catch {
            alert('Erro ao criar evento');
        }
    };

    const getUsersList = async () => {
        api.get('list-infosUser')
            .then(response => {
                setUser(response.data.value);
            }).catch((err) => {
                console.log(err);
            });
    };

    const getObrasList = async () => {
        api.get('list-infosObras')
            .then(response => {
                setObras(response.data.value);
            }).catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getUsersList();
        getObrasList();
    }, []);

    if (atualizar === true) {
        setAtualizar(false);
        value.setOpen(false);
    }

    return (
        <Dialog open={value.open} onClose={handleClose}>
            <DialogTitle>Novo To-Do: </DialogTitle>
            <DialogContent >
                <InputLabel>Cliente: </InputLabel>
                <Select
                    autoComplete='off'
                    required
                    margin="dense"
                    id="todo_obraCliente"
                    style={{ width: '100%' }}
                    onChange={(e) => setObraTodo(e.target.value)}
                >
                    {obras.sort(function (a, b) {
                        return a.clientes_obra.clientes_apelido < b.clientes_obra.clientes_apelido ? -1 : a.clientes_obra.clientes_apelido > b.clientes_obra.clientes_apelido ? 1 : 0;
                    }).map((v) => (
                        <MenuItem key={v.id} value={v.clientes_obra.clientes_apelido + ' - ' + v.obras_nomeDaObra.toString().replace(/[0-9]/g, '')} readOnly>
                            <ListItemText primary={v.clientes_obra.clientes_apelido + ' - ' + v.obras_nomeDaObra.toString().replace(/[0-9]/g, '')} />
                        </MenuItem>
                    ))}
                </Select>
                <InputLabel>Tarefa: </InputLabel>
                <TextareaAutosize
                    autoComplete='off'
                    required
                    margin="dense"
                    id="todo_tarefa"
                    label="Evento: "
                    style={{ width: '100%' }}
                    onChange={handleChangeValue}
                    type="text"
                    variant="standard"
                    multiline='true'
                    minRows={6}
                    maxRows={8}
                />
                <InputLabel>Usuário: </InputLabel>
                <Select
                    autoComplete='off'
                    required
                    margin="dense"
                    id="todo_destinatario"
                    style={{ width: '100%' }}
                    onChange={(e) => setUserNotificado(e.target.value)}
                >
                    {user.sort(function (a, b) {
                        return a.user_nome < b.user_nome ? -1 : a.user_nome > b.user_nome ? 1 : 0;
                    }).map((v) => (
                        <MenuItem key={v.id} value={v.user_nomeUser} readOnly>
                            <ListItemText primary={v.user_nome} />
                        </MenuItem>
                    ))}
                </Select>
                <InputLabel>Data para conclusão: </InputLabel>
                <TextField
                    type="date"
                    required
                    id="todo_dataConclusao"
                    onChange={handleChangeValue}
                    variant="standard"
                    margin="dense"
                    style={{ width: '100%' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleCriarEvento}>Cadastrar Evento</Button>
            </DialogActions>
        </Dialog>
    )

}