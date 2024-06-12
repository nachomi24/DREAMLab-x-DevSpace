import { useState, useEffect } from "react";
import axios from "axios";
import clockWait from "../../../assets/clock.gif";
import checkmarkGif from "../../../assets/checkmark.gif";

const Modal = ({ data, onClose, imagen, isReservado, isCancelado }) => {
  const {
    TallerID,
    Nomina,
    NombreProfesor,
    UFID,
    NombreUF,
    Nombre,
    Cupo,
    Ubicacion,
    Fecha,
    HoraInicio,
    HoraFin,
    HoraCreado,
  } = data;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCancelation, setShowCancelation] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [reservedTaller, setReservedTaller] = useState(false);
  const [canceledTaller, setCanceledTaller] = useState(false);
  const [matricula, setMatricula] = useState("");

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setUserType(localStorage.getItem("userType"));
    setMatricula(localStorage.getItem("matricula"));
  }, []);

  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const convertirFecha = (fecha) => {
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
  };

  const calcularTiempoTranscurrido = (fechaCreado) => {
    const fechaCreadoMs = new Date(fechaCreado).getTime();
    const fechaActualMs = new Date().getTime();
    const diferenciaMs = fechaActualMs - fechaCreadoMs;

    const segundos = Math.floor(diferenciaMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      return `Hace ${dias} día${dias > 1 ? "s" : ""}`;
    } else if (horas > 0) {
      return `Hace ${horas} hora${horas > 1 ? "s" : ""}`;
    } else if (minutos > 0) {
      return `Hace ${minutos} minuto${minutos > 1 ? "s" : ""}`;
    } else {
      return `Hace unos segundos`;
    }
  };

  const handleReservarClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelarClick = () => {
    setShowCancelation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const handleCancelationClose = () => {
    setShowCancelation(false);
  };

  const handleReservarConfirm = async () => {
    setShowConfirmation(false);
    setIsConfirming(true);
    try {
      await axios.post(
        `https://dreamlabapidev.azurewebsites.net/api/talleres/reservacion/estudiante`,
        null,
        {
          params: {
            tallerID: TallerID,
            matricula: matricula,
          },
        }
      );
      setIsConfirming(false);
      setReservedTaller(true);

      showPopupAndRedirect();
    } catch (error) {
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  const handleReservarConfirmProfesor = async () => {
    setShowConfirmation(false);
    setIsConfirming(true);
    try {
      await axios.post(
        `https://dreamlabapidev.azurewebsites.net/api/talleres/reservacion/profesor`,
        null,
        {
          params: {
            tallerID: TallerID,
            nomina: matricula,
          },
        }
      );

      setIsConfirming(false);
      setReservedTaller(true);

      showPopupAndRedirect();
    } catch (error) {
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  const handleCancelarConfirm = async () => {
    setShowCancelation(false);
    setIsConfirming(true);
    try {
      await axios.delete(
        `https://dreamlabapidev.azurewebsites.net/api/talleres/reservacion/estudiante`,
        {
          params: {
            tallerID: TallerID,
            matricula: matricula,
          },
        }
      );

      setIsConfirming(false);
      setCanceledTaller(true);

      showPopupCancelAndRedirect();
    } catch (error) {
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  const handleCancelarConfirmProfesor = async () => {
    setShowCancelation(false);
    setIsConfirming(true);
    try {
      await axios.delete(
        `https://dreamlabapidev.azurewebsites.net/api/talleres/reservacion/profesor`,
        {
          params: {
            tallerID: TallerID,
            nomina: matricula,
          },
        }
      );

      setIsConfirming(false);
      setCanceledTaller(true);

      showPopupCancelAndRedirect();
    } catch (error) {
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  const showPopupAndRedirect = () => {
    setIsConfirming(false);
    setShowConfirmation(false);

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const showPopupCancelAndRedirect = () => {
    setShowCancelation(false);

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const renderCupo = () => {
    if (Cupo === 1) {
      return `${Cupo} persona`;
    } else if (Cupo > 1) {
      return `${Cupo} personas`;
    } else {
      return `${Cupo}`;
    }
  };

  return (
    <div className="modal-overlay016">
      <div
        style={{ background: `url(${imagen}) no-repeat center center/cover` }}
        className="modal-content016"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content016-inside">
          <div className="modal-content016-inside-header">
            <h2 className="titulito-header">{Nombre}</h2>
          </div>
          <div className="modal-content016-inside-body">
            <div className="modal-content016-inside-body-content">
              {Cupo === "No hay cupo" ? (
                <div className="modal-content016-inside-body-content-cupo-inexistente-cero">
                  <div className="cupito">CUPO AGOTADO</div>
                </div>
              ) : (
                <div className="modal-content016-inside-body-content-ubi">
                  <p>📍{Ubicacion}</p>
                </div>
              )}
              <div className="modal-content016-inside-body-content-uf">
                <p className="uniforma">
                  {UFID} - {NombreUF}
                </p>
                <p>Profesor(a): {NombreProfesor}</p>
              </div>
              <div className="modal-content016-inside-body-content-fecha">
                <p>{convertirFecha(Fecha)}</p>
                <p className="horarie">
                  {convertirHora(HoraInicio)} a {convertirHora(HoraFin)}
                </p>
              </div>
              <div className="modal-content016-inside-body-content-detalles">
                <div className="modal-content016-inside-body-content-detalles-creado">
                  <p>Creado:</p>
                  <p className="creadito">
                    {calcularTiempoTranscurrido(HoraCreado)}
                  </p>
                </div>
                {isReservado && (
                  <div className="modal-content016-inside-body-content-detalles-reservado">
                    <div className="reservadito">TALLER RESERVADO</div>
                  </div>
                )}
                {isCancelado && (
                  <div className="modal-content016-inside-body-content-detalles-cancelado">
                    <div className="canceladito">RESERVACIÓN CANCELADA</div>
                  </div>
                )}
                <div className="modal-content016-inside-body-content-detalles-cupo">
                  <p>Cupo:</p>
                  <p className="cupito">{renderCupo()}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-content016-inside-body-content-boton">
            <div className="modal-content016-inside-body-content-boton-content">
              <button className="botoncito1016" onClick={onClose}>
                CERRAR
              </button>
              {isLoggedIn ? (
                userType === "alumno" ? (
                  !isReservado && Cupo !== "No hay cupo" ? (
                    <button
                      className="botoncito2016"
                      onClick={handleReservarClick}
                    >
                      RESERVAR
                    </button>
                  ) : (
                    <button
                      className="botoncito2016"
                      onClick={handleCancelarClick}
                    >
                      CANCELAR
                    </button>
                  )
                ) : userType === "profesor" ? (
                  matricula !== Nomina ? (
                    !isReservado && Cupo !== "No hay cupo" ? (
                      <button
                        className="botoncito2016"
                        onClick={handleReservarClick}
                      >
                        RESERVAR
                      </button>
                    ) : (
                      <button
                        className="botoncito2016"
                        onClick={handleCancelarClick}
                      >
                        CANCELAR
                      </button>
                    )
                  ) : null
                ) : (
                  <a href="/reservar" className="botoncito2016">
                    RESERVAR
                  </a>
                )
              ) : Cupo === "No hay cupo" ? null : (
                <a href="/login" className="botoncito2016">
                  INICIAR SESIÓN
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && userType === "alumno" && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>¿Estás seguro que quieres reservar este taller?</h3>
            <p>
              Tu asistencia es muy importante, ya que el cupo es limitado.
              Apreciamos mucho tu puntualidad y presencia.
            </p>
            <p
              style={{ fontWeight: "bolder", color: "green", fontSize: "3vh" }}
            >
              GANARÁS 10 PUNTOS DE PRIORIDAD
            </p>
            <div className="popup-button-div">
              <div className="popup-button-div-inside">
                <button
                  className="popup-button-cerrar"
                  onClick={handleConfirmationClose}
                >
                  Cancelar
                </button>
                <button
                  className="popup-button-aceptar"
                  onClick={handleReservarConfirm}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirmation && userType === "profesor" && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>¿Estás seguro que quieres reservar este taller?</h3>
            <p>
              Tu asistencia es muy importante, ya que el cupo es limitado.
              Apreciamos mucho tu puntualidad y presencia.
            </p>
            <p
              style={{ fontWeight: "bolder", color: "green", fontSize: "3vh" }}
            >
              GANARÁS 10 PUNTOS DE PRIORIDAD
            </p>
            <div className="popup-button-div">
              <div className="popup-button-div-inside">
                <button
                  className="popup-button-cerrar"
                  onClick={handleConfirmationClose}
                >
                  Cancelar
                </button>
                <button
                  className="popup-button-aceptar"
                  onClick={handleReservarConfirmProfesor}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showCancelation && userType === "alumno" && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>
              ¿Estás seguro que quieres cancelar tu reservación de este taller?
            </h3>
            <p>
              Recuerda que tu reserva ya fue procesada y contemplada para la
              logística del taller.
            </p>
            <p
              style={{
                fontWeight: "bolder",
                color: "darkred",
                fontSize: "3vh",
              }}
            >
              PERDERÁS 10 PUNTOS DE PRIORIDAD
            </p>
            <div className="popup-button-div">
              <div className="popup-button-div-inside">
                <button
                  className="popup-button-cerrar"
                  onClick={handleCancelationClose}
                >
                  Cancelar
                </button>
                <button
                  className="popup-button-aceptar"
                  onClick={handleCancelarConfirm}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showCancelation && userType === "profesor" && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>
              ¿Estás seguro que quieres cancelar tu reservación de este taller?
            </h3>
            <p>
              Recuerda que tu reserva ya fue procesada y contemplada para la
              logística del taller.
            </p>
            <p
              style={{
                fontWeight: "bolder",
                color: "darkred",
                fontSize: "3vh",
              }}
            >
              PERDERÁS 10 PUNTOS DE PRIORIDAD
            </p>
            <div className="popup-button-div">
              <div className="popup-button-div-inside">
                <button
                  className="popup-button-cerrar"
                  onClick={handleCancelationClose}
                >
                  Cancelar
                </button>
                <button
                  className="popup-button-aceptar"
                  onClick={handleCancelarConfirmProfesor}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isConfirming && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="loading-indicator">
              <img style={{ width: "30%" }} src={clockWait} alt="Procesando" />
              <p>Procesando...</p>
            </div>
          </div>
        </div>
      )}
      {reservedTaller && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="confirmation-message">
              <img src={checkmarkGif} alt="Confirmación" />
              <p>
                <b>TALLER RESERVADO</b>
              </p>
            </div>
          </div>
        </div>
      )}
      {canceledTaller && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="confirmation-message">
              <img src={checkmarkGif} alt="Confirmación" />
              <p>
                <b>RESERVACIÓN CANCELADA</b>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
