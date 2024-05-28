import "../../HU022.css";

const Modal = ({ data, onClose }) => {
  const {
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
  } = data;

  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  // Cambiar el formato de la fecha
  const convertirFecha = (fecha) => {
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-inside">
          <div className="modal-content-inside-header">
            <h2 className="titulito-header">{NombreEstudiante}</h2>
            <p className="subtitulito-header">Detalles</p>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="modal-content-inside-body-2">
            <div className="modal-content-inside-body-content-2">
              <p className="titulito">Lugar: {NombreSala}</p>
              <p className="titulito">Hora: {convertirHora(HoraInicio)} - {convertirHora(HoraFin)}</p>
              <p className="titulito">Fecha: {convertirFecha(Dia)}</p>
              <p className="titulito">Cantidad: {Personas}</p>
              <p className="titulito">Recursos: {Recursos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
