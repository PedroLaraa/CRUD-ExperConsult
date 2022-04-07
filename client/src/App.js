import React, { useEffect, useState } from "react";

import api from './config/configApi';

function App() {  

  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');

  api.get('/equipamentos').then()

  const getImages = async () => {
    console.log(data)
    await api.get("/list-img")
    .then((response) => {
      setData(response.data.desceqp_imagem)
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
      {data.map(desceqp_imagem =>(
        <div key={desceqp_imagem.id}>
          <img src={url + desceqp_imagem.desceqp_imagem} alt= {desceqp_imagem.id} width='20%'></img>
          <hr></hr>
        </div>
      ))}

    </div>
  );
}

export default App;
