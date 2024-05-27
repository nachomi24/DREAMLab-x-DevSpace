import "./estilosHU0016_HU0017.css";
import Navbar from "../Navbar/Navbar";
import TarjetasT from "./componentes/TarjetasT/TarjetasT";
import TarjetasS from "./componentes/TarjetasS/TarjetasS";
import axios from "axios";
import React from 'react'
import './indexHU0016_HU0017.css'
import { useState, useEffect } from "react";

const apiURLT = "https://dreamlabapidev.azurewebsites.net/api/info_talleres";
const apiURLS = "https://dreamlabapidev.azurewebsites.net/api/salas";

function HU0016_HU0017() {
  const [talleres, setTalleres] = useState([]);
  const [salas, setSalas] = useState([]);
  const [activeMenu, setActiveMenu] = useState(0); // 0 for talleres, 1 for salas

  const obtenerTalleres = async () => {
    try {
      const response = await axios.get(apiURLT);
      setTalleres(response.data);
    } catch (error) {
      console.error("Error al obtener talleres:", error);
    }
  };

  const obtenerSalas = async () => {
    try {
      const response = await axios.get(apiURLS);
      setSalas(response.data);
    } catch (error) {
      console.error("Error al obtener salas:", error);
    }
  };

  

  useEffect(() => {
    if (activeMenu === 0) {
      obtenerTalleres();
    } else {
      obtenerSalas();
    }
  }, [activeMenu]);

  return (
    <>
      <Navbar />
      {activeMenu === 0 ? (
        <TarjetasT datos={talleres} onMenuClick={setActiveMenu} />
      ) : (
        <TarjetasS datos={salas} onMenuClick={setActiveMenu} />
      )}
      
    </>
  );
}

export default HU0016_HU0017;
