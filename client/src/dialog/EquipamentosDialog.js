
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
        id_fornecedor: value.id_fornecedor,
        desceqp_nomeeqp: value.desceqp_nomeeqp,
        desceqp_modelo: value.desceqp_modelo,
        desceqp_consumoene: value.desceqp_consumoene,
        desceqp_consumotipo: value.desceqp_consumotipo,
        desceqp_precoeqp: value.desceqp_precoeqp,
        desceqp_dataultpreco: value.desceqp_dataultpreco,
        desceqp_capacidadeprod: value.desceqp_capacidadeprod,
        desceqp_comentario: value.desceqp_comentario,
        desceqp_marca: value.desceqp_marca,
        data: value.data,
        setData: value.setData,
        id: value.id    
    });

    const handleEditFornecedor = () => {
        api.put('equipamento-editado', {
            id_fornecedor: editValue.id_fornecedor,
            desceqp_nomeeqp: editValue.desceqp_nomeeqp,
            desceqp_modelo: editValue.desceqp_modelo,
            desceqp_consumoene: editValue.desceqp_consumoene,
            desceqp_consumotipo: editValue.desceqp_consumotipo,
            desceqp_precoeqp: editValue.desceqp_precoeqp,
            desceqp_dataultpreco: editValue.desceqp_dataultpreco,
            desceqp_capacidadeprod: editValue.desceqp_capacidadeprod,
            desceqp_comentario: editValue.desceqp_comentario,
            desceqp_marca: editValue.desceqp_marca,
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
        api.delete(`equipamento-deletado/${editValue.id}`)
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
                        id="id_fornecedor"
                        label="Nome do fornecedor: "
                        defaultValue={value.id_fornecedor}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="desceqp_nomeeqp"
                        label="Nome do equipamento: "
                        defaultValue={value.desceqp_nomeeqp}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="desceqp_modelo"
                        label="Modelo: "
                        defaultValue={value.desceqp_modelo}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="desceqp_marca"
                        label="Marca: "
                        defaultValue={value.desceqp_marca}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="desceqp_consumoene"
                        label="Consumo energético: "
                        defaultValue={value.desceqp_consumoene}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="desceqp_consumotipo"
                        label="Tipoo de consumo: "
                        defaultValue={value.desceqp_consumotipo}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="desceqp_precoeqp"
                        label="Preço do equipamento: "
                        defaultValue={value.desceqp_precoeqp}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="desceqp_dataultpreco"
                        label="Data do preço: "
                        defaultValue={value.desceqp_dataultpreco}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="desceqp_capacidadeprod"
                        label="Capacidade produtiva: "
                        defaultValue={value.desceqp_capacidadeprod}
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="desceqp_comentario"
                        label="Comentários sobre equipamento: "
                        defaultValue={value.desceqp_comentario}
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
