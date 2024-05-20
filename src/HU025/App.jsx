import React from 'react';
import Menu from '../Navbar/Navbar'
import ReservationForm from './componentes/ReservationForm';
import axios from "axios";
import { useState, useEffect } from "react";

const apiSALAS = "https://devspaceapi2.azurewebsites.net/api/salas";
const App = () => {
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
    <div className="App">
        <Menu />
        <ReservationForm datos={salas} />
    </div>
  );
};

export default App;