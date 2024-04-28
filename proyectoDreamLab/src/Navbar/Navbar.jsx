import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo1.0.png";
import perfil from "../assets/perfil.png";

const Navbar = ({ loggedIn }) => {
  const [scrolling, setScrolling] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  loggedIn = localStorage.getItem("loggedIn") === "true";

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
            <a href="/inicio" className="mina-bold">
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
              SECCIONES
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
          <input
            id="search"
            className={`search_input ${searchVisible ? "" : "hidden"}`}
            placeholder="Escribe aquí..."
          />
          <a className="search-icon" onClick={toggleSearch}>
            <i className="fa-solid fa-magnifying-glass search-img"></i>
          </a>
          {/* Oculta el perfil si el usuario no está logueado */}
          {loggedIn && (
            <a style={{ lineHeight: 0 }} href="/perfil">
              <img src={perfil} alt="foto usuario" />
            </a>
          )}
        </div>
      </nav>
      <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
        <li>
          <a href="/inicio" className="mina-bold-2">
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
            SECCIONES
          </a>
        </li>
        <li>
          <input className="search_input-2" placeholder="Escribe aquí..." />
          <a className="search-icon-2">
            <i className="fa-solid fa-magnifying-glass search-img"></i>
          </a>
        </li>
      </div>
    </header>
  );
};

export default Navbar;
