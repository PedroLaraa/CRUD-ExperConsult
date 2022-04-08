import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import ConsultaFornecedores from './pages/ConsultaFornecedores';
import ConsultaRepresentante from './pages/ConsultaRepresentante';
import ConsultaEquipamentos from './pages/ConsultaEquipamentos';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/fornecedores" component={ConsultaFornecedores} />
                <Route path="/representantes" component={ConsultaRepresentante} />
                <Route path="/equipamentos" component={ConsultaEquipamentos} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;