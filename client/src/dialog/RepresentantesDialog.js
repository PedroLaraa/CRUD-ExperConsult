
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
        representante_nome: value.representante_nome,
        representante_empresasrep: value.representante_empresasrep,
        representante_telefone: value.representante_telefone,
        representante_comentarios: value.representante_comentarios,
        representante_site: value.representante_site,
        representante_estadoatuacao: value.representante_estadoatuacao,
        representante_status: value.representante_status,
        data: value.data,
        setData: value.setData,
        id: value.id    
    });

    const handleEditFornecedor = () => {
        api.put('representante-editado', {
            representante_nome: editValue.representante_nome,
            representante_empresasrep: editValue.representante_empresasrep,
            representante_telefone: editValue.representante_telefone,
            representante_comentarios: editValue.representante_comentarios,
            representante_site: editValue.representante_site,
            representante_estadoatuacao: editValue.representante_estadoatuacao,
            representante_status: editValue.representante_status,
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
        api.delete(`representante-deletado/${editValue.id}`)
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
                        id="representante_nome"
                        label="Nome do representante: "
                        defaultValue={value.representante_nome}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="representante_empresasrep"
                        label="Empresas que representa: "
                        defaultValue={value.representante_empresasrep}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="representante_telefone"
                        label="Telefone: "
                        defaultValue={value.representante_telefone}
                        onChange={handleChangeValue}
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="representante_comentarios"
                        label="Comentários sobre representante: "
                        defaultValue={value.representante_comentarios}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="representante_site"
                        label="Site: "
                        defaultValue={value.representante_site}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="representante_estadoatuacao"
                        label="Estados de atuação: "
                        defaultValue={value.representante_estadoatuacao}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="representante_status"
                        label="Status (Ativo, Inativo, Indefinido): "
                        defaultValue={value.representante_status}
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
