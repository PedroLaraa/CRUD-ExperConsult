
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

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import api from '../config/configApi';

export default function FormDialogAddEvent(value) {

    const [editValue, setEditValue] = useState({
        doed_eventos: value.doed_eventos,
        doed_autor: value.doed_autor,
        predios_clientes: value.predios_clientes,
        data: value.data,
        setData: value.setData,
        id: value.id,
        nomeDoPredio: value.nomeDoPredio,
        nomeDoCliente: value.nomeDoCliente,
        notificacoes_motivo: ''
    });

    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    const [personName, setPersonName] = useState([]);

    const handleCriarEvento = () => {
        api.post('doed-cadastrado', {
            predios_clientes: value.predios_clientes,
            doed_eventos: editValue.doed_eventos,
            doed_autor: value.doed_autor,
            data: editValue.data,
            setData: editValue.setData,
        });
        api.post('notificacoes-setores', {
            notificacoes_destinatario: personName,
            notificacoes_autor: value.doed_autor,
            notificacoes_motivo: `Novo evento cadastrado no prédio "${value.nomeDoPredio}" do cliente "${value.nomeDoCliente}"`,
            notificacoes_mensagem: editValue.doed_eventos
        });
        handleClose();
        alert('Evento cadastrado com sucesso e notificação enviada!');
    };

    const getInfosTodo = async (req, res) => {
        api.get('list-infosPredios')
            .then((response) => {
                setData(response.data.value)
                setUrl(response.data.url)
            }).catch((err) => {
                console.log(err)
            })
    };

    const handleClose = () => {
        value.setOpen(false);
    };

    const handleChangeValue = value => {
        setEditValue(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Aprovações 2',
        'Engenharia 3',
        'Custos 6',
        'Direção 5',
        'Orçamentos 8',
        'Conceito 9',
        'Arquitetura 4',
        'Software 1',
    ].sort()

    function MultipleSelectCheckmarks() {

        const handleChange = (event) => {
            const {
                target: { value },
            } = event;
            setPersonName(
                typeof value === 'string' ? value.split(',') : value,
            );
        };

        return (
            <div>
                <FormControl sx={{ m: 2, width: 400 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Setores para notificar: </InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Setores para notificar:" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name.charAt(name.length - 1)}>
                                <Checkbox checked={personName.indexOf(name.charAt(name.length - 1)) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }

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
                <h5 className='pt-5'>Notificar: </h5>
                <MultipleSelectCheckmarks />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleCriarEvento}>Cadastrar Evento</Button>
            </DialogActions>
        </Dialog>
    );
}
