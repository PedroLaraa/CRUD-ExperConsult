// CRIA A COMUNICAÇÃO COM O BACK-END PARA CONSUMIR DADOS

import axios from "axios";

export default axios.create({
    baseURL: "http://expertestes:1212/"
});