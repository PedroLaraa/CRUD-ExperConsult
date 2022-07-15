// IMPORTA FUNÇÕES, API's, E O REACT

import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import api from '../../config/configApi';

function User() {

    // REALIZA O LOGOUT DO USUÁRIO

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    const [passwordShow, setPasswordShow] = useState(false);

    const [passwordShow2, setPasswordShow2] = useState(false);

    const [user, setUser] = useState([]);
    const [url, setUrl] = useState('');

    const [recoveredUsers, setRecoveredUsers] = useState('');

    const getUser = async (req, res) => {
        api.get('/list-infosUser')
            .then((response) => {
                setUser(response.data.value);
                setUrl(response.data.url);
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {

        setRecoveredUsers(JSON.parse(localStorage.getItem('user'))); // RECUPERA OS DADOS DO USUÁRIO LOGADO

    }, []);

    const userAtual = user.filter(v => v.id == recoveredUsers.usuario.id); // FILTRA OS DADOS DO USUÁRIO LOGADO

    const passwordShowHandler = () => {
        setPasswordShow(!passwordShow);
    };

    const passwordShowHandler2 = () => {
        setPasswordShow2(!passwordShow2);
    };

    const idUser = userAtual.map(v => v.id);

    let initialValue

    if (userAtual.length > 0) {
        initialValue = {
            id: idUser,
            user_senha: userAtual[0].user_senha,
            user_emailPessoal: userAtual[0].user_emailPessoal,
        };
    };

    const valoresIniciais = initialValue;

    const [values, setValues] = useState();

    if (values == undefined && valoresIniciais != undefined) {
        setValues(valoresIniciais)
    };

    function handleChangeValues(ev) {

        const { name, value } = ev.target;

        setValues({ ...values, [name]: value });
    };

    function handleSubmit() {
        api.put('user-editado', values);

        alert('SEUS DADOS FORAM EDITADOS COM SUCESSO!');

        document.location.reload(true);
    };

    return (
        <div>
            {userAtual.map(v => (
                <div>
                    <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                        <div className="p-2 col-1 mb-3">
                            <img className="border border-dark rounded-circle" src={url + v.user_foto} style={{ width: '6rem' }}></img>
                        </div>
                    </div>
                    <form
                        className="was-validated"
                        id="formulario"
                        onSubmit={(e) => alert('SEUS DADOS FORAM EDITADOS COM SUCESSO!!!')}
                    >
                        <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                            <div className="p-2 col-4 mb-3">
                                <label htmlFor="customControlValidation1">Nome:</label>
                                <input
                                    className="form-control "
                                    id="validationInput"
                                    name="clientes_razaosocial"
                                    disabled
                                    defaultValue={v.user_nome}
                                ></input>
                            </div>
                            <div className="p-2 col-4 mb-3">
                                <label htmlFor="customControlValidation1">User (login):</label>
                                <input
                                    className="form-control"
                                    id="validationInput"
                                    name="clientes_razaosocial"
                                    disabled
                                    defaultValue={v.user_nomeUser}
                                ></input>
                            </div>
                        </div>
                        <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                            <div className="p-2 col-4 mb-3">
                                <label htmlFor="customControlValidation1">Cargo:</label>
                                <input
                                    className="form-control "
                                    id="validationInput"
                                    name="clientes_razaosocial"
                                    disabled
                                    defaultValue={v.user_cargo}
                                ></input>
                            </div>
                            <div className="p-2 col-4 mb-3">
                                <label htmlFor="customControlValidation1">Email (Exper):</label>
                                <input
                                    className="form-control"
                                    id="validationInput"
                                    name="clientes_razaosocial"
                                    disabled
                                    defaultValue={v.user_email}
                                ></input>
                            </div>
                        </div>
                        <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                            <div className="p-2 col-4 mb-3">
                                <label htmlFor="customControlValidation1">CPF:</label>
                                <input
                                    className="form-control "
                                    id="validationInput"
                                    name="clientes_razaosocial"
                                    disabled
                                    defaultValue={v.user_cpf}
                                ></input>
                            </div>
                            <div className="p-2 col-4 mb-3">
                                <label htmlFor="customControlValidation1">Email (pessoal):</label>
                                <input
                                    className="form-control"
                                    id="validationInput"
                                    defaultValue={v.user_emailPessoal}
                                    name="user_emailPessoal"
                                    onChange={handleChangeValues}
                                ></input>
                            </div>
                        </div>
                        <div className="w-100 m-0 row d-flex flex-row justify-content-around">
                            <div className="p-2 col-4 mb-3">
                                <label htmlFor="customControlValidation1">Alterar Senha:</label>
                                <input
                                    className="form-control"
                                    id="validationInput"
                                    maxLength={12}
                                    name="user_senha"
                                    type={passwordShow2 ? "text" : "password"}
                                    onChange={handleChangeValues}
                                ></input>
                                <p onClick={passwordShowHandler2}>👀</p>
                            </div>
                        </div>
                        <div className=" row d-flex flex-row justify-content-around">
                            <div className="mb-3 col-md-1 p-2">
                                <button
                                    className="btn btn-success"
                                    type="submit"
                                    onClick={handleSubmit}
                                >SALVAR DADOS
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ))}
        </div>
    )

}

export default User;