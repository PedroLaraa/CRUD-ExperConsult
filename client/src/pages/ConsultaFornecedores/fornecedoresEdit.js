
import React, { useEffect, useState } from "react";

import {useParams} from 'react-router-dom'

import api from '../../config/configApi';

import { useNavigate } from "react-router-dom";

function EditarFornecedor(){

    const {id} = useParams()

    const [fornecedor, setFornecedor] = useState([])

    const navigate = useNavigate();

    useEffect(() =>{
        api.get('list-imgf')
            .then((response) => {
                setFornecedor(response.data.fornec_foto)
            }).catch((err) => {
                console.log(err)
            })
    }, [id])

    const fornecedorFiltrado = fornecedor.filter(v => JSON.stringify(v.id).includes(id))

    const initialValue = {
        fornec_nivelfornecedor: '',
        fornec_razaosocial: '',
        fornec_telefone: '',
        fornec_email: '',
        fornec_site: '',
        id: id
    }

    const [values, setValues] = useState(initialValue)

    function handleChangeValues(ev){
        const {name, value} = ev.target

        setValues({...values, [name]: value})
    }

    function handleSubmit(){
        api.put('fornecedor-editado', values);
        alert('Editado com sucesso!');
        document.location.reload(true);
    };

    const handleDelete = () => {
        api.delete(`fornecedor-deletado/${id}`)
        alert('Deletado com sucesso!')
        navigate("/dashboard")
    };

    return(
        <div className="container position-relative">
            <div 
            className=" border background-color vh-100"
            style={{background: 'rgba(50,50,50,0.2)'}}
            >
                <div className="p-2 d-flex justify-content-center text-danger text-uppercase">
                    <h2>▶ É necessário re-inserir todos os dados: </h2>
                </div>
                {fornecedorFiltrado.map((v) =>(
                    <div key={v.id}>
                        <form className="p-2 ">
                        <h3 className="d-flex justify-content-center">▶ Nome do Fornecedor</h3>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input
                                disabled 
                                type="text" 
                                className="form-control w-50" 
                                name="fornec_fornecedornome" 
                                defaultValue={v.fornec_fornecedornome}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Nível</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <select 
                                type="text" 
                                className="form-control form-select w-50" 
                                name="fornec_nivelfornecedor" 
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                >
                                    <option>
                                        Selecione algum nível
                                    </option>
                                    <option value="Final">
                                        Final
                                    </option>
                                    <option value="Intermediário">
                                        Intermediário
                                    </option>
                                </select>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Razão Social</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="fornec_razaosocial" 
                                defaultValue={v.fornec_razaosocial}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Telefone</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="fornec_telefone" 
                                defaultValue={v.fornec_telefone}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Email</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="fornec_email" 
                                defaultValue={v.fornec_email}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <h4 className="d-flex justify-content-center">▶ Site</h4>
                            <div className="form-group pt-2 d-flex justify-content-center">
                                <input 
                                type="text" 
                                className="form-control w-50" 
                                name="fornec_site" 
                                defaultValue={v.fornec_site}
                                onChange={handleChangeValues}
                                onClick={handleChangeValues}
                                ></input>
                            </div>
                            <div className="pt-3 d-flex justify-content-around">
                                <button 
                                type="submit" 
                                onClick={handleSubmit}
                                className="btn btn-success"
                                >Salvar Fornecedor</button>
                                <button 
                                type="submit" 
                                onClick={handleDelete}
                                className="btn btn-outline-danger "
                                >Deletar Fornecedor</button>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default EditarFornecedor