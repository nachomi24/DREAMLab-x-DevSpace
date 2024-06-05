import React, { useState, useEffect } from "react";
import "../../HU0019.css";
import foto1 from "../../../assets/iaia.png";
import clockWait from "../../../assets/clock.gif";
import CancelPopUp from "../CancelPopUp/CancelPopUp";

const ContenedorTarjetas = ({ datos, mostrarBotonCancel, onCancel }) => {
  return (
    <div className="contenedor-tarjeta-general019">
      <div className="contenedor-principal-tarjetas019">
        <div className="contenedor-tarjetas019">
          {datos.map((dato) => (
            <Tarjeta
              key={dato.ReservacionID}
              {...dato}
              mostrarBotonCancel={mostrarBotonCancel}
              onCancel={onCancel}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Tarjeta = ({
  SalaID,
  Dia,
  HoraInicio,
  NombreSala,
  mostrarBotonCancel,
  ReservacionID,
  onCancel,
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
    <>
      <div className="tarjeta">
        <div>
          <img className="tarjeta-img-inside" src={foto1} alt={NombreSala} />
        </div>
        <div className="tarjeta-info">
          <h2>
            {SalaID} - {NombreSala}
          </h2>
          <div className="info-container019">
            <p>{convertirFecha(Dia)}</p>
            <p>{convertirHora(HoraInicio)}</p>
          </div>
          <div className="info-detail-cl-bt">
            {mostrarBotonCancel ? (
              <button
                className="botoncito1019"
                onClick={() => onCancel(ReservacionID)}
              >
                Cancelar
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img className="relojcito" src={clockWait} alt="Clock"></img>
                <p className="confirmacion-texto">
                  En espera de confirmación
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function Tabla({
  Nombre,
  TotalUF,
  ReservacionesNoConfirmadas,
  ReservacionesConfirmadas: propsReservacionesConfirmadas,
  Matricula,
  UfIds,
}) {
  const [reservacionesConfirmadas, setReservacionesConfirmadas] = useState(
    propsReservacionesConfirmadas
  );
  const [reservacionesPendientes, setReservacionesPendientes] = useState(
    ReservacionesNoConfirmadas
  );
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [showCancelPopUp, setShowCancelPopUp] = useState(false);
  const [reservacionAEliminar, setReservacionAEliminar] = useState(null);

  useEffect(() => {
    setReservacionesConfirmadas(propsReservacionesConfirmadas);
  }, [propsReservacionesConfirmadas]);

  useEffect(() => {
    setReservacionesPendientes(ReservacionesNoConfirmadas);
  }, [ReservacionesNoConfirmadas]);

  const toggleEye = () => {
    setIsEyeOpen(!isEyeOpen);
  };

  const cancelarReservacion = async (reservacionId) => {
    try {
      const response = await fetch(
        `https://dreamlabapidev.azurewebsites.net/api/rechazar_reservacion?reservacionId=${reservacionId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Eliminar la reservación del estado
        setReservacionesConfirmadas((prevReservaciones) =>
          prevReservaciones.filter((res) => res.ReservacionID !== reservacionId)
        );
      } else {
        alert("Error al cancelar la reservación");
      }
    } catch (error) {
      console.error("Error al cancelar la reservación:", error);
      alert("Error al cancelar la reservación");
    }
  };

  const handleCancelClick = (reservacionId) => {
    setReservacionAEliminar(reservacionId);
    setShowCancelPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowCancelPopUp(false);
    setReservacionAEliminar(null);
  };

  const handleConfirmPopUp = () => {
    return cancelarReservacion(reservacionAEliminar);
  };

  return (
    <>
      {showCancelPopUp && (
        <CancelPopUp
          onClose={handleClosePopUp}
          onConfirm={handleConfirmPopUp}
        />
      )}
      <table className="tablaestilo">
        <tbody>
          <tr>
            <td style={{ width: "100%" }} className="nombre_perfil" colSpan={2}>
              <i
                style={{ marginRight: "25px", color: "#ABACC4" }}
                className={"fa-solid fa-user"}
              ></i>
              {Nombre} - {Matricula}
            </td>
          </tr>
          <tr>
            <td style={{ width: "100%" }} className="uf_curso" colSpan={2}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i
                  style={{ marginRight: "15px", color: "#ABACC4" }}
                  className={"fa-solid fa-spinner"}
                ></i>
                <p className="p_uf_curso">UF en curso:</p>
                <p className="uf_curso">{TotalUF}</p>
                <i
                  style={{ cursor: "pointer" }}
                  className={
                    isEyeOpen
                      ? `fa-solid fa-angle-right`
                      : `fa-solid fa-angle-left`
                  }
                  onClick={toggleEye}
                ></i>
                {!isEyeOpen &&
                  UfIds.map((uf, index) => (
                    <div key={index} style={{ marginLeft: "4vh" }}>
                      <p style={{ marginRight: 0 }} className="p_uf_curso">
                        {uf}
                      </p>
                    </div>
                  ))}
              </div>
            </td>
          </tr>
          <tr className="reservaciones-columnas">
            <td className="reservaciones-pend-fut">
              <div className="reservaciones-pend-fut-div">
                <div className="reservaciones-pend-fut-div-title">
                  <i
                    style={{ marginRight: "15px", color: "#ABACC4" }}
                    className={"fa-solid fa-hourglass-half"}
                  ></i>
                  Reservaciones Enviadas ({reservacionesPendientes.length})
                </div>
                {ReservacionesNoConfirmadas &&
                ReservacionesNoConfirmadas.length !== 0 ? (
                  <ContenedorTarjetas
                    datos={ReservacionesNoConfirmadas}
                    mostrarBotonCancel={false}
                  />
                ) : (
                  <div className="reservaciones-pend-fut-div-content">
                    <p style={{ fontSize: "2.5vh", marginBottom: "3vh" }}>
                      Aún no has realizado una reservación. Haz click en el
                      botón de abajo para realizar tu primera reservación.{" "}
                    </p>
                    <a
                      style={{ marginBottom: "5px" }}
                      className="botoncito2019"
                      href="/reservar"
                    >
                      Reservar ahora
                    </a>
                  </div>
                )}
              </div>
            </td>
            <td className="reservaciones-pend-fut">
              <div className="reservaciones-pend-fut-div">
                <div className="reservaciones-pend-fut-div-title">
                  <i
                    style={{ marginRight: "15px", color: "#ABACC4" }}
                    className={"fa-solid fa-clock-rotate-left"}
                  ></i>
                  Reservaciones Futuras ({reservacionesConfirmadas.length})
                </div>
                {reservacionesConfirmadas &&
                reservacionesConfirmadas.length !== 0 ? (
                  <ContenedorTarjetas
                    datos={reservacionesConfirmadas}
                    mostrarBotonCancel={true}
                    onCancel={handleCancelClick}
                  />
                ) : (
                  <div className="reservaciones-pend-fut-div-content">
                    <p style={{ fontSize: "2.5vh", marginBottom: "3vh" }}>
                      Tus reservaciones pendientes están en espera de
                      confirmación.
                    </p>
                    <img
                      className="relojcito"
                      src={clockWait}
                      alt="Clock"
                    ></img>
                  </div>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Tabla;
