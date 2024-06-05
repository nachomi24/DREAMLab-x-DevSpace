import React, { useState } from "react";
import axios from "axios";
import "../../HU026.css";

const Modal = ({ onClose, onAdd }) => {
  const nominaProfesor = localStorage.getItem("matricula"); // Obtener la nómina del localStorage

  const [ufid, setUFID] = useState("");
  const [nombre, setNombre] = useState("");
  const [cupo, setCupo] = useState("");
  const [salaID, setSalaID] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [imagen, setImagen] = useState("");

  const handleAdd = async () => {
    const nuevoTaller = {
      Nomina: nominaProfesor, // Asignar la nómina obtenida del localStorage
      UFID: ufid,
      Nombre: nombre,
      Cupo: parseInt(cupo, 10),
      SalaID: salaID,
      Fecha: fecha, // Asegúrate de que está en formato 'YYYY-MM-DD'
      HoraInicio: `${horaInicio}:00`, // Asegúrate de que está en formato 'HH:MM:SS'
      HoraFin: `${horaFin}:00`, // Asegúrate de que está en formato 'HH:MM:SS'
      Imagen: imagen,
    };
  
    console.log("Datos a enviar:", nuevoTaller);
  
    try {
      const response = await axios.post(
        "https://dreamlabapidev.azurewebsites.net/api/crear_talleres",
        nuevoTaller,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
      onAdd(response.data);
      onClose();
    } catch (error) {
      console.error("Error al agregar el taller", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        if (error.response.data.detail) {
          console.error(
            "Detalles específicos del error:",
            error.response.data.detail
          );
        }
      }
    }
  };
  
  return (
    <div className="modal-overlay026" onClick={onClose}>
      <div className="modal-content026" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content026-inside">
          <div className="modal-content026-inside-header">
            <h2 className="titulito026-header">Nuevo Taller</h2>
            <button className="close-button026" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="modal-content026-inside-body">
            <div className="modal-content026-inside-body-content">
              {/* Eliminar el campo de entrada para la nómina */}
              <div className="field">
                <label className="titulito026">UFID:</label>
                <input
                  type="text"
                  value={ufid}
                  onChange={(e) => setUFID(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito026">Nombre:</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito026">Cupo:</label>
                <input
                  type="text"
                  value={cupo}
                  onChange={(e) => setCupo(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito026">Sala ID:</label>
                <input
                  type="text"
                  value={salaID}
                  onChange={(e) => setSalaID(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito026">Fecha:</label>
                <input
                  type="text"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito026">Hora Inicio:</label>
                <input
                  type="text"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito026">Hora Fin:</label>
                <input
                  type="text"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito026">Imagen:</label>
                <input
                  type="text"
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                />
              </div>
              <div className="modal-content026-inside-footer">
                <button className="boton026" onClick={handleAdd}>
                  AGREGAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
