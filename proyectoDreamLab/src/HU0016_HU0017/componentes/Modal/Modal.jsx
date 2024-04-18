import React from 'react';
import './Modal.css';

const Modal = ({ data, onClose, imagen }) => {
  const {
    tallerID,
    nombre_completo,
    UFID,
    nombre_UF,
    nombre,
    cupo,
    ubicacion,
    hora_inicio,
    hora_fin,
    fecha,
    creado_en
  } = data;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div style={{backgroundImage: `url(${imagen})`}} className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
            <h2>{nombre}</h2>
        </div>
        <p>Profesor: {nombre_completo}</p>
        <p>UF: {UFID} - {nombre_UF}</p>
        <p>Cupo: {cupo}</p>
        <p>Ubicación: {ubicacion}</p>
        <p>Hora de inicio: {hora_inicio}</p>
        <p>Hora de fin: {hora_fin}</p>
        <p>Fecha: {fecha}</p>
        <p>Creado en: {creado_en}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
