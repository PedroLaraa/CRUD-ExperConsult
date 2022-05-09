
import React, {useState} from 'react';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';

import DialogContentText from '@mui/material/DialogContentText';

import DialogTitle from '@mui/material/DialogTitle';

import { MenuItem, Select } from '@mui/material';

import { SliderValueLabel } from '@mui/material';

import api from '../config/configApi';

export default function FormDialogEdit(value) {

    const [editValue,setEditValue] = useState({
        todo_dataConclusao: value.updatedAt,
        todo_eventos: value.todo_eventos,
        todo_autor: value.todo_autor,
        todo_id: value.todo_id,
        data: value.data,
        setData: value.setData,
    });

    const handleCriarEvento = () => {
        api.put('todo-editado', {
            todo_dataConclusao: editValue.updatedAt,
            todo_eventos: editValue.todo_eventos,
            todo_autor: editValue.todo_autor,
            todo_id: editValue.todo_id,
            data: editValue.data,
            setData: editValue.setData,
        });
        handleClose();
        alert('Cadastrado com sucesso!')
        document.location.reload(true)
    };

    const handleClose = () => {
        value.setOpen(false);
    };

    const handleChangeValue = value =>{
        setEditValue(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    };

    const handleDelete = () => {
        api.delete(`todo-deletado/${editValue.todo_id}`)
        handleClose();
        alert('Deletado com sucesso!')
        document.location.reload(true)
    }

    return (
            <Dialog open={value.open} onClose={handleClose}>
                <DialogTitle>Novo evento: </DialogTitle>
                <DialogContent >
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="todo_eventos"
                        label="Evento: "
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="todo_autor"
                        label="Autor: "
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        defaultValue={value.todo_id}
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="todo_id"
                        label="ID: "
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                <Button style={{color: 'red', position: 'relative', right: '15rem'}} onClick={handleDelete}>Excluir</Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleCriarEvento}>Salvar Evento</Button>
                </DialogActions>
            </Dialog>
    );
}
