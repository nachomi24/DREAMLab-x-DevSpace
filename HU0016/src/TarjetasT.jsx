import React from 'react';
import './Tarjetas.css';
import './TarjetaInfo.css';

const Tarjeta = ({ imagen, titulo, nombre, hora }) => (
  <a href="#" className="tarjeta"> 
    <img src={imagen} alt={titulo} />
    <div className="tarjeta-info"> 
      <h2>{titulo}</h2>
      <div className="info-container">
        <p>{nombre}</p>
        <p>{hora}</p>
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
