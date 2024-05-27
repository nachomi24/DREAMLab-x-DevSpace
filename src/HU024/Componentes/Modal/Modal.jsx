import React, { useState } from "react";
import axios from 'axios';
import "./Modal.css";

const Modal = ({ onClose, onAdd }) => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [liga, setLigaPublicacion] = useState("");
  const [imagen, setLigaImagen] = useState("");
  const [fecha, setFecha] = useState("");
  const [activa, setActiva] = useState(0); // Default to off (0)

  const handleToggle = () => {
    setActiva(prev => {
      const newValue = prev === 1 ? 0 : 1;
      console.log("Nuevo valor de activa:", newValue);
      return newValue;
    });
  };

  const handleAdd = async () => {
    const nuevaPublicacion = {
      titulo,
      autor,
      descripcion,
      liga,
      imagen,
      fecha,
      activa
    };

    console.log("Datos a enviar:", nuevaPublicacion);

    try {
      const response = await axios.post('https://dreamlabapidev.azurewebsites.net/api/publicaciones', nuevaPublicacion, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Respuesta del servidor:", response.data);
      onAdd(response.data);
      onClose();
    } catch (error) {
      console.error("Error al agregar la publicación", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        if (error.response.data.detail) {
          console.error("Detalles específicos del error:", error.response.data.detail);
        }
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-inside">
          <div className="modal-content-inside-header">
            <h2 className="titulito-header">Nueva Publicación</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="modal-content-inside-body">
            <div className="modal-content-inside-body-content">
              <div className="field">
                <label className="titulito">Título:</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito">Autor:</label>
                <input
                  type="text"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito">Descripción:</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito">Liga Publicación:</label>
                <input
                  type="text"
                  value={liga}
                  onChange={(e) => setLigaPublicacion(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito">Liga Imagen:</label>
                <input
                  type="text"
                  value={imagen}
                  onChange={(e) => setLigaImagen(e.target.value)}
                />
              </div>
           
              <div className="field">
                <label className="titulito">Fecha:</label>
                <input
                  type="text"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
               {/*
              <div className="field">
                <label className="titulito">Activa:</label>
                <button 
                  className={`toggle-button ${activa === 1 ? 'on' : 'off'}`}
                  onClick={handleToggle}
                >
                  {activa === 1 ? "On" : "Off"}
                </button>
              </div>
            */}
              <div className="modal-content-inside-footer">
                <button className="boton" onClick={handleAdd}>AGREGAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
