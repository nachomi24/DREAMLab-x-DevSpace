import React, { useState, useEffect } from "react";
import "../../HU0019.css";
import Profile from "../Profile/Profile";
import Tabla from "../Tabla/Tabla";
import axios from "axios";
import fotoicono from "../../../assets/iconoperfil2.png";

const Content = ({ matricula }) => {
  const apiURLPerfil =
    "https://dreamlabapidev.azurewebsites.net/api/perfil/" + matricula;

  const [Carrera, setCarrera] = useState("");
  const [Semestre, setSemestre] = useState(0);
  const [totalPuntos, setPuntos] = useState(0);
  const [Nombre, setNombre] = useState("");
  const [Foto, setFoto] = useState("");
  const [totalUF, setUfCursando] = useState(0);
  const [puntosUF, setPuntosUF] = useState(0);
  const [puntosDefault, setPuntosDefault] = useState(0);
  const [ReservacionesConfirmadas, setReservacionesConfirmadas] = useState([]);
  const [ReservacionesNoConfirmadas, setReservacionesNoConfirmadas] = useState(
    []
  );
  const [ufIds, setUfIds] = useState([]);

  const obtencionDatosGlobal = async () => {
    try {
      const [perfilCarrera] = await Promise.all([axios.get(apiURLPerfil)]);

      const {
        Carrera,
        Semestre,
        Nombre,
        Foto,
        TotalUF,
        PuntosUF,
        PuntosDefault,
        TotalPuntos,
        UFID,
        ReservacionesConfirmadas,
        ReservacionesNoConfirmadas,
      } = perfilCarrera.data;

      setCarrera(Carrera);
      setSemestre(Semestre);
      setNombre(Nombre);
      setFoto(Foto || fotoicono);
      setPuntosUF(PuntosUF);
      setPuntosDefault(PuntosDefault);
      setPuntos(TotalPuntos);
      setUfCursando(TotalUF);
      setUfIds(UFID);
      setReservacionesConfirmadas(ReservacionesConfirmadas);
      setReservacionesNoConfirmadas(ReservacionesNoConfirmadas);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    obtencionDatosGlobal();
  }, []);

  const handlePhotoUpdate = (newPhotoURL) => {
    setFoto(newPhotoURL);
  };

  return (
    <div className="content-table-container">
      <table>
        <tbody>
          <tr>
            <td className="stylecontent">
              <div className="content-profile-container">
                <Profile
                  Matricula={matricula}
                  Carrera={Carrera}
                  Foto={Foto}
                  PuntosUF={puntosUF}
                  PuntosDefault={puntosDefault}
                  TotalPuntos={totalPuntos}
                  onPhotoUpdate={handlePhotoUpdate} // Pasar la función de actualización de foto
                />
              </div>
            </td>
            <td>
              <div className="content-tabla-container">
                <Tabla
                  Nombre={Nombre}
                  Semestre={Semestre}
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
