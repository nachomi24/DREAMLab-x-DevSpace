import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../HU026.css";

const EditTallerModal = ({ taller, onClose, onUpdate }) => {
  const [tallerID, setTallerID] = useState("");
  const [nombreProfesor, setNombreProfesor] = useState("");
  const [ufid, setUFID] = useState("");
  const [nombreUF, setNombreUF] = useState("");
  const [nombre, setNombre] = useState("");
  const [cupo, setCupo] = useState("");
  //const [ubicacion, setUbicacion] = useState("");
  const [salaID, setSalaID] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [horaCreado, setHoraCreado] = useState("");

  useEffect(() => {
    if (taller) {
      setTallerID(taller.TallerID);
      setNombreProfesor(taller.NombreProfesor);
      setUFID(taller.UFID);
      setNombreUF(taller.NombreUF);
      setNombre(taller.Nombre);
      setCupo(taller.Cupo);
      //setUbicacion(taller.Ubicacion);
        setSalaID(taller.SalaID);
      setFecha(taller.Fecha);
      setHoraInicio(taller.HoraInicio);
      setHoraFin(taller.HoraFin);
      setHoraCreado(taller.HoraCreado);
    }
  }, [taller]);

const handleUpdate = async () => {
  const tallerActualizado = {
    TallerID: tallerID,
    NombreProfesor: nombreProfesor,
    UFID: ufid,
    NombreUF: nombreUF,
    Nombre: nombre,
    Cupo: parseInt(cupo, 10),  // Asegúrate de que sea un número
    //Ubicacion: ubicacion,
    SalaID: salaID,
    Fecha: new Date(fecha).toISOString().split('T')[0], // Formato YYYY-MM-DD
    HoraInicio: horaInicio,
    HoraFin: horaFin,
    HoraCreado: new Date(horaCreado).toISOString(), // Asegúrate de que sea un datetime
  };

  console.log("Datos enviados para actualizar:", tallerActualizado);

  try {
    const response = await axios.put(
      `http://localhost:8000/api/actualizar_taller/${taller.TallerID}`,
      tallerActualizado,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Respuesta del servidor:", response.data);
    onUpdate(response.data);
    onClose();
  } catch (error) {
    console.error("Error al actualizar el taller", error);
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
            <h2 className="titulito026-header">Editar Taller</h2>
            <button className="close-button026" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="modal-content026-inside-body">
            <div className="modal-content026-inside-body-content">
              {/* <div className="field">
                <label className="titulito026">Nombre del Profesor:</label>
                <input
                  type="text"
                  value={nombreProfesor}
                  onChange={(e) => setNombreProfesor(e.target.value)}
                />
              </div> */}

              {/* <div className="field">
                <label className="titulito026">UFID:</label>
                <input
                  type="text"
                  value={ufid}
                  onChange={(e) => setUFID(e.target.value)}
                />
              </div> */}
              <div className="field">
                <label className="titulito026">Nombre UF:</label>
                <input
                  type="text"
                  value={nombreUF}
                  onChange={(e) => setNombreUF(e.target.value)}
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
                <label className="titulito026">Ubicación:</label>
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
                <label className="titulito026">Hora de Inicio:</label>
                <input
                  type="text"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito026">Hora de Fin:</label>
                <input
                  type="text"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="titulito026">Hora Creado:</label>
                <input
                  type="text"
                  value={horaCreado}
                  onChange={(e) => setHoraCreado(e.target.value)}
                />
              </div>
              <div className="modal-content026-inside-footer">
                <button className="boton026" onClick={handleUpdate}>
                  GUARDAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTallerModal;
