import "./Modal.css";

const Modal = ({ data, onClose, imagen }) => {
  const {
    TallerID,
    NombreProfesor,
    UFID,
    NombreUF,
    Nombre,
    Cupo,
    Ubicacion,
    Fecha,
    HoraInicio,
    HoraFin,
    HoraCreado,
  } = data;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        style={{ background: `url(${imagen}) no-repeat center center/cover` }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content-inside">
          <div className="modal-content-inside-header">
            <h2 className="titulito-header">{Nombre}</h2>
          </div>
          <div className="modal-content-inside-body">
            <div className="modal-content-inside-body-content">
              <div className="modal-content-inside-body-content-ubi">
                <p>📍{Ubicacion}</p>
              </div>
              <div className="modal-content-inside-body-content-uf">
                <p className="uniforma">
                  {UFID} - {NombreUF}
                </p>
                <p>Profesor(a): {NombreProfesor}</p>
              </div>
              <div className="modal-content-inside-body-content-fecha">
                <p>{Fecha}</p>
                <p className="horarie">
                  {HoraInicio} a {HoraFin}
                </p>
              </div>
              <div className="modal-content-inside-body-content-detalles">
                <div className="modal-content-inside-body-content-detalles-creado">
                  <p>Creado en:</p>
                  <p className="creadito">{HoraCreado}</p>
                </div>
                <div className="modal-content-inside-body-content-detalles-cupo">
                  <p>Cupo:</p>
                  <p className="cupito">{Cupo}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-content-inside-body-content-boton">
            <div className="modal-content-inside-body-content-boton-content">
              <a href="/reservar" className="botoncito2">
                RESERVAR
              </a>
              <button className="botoncito1" onClick={onClose}>
                CERRAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
