
import React, {useState} from 'react';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import api from '../config/configApi';

export default function FormDialog(value) {

    const [editValue,setEditValue] = useState({
        predios_dataConclusao: value.predios_dataConclusao,
        predios_nomeDosPredios: value.predios_nomeDosPredios,
        predios_autor: value.predios_autor,
        cliente_id: value.cliente_id,
        data: value.data,
        setData: value.setData,
        id: value.id    
    });

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const handleCriarEvento = () => {
        api.post('predio-cadastrado', {
            predios_dataConclusao: editValue.predios_dataConclusao,
            predios_nomeDosPredios: editValue.predios_nomeDosPredios,
            predios_autor: editValue.predios_autor,
            cliente_id: editValue.cliente_id,
            data: editValue.data,
            setData: editValue.setData,
        });
        handleClose();
        alert('Setor cadastrado com sucesso!')
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
                <DialogTitle>Novo assunto: </DialogTitle>
                <DialogContent >
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="predios_nomeDosPredios"
                        label="Assunto: "
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        autoComplete='off'
                        margin="dense"
                        id="predios_autor"
                        label="Autor: "
                        onChange={handleChangeValue}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleCriarEvento}>Cadastrar Setor</Button>
                </DialogActions>
            </Dialog>
    );
}
