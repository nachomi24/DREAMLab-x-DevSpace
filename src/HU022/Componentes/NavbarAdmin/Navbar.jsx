import React, { useState, useEffect } from "react";
import "../../HU022.css";
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

  // Función para alternar la visibilidad del input de búsqueda
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-HU022">
      <nav className={`container-1 ${scrolling ? "scrolling" : ""}`}>
        <div className="logo-HU022">
          <img src={logo} alt="Logo de D.R.E.A.M. Lab" />
          <h1 className="logo-title-HU022">D.R.E.A.M. LAB</h1>
        </div>
        <ul className="links-HU022">
          <li>
            <a href="/admin/reservaciones" className="mina-bold-HU022">
              RESERVACIONES
            </a>
          </li>
          <li>
            <a href="/videowall" className="mina-bold-HU022">
              VIDEOWALL
            </a>
          </li>
          <li>
            <a href="/stats" className="mina-bold-HU022">
              STATS
            </a>
          </li>
        </ul>
        <div className="karen-HU022">
          <i
            className={
              isMenuOpen
                ? `fa-solid fa-xmark bars-img-HU022`
                : `fa-solid fa-bars bars-img-HU022`
            }
            onClick={toggleMenu}
          ></i>
          {/* Oculta el perfil si el usuario no está logueado */}
          {loggedIn && (
            <a style={{ lineHeight: 0 }} href="/perfil">
              <img className="foto-perfil-HU022" src={Foto} alt={Nombre} />
            </a>
          )}
        </div>
      </nav>
      <div className={`dropdown-menu-HU022 ${isMenuOpen ? "open" : ""}`}>
        <li>
          <a href="/inicio" className="mina-bold-2-HU022">
            RESERVACIONES
          </a>
        </li>
        <li>
          <a href="/reservar" className="mina-bold-2-HU022">
            VIDEOWALL
          </a>
        </li>
        <li>
          <a href="/stats" className="mina-bold-HU022">
            STATS
          </a>
        </li>
      </div>
    </header>
  );
};

export default Navbar;
