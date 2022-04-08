import React from "react";

import {BrowserRouter, Routes ,Route} from 'react-router-dom';

import ConsultaFornecedores from './pages/ConsultaFornecedores';
import ConsultaRepresentante from './pages/ConsultaRepresentante';
import ConsultaEquipamentos from './pages/ConsultaEquipamentos';

function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/representantes" element={<ConsultaRepresentante/>} exact ></Route>
                <Route path="/fornecedores" element={<ConsultaFornecedores/>} ></Route>
                <Route path="/equipamentos" element={<ConsultaEquipamentos/>} ></Route>
            </Routes>
        </BrowserRouter>
    )
};

export default Rotas;