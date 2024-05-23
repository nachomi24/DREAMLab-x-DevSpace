import { useState, useEffect } from "react";
import axios from 'axios';
import './TarjetasA.css';
import Modal from '../Modal/Modal.jsx';
import Modal2 from '../Modal2/Modal2.jsx';
import Modal3 from '../Modal3/Modal3.jsx';

function TarjetasA({ datos, actualizarReservaciones }) {
  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const [selectedReserva, setSelectedReserva] = useState(null);
  const [reservacionesPendientes, setReservacionesPendientes] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalData2, setModalData2] = useState(null);
  const [selectedSala, setSelectedSala] = useState(''); // Nuevo estado para la sala seleccionada

  useEffect(() => {
    const reservacionesPendientesFiltradas = datos.filter(reserva => reserva.Confirmada === 0);
    setReservacionesPendientes(reservacionesPendientesFiltradas);
  }, [datos]);

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
    try {
      console.log("Datos enviados para confirmar:", { reservacionId: id });
      const response = await axios.put(`https://dreamlabapidev.azurewebsites.net/api/confirmar_reservacion?reservacionId=${id}`, null, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Respuesta del servidor:", response.data);
      actualizarReservaciones(id);
      setModalData(reserva);
    } catch (error) {
      console.error("Error al confirmar la reservación", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        if (error.response.data.detail) {
          console.error("Detalles específicos del error:", error.response.data.detail);
        }
      }
    }
  };

  const rechazarReservacion = async (id, reserva) => {
    try {
      console.log("Datos enviados para rechazar:", { reservacionId: id });
      const response = await axios.delete(`https://dreamlabapidev.azurewebsites.net/api/rechazar_reservacion?reservacionId=${id}`, null, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Respuesta del servidor:", response.data);
      actualizarReservaciones(id);
      setModalData2(reserva);
    } catch (error) {
      console.error("Error al rechazar la reservación", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        if (error.response.data.detail) {
          console.error("Detalles específicos del error:", error.response.data.detail);
        }
      }
    }
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
    Confirmada
  }) => (
    <div className="tarjeta-reserva">
      <div className="info-container">
        <div className="tarjeta-reserva-info">
          <h2>{NombreEstudiante}</h2>
          <p>{NombreSala}</p>
          <p>{convertirHora(HoraInicio)} - {convertirHora(HoraFin)}</p>
        </div>
        <div className="tarjeta-reserva-botones">
          <button onClick={() => handleOpenModal({
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
            Confirmada
          })}>DETALLES</button>
          <button onClick={() => confirmarReservacion(ReservacionID, {
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
            Confirmada
          })}>CONFIRMAR</button>
          <button onClick={() => rechazarReservacion(ReservacionID, {
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
            Confirmada
          })}>RECHAZAR</button>
        </div>
      </div>
    </div>
  );

  const salasUnicas = [...new Set(datos.map(reserva => reserva.NombreSala))]; // Obtener salas únicas

  return (
    <div className="contenedor-tarjeta-general">
      <div className="contenedor-principal-tarjetas">
        <div className="contenedor-tarjetas">
          <h1>RESERVACIONES PENDIENTES</h1>
          <div className="contenedor-filtros">
            <label htmlFor="sala-select">Filtrar por sala: </label>
            <select
              id="sala-select"
              value={selectedSala}
              onChange={(e) => setSelectedSala(e.target.value)}
            >
              <option value="">Todas las salas</option>
              {salasUnicas.map((sala, index) => (
                <option key={index} value={sala}>{sala}</option>
              ))}
            </select>
          </div>
          {reservacionesPendientes
            .filter(reserva => selectedSala === '' || reserva.NombreSala === selectedSala)
            .map((dato) => (
              <Tarjeta key={dato.ReservacionID} {...dato} />
            ))}
        </div>
      </div>
      {selectedReserva && (
        <Modal
          data={selectedReserva}
          onClose={handleCloseModal}
        />
      )}
      {modalData && (
        <Modal2
          data={modalData}
          onClose={handleCloseModal}
        />
      )}
      {modalData2 && (
        <Modal3
          data={modalData2}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default TarjetasA;
