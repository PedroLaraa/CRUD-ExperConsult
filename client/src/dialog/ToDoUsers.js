
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

import './doedStyle.css';

export default function FormDialogToDo(value){
    
    const [editValue, setEditValue] = useState({
        
    })

    const handleClose = () => {
        value.setOpen(false);
    };

    const handleChangeValue = value => {
        setEditValue(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    };

    return(
        <Dialog open={value.open} onClose={handleClose}>
            <DialogTitle>Novo To-Do: </DialogTitle>
                <DialogContent>
                    <TextareaAutosize
                        autoComplete='off'
                        margin="dense"
                        id="doed_eventos"
                        label="Evento: "
                        style={{ width: '100%' }}
                        onChange={handleChangeValue}
                        type="text"
                        variant="standard"
                        multiline='true'
                        minRows={6}
                        maxRows={8}
                    />
                </DialogContent>
        </Dialog>
    )

}