import { useState } from "react";
import './TarjetasA.css';
import Modal from '../Modal/Modal.jsx';

function TarjetasA({ datos }) {
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
    <>
      <div onClick={() => handleOpenModal({
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
      })} className="tarjeta-reserva">
        <div className="info-container">
          <div className="tarjeta-reserva-info">
            <h2>{NombreEstudiante}</h2>
            <p>{NombreSala}</p>
            <p>{convertirHora(HoraInicio)} - {convertirHora(HoraFin)}</p>
          </div>
          <div className="tarjeta-reserva-botones">
            <button>DETALLES</button>
            <button>CONFIRMAR</button>
            <button>RECHAZAR</button>
          </div>
        </div>
      </div>
    </>
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
