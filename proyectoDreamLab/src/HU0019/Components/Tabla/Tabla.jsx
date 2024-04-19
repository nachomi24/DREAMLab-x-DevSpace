import React from 'react';
import './Tabla.css';

const Tabla = () => {
  return (
    <table border="1" className='tablaestilo'>
      <tbody>
        <tr>
          <td colSpan={2}>Karen Gutierrez Solis</td>
          
        </tr>
        <tr><td colSpan={2}>UF en curso: 10</td></tr>
        <tr>
          <td>Reservaciones Pendientes</td>
          <td>Reservaciones Futuras</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Tabla;
