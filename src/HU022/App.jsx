
import Navbar from '../Navbar/Navbar.jsx'
import Tarjetas from './Componentes/TarjetasA/TarjetasA.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
const apiURLADMINR = "https://devspaceapi2.azurewebsites.net/api/info_reservaciones";



function App () {

  const  [reservaciones, setReservaciones] = useState([]);

  const obtenerReservaciones = async () => {
    try{
      const response = await axios.get(apiURLADMINR);
      console.log("Datos recibidos:", response.data); // Registro de los datos recibidos
      setReservaciones(response.data);
    } catch (error){
      console.error("Error al obtener los datos de la reserva admin", error);

    }

  };

  useEffect(() => {
    obtenerReservaciones();
}, []);

    return (
      <div>
        <Navbar />
        <Tarjetas datos={reservaciones}/>
      </div>
    );
  }
  

export default App;
