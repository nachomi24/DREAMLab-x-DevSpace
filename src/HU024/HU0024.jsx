import Navbar from "../HU022/Componentes/NavbarAdmin/Navbar.jsx";
import Tarjetas from "./Componentes/TarjetasVideo/TarjetasVideo.jsx";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./HU0024.css";
const apiURLPublicaciones =
  "https://dreamlabapidev.azurewebsites.net/api/publicaciones";

function HU024() {
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
    <div className="cuerpoHU0024">
      <Navbar />
      <Tarjetas datos={publicaciones} />
    </div>
  );
}

export default HU024;
