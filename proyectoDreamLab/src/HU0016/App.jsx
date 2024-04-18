import './App.css'
import Navbar from '../Navbar/Navbar';
import Tarjetas from './componentes/TarjetasT/TarjetasT'; 
import foto1 from '../assets/iaia.png';
import foto2 from '../assets/itit.png';
import foto3 from '../assets/vrvr.png';
import foto4 from '../assets/construye.png';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
const apiURL = "https://devspaceapi.azurewebsites.net/api/talleres";


/*const datosEjemplo = [
  {
    id: 1,
    imagen: foto1,
    nombre: 'Taller IA',
    ubicacion: 'Dimension Forge',
    hora: '10:00 AM',
  },
  {
    id: 2,
    imagen: foto2,
    nombre: 'Desarrolla IT',
    ubicacion: 'Electric Garage',
    hora: '2:30 PM',
  },
  {
    id: 3,
    imagen: foto3,
    nombre: 'Experiencia VR',
    ubicacion: 'Beyond Digits',
    hora: '5:30 PM',
  },
  {
    id: 4,
    imagen: foto4,
    nombre: 'ConstruyeTec',
    ubicacion: 'The Matrix Digital',
    hora: '7:00 PM',
  }
];
*/

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
