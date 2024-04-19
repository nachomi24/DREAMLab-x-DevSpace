import React from 'react';
import './Tabla.css';
import ContenedorTarjetas from '../../../HU0016_HU0017/componentes/TarjetasT/TarjetasT';
const prueba = [{titulo: 'Taller IA',
nombre: 'Lego Room',
hora: '10:00 AM'}]

const Tarjeta = ({
  ID, 
  Matricula,
  IDSala,
  Dia,
  HoraInicio,
  HoraFin,
  Recursos,
  Personas
}) => {

  return (
    <>
      <div className="tarjeta"> 
        <div className="tarjeta-info"> 
          <h2>{nombre}</h2>
          <div className="info-container">
            <p>{ubicacion}</p>
            <p>{hora_inicio}</p>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          data={{
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
          }}
          onClose={handleCloseModal}
          imagen={imagenAleatoria}
        />
      )}
    </>
  );
};

function Tabla (){

  return (
    <table className='tablaestilo'>
      <tbody>
        <tr>
          <td colSpan={2}>{Nombre}</td>
          
        </tr>
        <tr><td colSpan={2}>UF en curso: {totalUF}</td></tr>
        <tr>
          <td>Reservaciones Pendientes <br></br>AQUI VA LA LISTA DE RESERVACIONES</td>
          <td>Reservaciones Futuras</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Tabla;
