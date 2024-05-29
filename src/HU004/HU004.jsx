import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Chat from "./componentes/chat/chat";
import Bot from "./componentes/dreamy/dreamy";
import React from "react";
import "./HU004.css";
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
      <Bot />
      <Chat setLoggedIn={setLoggedIn} setMatricula={setMatricula} />
    </div>
  );
};

export default HU004;
