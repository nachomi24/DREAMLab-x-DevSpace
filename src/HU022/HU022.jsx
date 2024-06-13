import Navbar from "./Componentes/NavbarAdmin/Navbar.jsx";
import Tarjetas from "./Componentes/TarjetasA/TarjetasA.jsx";
import React from "react";
import "./HU022.css";
import "../global.css";

const apiURLADMINREstudiante =
  "https://dreamlabapidev.azurewebsites.net/api/info_reservaciones_estudiante";
const apiURLADMINRProfesor =
  "https://dreamlabapidev.azurewebsites.net/api/info_reservaciones_profesor";

function HU022() {
  return (
    <div className="cuerpoHU022">
      <Navbar />
      <Tarjetas
        apiURLADMINREstudiante={apiURLADMINREstudiante}
        apiURLADMINRProfesor={apiURLADMINRProfesor}
      />
    </div>
  );
}

export default HU022;
