import "./App.css";
import Navbar from "../Navbar/Navbar";
import Tarjetas from "./componentes/TarjetasT/TarjetasT";
import axios from "axios";
import { useState, useEffect } from "react";
const apiURL = "http://localhost:8000/api/info_talleres";

function App() {
  const [talleres, setTalleres] = useState([]);

  const obtenerTalleres = async () => {
    try {
      const response = await axios.get(apiURL);
      setTalleres(response.data);
    } catch (error) {
      console.error("Error al obtener talleres:", error);
    }
  };

  useEffect(() => {
    obtenerTalleres();
  }, []);

  return (
    <>
      <Navbar />
      <Tarjetas datos={talleres} />
    </>
  );
}

export default App;
