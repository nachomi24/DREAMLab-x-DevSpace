import Navbar from "../Navbar/Navbar";
import Content from "./Components/Content/Content";
import React from 'react'
import './indexHU0019.css'

let matricula = "";

const storedMatricula = localStorage.getItem("matricula");

matricula = storedMatricula;

function HU0019() {
  return (
    <div>
      <Navbar />
      <Content matricula={matricula} />
    </div>
  );
}

export default HU0019;
