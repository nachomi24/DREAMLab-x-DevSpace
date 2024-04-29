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

//aqui falta

function Tabla({
  Nombre,
  TotalUF,
  ReservacionesNoConfirmadas,
  ReservacionesConfirmadas,
  Matricula,
  UfIds,
}) {
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const toggleEye = () => {
    setIsEyeOpen(!isEyeOpen); // Cambia el estado de isEyeOpen al opuesto
  };

  return (
    <table className="tablaestilo">
      <tbody>
        <tr>
          <td className="nombre_perfil" colSpan={2}>
            <i
              style={{ marginRight: "25px", color: "black" }}
              className={"fa-solid fa-user"}
            ></i>
            {Nombre} - {Matricula}
          </td>
        </tr>
        <tr>
          <td className="uf_curso" colSpan={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <i
                style={{ marginRight: "15px", color: "black" }}
                className={"fa-solid fa-spinner"}
              ></i>
              <p className="p_uf_curso">UF en curso:</p>
              <p className="uf_curso">{TotalUF}</p>
              <i
                style={{ cursor: "pointer" }}
                className={
                  isEyeOpen ? `fa-solid fa-angle-right` : `fa-solid fa-minus`
                }
                onClick={toggleEye}
              ></i>
              {!isEyeOpen &&
                UfIds.map((uf, index) => (
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
            </div>
          </td>
        </tr>
        <tr>
          <div className="reservaciones-pend-div-fut">
            <td className="reservaciones-pend-fut">
              <div className="reservaciones-pend-fut-div">
                <div className="reservaciones-pend-fut-div-title">
                  <i
                    style={{ marginRight: "15px" }}
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
                    style={{ marginRight: "15px" }}
                    className={"fa-solid fa-clock-rotate-left"}
                  ></i>
                  Reservaciones Futuras
                </div>
                <br />
                {console.log(ReservacionesConfirmadas)}
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