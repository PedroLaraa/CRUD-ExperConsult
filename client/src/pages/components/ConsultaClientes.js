// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import imagemEqpStyle from "../css/imagemEqp";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import containerStyle from "../css/container";

import FormDialog from "../../dialog/ClientesDialog";

import botaoStyle from "../css/botaoEdit";


// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraClientes() {

    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const [clientes, setClientes] = useState('');
    const [pesquisarCliente, setPesquisarCliente] = useState('')

    const [open, setOpen] = React.useState(false);

    const getInfosCliente = async (res, req) => { // REQUISIÇÃO DAS IMAGENS
        await api.get("list-infosClientes")
            .then((response) => {
                setData(response.data.clientes_logo);
                setUrl(response.data.url);
            }).catch((err) => {
                console.log(err);
            })
    }

    function handleClickEdit() {
        setOpen(true);
    }

    function handleFiltrar(e) {
        e.preventDefault();
        setPesquisarCliente(clientes);
    }

    const busca = pesquisarCliente.toLowerCase();

    var dataFiltrado = data.filter(v => v.clientes_razaosocial.toLowerCase().includes(busca));

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getInfosCliente()
    }, [pesquisarCliente]);

    return (

        <div>
            <div style={{ padding: '2rem' }}>
                <form style={formStyle} >
                    <input
                        style={inputStyle}
                        type='search'
                        placeholder="Cliente:"
                        onChange={(e) => setClientes(e.target.value)}
                    >
                    </input>
                    <button
                        style={inputStyle}
                        type="submit"
                        onClick={handleFiltrar}
                    >
                        Filtrar...
                    </button>
                </form>
            </div>
            {pesquisarCliente && (
                <div>
                    {dataFiltrado.map(value => (
                        <div key={value.id}>
                            <div style={containerStyle}>
                                <div style={paragrafoStyle}>
                                    <div >
                                        <img src={url + value.clientes_logo} alt={value.clientes_logo.id} style={imagemEqpStyle}></img>
                                    </div>
                                    <p>Razão social: {value.clientes_razaosocial} </p>
                                    <p>Nome fantasia: {value.clientes_nomefantasia + ''}</p>
                                    <p>Apelido: {value.clientes_apelido + ''}</p>
                                    <p>CNPJ: {value.clientes_cnpj + ''}</p>
                                    <p>Endereço: {value.clientes_endereco + ''}</p>
                                    <p>IE: {value.clientes_ie + ''}</p>
                                    <p>Responsável: {value.clientes_nomeResponsavel + ''}</p>
                                    <p>Telefone (Respoonsável): {value.clientes_telefone + ''}</p>
                                    <p>Email (Responsável): {value.clientes_email + ''}</p>
                                    <p>Premissas de projeto: {value.clientes_premissasDeProjeto + ''}</p>
                                    <button onClick={() => handleClickEdit()} >Editar...</button>
                                    <FormDialog open={open} setOpen={setOpen}
                                        clientes_razaosocial={value.clientes_razaosocial}
                                        clientes_nomefantasia={value.clientes_nomefantasia}
                                        clientes_apelido={value.clientes_apelido}
                                        clientes_cnpj={value.clientes_cnpj}
                                        clientes_endereco={value.clientes_endereco}
                                        clientes_premissasDeProjeto={value.clientes_premissasDeProjeto}
                                        clientes_ie={value.clientes_ie}
                                        clientes_nomeResponsavel={value.clientes_nomeResponsavel}
                                        clientes_telefone={value.clientes_telefone}
                                        clientes_email={value.clientes_email}
                                        data={value.data}
                                        setData={value.setData}
                                        id={value.id}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// EXPORTA A FUNÇÃO PARA USO NAS ROTAS
export default FiltraClientes;