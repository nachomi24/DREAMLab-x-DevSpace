import React, { useState, useEffect } from "react";
import "./Content.css";
import Profile from "../Profile/Profile";
import Tabla from "../Tabla/Tabla";
import axios from "axios";

const Content = ({ matricula }) => {
  const apiURLPerfil = "http://localhost:8000/api/perfil/" + matricula;

  const [Carrera, setCarrera] = useState("");
  const [totalPuntos, setPuntos] = useState(0);
  const [Nombre, setNombre] = useState("");
  const [Foto, setFoto] = useState("");
  const [totalUF, setUfCursando] = useState(0);
  const [ReservacionesConfirmadas, setReservacionesConfirmadas] = useState([]);
  const [ReservacionesNoConfirmadas, setReservacionesNoConfirmadas] = useState(
    []
  );
  const [ufIds, setUfIds] = useState([]);

  const obtencionDatosGlobal = async () => {
    try {
      // Realizar todas las solicitudes en paralelo utilizando Promise.all()
      const [perfilCarrera] = await Promise.all([axios.get(apiURLPerfil)]);

      console.log(perfilCarrera.data);

      // Manejar la respuesta de perfilCarrera
      const {
        Carrera,
        Nombre,
        Foto,
        TotalUF,
        TotalPuntos,
        UFID,
        ReservacionesConfirmadas,
        ReservacionesNoConfirmadas,
      } = perfilCarrera.data;
      setCarrera(Carrera);
      setNombre(Nombre);
      setFoto(Foto);
      setPuntos(TotalPuntos);
      setUfCursando(TotalUF);
      setUfIds(UFID);
      setReservacionesConfirmadas(ReservacionesConfirmadas);
      setReservacionesNoConfirmadas(ReservacionesNoConfirmadas);

      console.log("Reservaciones aprobadas:", ReservacionesConfirmadas);
      console.log("Reservaciones pendientes:", ReservacionesNoConfirmadas);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
//correcto
  useEffect(() => {
    obtencionDatosGlobal();
  }, []);

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
                  ReservacionesNoConfirmadas={ReservacionesNoConfirmadas}
                  ReservacionesConfirmadas={ReservacionesConfirmadas}
                  Matricula={matricula}
                  UfIds={ufIds}
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
