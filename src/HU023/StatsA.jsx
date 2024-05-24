import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./StatsA.css";
import axios from "axios";
import Navbar from "../HU022/Componentes/NavbarAdmin/Navbar";

const apiURLStatsSalas =
  "https://dreamlabapidev.azurewebsites.net/api/estadisticas/top_salas";
const apiURLStatsReservaciones =
  "https://dreamlabapidev.azurewebsites.net/api/estadisticas/reservaciones_semanales";

const StatsA = () => {
  const [topSalas, setTopSalas] = useState([]);
  const [reservacionesSemana, setReservacionesSemana] = useState([]);

  const obtenerTopSalas = async () => {
    try {
      const response = await axios.get(apiURLStatsSalas);
      setTopSalas(response.data);
    } catch (error) {
      console.error("Error al obtener top salas:", error);
    }
  };
  useEffect(() => {
    obtenerTopSalas();
  }, []);

  const obtenerReservacionesSemanales = async () => {
    try {
      const response = await axios.get(apiURLStatsReservaciones);
      setReservacionesSemana(response.data);
    } catch (error) {
      console.error("Error al obtener reservas semanales:", error);
    }
  };
  useEffect(() => {
    obtenerReservacionesSemanales();
  }, []);

  //-----------------------Graficas empiezan aquí
  const barData = {
    labels: topSalas.map((sala) => sala.Nombre),
    datasets: [
      {
        label: "Número de Reservaciones",
        data: topSalas.map((sala) => sala.NumeroDeReservaciones),
        backgroundColor: "#31357795",
      },
    ],
  };

  const pieData = {
    labels: ["Ocupado", "Disponible"],
    datasets: [
      {
        data: [16, 25],
        backgroundColor: ["#31357795", "#66009655"],
      },
    ],
  };

  const lineData = {
    labels: reservacionesSemana.map(
      (reservacionesSemana) => reservacionesSemana.DiaSemana
    ),
    datasets: [
      {
        label: "Reservaciones Semanales",
        data: reservacionesSemana.map(
          (reservacionesSemana) => reservacionesSemana.NumeroDeReservaciones
        ),
        fill: false,
        backgroundColor: "#31357795",
        borderColor: "#31357795",
      },
    ],
  };

  const topEquipos = [
    "Apple Vision Pro",
    "Cámara Óptica",
    "Arduino 3",
    "Lector de Huella",
    "Mouses",
  ];

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#31357795",
        },
      },
      y: {
        ticks: {
          color: "#31357795",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "rgba(0,0,0,0.7)",
        },
      },
    },
  };

  return (
    <div className="App">
      <Navbar />
      <h1>Estadísticas del D.R.E.A.M L.A.B</h1>
      <div className="panel">
        <div className="section">
          <h2>Salas más usadas (Mayo)</h2>
          <div className="chart-container">
            <Bar data={barData} options={options} />
          </div>
        </div>
        <div className="section">
          <h2>Ocupación del D.R.E.A.M L.A.B</h2>
          <div className="chart-container">
            <Pie data={pieData} options={options} />
          </div>
          <p>En tiempo real al día 24 de Mayo: 16 personas</p>
        </div>
        <div className="section">
          <h2>Reservaciones Diarias (Semana: 20-24 Mayo)</h2>
          <div className="chart-container">
            <Line data={lineData} options={options} />
          </div>
        </div>
        <div className="section">
          <h2>Top 5 equipos más usados (Semana: 20-24 Mayo)</h2>
          <ul>
            {topEquipos.map((equipo, index) => (
              <li key={index}>{equipo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatsA;
