const Tarjeta = ({
  SalaID,
  Dia,
  HoraInicio,
  NombreSala,
  imagenAleatoria,
  mostrarBotonCancel,
}) => {
  return (
    <>
      <div className="tarjeta">
        <div>
          <img
            className="tarjeta-img-inside"
            src={imagenAleatoria}
            alt={NombreSala}
          />
        </div>
        <div className="tarjeta-info">
          <h2>
            {SalaID} - {NombreSala}
          </h2>
          <div className="info-container">
            <p>{Dia}</p>
            <p>{HoraInicio}</p>
          </div>
          <div className="info-detail-cl-bt">
            {mostrarBotonCancel ? (
              <button className="botoncito1">Cancelar</button>
            ) : (
              <img className="relojcito" src={clockWait}></img>
            )}
          </div>
        </div>
      </div>
    </>
  );
};