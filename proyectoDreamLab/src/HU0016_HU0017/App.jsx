import './App.css'
import Navbar from '../Navbar/Navbar';
import Tarjetas from './componentes/TarjetasT/TarjetasT'; 
import foto1 from '../assets/iaia.png';
import foto2 from '../assets/itit.png';
import foto3 from '../assets/vrvr.png';
import foto4 from '../assets/construye.png';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
const apiURL = "https://devspaceapi.azurewebsites.net/api/info_talleres";

function App() {
  const [talleres, setTalleres] = useState([]);

  const obtenerTalleres = async () => {
    try {
      const response = await axios.get(apiURL);
      setTalleres(response.data);
    } catch (error) {
      console.error('Error al obtener talleres:', error);
    }
  };

  console.log(talleres);

  useEffect(() => {
    obtenerTalleres();
  }, []);

  return (  

    <>
      <Navbar />
          <Tarjetas datos={talleres}/>
    </>
  );
}

export default App;
