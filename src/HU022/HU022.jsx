import Navbar from './Componentes/NavbarAdmin/Navbar.jsx';
import Tarjetas from './Componentes/TarjetasA/TarjetasA.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./HU022.css";
import "../global.css";


const apiURLADMINR = "https://dreamlabapidev.azurewebsites.net/api/info_reservaciones";

function HU022() {
  const [reservaciones, setReservaciones] = useState([]);

  const obtenerReservaciones = async () => {
    try {
      const response = await axios.get(apiURLADMINR);
      console.log("Datos recibidos:", response.data);
      setReservaciones(response.data);
    } catch (error) {
      console.error("Error al obtener los datos de la reserva admin", error);
    }
  };

  useEffect(() => {
    obtenerReservaciones();
  }, []);

  const actualizarReservaciones = (id) => {
    setReservaciones(prevReservaciones => prevReservaciones.filter(reserva => reserva.ReservacionID !== id));
  };

  return (
    <div className='cuerpoHU022'>
      <Navbar />
      <Tarjetas datos={reservaciones} actualizarReservaciones={actualizarReservaciones} />
    </div>
  );
}

export default HU022;
