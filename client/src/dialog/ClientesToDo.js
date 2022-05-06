
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

export default function FormDialog(value) {

    const [editValue,setEditValue] = useState({
        todo_dataConclusao: value.todo_dataConclusao,
        todo_eventos: value.todo_eventos,
        todo_autor: value.todo_autor,
        cliente_id: value.cliente_id,
        data: value.data,
        setData: value.setData,
        id: value.id    
    });

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const handleCriarEvento = () => {
        api.post('todo-cadastrado', {
            todo_dataConclusao: editValue.todo_dataConclusao,
            todo_eventos: editValue.todo_eventos,
            todo_autor: editValue.todo_autor,
            cliente_id: editValue.cliente_id,
            data: editValue.data,
            setData: editValue.setData,
        });
        handleClose();
        alert('Cadastrado com sucesso!')
        document.location.reload(true)
    };

    const getInfosTodo = async (req, res) => {
        api.get('list-infosTodo')
            .then((response) => {
                setData(response.data.value)
                setUrl(response.data.url)
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleClose = () => {
        value.setOpen(false);
    };

    const handleChangeValue = value =>{
        setEditValue(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    };

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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleCriarEvento}>Criar Evento</Button>
                </DialogActions>
            </Dialog>
    );
}
