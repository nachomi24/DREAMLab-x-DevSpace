import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../HU0024.css";

const EditModal = ({ publicacion, onClose, onUpdate }) => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [liga, setLigaPublicacion] = useState("");
  const [imagen, setLigaImagen] = useState("");
  const [fecha, setFecha] = useState("");
  const [activa, setActiva] = useState(0);

  useEffect(() => {
    if (publicacion) {
      setTitulo(publicacion.titulo);
      setAutor(publicacion.autor);
      setDescripcion(publicacion.descripcion);
      setLigaPublicacion(publicacion.liga);
      setLigaImagen(publicacion.imagen);
      setFecha(publicacion.fecha);
      setActiva(publicacion.activa);
    }
  }, [publicacion]);

  const handleToggle = () => {
    setActiva(prev => (prev === 1 ? 0 : 1));
  };

  const handleUpdate = async () => {
    const publicacionActualizada = {
      titulo,
      autor,
      descripcion,
      liga,
      imagen,
      fecha,
      activa
    };

    try {
      const response = await axios.put(`https://dreamlabapidev.azurewebsites.net/api/publicaciones/${publicacion._id}`, publicacionActualizada, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Respuesta del servidor:", response.data);
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error al actualizar la publicación", error);
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
            <h2 className="titulito-header">Editar Publicación</h2>
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
                <button className="boton" onClick={handleUpdate}>GUARDAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
