
import React, {useState} from 'react';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';

import DialogContentText from '@mui/material/DialogContentText';

import DialogTitle from '@mui/material/DialogTitle';

import { SliderValueLabel } from '@mui/material';

import api from '../config/configApi';

export default function FormDialog(value) {

    const [editValue,setEditValue] = useState({
        fornec_fornecedornome: value.fornec_fornecedornome,
        fornec_nivelfornecedor: value.fornec_nivelfornecedor,
        fornec_razaosocial: value.fornec_razaosocial,
        fornec_telefone: value.fornec_telefone,
        fornec_email: value.fornec_email,
        fornec_site: value.fornec_site,
        data: value.data,
        setData: value.setData,
        id: value.id    
    });

    const handleEditFornecedor = () => {
        api.put('fornecedoreditado', {
            fornec_fornecedornome: editValue.fornec_fornecedornome,
            fornec_nivelfornecedor: editValue.fornec_nivelfornecedor,
            fornec_razaosocial: editValue.fornec_razaosocial,
            fornec_telefone: editValue.fornec_telefone,
            fornec_email: editValue.fornec_email,
            fornec_site: editValue.fornec_site,
            data: editValue.data,
            setData: editValue.setData,
            id: editValue.id 
        });
        handleClose();
    }

    const handleClickOpen = () => {
        value.setOpen(true);
    };

    const handleClose = () => {
        value.setOpen(false);
    };

    const handleChangeValue = value =>{
        setEditValue(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    }

    return (
            <Dialog open={value.open} onClose={handleClose}>
                <DialogTitle>Editar</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fornec_fornecedornome"
                        label="Nome do fornecedor: "
                        defaultValue={value.fornec_fornecedornome}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fornec_nivelfornecedor"
                        label="Nível fornecedor: "
                        defaultValue={value.fornec_nivelfornecedor}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fornec_razaosocial"
                        label="Razão social: "
                        defaultValue={value.fornec_razaosocial}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fornec_telefone"
                        label="Telefone: "
                        defaultValue={value.fornec_telefone}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fornec_email"
                        label="Email: "
                        defaultValue={value.fornec_email}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fornec_site"
                        label="Site: "
                        defaultValue={value.fornec_site}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Excluir</Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleEditFornecedor}>Salvar</Button>
                </DialogActions>
            </Dialog>
    );
}
