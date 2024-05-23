import React, { useState, useEffect } from "react";
import "../NavbarAdmin/Navbar.css";
import logo from "../../../assets/logo1.0.png";
import axios from "axios";

const Navbar = ({ loggedIn }) => {
  const [scrolling, setScrolling] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [Foto, setFoto] = useState("");
  const [Nombre, setNombre] = useState("");

  loggedIn = localStorage.getItem("loggedIn") === "true";
  const matricula = localStorage.getItem("matricula");

  const apiURLPerfilCarrera =
    "https://devspaceapi2.azurewebsites.net/api/perfil/" + matricula;

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

  // Función para alternar la visibilidad del input de búsqueda
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <a href="/admin2" className="mina-bold">
              RESERVACIONES
            </a>
          </li>
          <li>
            <a href="#" className="mina-bold">
              VIDEOWALL
            </a>
          </li>
          <li>
            <a href="/stats" className="mina-bold">
              STATS
            </a>
          </li>
        </ul>
        <div className="karen">
          <i
            className={
              isMenuOpen
                ? `fa-solid fa-xmark bars-img`
                : `fa-solid fa-bars bars-img`
            }
            onClick={toggleMenu}
          ></i>
          {/* Oculta el perfil si el usuario no está logueado */}
          {loggedIn && (
            <a style={{ lineHeight: 0 }} href="/perfil">
              <img className="foto-perfil" src={Foto} alt={Nombre} />
            </a>
          )}
        </div>
      </nav>
      <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
        <li>
          <a href="/inicio" className="mina-bold-2">
            RESERVACIONES
          </a>
        </li>
        <li>
          <a href="/reservar" className="mina-bold-2">
            VIDEOWALL
          </a>
        </li>
        <li>
            <a href="/stats" className="mina-bold">
              STATS
            </a>
          </li>
      </div>
    </header>
  );
};

export default Navbar;
