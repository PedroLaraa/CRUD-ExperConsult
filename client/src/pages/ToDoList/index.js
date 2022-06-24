import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import { handleAlterImage } from "../components/function/recuperaUserImg";

import api from '../../config/configApi';

function ToDoList(){

    const { logout } = useContext(AuthContext);

    const element = document.getElementById('logoutBtn');

    element.addEventListener('click', logout, false);

    useEffect(() => {
        handleAlterImage();
    }, []);

    const [tasks, setTasks] = useState([]);

    const getInfosToDo = async () => {
        api.get('listTodo-infos')
        .then(response => {
            setTasks(response.data.value);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getInfosToDo();
    }, []);

    return(

        <div>
            <h1>ToDoList</h1>
        </div>

    )

}

// todo_list

export default ToDoList;
