import React, { useEffect, useState } from "react";

import api from './config/configApi';

function App() {  

  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');

  const getInfos = async () => { //FIXME FAZER FUNCIONAR A EXIBIÇÃO NO FRONT
    console.log(data)
    await api.get("/list-infos")
    .then((response) => {
      setData(response.data.representante_imagem)
      setUrl(response.data.url) 
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getImages();
  },[]); 

  const getImages = async () => {
    console.log(data)
    await api.get("/list-img")
    .then((response) => {
      setData(response.data.representante_imagem)
      setUrl(response.data.url) 
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getImages();
  },[]);  

  return (
    <div>
      <h1>Lista Equipamentos</h1>
      {data.map(representante_imagem =>(
        <div key={representante_imagem.id}>
          <img src={url + representante_imagem.representante_imagem} alt= {representante_imagem.id} width='20%'></img>
          <hr></hr>
        </div>
      ))}

    </div>
  );
}

export default App;
