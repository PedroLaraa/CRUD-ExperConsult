import React, { useEffect, useState } from "react";
import { Routes } from "react-router-dom";

import api from './config/configApi';

function App() {

  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');
  const [listInfosRep, setListInfosRep] = useState([]);
  

  const getImages = async (res, req) => {
    await api.get("list-img")
    .then((response) => {
      setData(response.data.representante_imagem)
      setUrl(response.data.url) 
    }).catch((err) => {
      console.log(err);
    })
  }

  console.log(listInfosRep)

  const getInfos = async (res, req) => {
    await api.get('list-infos')
    .then((response) => {
      setListInfosRep(response.data);
    }).catch((err) => {
      console.log(err);
    })
    await api.get('list-img')
    .then((response) => {
      setUrl(response.data.url)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getImages()
    getInfos()
  },[]);  

  return (

    <div>
      <Routes />
    </div>
  );
}

export default App;
