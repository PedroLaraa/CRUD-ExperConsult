
import React, { useEffect, useState } from "react";

import { useContext } from "react";

import { AuthContext } from "../../src/contexts/auth";

function handleLogoutUser(e) {

    const { logout } = useContext(AuthContext);
    
    function logoutUser(){
        console.log('Opa')
    }
    
    var el = document.querySelector("logoutBtn");

    el.addEventListener("click", logoutUser)

    console.log('OPa')
}

//FIXME FUNÇÃO NÃO ACESSA O BOTÃO