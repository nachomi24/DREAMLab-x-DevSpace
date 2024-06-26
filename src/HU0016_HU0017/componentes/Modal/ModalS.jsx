import Descripcion from "../../../HU008/componentes/descripcion/Descripcion";

const ModalS = ({ data, onClose, imagen }) => {
  const {
    SalaID,
    Nombre,
    Cupo,
    Recursos,
    HoraInicio,
    HoraFin,
    Foto,
    Descripcion,
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

  // Función para calcular el tiempo transcurrido
  const calcularTiempoTranscurrido = (fechaCreado) => {
    const fechaCreadoMs = new Date(fechaCreado).getTime();
    const fechaActualMs = new Date().getTime();
    const diferenciaMs = fechaActualMs - fechaCreadoMs;

    // Convertir la diferencia a segundos, minutos, horas y días
    const segundos = Math.floor(diferenciaMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      return `Hace ${dias} día${dias > 1 ? "s" : ""}`;
    } else if (horas > 0) {
      return `Hace ${horas} hora${horas > 1 ? "s" : ""}`;
    } else if (minutos > 0) {
      return `Hace ${minutos} minuto${minutos > 1 ? "s" : ""}`;
    } else {
      return `Hace unos segundos`;
    }
  };

  return (
    <div className="modal-overlay016" onClick={onClose}>
      <div
        style={{ background: `url(${Foto}) no-repeat center center/cover` }}
        className="modal-content016"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content016-inside">
          <div className="modal-content016-inside-header">
            <h2 className="titulito-header">
              {SalaID} - {Nombre}
            </h2>
          </div>
          <div className="modal-content016-inside-body">
            <div className="modal-content016-inside-body-content">
              <div className="modal-content016-inside-body-content-uf">
                <p className="uniforma">{Descripcion}</p>
                <p>Recursos: {Recursos}</p>
              </div>
              <div className="modal-content016-inside-body-content-detalles">
                <div className="modal-content016-inside-body-content-detalles-creado">
                  <p>Disponibilidad:</p>
                  <p className="creadito">
                    {convertirHora(HoraInicio)} a {convertirHora(HoraFin)}
                  </p>
                </div>
                <div className="modal-content016-inside-body-content-detalles-cupo">
                  <p>Cupo:</p>
                  <p className="cupito">{Cupo} personas</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-content016-inside-body-content-boton">
            <div className="modal-content016-inside-body-content-boton-content">
              <button className="botoncito1016" onClick={onClose}>
                CERRAR
              </button>
              <a href="/reservar" className="botoncito2016">
                RESERVAR
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalS;
