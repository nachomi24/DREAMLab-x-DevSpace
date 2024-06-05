import Navbar from "../Navbar/Navbar.jsx";
import Tarjetas from "../HU026/Componentes/TarjetasTalleres.jsx";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../HU026/HU026.css";

const nominaProfesor = localStorage.getItem("matricula");

const apiURLPublicaciones =
  "https://dreamlabapidev.azurewebsites.net/api/info_talleres/" + nominaProfesor;

function HU026() {
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
    <div className="cuerpoHU0026">
      <Navbar />
      <Tarjetas datos={publicaciones} />
    </div>
  );
}

export default HU026;
