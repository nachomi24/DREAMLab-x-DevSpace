import React, { useState, useEffect } from "react";
import "./estiloNavbar.css";
import logo from "../assets/logo1.0.png";
import axios from "axios";

const Navbar = ({ loggedIn }) => {
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [Foto, setFoto] = useState("");
  const [Nombre, setNombre] = useState("");
  const [isPerfilMenuOpen, setIsPerfilMenuOpen] = useState(false);

  loggedIn = localStorage.getItem("isLoggedIn") === "true";
  const matricula = localStorage.getItem("matricula");

  const apiURLPerfilCarrera =
    "https://dreamlabapidev.azurewebsites.net/api/perfil/" + matricula;

  const obtencionFotoPerfil = async () => {
    try {
      // Realizar todas las solicitudes en paralelo utilizando Promise.all()
      const [perfilCarrera] = await Promise.all([
        axios.get(apiURLPerfilCarrera),
      ]);

      // Manejar la respuesta de perfilCarrera
      const { Foto, Nombre } = perfilCarrera.data;
      setFoto(Foto);
      setNombre(Nombre);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    obtencionFotoPerfil();
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePerfilMenu = () => {
    setIsPerfilMenuOpen(!isPerfilMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("matricula");
    localStorage.removeItem("threadID");
    window.location.href = "/reservar";
  };

  return (
    <header>
      <nav className={`container ${scrolling ? "scrolling" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Logo de D.R.E.A.M. Lab" />
          <h1 className="logo-title">D.R.E.A.M. LAB</h1>
        </div>
        <ul className="links">
          <li>
            <a href="/" className="mina-bold">
              INICIO
            </a>
          </li>
          <li>
            <a href="/reservar" className="mina-bold">
              RESERVAR
            </a>
          </li>
          <li>
            <a href="/secciones" className="mina-bold">
              ESPACIOS
            </a>
          </li>
        </ul>
        <div className="karen">
          <i
            className={
              isMenuOpen
                ? `bars-img-navbar-principal fa-solid fa-xmark`
                : `bars-img-navbar-principal fa-solid fa-bars`
            }
            onClick={toggleMenu}
          ></i>
          {loggedIn && (
            <div className="perfil-menu-container">
              <button className="perfil-button" onClick={togglePerfilMenu}>
                <img className="foto-perfil" src={Foto} alt={Nombre} />
              </button>
              {isPerfilMenuOpen && (
                <div className="perfil-dropdown-menu">
                  <a href="/perfil" className="mina-bold-2">
                    Perfil
                  </a>
                  <button
                    onClick={handleLogout}
                    className="mina-bold-2 logout-button"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
        <li>
          <a href="/" className="mina-bold-2">
            INICIO
          </a>
        </li>
        <li>
          <a href="/reservar" className="mina-bold-2">
            RESERVAR
          </a>
        </li>
        <li>
          <a href="/secciones" className="mina-bold-2">
            ESPACIOS
          </a>
        </li>
      </div>
    </header>
  );
};

export default Navbar;
