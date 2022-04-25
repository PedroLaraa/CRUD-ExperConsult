// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState } from "react";

import api from '../../config/configApi';

import paragrafoStyle from "../css/paragrafo";

import formStyle from "../css/formStyle";

import inputStyle from "../css/inputStyle";

import imagemFornecStyle from "../css/imagem";

import containerStyle from "../css/container";

import FormDialog from "../../dialog/dialog";

// FUNÇÃO PARA CONSULTA DE DADOS DOS EQUIPAMENTOS

function FiltraFornecedores(){
    
    const [data, setData] = useState([]); // DEFINE O DATABASE
    const [url, setUrl] = useState(''); // DEFINE AS URL's

    const [fornecedor, setFornecedor] = useState('');
    const [pesquisarFornecedor, setPesquisarFornecedor] = useState('')

    const [open, setOpen] = React.useState(false);
    
    const getImagesFornec = async (req, res) => { // REQUISIÇÃO DAS IMAGENS
        await api.get('list-imgf')
        .then((response) =>{
        setData(response.data.fornec_foto)
        setUrl(response.data.url)
        }).catch((err) => {
        console.log(err)
        })
    }

    function handleFiltrar(e){
        e.preventDefault()
        setPesquisarFornecedor(fornecedor)
    }

    const busca = pesquisarFornecedor.toLowerCase()

    var dataFiltrado = data.filter(v => v.fornec_fornecedornome.toLowerCase().includes(busca))

    function handleClickEdit(){
        setOpen(true);
    }

    useEffect(() => { // INVOCA AS FUNÇÕES INDICADAS AO ENTRAR NO ENDEREÇO
        getImagesFornec()
    },[pesquisarFornecedor]);

    return (

        <div>
            <div style={{padding: '2rem'}}>
                <form style={formStyle} >
                    <input
                    style={inputStyle}
                    type='search'
                    placeholder="Fornecedor:"
                    onChange={(e) => setFornecedor(e.target.value)}
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
            {pesquisarFornecedor && ( 
                <div>
                    {dataFiltrado.map(value => (
                    <div key={value.id}>
                        <div style={containerStyle}>    
                            <div style={paragrafoStyle}>
                                <div>
                                    <img src={url + value.fornec_foto} alt={value.fornec_foto.id} style = {imagemFornecStyle} ></img>
                                </div>
                                <p>Nome do fornecedor: {value.fornec_fornecedornome + ''}</p>
                                <p>Tipo de fornecedor: {value.fornec_nivelfornecedor + ''}</p>
                                <p>Razão social: {value.fornec_razaosocial + ''}</p>
                                <p>Telefone: {value.fornec_telefone + ''}</p>
                                <p>Email: {value.fornec_email + ''}</p>
                                <p>Site: {value.fornec_site + ''}</p>
                                <button onClick={() => handleClickEdit()} >Editar...</button>
                                <FormDialog open={open} setOpen={setOpen} 
                                fornec_fornecedornome={value.fornec_fornecedornome}
                                fornec_nivelfornecedor={value.fornec_nivelfornecedor}
                                fornec_razaosocial={value.fornec_razaosocial}
                                fornec_telefone={value.fornec_telefone}
                                fornec_email={value.fornec_email}
                                fornec_site={value.fornec_site}
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
export default FiltraFornecedores;