import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Chat from "./componentes/chat/chat";
import ChatProfesor from "./componentes/chat/chatProfesor";
import Bot from "./componentes/dreamy/dreamy";
import React from "react";
import "./HU004.css";
import "../global.css";
import dreamy from "../assets/dreamy.png";
import dreamyBuscador from "../assets/dreamy_buscador.png";
import dreamyCelular from "../assets/dreamy_celular.png";
import dreamyFeliz from "../assets/dreamy_feliz.png";

const HU004 = () => {
  const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [currentImage, setCurrentImage] = useState(dreamy); // Estado de la imagen de Dreamy
  const userType = localStorage.getItem("userType");

  return (
    <div className="cuerpoHU004">
      <Navbar loggedIn={loggedIn} />
      <Bot currentImage={currentImage} />
      {userType === "alumno" ? (
        <Chat
          setCurrentImage={setCurrentImage} // Pasar la función de cambio de imagen a Chat
          images={{ dreamy, dreamyBuscador, dreamyCelular, dreamyFeliz }} // Pasar las imágenes
        />
      ) : (
        <ChatProfesor
          setCurrentImage={setCurrentImage} // Pasar la función de cambio de imagen a Chat
          images={{ dreamy, dreamyBuscador, dreamyCelular, dreamyFeliz }} // Pasar las imágenes
        />
      )}
    </div>
  );
};

export default HU004;
