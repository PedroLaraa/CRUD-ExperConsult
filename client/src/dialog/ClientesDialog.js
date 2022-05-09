
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
        clientes_razaosocial: value.clientes_razaosocial,
        clientes_nomefantasia: value.clientes_nomefantasia,
        clientes_apelido: value.clientes_apelido,
        clientes_cnpj: value.clientes_cnpj,
        clientes_endereco: value.clientes_endereco,
        clientes_premissasDeProjeto: value.clientes_premissasDeProjeto,
        clientes_ie: value.clientes_ie,
        clientes_nomeResponsavel: value.clientes_nomeResponsavel,
        clientes_telefone: value.clientes_telefone,
        clientes_email: value.clientes_email,
        data: value.data,
        setData: value.setData,
        id: value.id    
    });

    const handleEditFornecedor = () => {
        api.put('cliente-editado', {
            clientes_razaosocial: editValue.clientes_razaosocial,
            clientes_nomefantasia: editValue.clientes_nomefantasia,
            clientes_apelido: editValue.clientes_apelido,
            clientes_cnpj: editValue.clientes_cnpj,
            clientes_endereco: editValue.clientes_endereco,
            clientes_premissasDeProjeto: editValue.clientes_premissasDeProjeto,
            clientes_ie: editValue.clientes_ie,
            clientes_nomeResponsavel: editValue.clientes_nomeResponsavel,
            clientes_telefone: editValue.clientes_telefone,
            clientes_email: editValue.clientes_email,
            data: editValue.data,
            setData: editValue.setData,
            id: editValue.id 
        });
        handleClose();
        alert('Editado com sucesso!')
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
        api.delete(`cliente-deletado/${editValue.id}`)
        handleClose();
        alert('Deletado com sucesso!')
        document.location.reload(true)
    }

    return (
            <Dialog open={value.open} onClose={handleClose}>
                <DialogTitle>Editar: </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="clientes_razaosocial"
                        label="Razão social: "
                        defaultValue={value.clientes_razaosocial}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="clientes_nomefantasia"
                        label="Nome fantasia: "
                        defaultValue={value.clientes_nomefantasia}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="clientes_apelido"
                        label="Apelido: "
                        defaultValue={value.clientes_apelido}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="clientes_cnpj"
                        label="CNPJ: "
                        defaultValue={value.clientes_cnpj}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="clientes_endereco"
                        label="Endereço: "
                        defaultValue={value.clientes_endereco}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="clientes_email"
                        label="Email: "
                        defaultValue={value.clientes_email}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="clientes_ie"
                        label="IE: "
                        defaultValue={value.clientes_ie}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="clientes_nomeResponsavel"
                        label="Responsável: "
                        defaultValue={value.clientes_nomeResponsavel}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="clientes_telefone"
                        label="Telefone: "
                        defaultValue={value.clientes_telefone}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="clientes_premissasDeProjeto"
                        label="Premissas de projeto: "
                        defaultValue={value.clientes_premissasDeProjeto}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button style={{color: 'red', position: 'relative', right: '20rem'}} onClick={handleDelete}>Excluir</Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleEditFornecedor}>Salvar</Button>
                </DialogActions>
            </Dialog>
    );
}
