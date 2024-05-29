import React from "react";
import '../../HU0019.css';
import foto1 from "../../../assets/iaia.png";
import clockWait from "../../../assets/clock.gif";

const ContenedorTarjetas = ({ datos, mostrarBotonCancel }) => {
  return (
    <div className="contenedor-tarjeta-general019">
      <div className="contenedor-principal-tarjetas019">
        <div className="contenedor-tarjetas019">
          {datos.map((dato) => (
            <Tarjeta
              key={dato.id}
              {...dato}
              mostrarBotonCancel={mostrarBotonCancel}
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
          <img
            className="tarjeta-img-inside"
            src={foto1} // Siempre utiliza la imagen foto1
            alt={NombreSala}
          />
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
              <button className="botoncito1019">Cancelar</button>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img className="relojcito" src={clockWait} alt="Clock"></img>
                <p style={{ marginLeft: "15px", fontSize: "1.25vw" }}>
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
  ReservacionesConfirmadas,
  Matricula,
  UfIds,
}) {
  console.log("ReservacionesNoConfirmadas:", ReservacionesNoConfirmadas);
  console.log("ReservacionesConfirmadas:", ReservacionesConfirmadas);

  console.log("Renderizando Tabla...");
  const [isEyeOpen, setIsEyeOpen] = React.useState(false);

  const toggleEye = () => {
    console.log("Cambiando estado de isEyeOpen...");
    setIsEyeOpen(!isEyeOpen);
  };

  return (
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
        <tr>
          <td className="reservaciones-pend-fut">
            <div className="reservaciones-pend-fut-div">
              <div className="reservaciones-pend-fut-div-title">
                <i
                  style={{ marginRight: "15px", color: "#ABACC4" }}
                  className={"fa-solid fa-hourglass-half"}
                ></i>
                Reservaciones Pendientes
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
                    Aún no has realizado una reservación. Haz click en el botón
                    de abajo para realizar tu primera reservación.{" "}
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
                Reservaciones Futuras
              </div>
              {ReservacionesConfirmadas &&
              ReservacionesConfirmadas.length !== 0 ? (
                <ContenedorTarjetas
                  datos={ReservacionesConfirmadas}
                  mostrarBotonCancel={true}
                />
              ) : (
                <div className="reservaciones-pend-fut-div-content">
                  <p style={{ fontSize: "2.5vh", marginBottom: "3vh" }}>
                    Tus reservaciones pendientes están en espera de
                    confirmación.
                  </p>
                  <img className="relojcito" src={clockWait} alt="Clock"></img>
                </div>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Tabla;
