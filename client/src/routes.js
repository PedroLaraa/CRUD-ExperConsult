// IMPORTA O REACR E REACT ROUTER DOOM

import React from "react";

import {BrowserRouter, Routes ,Route} from 'react-router-dom';

// IMPORTA FUNÇÕES COM AS  ROTAS

import ConsultaFornecedores from './pages/ConsultaFornecedores';

import ConsultaRepresentante from './pages/ConsultaRepresentante';

import ConsultaEquipamentos from './pages/ConsultaEquipamentos';

import ConsultaClientes from "./pages/ConsultaClientes";

import DashBoard from "./pages/DashBoardHome";

import Eventos from "./pages/DashBoardHome/eventos";

// CRIA AS ROTA DE NAVEGAÇÃO DE BROWSER

function Rotas(){
    return( // PATH = CAMINHO; ELEMENT = O QUE VAI SER RENDERIZADO;
        <BrowserRouter>
            <Routes> 
                <Route path="/representantes" element={<ConsultaRepresentante />} exact ></Route>
                <Route path="/" element={<DashBoard />}></Route>
                <Route path="/fornecedores" element={<ConsultaFornecedores />} ></Route>
                <Route path="/equipamentos" element={<ConsultaEquipamentos />} ></Route>
                <Route path="/clientes" element={<ConsultaClientes />}></Route>
                <Route path="/dashboard" element={<DashBoard />}></Route>
                <Route path="/edit-evento/:id" element={<Eventos />}></Route>
            </Routes>
        </BrowserRouter>
    )
};

// EXPORTA AS ROTAS PARA USO NO App()
export default Rotas;