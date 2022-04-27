// CRIA A COMUNICAÇÃO COM O BACK-END PARA CONSUMIR DADOS

import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.10.172:1212/"
});