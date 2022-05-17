// IMPORTA O REACR E REACT ROUTER DOOM

import React from "react";

import {BrowserRouter, Routes ,Route} from 'react-router-dom';

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

// CRIA AS ROTA DE NAVEGAÇÃO DE BROWSER

function Rotas(){
    return( // PATH = CAMINHO; ELEMENT = O QUE VAI SER RENDERIZADO;
        <BrowserRouter>
            <Routes> 
                <Route path="/" element={<DashBoard />} exact></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/representantes" element={<ConsultaRepresentante />}></Route>
                <Route path="/fornecedores" element={<ConsultaFornecedores />} ></Route>
                <Route path="/equipamentos" element={<ConsultaEquipamentos />} ></Route>
                <Route path="/clientes" element={<ConsultaClientes />}></Route>
                <Route path="/dashboard" element={<DashBoard />}></Route>
                <Route path="/edit-predio/:id" element={<Setores />}></Route>
                <Route path="/edit-fornecedor/:id" element={<EditarFornecedor />}></Route>
                <Route path="/edit-equipamento/:id" element={<EditarEquipamentos />}></Route>
                <Route path="/edit-representante/:id" element={<EditarRepresentante />}></Route>
                <Route path="/edit-cliente/:id" element={<EditarCliente />}></Route>
            </Routes>
        </BrowserRouter>
    )
};

// EXPORTA AS ROTAS PARA USO NO App()
export default Rotas;