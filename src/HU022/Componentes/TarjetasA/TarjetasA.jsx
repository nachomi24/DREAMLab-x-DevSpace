import { useState, useEffect } from "react";
import axios from 'axios';
import './TarjetasA.css';
import Modal from '../Modal/Modal.jsx';

function TarjetasA({ datos, actualizarReservaciones }) {
  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const [selectedReserva, setSelectedReserva] = useState(null);
  const [reservacionesPendientes, setReservacionesPendientes] = useState([]);

  useEffect(() => {
    // Filtrar reservaciones pendientes al cargar o actualizar
    const reservacionesPendientesFiltradas = datos.filter(reserva => reserva.Confirmada === 0);
    setReservacionesPendientes(reservacionesPendientesFiltradas);
  }, [datos]); // Escuchar cambios en 'datos'

  const handleOpenModal = (reserva) => {
    setSelectedReserva(reserva);
  };

  const handleCloseModal = () => {
    setSelectedReserva(null);
  };

  const confirmarReservacion = async (id) => {
    try {
      console.log("Datos enviados para confirmar:", { reservacionId: id });
      const response = await axios.put(`https://devspaceapi2.azurewebsites.net/api/confirmar_reservacion?reservacionId=${id}`, null, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Respuesta del servidor:", response.data);
      actualizarReservaciones(id);
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

  const rechazarReservacion = async (id) => {
    try {
      console.log("Datos enviados para rechazar:", { reservacionId: id });
      const response = await axios.delete(`https://devspaceapi2.azurewebsites.net/api/rechazar_reservacion?reservacionId=${id}`, null, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Respuesta del servidor:", response.data);
      actualizarReservaciones(id);
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
          <button onClick={() => confirmarReservacion(ReservacionID)}>CONFIRMAR</button>
          <button onClick={() => rechazarReservacion(ReservacionID)}>RECHAZAR</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="contenedor-tarjeta-general">
      <div className="contenedor-principal-tarjetas">
        <div className="contenedor-tarjetas">
          <h1>RESERVACIONES PENDIENTES</h1>
          {reservacionesPendientes.length > 0 ? (
            reservacionesPendientes.map((dato) => (
              <Tarjeta key={dato.ReservacionID} {...dato} />
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
      {selectedReserva && (
        <Modal
          data={selectedReserva}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default TarjetasA;



/*
Lo que no tiene este codigo es que acomoda las reservaciones aun cuando no se han confirmado, osea estaban las q estaban en 1 AHÍ, aqui las quite y solo aparecen las q estan 0
import { useState } from "react";
import axios from 'axios';
import './TarjetasA.css';
import Modal from '../Modal/Modal.jsx';

function TarjetasA({ datos, actualizarReservaciones }) {
  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const [selectedReserva, setSelectedReserva] = useState(null);

  const handleOpenModal = (reserva) => {
    setSelectedReserva(reserva);
  };

  const handleCloseModal = () => {
    setSelectedReserva(null);
  };

  const confirmarReservacion = async (id) => {
    try {
      console.log("Datos enviados para confirmar:", { reservacionId: id });
      const response = await axios.put(`http://localhost:8000/api/confirmar_reservacion?reservacionId=${id}`, null, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Respuesta del servidor:", response.data);
      actualizarReservaciones(id);
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

  const rechazarReservacion = async (id) => {
    try {
      console.log("Datos enviados para rechazar:", { reservacionId: id });
      const response = await axios.delete(`http://localhost:8000/api/rechazar_reservacion?reservacionId=${id}`, null, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Respuesta del servidor:", response.data);
      actualizarReservaciones(id);
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
  
  /*
  const rechazarReservacion = async (id) => {
    try {
      const data = { reservacionId: id };
      console.log("Datos enviados para rechazar:", data);
      const response = await axios.delete('http://localhost:8000/api/rechazar_reservacion?reservacionId=${id}', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Respuesta del servidor:", response.data);
      actualizarReservaciones(id);
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


  */

  /*
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
          <button onClick={() => confirmarReservacion(ReservacionID)}>CONFIRMAR</button>
          <button onClick={() => rechazarReservacion(ReservacionID)}>RECHAZAR</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="contenedor-tarjeta-general">
      <div className="contenedor-principal-tarjetas">
        <div className="contenedor-tarjetas">
          <h1>RESERVACIONES PENDIENTES</h1>
          {datos && datos.length > 0 && datos.map((dato) => (
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
    </div>
  );
}

export default TarjetasA;

*/