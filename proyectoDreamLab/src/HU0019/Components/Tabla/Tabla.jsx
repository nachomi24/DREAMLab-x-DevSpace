import React from 'react';
import './Tabla.css';
import ContenedorTarjetas from '../../../HU0016_HU0017/componentes/TarjetasT/TarjetasT';
const prueba = [{titulo: 'Taller IA',
nombre: 'Lego Room',
hora: '10:00 AM'}]

const Tabla = () => {
  return (
    <table className='tablaestilo'>
      <tbody>
        <tr>
          <td colSpan={2}>Karen Gutierrez Solis</td>
          
        </tr>
        <tr><td colSpan={2}>UF en curso: 10</td></tr>
        <tr>
          <td>Reservaciones Pendientes <br></br>AQUI VA LA LISTA DE RESERVACIONES</td>
          <td>Reservaciones Futuras</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Tabla;
