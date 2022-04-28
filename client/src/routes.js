// IMPORTA O REACR E REACT ROUTER DOOM

import React from "react";

import {BrowserRouter, Routes ,Route} from 'react-router-dom';

// IMPORTA FUNÇÕES COM AS 

import ConsultaFornecedores from './pages/ConsultaFornecedores';
import ConsultaRepresentante from './pages/ConsultaRepresentante';
import ConsultaEquipamentos from './pages/ConsultaEquipamentos';
import ConsultaClientes from "./pages/ConsultaClientes";

// CRIA AS ROTA DE NAVEGAÇÃO DE BROWSER

function Rotas(){
    return( // PATH = CAMINHO; ELEMENT = O QUE VAI SER RENDERIZADO;
        <BrowserRouter>
            <Routes> 
                <Route path="/representantes" element={<ConsultaRepresentante />} exact ></Route>
                <Route path="/fornecedores" element={<ConsultaFornecedores />} ></Route>
                <Route path="/equipamentos" element={<ConsultaEquipamentos />} ></Route>
                <Route path="/clientes" element={<ConsultaClientes />}></Route>
            </Routes>
        </BrowserRouter>
    )
};

// EXPORTA AS ROTAS PARA USO NO App()
export default Rotas;