import Navbar from '../../src/HU022/Componentes/NavbarAdmin/Navbar.jsx';
import Tarjetas from '../HU024/Componentes/TarjetasVideo/TarjetasVideo.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const apiURLPublicaciones = "https://dreamlabapidev.azurewebsites.net/api/publicaciones";

function App() {
  const [publicaciones, setPublicaciones] = useState([]);

  const obtenerPublicaciones = async () => {
    try {
      const response = await axios.get(apiURLPublicaciones);
      console.log("Datos recibidos:", response.data);
      setPublicaciones(response.data);
    } catch (error) {
      console.error("Error al obtener los datos de las publicaciones", error);
    }
  };

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  return (
    <div>
      <Navbar />
      <Tarjetas datos={publicaciones} />
    </div>
  );
}

export default App;
