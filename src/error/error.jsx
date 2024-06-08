import React from "react";
import Navbar from "../Navbar/Navbar";
import NavbarAdmin from "../HU022/Componentes/NavbarAdmin/Navbar.jsx";
import Dreamy from "./componentes/dreamy/dreamy";
import Mensaje from "./componentes/mensaje/mensaje";
import "../global.css";
import "./error.css";

const Error = () => {
  const userType = localStorage.getItem("userType");

  return (
    <div>
      {userType === "admin" ? <NavbarAdmin /> : <Navbar />}
      <Dreamy />
      <Mensaje />
    </div>
  );
};

export default Error;
