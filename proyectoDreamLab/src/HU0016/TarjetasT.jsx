import React from 'react';
import './Tarjetas.css';
import './TarjetaInfo.css';
import iaia from './iaia.png';
const Tarjeta = ({ tallerID, nomina_profesor, UFID, nombre, cupo, ubicacion, hora_inicio, hora_fin, fecha, creado_en}) => (
  <a href="#" className="tarjeta"> 
    <img src={iaia} alt={nombre} />
    <div className="tarjeta-info"> 
      <h2>{nombre}</h2>
      <div className="info-container">
        <p>{ubicacion}</p>
        <p>{hora_inicio}</p>
      </div>
    </div>
  </a>
);

const ContenedorTarjetas = ({ datos }) => (
  <div>
    <div className="menu">
      <ul>
        <li><a href="#">TALLERES</a></li>
        <li><a href="#">SALAS</a></li>
      </ul>
    </div>
    <div className="contenedor-tarjetas">
      {datos.map((dato) => (
        <Tarjeta key={dato.id} {...dato} />
      ))}
    </div>
  </div>
);

export default ContenedorTarjetas;
