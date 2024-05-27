import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Chat from "./componentes/chat/chat";
import Bot from "./componentes/dreamy/dreamy";
import React from 'react'
import './indexHU004.css'

const HU004 = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [matricula, setMatricula] = useState(""); // Estado de la matrícula

  console.log(matricula);

  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <Bot />
      <Chat setLoggedIn={setLoggedIn} setMatricula={setMatricula} />
    </div>
  );
};

export default HU004;
