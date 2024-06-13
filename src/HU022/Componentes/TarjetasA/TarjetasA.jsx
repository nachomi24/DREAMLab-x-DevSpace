import { useState, useEffect } from "react";
import axios from "axios";
import "../../HU022.css";
import Modal from "../Modal/Modal.jsx";
import Modal2 from "../Modal2/Modal2.jsx";
import Modal3 from "../Modal3/Modal3.jsx";

function TarjetasA({ apiURLADMINREstudiante, apiURLADMINRProfesor }) {
  const [reservaciones, setReservaciones] = useState([]);
  const [userType, setUserType] = useState("alumno");
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [reservacionesPendientes, setReservacionesPendientes] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalData2, setModalData2] = useState(null);
  const [selectedSala, setSelectedSala] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [reservaToConfirm, setReservaToConfirm] = useState(null);
  const [showPopUpReject, setShowPopUpReject] = useState(false);
  const [reservaToReject, setReservaToReject] = useState(null);

  const obtenerReservaciones = async () => {
    try {
      const apiURL =
        userType === "alumno" ? apiURLADMINREstudiante : apiURLADMINRProfesor;
      const response = await axios.get(apiURL);
      console.log("Datos recibidos:", response.data);
      setReservaciones(response.data);
    } catch (error) {
      console.error("Error al obtener los datos de la reserva admin", error);
    }
  };

  useEffect(() => {
    obtenerReservaciones();
  }, [userType]);

  useEffect(() => {
    const reservacionesPendientesFiltradas = reservaciones.filter(
      (reserva) => reserva.Confirmada === 0
    );
    setReservacionesPendientes(reservacionesPendientesFiltradas);
  }, [reservaciones]);

  useEffect(() => {
    if (modalData) {
      const timer = setTimeout(() => {
        setModalData(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [modalData]);

  useEffect(() => {
    if (modalData2) {
      const timer = setTimeout(() => {
        setModalData2(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [modalData2]);

  const handleOpenModal = (reserva) => {
    setSelectedReserva(reserva);
  };

  const handleCloseModal = () => {
    setSelectedReserva(null);
    setModalData(null);
    setModalData2(null);
  };

  const confirmarReservacion = async (id, reserva) => {
    if (userType === "alumno") {
      try {
        console.log("Datos enviados para confirmar:", { reservacionId: id });
        const response = await axios.put(
          `https://dreamlabapidev.azurewebsites.net/api/confirmar_reservacion_estudiante?reservacionId=${id}`,
          null,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Respuesta del servidor:", response.data);
        setReservaciones((prevReservaciones) =>
          prevReservaciones.filter((reserva) => reserva.ReservacionID !== id)
        );
        setModalData(reserva);
      } catch (error) {
        console.error("Error al confirmar la reservación", error);
        if (error.response) {
          console.error("Detalles del error:", error.response.data);
          if (error.response.data.detail) {
            console.error(
              "Detalles específicos del error:",
              error.response.data.detail
            );
          }
        }
      }
    } else {
      try {
        console.log("Datos enviados para confirmar:", { reservacionId: id });
        const response = await axios.put(
          `https://dreamlabapidev.azurewebsites.net/api/confirmar_reservacion_profesor?reservacionId=${id}`,
          null,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Respuesta del servidor:", response.data);
        setReservaciones((prevReservaciones) =>
          prevReservaciones.filter((reserva) => reserva.ReservacionID !== id)
        );
        setModalData(reserva);
      } catch (error) {
        console.error("Error al confirmar la reservación", error);
        if (error.response) {
          console.error("Detalles del error:", error.response.data);
          if (error.response.data.detail) {
            console.error(
              "Detalles específicos del error:",
              error.response.data.detail
            );
          }
        }
      }
    }
  };

  const rechazarReservacion = async (id, reserva) => {
    if (userType === "alumno") {
      try {
        console.log("Datos enviados para rechazar:", { reservacionId: id });
        const response = await axios.delete(
          `https://dreamlabapidev.azurewebsites.net/api/rechazar_reservacion_estudiante?reservacionId=${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Respuesta del servidor:", response.data);
        setReservaciones((prevReservaciones) =>
          prevReservaciones.filter((reserva) => reserva.ReservacionID !== id)
        );
        setModalData2(reserva);
      } catch (error) {
        console.error("Error al rechazar la reservación", error);
        if (error.response) {
          console.error("Detalles del error:", error.response.data);
          if (error.response.data.detail) {
            console.error(
              "Detalles específicos del error:",
              error.response.data.detail
            );
          }
        }
      }
    } else {
      try {
        console.log("Datos enviados para rechazar:", { reservacionId: id });
        const response = await axios.delete(
          `https://dreamlabapidev.azurewebsites.net/api/rechazar_reservacion_profesor?reservacionId=${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Respuesta del servidor:", response.data);
        setReservaciones((prevReservaciones) =>
          prevReservaciones.filter((reserva) => reserva.ReservacionID !== id)
        );
        setModalData2(reserva);
      } catch (error) {
        console.error("Error al rechazar la reservación", error);
        if (error.response) {
          console.error("Detalles del error:", error.response.data);
          if (error.response.data.detail) {
            console.error(
              "Detalles específicos del error:",
              error.response.data.detail
            );
          }
        }
      }
    }
  };

  const handleConfirmarClick = (reserva) => {
    setReservaToConfirm(reserva);
    setShowPopUp(true);
  };

  const handlePopUpClose = () => {
    setShowPopUp(false);
    setReservaToConfirm(null);
  };

  const handlePopUpConfirm = async () => {
    if (reservaToConfirm) {
      await confirmarReservacion(
        reservaToConfirm.ReservacionID,
        reservaToConfirm
      );
      handlePopUpClose();
    }
  };

  const handleRechazarClick = (reserva) => {
    setReservaToReject(reserva);
    setShowPopUpReject(true);
  };

  const handlePopUpRejectClose = () => {
    setShowPopUpReject(false);
    setReservaToReject(null);
  };

  const handlePopUpRejectConfirm = async () => {
    if (reservaToReject) {
      await rechazarReservacion(reservaToReject.ReservacionID, reservaToReject);
      handlePopUpRejectClose();
    }
  };

  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const Tarjeta = ({
    ReservacionID,
    Matricula,
    NombreEstudiante,
    NombreSala,
    SalaID,
    Dia,
    HoraInicio,
    HoraFin,
    Recursos,
    Personas,
    Confirmada,
  }) => (
    <div className="tarjeta-reserva-HU022">
      <div className="info-container-HU022">
        <div className="tarjeta-reserva-info-HU022">
          <h2 className="h2HU022">{NombreEstudiante}</h2>
          <p>{NombreSala}</p>
          <p>
            {convertirHora(HoraInicio)} - {convertirHora(HoraFin)}
          </p>
        </div>
        <div className="tarjeta-reserva-botones-HU022">
          <button
            onClick={() =>
              handleOpenModal({
                ReservacionID,
                Matricula,
                NombreEstudiante,
                NombreSala,
                SalaID,
                Dia,
                HoraInicio,
                HoraFin,
                Recursos,
                Personas,
                Confirmada,
              })
            }
          >
            DETALLES
          </button>
          <button
            onClick={() =>
              handleConfirmarClick({
                ReservacionID,
                Matricula,
                NombreEstudiante,
                NombreSala,
                SalaID,
                Dia,
                HoraInicio,
                HoraFin,
                Recursos,
                Personas,
                Confirmada,
              })
            }
          >
            CONFIRMAR
          </button>
          <button
            onClick={() =>
              handleRechazarClick({
                ReservacionID,
                Matricula,
                NombreEstudiante,
                NombreSala,
                SalaID,
                Dia,
                HoraInicio,
                HoraFin,
                Recursos,
                Personas,
                Confirmada,
              })
            }
          >
            RECHAZAR
          </button>
        </div>
      </div>
    </div>
  );

  const salasUnicas = [
    ...new Set(reservaciones.map((reserva) => reserva.NombreSala)),
  ];

  return (
    <div className="contenedor-tarjeta-general-HU022">
      <div className="contenedor-principal-tarjetas-HU022">
        <div className="contenedor-tarjetas-HU022">
          <h1 className="h1HU022">RESERVACIONES PENDIENTES</h1>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="contenedor-filtros-HU022">
              <label htmlFor="user-type-select">Tipo Usuario: </label>
              <select
                id="user-type-select"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="alumno">Estudiante</option>
                <option value="profesor">Profesor</option>
              </select>
            </div>
            <div className="contenedor-filtros-HU022">
              <label htmlFor="sala-select">Filtrar por sala: </label>
              <select
                id="sala-select"
                value={selectedSala}
                onChange={(e) => setSelectedSala(e.target.value)}
              >
                <option value="">Todas las salas</option>
                {salasUnicas.map((sala, index) => (
                  <option key={index} value={sala}>
                    {sala}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {reservacionesPendientes
            .filter(
              (reserva) =>
                selectedSala === "" || reserva.NombreSala === selectedSala
            )
            .map((dato) => (
              <Tarjeta key={dato.ReservacionID} {...dato} />
            ))}
        </div>
      </div>
      {selectedReserva && (
        <Modal data={selectedReserva} onClose={handleCloseModal} />
      )}
      {showPopUp && (
        <Modal2 onClose={handlePopUpClose} onConfirm={handlePopUpConfirm} />
      )}
      {showPopUpReject && (
        <Modal3
          onClose={handlePopUpRejectClose}
          onConfirm={handlePopUpRejectConfirm}
        />
      )}
    </div>
  );
}

export default TarjetasA;
