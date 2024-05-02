import React from "react";
import "./Tabla.css";
import foto1 from "../../../assets/iaia.png";
import clockWait from "../../../assets/clock.gif";

const ContenedorTarjetas = ({ datos, mostrarBotonCancel }) => {
  return (
    <div className="contenedor-tarjeta-general">
      <div className="contenedor-principal-tarjetas">
        <div className="contenedor-tarjetas">
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
  console.log("Propiedades recibidas en Tarjeta:", SalaID, Dia, HoraInicio, NombreSala, mostrarBotonCancel);
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
          <div className="info-container">
            <p>{Dia}</p>
            <p>{HoraInicio}</p>
          </div>
          <div className="info-detail-cl-bt">
            {mostrarBotonCancel ? (
              <button className="botoncito1">Cancelar</button>
            ) : (
              <img className="relojcito" src={clockWait} alt="Clock"></img>
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
          <td className="nombre_perfil" colSpan={2}>
            <i
              style={{ marginRight: "25px", color: "#ABACC4" }}
              className={"fa-solid fa-user"}
            ></i>
            {Nombre} - {Matricula}
          </td>
        </tr>
        <tr>
          <td className="uf_curso" colSpan={2}>
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
                  isEyeOpen ? `fa-solid fa-angle-right` : `fa-solid fa-angle-left`
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
              <br />
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
                    className="botoncito2"
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
              <br />
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
