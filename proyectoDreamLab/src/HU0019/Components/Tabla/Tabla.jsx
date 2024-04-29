import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tabla.css";
import foto1 from "../../../assets/iaia.png";
import foto2 from "../../../assets/itit.png";
import foto3 from "../../../assets/vrvr.png";
import foto4 from "../../../assets/construye.png";
import clockWait from "../../../assets/clock.gif";

const obtenerImagenAleatoria = () => {
  const imagenes = [foto1, foto2, foto3, foto4];
  const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
  return imagenes[indiceAleatorio];
};

const ContenedorTarjetas = ({ datos, mostrarBotonCancel }) => {
  const [imagenesAleatorias, setImagenesAleatorias] = useState([]);

  useEffect(() => {
    // Generar las imágenes aleatorias una vez al cargar la página
    const imagenes = datos.map(() => obtenerImagenAleatoria());
    setImagenesAleatorias(imagenes);
  }, [datos]);

  return (
    <div className="contenedor-tarjeta-general">
      <div className="contenedor-principal-tarjetas">
        <div className="contenedor-tarjetas">
          {datos.map((dato, index) => (
            <Tarjeta
              key={dato.id}
              {...dato}
              imagenAleatoria={imagenesAleatorias[index]}
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
  imagenAleatoria,
  mostrarBotonCancel,
}) => {
  return (
    <>
      <div className="tarjeta">
        <div>
          <img
            className="tarjeta-img-inside"
            src={imagenAleatoria}
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
              <img className="relojcito" src={clockWait}></img>
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
  ReservacionesPendientes,
  ReservacionesAprobadas,
  Matricula,
}) {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [ufIds, setUfIds] = useState([]);

  const obtenerUF = async (matriculita, setUfis) => {
    try {
      const response = await axios.get(
        `https://devspaceapi.azurewebsites.net/api/perfil_UF/${matriculita}`
      );
      setUfis(response.data["UFID"]);
    } catch (error) {
      console.error("Error al obtener las UF:", error);
    }
  };

  useEffect(() => {
    obtenerUF(Matricula, setUfIds);
  }, [Matricula]);

  const toggleEye = () => {
    setIsEyeOpen(!isEyeOpen); // Cambia el estado de isEyeOpen al opuesto
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
              {!isEyeOpen &&
                ufIds.map((uf, index) => (
                  <>
                    <div style={{ marginLeft: "4vh" }}>
                      <p
                        style={{ marginRight: 0 }}
                        key={index}
                        className="p_uf_curso"
                      >
                        {uf}
                      </p>
                    </div>
                  </>
                ))}
              <i
                style={{ cursor: "pointer" }}
                className={
                  isEyeOpen ? `fa-solid fa-angle-right` : `fa-solid fa-angle-left`
                }
                onClick={toggleEye}
              ></i>
            </div>
          </td>
        </tr>
        <tr>
          <div className="reservaciones-pend-div-fut">
            <td className="reservaciones-pend-fut">
              <div className="reservaciones-pend-fut-div">
                <div className="reservaciones-pend-fut-div-title">
                  <i
                    style={{ marginRight: "15px", color: "#ABACC4" }}
                    className={"fa-solid fa-hourglass-half"}
                  ></i>
                  Reservaciones Pendientes
                </div>
                {ReservacionesPendientes &&
                ReservacionesPendientes.length !== 0 ? (
                  <ContenedorTarjetas
                    datos={ReservacionesPendientes}
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
                      RESERVAR AHORA
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
                {console.log(ReservacionesAprobadas)}
                {ReservacionesAprobadas &&
                ReservacionesAprobadas.length !== 0 ? (
                  <ContenedorTarjetas
                    datos={ReservacionesAprobadas}
                    mostrarBotonCancel={true}
                  />
                ) : (
                  <div className="reservaciones-pend-fut-div-content">
                    <p style={{ fontSize: "2.5vh", marginBottom: "3vh" }}>
                      Tus reservaciones pendientes están en espera de
                      confirmación.
                    </p>
                    <img className="relojcito" src={clockWait}></img>
                  </div>
                )}
              </div>
            </td>
          </div>
        </tr>
      </tbody>
    </table>
  );
}

export default Tabla;
