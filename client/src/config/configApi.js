// CRIA A COMUNICAÇÃO COM O BACK-END PARA CONSUMIR DADOS

import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.10.127:1212/" // FIXME TO IP SERVER
});

export const api = axios.create({
    baseURL:"http://192.168.10.127:1212/" // FIXME TO IP SERVER
});

export const createSession = async (usuario, senha) => {
    return api.post('/login-auth', { usuario, senha });
}