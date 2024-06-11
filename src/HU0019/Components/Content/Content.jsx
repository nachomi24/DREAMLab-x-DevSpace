import React, { useState, useEffect } from "react";
import "../../HU0019.css";
import Profile from "../Profile/Profile";
import ProfileProfesor from "../Profile/ProfileProfesor";
import Tabla from "../Tabla/Tabla";
import TablaProfesor from "../Tabla/TablaProfesor";
import axios from "axios";
import fotoicono from "../../../assets/iconoperfil2.png";

const Content = ({ matricula }) => {
  const apiURLPerfilEstudiante =
    "https://dreamlabapidev.azurewebsites.net/api/perfil_estudiante/" +
    matricula;

  const apiURLPerfilProfesor =
    "https://dreamlabapidev.azurewebsites.net/api/perfil_profesor/" + matricula;

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

  const [totalPuntosProfesor, setPuntosProfesor] = useState(0);
  const [NombreProfesor, setNombreProfesor] = useState("");
  const [FotoProfesor, setFotoProfesor] = useState("");
  const [totalUFProfesor, setUfImpartiendoProfesor] = useState(0);
  const [puntosUFProfesor, setPuntosUFProfesor] = useState(0);
  const [puntosDefaultProfesor, setPuntosDefaultProfesor] = useState(0);
  const [
    ReservacionesConfirmadasProfesor,
    setReservacionesConfirmadasProfesor,
  ] = useState([]);
  const [
    ReservacionesNoConfirmadasProfesor,
    setReservacionesNoConfirmadasProfesor,
  ] = useState([]);
  const [ufIdsProfesor, setUfIdsProfesor] = useState([]);

  const obtencionDatosGlobal = async () => {
    try {
      const [perfilCarrera] = await Promise.all([
        axios.get(apiURLPerfilEstudiante),
      ]);

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

  const obtencionDatosGlobalProfesor = async () => {
    try {
      const [perfilProfesor] = await Promise.all([
        axios.get(apiURLPerfilProfesor),
      ]);

      const {
        Nombre,
        Foto,
        TotalUF,
        PuntosUF,
        PuntosDefault,
        TotalPuntos,
        UFID,
        ReservacionesConfirmadas,
        ReservacionesNoConfirmadas,
      } = perfilProfesor.data;

      setNombreProfesor(Nombre);
      setFotoProfesor(Foto || fotoicono);
      setPuntosUFProfesor(PuntosUF);
      setPuntosDefaultProfesor(PuntosDefault);
      setPuntosProfesor(TotalPuntos);
      setUfImpartiendoProfesor(TotalUF);
      setUfIdsProfesor(UFID);
      setReservacionesConfirmadasProfesor(ReservacionesConfirmadas);
      setReservacionesNoConfirmadasProfesor(ReservacionesNoConfirmadas);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType === "alumno") {
      obtencionDatosGlobal();
    } else if (userType === "profesor") {
      obtencionDatosGlobalProfesor();
    }
  }, []);

  const handlePhotoUpdate = (newPhotoURL) => {
    setFoto(newPhotoURL);
  };

  const handlePhotoProfesorUpdate = (newPhotoURL) => {
    setFotoProfesor(newPhotoURL);
  };

  const userType = localStorage.getItem("userType");

  return (
    <div className="content-table-container">
      <table>
        <tbody>
          {userType === "alumno" ? (
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
          ) : userType === "profesor" ? (
            <tr>
              <td className="stylecontent">
                <div className="content-profile-container">
                  <ProfileProfesor
                    Nomina={matricula}
                    Nombre={NombreProfesor}
                    Foto={FotoProfesor}
                    PuntosUF={puntosUFProfesor}
                    PuntosDefault={puntosDefaultProfesor}
                    TotalPuntos={totalPuntosProfesor}
                    onPhotoUpdate={handlePhotoProfesorUpdate} // Pasar la función de actualización de foto
                  />
                </div>
              </td>
              <td>
                <div className="content-tabla-container">
                  <TablaProfesor
                    Nombre={NombreProfesor}
                    TotalUF={totalUFProfesor}
                    ReservacionesNoConfirmadas={
                      ReservacionesNoConfirmadasProfesor
                    }
                    ReservacionesConfirmadas={ReservacionesConfirmadasProfesor}
                    Nomina={matricula}
                    UfIds={ufIdsProfesor}
                  />
                </div>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="2">No se pudo determinar el tipo de usuario.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Content;
