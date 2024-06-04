import React, { useState } from "react";
import clockWait from "../../../assets/clock.gif";
import checkmarkGif from "../../../assets/checkmark.gif";

const CancelPopUp = ({ onClose, onConfirm }) => {
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
        }, 3000);
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
            <h3>¿Estás seguro que quieres cancelar la reservación?</h3>
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
              <b>RESERVACIÓN CANCELADA</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelPopUp;
