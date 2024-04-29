import React from 'react';
import './Detalle.css';

const PopUp = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className='modal-content-inside'>
          <div className='modal-content-inside-header'>
            <h2 className='titulito-header'>DETALLES DE LA RESERVACIÓN</h2>
          </div>
          <div className='modal-content-inside-body'>
            <div className='modal-content-inside-body-content'>
              <div className='modal-content-inside-body-content-ubi'>
                <p>SALA: Garage Valley</p>
              </div>
              <div className='modal-content-inside-body-content-fecha'>
                <p>FECHA: 09 de mayo de 2024</p>
            <div className='modal-content-inside-body-content-horarie'>
                <p>HORARIO: 5:00 p.m - 7:00 p.m</p>
            </div>
              </div>
              <div className='modal-content-inside-body-content-detalles'>
                <div className='modal-content-inside-body-content-detalles-recursos'>
                  <p>RESCURSOS:</p>
                  <ul>
                    <li>- 1 Macbook</li>
                    <li>- 2 Linux</li>
                  </ul>
                </div>
                <div className='modal-content-inside-body-content-detalles-personas'>
                  <p>PERSONAS: 3</p>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-content-inside-body-content-boton'>
            <div className='modal-content-inside-body-content-boton-content'>
              <button className='botoncito1' onClick={onClose}>Cancelar</button>
              <button className='botoncito2' onClick={() => console.log('Confirmado')}>Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;