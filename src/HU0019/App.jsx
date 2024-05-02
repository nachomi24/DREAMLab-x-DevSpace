import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Content from "./Components/Content/Content";

let matricula = "";

const storedMatricula = localStorage.getItem("matricula");

matricula = storedMatricula;

function App() {
  return (
    <div>
      <Navbar />
      <Content matricula={matricula} />
    </div>
  );
}

export default App;
