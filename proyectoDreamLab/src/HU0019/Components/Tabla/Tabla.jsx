import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tabla.css';
import foto1 from '../../../assets/iaia.png';
import foto2 from '../../../assets/itit.png';
import foto3 from '../../../assets/vrvr.png';
import foto4 from '../../../assets/construye.png';
import clockWait from '../../../assets/clock.gif';

const obtenerImagenAleatoria = () => {
  const imagenes = [foto1, foto2, foto3, foto4];
  const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
  return imagenes[indiceAleatorio];
};

const ContenedorTarjetas = ({ datos, mostrarBotonCancel }) => {
  const [imagenesAleatorias, setImagenesAleatorias] = useState([]);

  useEffect(() => {
    // Generar las imágenes aleatorias una vez al cargar la página
    const imagenes = datos.map(() => obtenerImagenAleatoria());
    setImagenesAleatorias(imagenes);
  }, [datos]);

  return (
    <div className='contenedor-tarjeta-general'>
      <div className='contenedor-principal-tarjetas'>
        <div className="contenedor-tarjetas">
          {datos.map((dato, index) => (
            <Tarjeta key={dato.id} {...dato} imagenAleatoria={imagenesAleatorias[index]} mostrarBotonCancel={mostrarBotonCancel} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Tarjeta = ({
  ID, 
  Matricula,
  IDSala,
  Dia,
  HoraInicio,
  HoraFin,
  Recursos,
  Personas,
  NombreSala,
  imagenAleatoria,
  mostrarBotonCancel
}) => {

  return (
    <>
      <div className="tarjeta"> 
        <div>
          <img className='tarjeta-img-inside' src={imagenAleatoria} alt={NombreSala} />
        </div>
        <div className="tarjeta-info"> 
          <h2>{IDSala} - {NombreSala}</h2>
          <div className="info-container">
            <p>{Dia}</p>
            <p>{HoraInicio}</p>
          </div>
          <div className='info-detail-cl-bt'>
            {mostrarBotonCancel ? <button className='botoncito1'>Cancelar</button> : <img className='relojcito' src={clockWait}></img>}
          </div>
        </div>
      </div>
    </>
  );
};

function Tabla({ Nombre, totalUF, reservacionesPendientes, reservacionesAprobadas, matricula }){
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [ufIds, setUfIds] = useState([]);

  const obtenerUF = async (matriculita, setUfis) => {
    try {
      const response = await axios.get(`https://devspaceapi.azurewebsites.net/api/perfil_UF/${matriculita}`);
      setUfis(response.data['UFID']);
    } catch (error) {
      console.error('Error al obtener las UF:', error);
    }
  };

  useEffect(() => {
    obtenerUF(matricula, setUfIds);
  }, [matricula]);

  const toggleEye = () => {
    setIsEyeOpen(!isEyeOpen); // Cambia el estado de isEyeOpen al opuesto
  };

  return (
    <table className='tablaestilo'>
      <tbody>
        <tr>
          <td className='nombre_perfil' colSpan={2}>{Nombre}</td>
        </tr>
        <tr>
          <td className='uf_curso' colSpan={2}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <p className='p_uf_curso'>UF en curso:</p>
              <p className='uf_curso'>{totalUF}</p>
              <i style={{cursor: 'pointer'}} className={isEyeOpen ? `fa-solid fa-angle-right` : `fa-solid fa-minus`} onClick={toggleEye}></i>
              {!isEyeOpen && ufIds.map((uf, index) => (
                <>
                <div style={{marginLeft: '4vh'}}>
                  <p style={{marginRight: 0}} key={index} className='p_uf_curso'>{uf}</p>
                </div>
                </>
              ))}
            </div>
          </td>
        </tr>
        <tr>
          <td className='reservaciones-pend-fut'>
            Reservaciones Pendientes
            <br/>
            <ContenedorTarjetas datos={reservacionesPendientes} mostrarBotonCancel={false} />
          </td>
          <td className='reservaciones-pend-fut'>
            Reservaciones Futuras
            <br/>
            <ContenedorTarjetas datos={reservacionesAprobadas} mostrarBotonCancel={true} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Tabla;