
import React, { useState } from 'react';

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

export default function FormDialogAddCompras(value) {

    const [editValue, setEditValue] = useState({

        categoriaItem: value.categoriaItem,
        nomeItem: value.nomeItem,
        quantidade: value.quantidade,
        usuario: value.usuario,

    });

    const handleCriarEvento = () => {
        api.post('compracadastrada', {
            lista_item: editValue.nomeItem,
            lista_categoria: value.categoriaItem,
            lista_quantidade: editValue.quantidade,
            lista_setorDaCompra: value.usuario,
        });
        handleClose();
        alert('Item adicionado com sucesso!')
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

    return(
        <Dialog open={value.open} onClose={handleClose}>
            <DialogTitle>Novo item: </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    autoComplete='off'
                    margin="dense"
                    id="nomeItem"
                    label="Nome do item: "
                    onChange={handleChangeValue}
                    type="text"
                    fullWidth
                    variant="standard" 
                />
                <TextField
                    autoFocus
                    autoComplete='off'
                    margin="dense"
                    id="quantidade"
                    label="Quantidade: "
                    onChange={handleChangeValue}
                    type="text"
                    fullWidth
                    variant="standard" 
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleCriarEvento}>Adicionar Item</Button>
            </DialogActions>
        </Dialog>
    )

}