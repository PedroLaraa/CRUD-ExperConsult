// IMPORTA O REACR E REACT ROUTER DOOM

import React, { useContext, useEffect, useState } from "react";

import {BrowserRouter, Routes ,Route, Navigate} from 'react-router-dom';

// IMPORTA FUNÇÕES COM AS  ROTAS E OS DEVIDOS ARQUIVOS PARA O SISTEMA

import ConsultaFornecedores from './pages/ConsultaFornecedores';

import ConsultaRepresentante from './pages/ConsultaRepresentante';

import ConsultaEquipamentos from './pages/ConsultaEquipamentos';

import ConsultaClientes from "./pages/ConsultaClientes";

import ConsultaObras from "./pages/ConsultaObras";

import DashBoard from "./pages/DashBoardHome";

import Setores from "./pages/DashBoardHome/setores";

import EditarFornecedor from "./pages/ConsultaFornecedores/fornecedoresEdit";

import EditarEquipamentos from "./pages/ConsultaEquipamentos/equipamentosEdit";

import EditarRepresentante from "./pages/ConsultaRepresentante/fornecedorEdit";

import EditarCliente from "./pages/ConsultaClientes/editClientes";

import EditarObra from "./pages/ConsultaObras/editObras";

import FormClientes from "./pages/FormCadastroClientes.js";

import FormFornecedores from "./pages/FormCadastroFornecedor";

import FormEquipamentos from "./pages/FormCadastroEquipamentos";

import FormRepresentante from "./pages/FormCadastroRepresentante";

import FormUsuario from "./pages/CadastroUsuarios";

import SuporteSistema from "./pages/SuporteSistema";

import Login from './pages/Login'

import NotificacoesUser from "./pages/NotificacoesUser";

import NotificacoesSetores from "./pages/NotificacoesSetores";

import CadastroObra from "./pages/CadastroObra";

import ComprasExper from "./pages/ComprasExper";

import ToDoList from "./pages/ToDoList";

import AtasDeReuniao from "./pages/AtasDeReunião";

import { AuthProvider, AuthContext } from "./contexts/auth";

// CRIA AS ROTA DE NAVEGAÇÃO DE BROWSER

function Rotas(){

    const [permissoes, setPermissoes] = useState([]);

    useEffect(() => {
        setPermissoes(JSON.parse(localStorage.getItem('user')))
    }, [])

    const notificacoesDeveloper = document.getElementById('notificacoesBtn');

    const Public =({children}) => {

        const navbar = document.getElementById('navbarOculta');

        navbar.style.display = 'none';

        return children;

    }

    const Private = ({children}) =>{

        const { authenticated, loading } = useContext(AuthContext);

        if(loading){

            return <div className="loading"> <h1> Carregando...</h1></div>

        }

        if(!authenticated){

            return alert("Você não está autenticado, faça login para continuar"), <Navigate to="/login" />

        }

        if( authenticated && permissoes.usuario.user_permissoes === 1){

            notificacoesDeveloper.setAttribute('href', '/notificacoes-developer')

            return children

        }

        if( authenticated && permissoes.usuario.user_permissoes === 3){

            document.getElementById('usuariosBtn').style.display = 'none';

            notificacoesDeveloper.removeAttribute('href');

            return children
        }

        if( authenticated && permissoes.usuario.user_permissoes === 2){

            notificacoesDeveloper.removeAttribute('href');

            return children
        }

        return children

    };

    const PrivatePermsDeveloper = ({children}) =>{

        const { authenticated, loading } = useContext(AuthContext);

        if(loading){
            return <div className="loading"> <h1> Carregando...</h1>.</div>
        };

        if(!authenticated){
            return alert("Você não tem permissão para acessar essa rota!"), <Navigate to="/login" />;
        };

        if(authenticated && permissoes.usuario.user_permissoes === 1){
            return children;
        }
        else {
            const btnUsers = document.getElementById('usuariosBtn').style.display = 'none';
            return alert("Você não tem permissão para acessar essa rota!"), <Navigate to="/dashboard" />;
        };
    };

    const PrivatePermsSupervisor = ({children}) => {

        const { authenticated, loading } = useContext(AuthContext);

        if(loading){
            return <div className="loading"> <h1> Carregando...</h1></div>;
        };

        if(!authenticated){
            return alert("Você não tem permissão para acessar essa rota!"), <Navigate to="/login" />;
        };

        if(authenticated && permissoes.usuario.user_permissoes === 1){
            return children;
        };

        if(authenticated && permissoes.usuario.user_permissoes === 2){
            return children;
        }else{
            return alert("Você não tem permissão para acessar essa rota!"), <Navigate to="/dashboard" />;
        };

    };

    return( // PATH = ROTA; ELEMENT = O QUE VAI SER RENDERIZADO;
        <BrowserRouter>
            <AuthProvider>
                <Routes> 
                    <Route path="/" element={<Private><DashBoard /></Private>} exact></Route>
                    <Route path="/login" element={<Public><Login/></Public>}></Route>
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
                    <Route path="/edit-obra/:id" element={<Private><EditarObra /></Private>}></Route>
                    <Route path="/cadastro-clientes" element={<Private><FormClientes /></Private>}></Route>
                    <Route path="/cadastro-fornecedores" element={<Private><FormFornecedores /></Private>}></Route>
                    <Route path="/cadastro-equipamentos" element={<Private><FormEquipamentos /></Private>}></Route>
                    <Route path="/cadastro-representante" element={<Private><FormRepresentante /></Private>}></Route>
                    <Route path="/cadastro-usuario" element={<PrivatePermsSupervisor><FormUsuario /></PrivatePermsSupervisor>}></Route>
                    <Route path="/suporte" element={<Private><SuporteSistema /></Private>}></Route>
                    <Route path="/notificacoes-developer" element={<PrivatePermsDeveloper><NotificacoesUser /></PrivatePermsDeveloper>}></Route>
                    <Route path="/notificacoes-setores" element={<Private><NotificacoesSetores /></Private>}></Route>
                    <Route path="/cadastro-obra" element={<Private><CadastroObra /></Private>}></Route>
                    <Route path="/compras-exper" element={<Private><ComprasExper /></Private>}></Route>
                    <Route path="/atas-de-reuniao" element={<Private><AtasDeReuniao /></Private>}></Route>
                    <Route path="/todo-list" element={<Private><ToDoList /></Private>}></Route>
                    <Route path="/obras" element={<Private><ConsultaObras /></Private>}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
};

// EXPORTA AS ROTAS PARA USO NO App()
export default Rotas;