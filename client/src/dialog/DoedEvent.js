
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

export default function FormDialogAddEvent(value) {

    const [editValue,setEditValue] = useState({
        doed_eventos: value.doed_eventos,
        doed_autor: value.doed_autor,
        predios_clientes: value.predios_clientes,
        data: value.data,
        setData: value.setData,
        id: value.id    
    });

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const handleCriarEvento = () => {
        api.post('doed-cadastrado', {
            predios_clientes: value.predios_clientes,
            doed_eventos: editValue.doed_eventos,
            doed_autor: editValue.doed_autor,
            data: editValue.data,
            setData: editValue.setData,
        });
        handleClose();
        alert('Cadastrado com sucesso!')
    };

    const getInfosTodo = async (req, res) => {
        api.get('list-infosPredios')
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
                        id="doed_eventos"
                        label="Evento: "
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                        multiline
                        maxRows={5}
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="doed_autor"
                        label="Autor: "
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleCriarEvento}>Cadastrar Evento</Button>
                </DialogActions>
            </Dialog>
    );
}
