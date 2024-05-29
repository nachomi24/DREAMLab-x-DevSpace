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
    <div className="modal-overlay-HU022" onClick={onClose}>
      <div className="modal-content-HU022" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content-inside-HU022">
          <div className="modal-content-inside-header-HU022">
            <h2 className="titulito-header-HU022">{NombreEstudiante}</h2>
            <p className="subtitulito-header-HU022">Detalles</p>
            <button className="close-button-HU022" onClick={onClose}>×</button>
          </div>
          <div className="modal-content-inside-cuerpoHU022-2-HU022">
            <div className="modal-content-inside-cuerpoHU022-content-2-HU022">
              <p className="titulito-HU022">Lugar: {NombreSala}</p>
              <p className="titulito-HU022">Hora: {convertirHora(HoraInicio)} - {convertirHora(HoraFin)}</p>
              <p className="titulito-HU022">Fecha: {convertirFecha(Dia)}</p>
              <p className="titulito-HU022">Cantidad: {Personas}</p>
              <p className="titulito-HU022">Recursos: {Recursos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
