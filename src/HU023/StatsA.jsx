import React from "react";
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './StatsA.css';
import Navbar from "../HU022/Componentes/NavbarAdmin/Navbar";

const StatsA = () => {
  const barData = {
    labels: ['New Horizons', 'Lego Room', 'Deep Net', 'Graveyard', 'Dimension Forge'],
    datasets: [
      {
        label: 'Número de Reservaciones',
        data: [12, 19, 3, 5, 2],
        backgroundColor: '#363968',
      },
    ],
  };

  const pieData = {
    labels: ['Ocupado', 'Disponible'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ['#363968', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: Array.from({ length: 30 }, (_, i) => `Día ${i + 1}`),
    datasets: [
      {
        label: 'Reservaciones Diarias',
        data: [65, 59, 80, 81, 56, 55, 40, 48, 49, 60, 70, 76, 80, 83, 89, 90, 92, 95, 100, 102, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderWidth: 2,
      },
    ],
  };

  const topEquipos = ['Apple Vision Pro', 'Cámara Óptica', 'Arduino 3', 'Lector de Huella', 'Mouses'];

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: 'rgba(0,0,0,0.7)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(0,0,0,0.7)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(0,0,0,0.7)',
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
          <h2>Salas más usadas</h2>
          <div className="chart-container">
            <Bar data={barData} options={options} />
          </div>
        </div>
        <div className="section">
          <h2>Ocupación del D.R.E.A.M L.A.B</h2>
          <div className="chart-container">
            <Pie data={pieData} options={options} />
          </div>
          <p>En tiempo real: 75 personas</p>
        </div>
        <div className="section">
          <h2>Reservaciones Diarias (Último Mes)</h2>
          <div className="chart-container">
            <Line data={lineData} options={options} />
          </div>
        </div>
        <div className="section">
          <h2>Top 5 equipos más usados (última semana)</h2>
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
