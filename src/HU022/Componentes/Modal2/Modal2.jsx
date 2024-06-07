import React, { useState } from "react";
import clockWait from "../../../assets/clock.gif";
import checkmarkGif from "../../../assets/checkmark.gif";

const Modal2 = ({ onClose, onConfirm }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    onConfirm()
      .then(() => {
        setIsConfirming(false);
        setIsConfirmed(true);
        setTimeout(() => {
          setIsConfirmed(false);
          onClose();
        }, 4000);
      })
      .catch(() => {
        setIsConfirming(false);
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {!isConfirming && !isConfirmed && (
          <>
            <h3>¿Estás seguro que quieres aceptar la reservación?</h3>
            <p>Esta acción es irreversible.</p>
            <div className="popup-button-div">
              <div className="popup-button-div-inside">
                <button className="popup-button-cerrar" onClick={onClose}>
                  Cerrar
                </button>
                <button
                  className="popup-button-aceptar"
                  onClick={handleConfirm}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </>
        )}
        {isConfirming && (
          <div className="loading-indicator">
            <img style={{ width: "30%" }} src={clockWait} alt="Procesando" />
            <p>Procesando...</p>
          </div>
        )}
        {isConfirmed && (
          <div className="confirmation-message">
            <img src={checkmarkGif} alt="Confirmación" />
            <p>
              <b>RESERVACIÓN CONFIRMADA</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal2;








// import "../../HU022.css";

// const Modal2 = ({ data, onClose }) => {
//   const {
//     ReservacionID,
//     Matricula,
//     NombreEstudiante,
//     NombreSala,
//     SalaID,
//     Dia,
//     HoraInicio,
//     HoraFin,
//     Recursos,
//     Personas,
//     Confirmada
//   } = data;

//   const convertirHora = (hora) => {
//     const [hour, minute] = hora.split(":");
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const hour12 = hour % 12 || 12;
//     return `${hour12}:${minute} ${ampm}`;
//   };

//   return (
//     <div className="modal-overlay-HU022" onClick={onClose}>
//       <div className="modal-content-HU022" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-content-inside-HU022">
//           <div className="modal-content-inside-header-HU022">
//             <h2 className="titulito-header-HU022"></h2>
//             <p className="subtitulito-header-HU022"></p>
            
//           </div>
//           <div className="modal-content-inside-cuerpoHU022-HU022">
//             <div className="modal-content-inside-cuerpoHU022-content-HU022">
//               <p className="titulito-HU022">La reserva de {NombreEstudiante} fue confirmada exitosamente</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal2;
