import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Login from "./componentes/Login/Login";
import "./HU021.css";
import "../global.css";

const HU004 = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [matricula, setMatricula] = useState(""); // Estado de la matrícula

  console.log(matricula);

  return (
    <div className="cuerpoHU004">
      <Navbar loggedIn={loggedIn} />
      <Login setLoggedIn={setLoggedIn} setMatricula={setMatricula} />
    </div>
  );
};

export default HU004;
