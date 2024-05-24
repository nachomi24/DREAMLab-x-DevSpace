import React, { useState } from "react";
import "./Header.css";
import adperfil from "../../../assets/adperfil.png";

const Header = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Usuario:", usuario);
    console.log("Contraseña:", contrasena);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Matricula: usuario, Contrasena: contrasena }),
    };

    try {
      console.log("Enviando solicitud al servidor...");
      const response = await fetch(
        "https://dreamlabapidev.azurewebsites.net/api/loginNormal",
        requestOptions
      );
      console.log("Solicitud enviada, esperando respuesta...");

      const data = await response.json();

      console.log("Respuesta recibida:", data);

      if (!response.ok) {
        setError(data.error || "Error en el inicio de sesión");
      } else {
        // Redirigir al usuario a la página de reservar
        window.location.href = "/reservar";
        onLoginSuccess(); // Notificar al componente padre que el login fue exitoso
      }
    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
      setError("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="Header">
      <div className="Header-content">
        <div className="Header-text">
          <h1>INICIA SESIÓN</h1>
          <img src={adperfil} className="botonnav" alt="adperfil" />
          <div className="text-container">
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
              <button type="submit" className="boton3">
                Continuar
              </button>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
