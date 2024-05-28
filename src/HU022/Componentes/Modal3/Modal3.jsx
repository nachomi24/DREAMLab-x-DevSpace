import "../../HU022.css";

const Modal2 = ({ data, onClose }) => {
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-inside">
          <div className="modal-content-inside-header">
            <h2 className="titulito-header"></h2>
            <p className="subtitulito-header"></p>
            
          </div>
          <div className="modal-content-inside-body">
            <div className="modal-content-inside-body-content">
              <p className="titulito">La reserva de {NombreEstudiante} fue rechazada exitosamente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
