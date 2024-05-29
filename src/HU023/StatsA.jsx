import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./HU023.css";
import axios from "axios";
import Navbar from "../HU022/Componentes/NavbarAdmin/Navbar";

const apiURLStatsSalas =
  "https://dreamlabapidev.azurewebsites.net/api/estadisticas/top_salas";
const apiURLStatsReservaciones =
  "https://dreamlabapidev.azurewebsites.net/api/estadisticas/reservaciones_semanales";
const apiURLStatsOcupacion =
  "https://dreamlabapidev.azurewebsites.net/api/estadisticas/ocupacion_tiempo_real";
const apiURLStatsRecursos =
  "https://dreamlabapidev.azurewebsites.net/api/estadisticas/top_recursos";

const StatsA = () => {
  const [topSalas, setTopSalas] = useState([]);
  const [reservacionesSemana, setReservacionesSemana] = useState([]);
  const [ocupacionActual, setOcupacionActual] = useState({ TotalPersonasDia: 0, TotalPersonasOcupado: 0 });
  const [topRecursos, setTopRecursos] = useState([]);

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

  const obtenerTopRecursos = async () => {
    try {
      const response = await axios.get(apiURLStatsRecursos);
      setTopRecursos(response.data);
    } catch (error) {
      console.error("Error al obtener top recursos:", error);
    }
  };
  useEffect(() => {
    obtenerTopRecursos();
  }, []);

  const obtenerOcupacionActual = async () => {
    try {
      const response = await axios.get(apiURLStatsOcupacion);
      const data = response.data[0]; // Asegurando que obtenemos el primer objeto del array
      setOcupacionActual({
        TotalPersonasDia: data.TotalPersonasDia || 0,
        TotalPersonasOcupado: data.TotalPersonasOcupado || 0,
      });
    } catch (error) {
      console.error("Error al obtener la ocupacion actual:", error);
      setOcupacionActual({ TotalPersonasDia: 0, TotalPersonasOcupado: 0 });
    }
  };
  useEffect(() => {
    obtenerOcupacionActual();
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + 1); // Set to Monday
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4); // Set to Friday
    return {
      monday: monday.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }),
      friday: friday.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
    };
  };

  const currentWeek = getCurrentWeekDates();

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

  const { TotalPersonasDia, TotalPersonasOcupado } = ocupacionActual;
  const ocupacion = TotalPersonasOcupado || 0;
  const total = TotalPersonasDia || 0;
  const porcentajeOcupado = total > 0 ? (ocupacion / total) * 100 : 0;
  const porcentajeLibre = 100 - porcentajeOcupado;

  const pieData = {
    labels: ["Ocupado", "Disponible"],
    datasets: [
      {
        data: [porcentajeOcupado, porcentajeLibre],
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
    <div className="App-HU023">
      <Navbar />
      <h1 className="h1HU023">Estadísticas del D.R.E.A.M L.A.B</h1>
      <div className="panel-HU023">
        <div className="section-HU023">
          <h2>Salas más usadas (Mayo)</h2>
          <div className="chart-container-HU023">
            <Bar data={barData} options={options} />
          </div>
        </div>
        <div className="section-HU023">
          <h2>Ocupación del D.R.E.A.M L.A.B</h2>
          <div className="chart-container-HU023">
            <Pie data={pieData} options={options} />
          </div>
          <p>En tiempo real al día {getTodayDate()}: {ocupacion} personas</p>
        </div>
        <div className="section-HU023">
          <h2>Reservaciones Diarias (Semana: {currentWeek.monday} - {currentWeek.friday})</h2>
          <div className="chart-container-HU023">
            <Line data={lineData} options={options} />
          </div>
        </div>
        <div className="section-HU023">
          <h2>Top 5 equipos más usados (Semana: {currentWeek.monday} - {currentWeek.friday})</h2>
          <ul>
            {topRecursos.map((recurso, index) => (
              <li key={index}>
                {recurso.Recurso} - {recurso.Conteo}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatsA;
