import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import { handleAlterImage } from "../components/function/recuperaUserImg";

import NotificacoesSetor from "../NotificacoesSetores";

import api from '../../config/configApi';

import botaoComprasStyle from "../css/botaoCompras.js";

import FormDialogAddCompras from "../../dialog/ComprasDialog";

function ComprasExper(){

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    useEffect(() => {
        handleAlterImage()
    } , []);

    const [open, setOpen] = useState(false);

    const [data, setData] = useState([]);

    const [categoria, setCategoria] = useState('');

    const getInfosPredios = async (req, res) => {
        api.get('list-compras')
            .then((response) => {
                setData(response.data.value)
            }).catch((err) => {
                console.log(err)
            })
    };

    useEffect(() => {
        getInfosPredios()
    }, [open]);

    const dataFiltradoTech = data.filter(v => v.lista_categoria === 'Tech');

    const dataFiltradoCafe = data.filter(v => v.lista_categoria === 'Cafe');

    const dataFiltradPapelaria = data.filter(v => v.lista_categoria === 'Papelaria');

    function handleAddItem(e){
        e.preventDefault();
        setOpen(!false);
        setCategoria(e.target.value);
    }

    //TODO ADICIONAR A FUNÇÃO DE AUMENTAR A QUANTIDADE DE ITEM E FUNÇÃO DE DELETAR ITEM

    return(
        <div className="">
            <NotificacoesSetor />
            <div className="row w-100 d-flex justify-content-center">
                <div className="col-8 m-2" style={botaoComprasStyle}>
                    <ul>
                        <p className="text-uppercase">
                            Compras Tech:
                        </p>
                        {dataFiltradoTech.map(v => (
                            <li key={v.id}>Item: {v.lista_item} | Quantidade: {v.lista_quantidade}
                            <button className="btn btn-outline-dark" value={v.id}>+</button>
                            <button className="btn btn-outline-dark" value={v.id}>-</button>  
                            </li>
                        ))}
                        <div className="d-flex justify-content-start pt-4">
                            <button onClick={handleAddItem} className="btn btn-outline-dark" value='Tech'>Novo item</button>
                        </div>
                    </ul>
                </div>
                <div className="col-8 m-2" style={botaoComprasStyle}>
                    <ul>
                        <p className="text-uppercase">
                            Compras Papelaria:
                        </p>
                        {dataFiltradPapelaria.map(v => (
                            <li key={v.id}>Item: {v.lista_item} | Quantidade: {v.lista_quantidade}
                            <button className="btn btn-outline-dark" value={v.id}>+</button>
                            <button className="btn btn-outline-dark" value={v.id}>-</button> 
                            </li>
                        ))}
                        <div className="d-flex justify-content-start pt-4">
                            <button onClick={handleAddItem} className="btn btn-outline-dark" value='Papelaria'>Novo item</button>
                        </div>
                    </ul>
                </div>
                <div className="col-8 m-2" style={botaoComprasStyle}>
                    <ul>
                        <p className="text-uppercase">
                            Compras Café:
                        </p>
                        {dataFiltradoCafe.map(v => (
                            <li key={v.id}>Item: {v.lista_item} | Quantidade: {v.lista_quantidade} 
                            <button className="btn btn-outline-dark" value={v.id}>+</button> 
                            <button className="btn btn-outline-dark" value={v.id}>-</button> 
                            </li>
                        ))}
                        <div className="d-flex justify-content-start pt-4">
                            <button onClick={handleAddItem} className="btn btn-outline-dark" value='Cafe'>Novo item</button>
                        </div>
                    </ul>
                </div>
            </div>
            <FormDialogAddCompras 
            open={open}
            setOpen={setOpen}
            categoriaItem={categoria}
            />
        </div>
    )
}

export default ComprasExper;