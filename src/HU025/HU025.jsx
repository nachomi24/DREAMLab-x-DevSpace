import Menu from '../Navbar/Navbar'
import ReservationForm from './componentes/ReservationForm';

import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client'
import './HU025.css'
import "../global.css";

const apiSALAS = "https://dreamlabapidev.azurewebsites.net/api/salas";
const HU025 = () => {
  const [salas, setSalas] = useState([]);

  const obtenerSalas = async () => {
    try {
      const response = await axios.get(apiSALAS);
      setSalas(response.data);
    } catch (error) {
      console.error("Error al obtener salas:", error);
    }
  };

  useEffect(()=>{
    obtenerSalas();
  });

  return (
    <div className="App-HU025 cuerpoHU025" > 
        <Menu />
        <ReservationForm datos={salas} />
    </div>
  );
};

export default HU025;