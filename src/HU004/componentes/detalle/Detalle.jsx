import React from "react";
import "./Detalle.css";

const PopUp = ({
  onClose,
  Matricula,
  SalaID,
  Dia,
  HoraInicio,
  HoraFin,
  Recursos,
  Personas,
  Confirmada,
}) => {
  const handleConfirm = async () => {
    try {
      const response = await fetch(
        "https://dreamlabapidev.azurewebsites.net/api/reservacion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Matricula,
            SalaID,
            Dia,
            HoraInicio,
            HoraFin,
            Recursos,
            Personas,
            Confirmada,
          }),
        }
      );

      console.log(
        Matricula,
        SalaID,
        Dia,
        HoraInicio,
        HoraFin,
        Recursos,
        Personas,
        Confirmada
      );

      if (response.ok) {
        console.log("Reservación confirmada exitosamente");
        // Limpiar localStorage
        localStorage.removeItem("chatMessages");
        // Redireccionar a la ruta /perfil
        window.location.href = "/perfil";
      } else {
        console.error("Error al confirmar la reservación");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-inside">
          <div className="modal-content-inside-header">
            <h2 className="titulito-header">DETALLES DE LA RESERVACIÓN</h2>
          </div>
          <div className="modal-content-inside-body">
            <div className="modal-content-inside-body-content">
              <div className="modal-content-inside-body-content-ubi">
                <p>
                  <strong>SALA:</strong> {SalaID}
                </p>
              </div>
              <div className="modal-content-inside-body-content-fecha">
                <p>
                  <strong>FECHA: </strong>
                  {convertirFecha(Dia)}
                </p>
                <div className="modal-content-inside-body-content-horarie">
                  <p>
                    <strong>HORARIO:</strong> {convertirHora(HoraInicio)} -{" "}
                    {convertirHora(HoraFin)}
                  </p>
                </div>
              </div>
              <div className="modal-content-inside-body-content-personas">
                <div className="modal-content-inside-body-content-detalles-recursos">
                  <p>
                    <strong>RECURSOS:</strong> {Recursos}
                  </p>
                </div>
                <div className="modal-content-inside-body-content-detalles">
                  <div className="modal-content-inside-body-content-detalles-personas">
                    <p>
                      <strong>PERSONAS:</strong> {Personas}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-content-inside-body-content-boton">
            <div className="modal-content-inside-body-content-boton-content">
              <button className="botoncito1" onClick={onClose}>
                Cancelar
              </button>
              <button className="botoncito2" onClick={handleConfirm}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
