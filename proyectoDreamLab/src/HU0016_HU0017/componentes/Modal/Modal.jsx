import './Modal.css';

const Modal = ({ data, onClose, imagen }) => {
  const {
    tallerID,
    nombre_completo,
    UFID,
    nombre_UF,
    nombre,
    cupo,
    ubicacion,
    hora_inicio,
    hora_fin,
    fecha,
    creado_en
  } = data;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div style={{background: `url(${imagen}) no-repeat center center/cover`}} className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className='modal-content-inside'>
          <div className='modal-content-inside-header'>
            <h2 className='titulito-header'>{nombre}</h2>
          </div>
          <div className='modal-content-inside-body'>
            <div className='modal-content-inside-body-content'>
              <div className='modal-content-inside-body-content-ubi'>
                <p>📍 {ubicacion} 📍</p>
              </div>
              <div className='modal-content-inside-body-content-uf'>
                <p className='uniforma'>{UFID} - {nombre_UF}</p>
                <p>Profesor(a): {nombre_completo}</p>
              </div>
              <div className='modal-content-inside-body-content-fecha'>
                <p>{fecha}</p>
                <p className='horarie'>{hora_inicio} a {hora_fin}</p>
              </div>
              <div className='modal-content-inside-body-content-detalles'>
                <div className='modal-content-inside-body-content-detalles-creado'>
                  <p>Creado en:</p>
                  <p className='creadito'>{creado_en}</p>
                </div>
                <div className='modal-content-inside-body-content-detalles-cupo'>
                  <p>Cupo:</p>
                  <p className='cupito'>{cupo}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-content-inside-body-content-boton'>
            <div className='modal-content-inside-body-content-boton-content'>
              <a href="/reservar" className='botoncito2'>Reservar</a>
              <button className='botoncito1' onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;