import React, { useState, useEffect } from "react";
import "./estiloNavbar.css";
import logo from "../assets/logo1.0.png";
import axios from "axios";
import fotoicono from "../assets/iconoperfil2.png";

const Navbar = ({ loggedIn }) => {
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [Foto, setFoto] = useState("");
  const [Nombre, setNombre] = useState("");
  const [isPerfilMenuOpen, setIsPerfilMenuOpen] = useState(false);

  loggedIn = localStorage.getItem("isLoggedIn") === "true";
  const matricula = localStorage.getItem("matricula");
  const [isProfesor, setIsProfesor] = useState(false);

  const apiURLPerfilCarrera =
    "https://dreamlabapidev.azurewebsites.net/api/perfil_estudiante/" +
    matricula;

  const apiURLPerfilProfesor =
    "https://dreamlabapidev.azurewebsites.net/api/perfil_profesor/" + matricula;

  const obtencionFotoPerfil = async () => {
    try {
      // Realizar todas las solicitudes en paralelo utilizando Promise.all()
      const [perfilCarrera] = await Promise.all([
        axios.get(apiURLPerfilCarrera),
      ]);

      // Manejar la respuesta de perfilCarrera
      const { Foto, Nombre } = perfilCarrera.data;
      setFoto(Foto || fotoicono);
      setNombre(Nombre);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const obtencionFotoPerfilProfesor = async () => {
    try {
      // Realizar todas las solicitudes en paralelo utilizando Promise.all()
      const [perfilProfesor] = await Promise.all([
        axios.get(apiURLPerfilProfesor),
      ]);

      // Manejar la respuesta de perfilCarrera
      const { Foto, Nombre } = perfilProfesor.data;
      setFoto(Foto || fotoicono);
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
    setIsProfesor(localStorage.getItem("userType") === "profesor");
    const userType = localStorage.getItem("userType");
    if (userType === "alumno") {
      obtencionFotoPerfil();
    } else if (userType === "profesor") {
      obtencionFotoPerfilProfesor();
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePerfilMenu = () => {
    setIsPerfilMenuOpen(!isPerfilMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("userType");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("matricula");
    localStorage.removeItem("threadID");
    window.location.href = "/login";
  };

  return (
    <header>
      <nav className={`containerNavbar ${scrolling ? "scrolling" : ""}`}>
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
            <a href="/espacios" className="mina-bold">
              ESPACIOS
            </a>
          </li>
          {isProfesor && (
            <li>
              <a href="/talleres" className="mina-bold">
                TALLERES
              </a>
            </li>
          )}
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
          {!loggedIn && (
            <div className="perfil-menu-container">
              <button className="perfil-button" onClick={togglePerfilMenu}>
                <i className="perfil-icono fa-solid fa-user"></i>
              </button>
              {isPerfilMenuOpen && (
                <div className="perfil-dropdown-menu">
                  <a href="/login" className="mina-bold-2">
                    Iniciar Sesión
                  </a>
                </div>
              )}
            </div>
          )}
          {loggedIn && (
            <div className="perfil-menu-container">
              <button className="perfil-button" onClick={togglePerfilMenu}>
                <div
                  style={{
                    backgroundImage: `url(${Foto})`,
                    backgroundSize: "cover",
                  }}
                  className="foto-perfil"
                ></div>
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
      {isProfesor && (
        <div className={`dropdown-menu-2 ${isMenuOpen ? "open" : ""}`}>
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
            <a href="/espacios" className="mina-bold-2">
              ESPACIOS
            </a>
          </li>

          <li>
            <a href="/talleres" className="mina-bold-2">
              TALLERES
            </a>
          </li>
        </div>
      )}
    </header>
  );
};

export default Navbar;
