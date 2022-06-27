
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';

import OutlinedInput from '@mui/material/OutlinedInput';

import ListItemText from '@mui/material/ListItemText';

import Checkbox from '@mui/material/Checkbox';

import DialogTitle from '@mui/material/DialogTitle';

import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';

import api from '../config/configApi';

import './doedStyle.css';

export default function FormDialogToDo(value){
    
    const [editValue, setEditValue] = useState({
        todo_tarefa: value.todo_tarefa,
        todo_dataConclusao: value.todo_dataConclusao,
        todo_destinatario: value.todo_destinatario,
        todo_setor: value.todo_setor,
        todo_autor: value.todo_autor,
    });

    const [user, setUser] = useState([]);

    const [userNotificado, setUserNotificado] = useState('');

    const handleClose = () => {
        value.setOpen(false);
    };

    const handleChangeValue = value => {
        setEditValue(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    };

    const handleCriarEvento = () => {
        api.post('todo-cadastrado', {
            todo_tarefa: editValue.todo_tarefa,
            todo_dataConclusao: editValue.todo_dataConclusao,
            todo_destinatario: userNotificado,
            todo_setor: editValue.todo_setor,
            todo_autor: value.todo_autor,
            todo_status: 'ToDo',
            todo_andamento: 0,
        });

        alert('Tarefa cadastrada com sucesso!');
        handleClose();
        document.location.reload();
    };

    const getUsersList = async () => {
        api.get('list-infosUser')
            .then(response => {
                setUser(response.data.value);
            }).catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getUsersList();
    }, []);

    return(
        <Dialog open={value.open} onClose={handleClose}>
            <DialogTitle>Novo To-Do: </DialogTitle>
                <DialogContent >
                    <InputLabel >Tarefa: </InputLabel>
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
                        {user.map((v) => (
                            <MenuItem key={v.id} value={v.user_nomeUser} readOnly>
                                <ListItemText primary={v.user_nome} />
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel>Data para conclusão: </InputLabel>
                    <TextField 
                        type ="date"
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