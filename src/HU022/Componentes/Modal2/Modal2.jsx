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
    <div className="modal-overlay-HU022" onClick={onClose}>
      <div className="modal-content-HU022" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-inside-HU022">
          <div className="modal-content-inside-header-HU022">
            <h2 className="titulito-header-HU022"></h2>
            <p className="subtitulito-header-HU022"></p>
            
          </div>
          <div className="modal-content-inside-cuerpoHU022-HU022">
            <div className="modal-content-inside-cuerpoHU022-content-HU022">
              <p className="titulito-HU022">La reserva de {NombreEstudiante} fue confirmada exitosamente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
