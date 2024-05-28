import Navbar from "../Navbar/Navbar";
import Content from "./Components/Content/Content";
import React from 'react'
import './HU0019.css';
import '../global.css';

let matricula = "";

const storedMatricula = localStorage.getItem("matricula");

matricula = storedMatricula;

function HU0019() {
  return (
    <div className="cuerpoHU0019">
      <Navbar />
      <Content matricula={matricula} />
    </div>
  );
}

export default HU0019;
