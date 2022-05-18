// IMPORTA O REACR E REACT ROUTER DOOM

import React, { useContext, useEffect, useState } from "react";

import {BrowserRouter, Routes ,Route, Navigate} from 'react-router-dom';

// IMPORTA FUNÇÕES COM AS  ROTAS

import ConsultaFornecedores from './pages/ConsultaFornecedores';

import ConsultaRepresentante from './pages/ConsultaRepresentante';

import ConsultaEquipamentos from './pages/ConsultaEquipamentos';

import ConsultaClientes from "./pages/ConsultaClientes";

import DashBoard from "./pages/DashBoardHome";

import Setores from "./pages/DashBoardHome/setores";

import EditarFornecedor from "./pages/ConsultaFornecedores/fornecedoresEdit";

import EditarEquipamentos from "./pages/ConsultaEquipamentos/equipamentosEdit";

import EditarRepresentante from "./pages/ConsultaRepresentante/fornecedorEdit";

import EditarCliente from "./pages/ConsultaClientes/editClientes";

import Login from './pages/Login'

import { AuthProvider, AuthContext } from "./contexts/auth";

// CRIA AS ROTA DE NAVEGAÇÃO DE BROWSER

function Rotas(){

    const Private = ({children}) =>{

        const { authenticated,loading } = useContext(AuthContext);

        if(loading){
            return <div className="loading"> <h1> Carregando...</h1>.</div>
        }

        if(!authenticated){
            return <Navigate to="/login" />;
        }

        return children
    };

    return( // PATH = CAMINHO; ELEMENT = O QUE VAI SER RENDERIZADO;
        <BrowserRouter>
            <AuthProvider>
                <Routes> 
                    <Route path="/" element={<Private><DashBoard /></Private>} exact></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/representantes" element={<Private><ConsultaRepresentante /></Private>}></Route>
                    <Route path="/fornecedores" element={<Private><ConsultaFornecedores /></Private>} ></Route>
                    <Route path="/equipamentos" element={<Private><ConsultaEquipamentos /></Private>} ></Route>
                    <Route path="/clientes" element={<Private><ConsultaClientes /></Private>}></Route>
                    <Route path="/dashboard" element={<Private><DashBoard /></Private>}></Route>
                    <Route path="/edit-predio/:id" element={<Private><Setores /></Private>}></Route>
                    <Route path="/edit-fornecedor/:id" element={<Private><EditarFornecedor /></Private>}></Route>
                    <Route path="/edit-equipamento/:id" element={<Private><EditarEquipamentos /></Private>}></Route>
                    <Route path="/edit-representante/:id" element={<Private><EditarRepresentante /></Private>}></Route>
                    <Route path="/edit-cliente/:id" element={<Private><EditarCliente /></Private>}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
};

// EXPORTA AS ROTAS PARA USO NO App()
export default Rotas;