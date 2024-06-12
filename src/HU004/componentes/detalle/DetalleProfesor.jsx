import React from "react";
import "../../HU004.css";

const PopUpProfesor = ({
  onClose,
  Nomina,
  SalaID,
  Dia,
  HoraInicio,
  HoraFin,
  Recursos,
  Personas,
  Confirmada,
  onConfirm,
}) => {
  // Convertir la hora de formato 24 horas a formato 12 horas (PM/AM)
  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  // Cambiar el formato de la fecha
  const convertirFecha = (fecha) => {
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div className="modal-overlayHU004" onClick={onClose}>
        <div
          className="modal-contentHU004"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-contentHU004-inside">
            <div className="modal-contentHU004-inside-header">
              <h2 className="titulito-header">DETALLES DE LA RESERVACIÓN</h2>
            </div>
            <div className="modal-contentHU004-inside-body">
              <div className="modal-contentHU004-inside-body-content">
                <div className="modal-contentHU004-inside-body-content-ubi">
                  <p>
                    <strong>SALA:</strong> {SalaID}
                  </p>
                </div>
                <div className="modal-contentHU004-inside-body-content-fecha">
                  <p>
                    <strong>FECHA: </strong>
                    {convertirFecha(Dia)}
                  </p>
                  <div className="modal-contentHU004-inside-body-content-horarie">
                    <p>
                      <strong>HORARIO:</strong> {convertirHora(HoraInicio)} -{" "}
                      {convertirHora(HoraFin)}
                    </p>
                  </div>
                </div>
                <div className="modal-contentHU004-inside-body-content-personas">
                  <div className="modal-contentHU004-inside-body-content-detalles-recursos">
                    <p>
                      <strong>RECURSOS:</strong> {Recursos}
                    </p>
                  </div>
                  <div className="modal-contentHU004-inside-body-content-detalles">
                    <div className="modal-contentHU004-inside-body-content-detalles-personas">
                      <p>
                        <strong>PERSONAS:</strong> {Personas}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-contentHU004-inside-body-content-boton">
              <div className="modal-contentHU004-inside-body-content-boton-content">
                <button className="botoncitoHU004" onClick={onClose}>
                  Cancelar
                </button>
                <button className="botoncito2HU004" onClick={onConfirm}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpProfesor;
