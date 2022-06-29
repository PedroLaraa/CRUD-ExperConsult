import React, { useEffect, useState } from "react";

import NotificacoesSetor from "../NotificacoesSetores";

import api from '../../config/configApi';

import botaoComprasStyle from "../css/botaoCompras.js";

import FormDialogAddCompras from "../../dialog/ComprasDialog";

import './comprasStyle.css';

function ComprasExper() {

    const [open, setOpen] = useState(false);

    const [data, setData] = useState([]);

    const [categoria, setCategoria] = useState('');

    const [recoveredUsers, setRecoveredUsers] = useState('');

    const [nomeUser, setNomeUser] = useState('');

    const getInfosPredios = async (req, res) => {
        api.get('list-compras')
            .then((response) => {
                setData(response.data.value)
            }).catch((err) => {
                console.log(err)
            })
    };

    const dataFiltradoTech = data.filter(v => v.lista_categoria === 'Tech');

    const dataFiltradoCafe = data.filter(v => v.lista_categoria === 'Cafe');

    const dataFiltradPapelaria = data.filter(v => v.lista_categoria === 'Papelaria');

    function handleAddItem(e) {
        e.preventDefault();
        setOpen(!false);
        setCategoria(e.target.value);

        setNomeUser(recoveredUsers.usuario.user_nomeUser);
        console.log(nomeUser)
    }

    function handleSumItem(e) {

        e.preventDefault();
        const values = {
            id: e.target.value,
        }

        api.put('compras-updateSoma', values);

        document.location.reload();

    }

    function handleSubtraiItem(e) {

        e.preventDefault();

        const values = {
            id: e.target.value,
        }

        api.put('compras-updateSubtrai', values);

        document.location.reload();

    }

    function handleDeleteItem(e) {

        e.preventDefault();

        const id = e.target.value;

        api.delete(`compras-delete/${id}`)

        alert('Item deletado com sucesso!');

        document.location.reload(true);

    }

    useEffect(() => {

        getInfosPredios()

    }, [open]);

    useEffect(() => {

        setRecoveredUsers(JSON.parse(localStorage.getItem('user')));

    }, [])

    return (
        <div id="compras">
            <NotificacoesSetor />
            <div className="row w-100 d-flex justify-content-center">
            <div className="col-8 m-2" style={botaoComprasStyle}>
                    <div className="row w-100 d-flex justify-content-center overflow-auto" style={{maxHeight: '45rem'}}>
                        <p className="col-12 text-uppercase">
                            Compras Tech:
                        </p>
                        <p className="col-12 text-uppercase bg-dark" style={{height: '10px', left: '.5rem', position: 'relative'}}></p>
                        <p className="col-4 text-uppercase">Item: </p>
                        <p className="col-8 text-uppercase">Quantidade: </p>
                        <p className="col-12 text-uppercase bg-dark" style={{height: '10px', left: '.5rem', position: 'relative'}}></p>
                        {dataFiltradoTech.map(v => (
                            <div key={v.id}>
                                <div className="row w-100 d-flex justify-content-center">
                                    <p className="col-6">{v.lista_item}</p>
                                    <p className="col-2">{v.lista_quantidade}</p>
                                    <button className="col-1 p-1 btn btn-outline-dark" data-toggle="tooltip" data-placement="top" title={`Pedido por: ${ v.lista_setorDaCompra}; Pedido feito em: ${v.createdAt.split('-').reverse().join('/')}`}>🛈</button>                                   
                                    {v.lista_setorDaCompra === recoveredUsers.usuario.user_nomeUser && (
                                        <>
                                            <button className="col-1 p-1 btn btn-outline-dark" value={v.id} onClick={handleSumItem} data-placement="top" title='Adicionar item'>➕</button>
                                            <button className="col-1 p-1 btn btn-outline-dark" value={v.id} onClick={handleSubtraiItem} data-placement="top" title='Subtrair item'>➖</button>
                                            <button className="col-1 p-1 btn btn-outline-dark" value={v.id} onClick={handleDeleteItem} data-placement="top" title='Deletar item'>❌</button>
                                        </>
                                    )}                                
                                </div>
                            </div>
                        ))}
                        <p className="col-12 text-uppercase bg-dark m-2" style={{height: '10px', left: '.5rem', position: 'relative'}}></p>
                        <div className="d-flex justify-content-start pt-4">
                            <button onClick={handleAddItem} className="btn btn-outline-dark m-2" value='Tech'>Novo item</button>
                        </div>
                    </div>
                </div>
                <div className="col-8 m-2" style={botaoComprasStyle}>
                    <div className="row w-100 d-flex justify-content-center overflow-auto" style={{maxHeight: '45rem'}}>
                        <p className="col-12 text-uppercase">
                            Compras Papelaria:
                        </p>
                        <p className="col-12 text-uppercase bg-dark" style={{height: '10px', left: '.5rem', position: 'relative'}}></p>
                        <p className="col-4 text-uppercase">Item: </p>
                        <p className="col-8 text-uppercase">Quantidade: </p>
                        <p className="col-12 text-uppercase bg-dark" style={{height: '10px', left: '.5rem', position: 'relative'}}></p>
                        {dataFiltradPapelaria.map(v => (
                            <div key={v.id}>
                                <div className="row w-100 d-flex justify-content-center" style={{maxHeight: '45rem'}}>
                                    <p className="col-6">{v.lista_item}</p>
                                    <p className="col-2">{v.lista_quantidade}</p>
                                    <button className="col-1 p-1 btn btn-outline-dark" data-toggle="tooltip" data-placement="top" title={`Pedido por: ${ v.lista_setorDaCompra}; Pedido feito em: ${v.createdAt.split('-').reverse().join('/')}`}>🛈</button>                                    
                                    {v.lista_setorDaCompra === recoveredUsers.usuario.user_nomeUser && (
                                        <>
                                            <button className="col-1 p-1 btn btn-outline-dark" value={v.id} onClick={handleSumItem} data-placement="top" title='Adicionar item'>➕</button>
                                            <button className="col-1 p-1 btn btn-outline-dark" value={v.id} onClick={handleSubtraiItem} data-placement="top" title='Subtrair item'>➖</button>
                                            <button className="col-1 p-1 btn btn-outline-dark" value={v.id} onClick={handleDeleteItem} data-placement="top" title='Deletar item'>❌</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                        <p className="col-12 text-uppercase bg-dark m-2" style={{height: '10px', left: '.5rem', position: 'relative'}}></p>
                        <div className="d-flex justify-content-start pt-4">
                            <button onClick={handleAddItem} className="btn btn-outline-dark m-2" value='Papelaria'>Novo item</button>
                        </div>
                    </div>
                </div>
                <div className="col-8 m-2" style={botaoComprasStyle}>
                    <div className="row w-100 d-flex justify-content-center overflow-auto">
                        <p className="col-12 text-uppercase">
                            Compras Café:
                        </p>
                        <p className="col-12 text-uppercase bg-dark" style={{height: '10px', left: '.5rem', position: 'relative'}}></p>
                        <p className="col-4 text-uppercase">Item: </p>
                        <p className="col-8 text-uppercase">Quantidade: </p>
                        <p className="col-12 text-uppercase bg-dark" style={{height: '10px', left: '.5rem', position: 'relative'}}></p>
                        {dataFiltradoCafe.map(v => (
                            <div key={v.id}>
                                <div className="row w-100 d-flex justify-content-center">
                                    <p className="col-6">{v.lista_item}</p>
                                    <p className="col-2">{v.lista_quantidade}</p>
                                    <button className="col-1 p-1 btn btn-outline-dark" data-toggle="tooltip" data-placement="top" title={`Pedido por: ${v.lista_setorDaCompra}; Pedido feito em: ${v.createdAt.split('-').reverse().join('/')}`}>🛈</button>
                                    {v.lista_setorDaCompra === recoveredUsers.usuario.user_nomeUser && (
                                        <>
                                            <button className="col-1 p-1 btn btn-outline-dark" value={v.id} onClick={handleSumItem} data-placement="top" title='Adicionar item'>➕</button>
                                            <button className="col-1 p-1 btn btn-outline-dark" value={v.id} onClick={handleSubtraiItem} data-placement="top" title='Subtrair item'>➖</button>
                                            <button className="col-1 p-1 btn btn-outline-dark" value={v.id} onClick={handleDeleteItem} data-placement="top" title='Deletar item'>❌</button>                                        
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                        <p className="col-12 text-uppercase bg-dark m-2" style={{height: '10px', left: '.5rem', position: 'relative'}}></p>
                        <div className="d-flex justify-content-start pt-4">
                            <button onClick={handleAddItem} className="btn btn-outline-dark m-2" value='Cafe'>Novo item</button>
                        </div>
                    </div>
                </div>
            </div>
            <FormDialogAddCompras
                open={open}
                setOpen={setOpen}
                categoriaItem={categoria}
                usuario={nomeUser}
            />
        </div>
    )
}

export default ComprasExper;