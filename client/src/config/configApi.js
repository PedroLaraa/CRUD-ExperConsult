// CRIA A COMUNICAÇÃO COM O BACK-END PARA CONSUMIR DADOS

import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:1212/"
});