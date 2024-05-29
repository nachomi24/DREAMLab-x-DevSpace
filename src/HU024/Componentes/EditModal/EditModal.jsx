import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Modal.css";
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
    <div className="modal-overlay024" onClick={onClose}>
      <div className="modal-content024" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content024-inside">
          <div className="modal-content024-inside-header">
            <h2 className="titulito024-header">Editar Publicación</h2>
            <button className="close-button024" onClick={onClose}>×</button>
          </div>
          <div className="modal-content024-inside-body">
            <div className="modal-content024-inside-body-content">
              <div className="field">
                <label className="titulito024">Título:</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito024">Autor:</label>
                <input
                  type="text"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito024">Descripción:</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito024">Liga Publicación:</label>
                <input
                  type="text"
                  value={liga}
                  onChange={(e) => setLigaPublicacion(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito024">Liga Imagen:</label>
                <input
                  type="text"
                  value={imagen}
                  onChange={(e) => setLigaImagen(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito024">Fecha:</label>
                <input
                  type="text"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              {/*
              <div className="field">
                <label className="titulito024">Activa:</label>
                <button 
                  className={`toggle-button ${activa === 1 ? 'on' : 'off'}`}
                  onClick={handleToggle}
                >
                  {activa === 1 ? "On" : "Off"}
                </button>
              </div>
                */}
              <div className="modal-content024-inside-footer">
                <button className="boton024" onClick={handleUpdate}>GUARDAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
