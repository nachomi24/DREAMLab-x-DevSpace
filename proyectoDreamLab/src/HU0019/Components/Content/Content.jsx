import React, { useState, useEffect } from "react";
import "./Content.css";
import Profile from "../Profile/Profile";
import Tabla from "../Tabla/Tabla";
import axios from "axios";

const Content = ({ matricula }) => {
  const apiURLPerfil =
    "https://devspaceapi.azurewebsites.net/api/perfil/" + matricula;
  const apiURLPerfilCarrera =
    "https://devspaceapi.azurewebsites.net/api/perfil/carrera/" + matricula;
  const apiURLReservaciones =
    "https://devspaceapi.azurewebsites.net/api/consulta-reservacion/" +
    matricula;
  const apiURLUF =
    "https://devspaceapi.azurewebsites.net/api/perfil_UF/" + matricula;

  const [Carrera, setCarrera] = useState("");
  const [totalPuntos, setPuntos] = useState(0);
  const [Nombre, setNombre] = useState("");
  const [Foto, setFoto] = useState("");
  const [totalUF, setUfCursando] = useState(0);
  const [ReservacionesAprobadas, setReservacionesAprobadas] = useState([]);
  const [ReservacionesPendientes, setReservacionesPendientes] = useState([]);

  const obtencionDatosGlobal = async () => {
    try {
      // Realizar todas las solicitudes en paralelo utilizando Promise.all()
      const [perfilCarrera, perfilPuntosUF, datosReservaciones] =
        await Promise.all([
          axios.get(apiURLPerfilCarrera),
          axios.get(apiURLPerfil),
          axios.get(apiURLReservaciones),
          axios.get(apiURLUF),
        ]);

      // Manejar la respuesta de perfilCarrera
      const { Carrera, Nombre, Foto } = perfilCarrera.data;
      setCarrera(Carrera);
      setNombre(Nombre);
      setFoto(Foto);

      // Manejar la respuesta de perfilPuntosUF
      const { TotalPuntos, TotalUF } = perfilPuntosUF.data;
      setPuntos(TotalPuntos);
      setUfCursando(TotalUF);

      // Manejar la respuesta de datosReservaciones
      const [aprobadas, pendientes] = datosReservaciones.data;
      setReservacionesAprobadas(aprobadas);
      setReservacionesPendientes(pendientes);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    obtencionDatosGlobal();
  });

  return (
    <div className="table-container">
      <table>
        <tbody>
          <tr>
            <td
              style={{ display: "flex", alignItems: "start", margin: "0 20px" }}
            >
              <div className="profile-container">
                <Profile
                  Matricula={matricula}
                  Carrera={Carrera}
                  Foto={Foto}
                  TotalPuntos={totalPuntos}
                />
              </div>
            </td>
            <td>
              <div className="tabla-container">
                <Tabla
                  Nombre={Nombre}
                  TotalUF={totalUF}
                  ReservacionesPendientes={ReservacionesPendientes}
                  ReservacionesAprobadas={ReservacionesAprobadas}
                  Matricula={matricula}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Content;
