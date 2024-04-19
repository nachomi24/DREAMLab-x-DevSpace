import React, { useState, useEffect } from 'react';
import './Content.css'
import Profile from '../Profile/Profile'
import Tabla from '../Tabla/Tabla'
import axios from 'axios';




const Content = ({matricula}) => {
  const apiURLPerfil = "https://devspaceapi.azurewebsites.net/api/perfil/" + matricula;
  const apiURLPerfilCarrera = "https://devspaceapi.azurewebsites.net/api/perfil/carrera/" + matricula;
  const apiURLReservaciones = "https://devspaceapi.azurewebsites.net/api/consulta-reservacion/" + matricula;
  const [Carrera, setCarrera] = useState('');
  const [totalPuntos, setPuntos] = useState(0);
  const [Nombre, setNombre] = useState('');
  const [totalUF, setUfCursando] = useState(0);
  const [ReservacionesAprobadas, setReservacionesAprobadas] = useState([]);
  const [ReservacionesPendientes, setReservacionesPendientes] = useState([]);

  const obtenerPerfilCarrerayNombre = async () => {
    try {
      const response = await axios.get(apiURLPerfilCarrera);
      setCarrera(response.data['Carrera']);
      setNombre(response.data['Nombre']);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    }
  };
  const obtenerPerfilPuntosyUfCursando = async () => {
    try {
      const response = await axios.get(apiURLPerfil);
      setPuntos(response.data['totalPuntos']);
      setUfCursando(response.data['totalUF']);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    }
  };
  const obtenerDatos = async () => {
    try {
        const response = await axios.get(apiURLReservaciones);
        const data = response.data;

        // Separar los datos en ReservacionesAprobadas y ReservacionesPendientes
        const aprobadas = data[0];
        const pendientes = data[1];

        // Asignar los datos a los hooks correspondientes
        setReservacionesAprobadas(aprobadas);
        setReservacionesPendientes(pendientes);
        console.log(response.data);
        console.log(aprobadas);
        console.log(pendientes);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
  };
  useEffect(() => {
    obtenerPerfilCarrerayNombre();
    obtenerPerfilPuntosyUfCursando();
    obtenerDatos();
  }, []);
  
  return (
    <div className="table-container">
      <table>
        <tbody>
          <tr>
            <td>
              <div className="profile-container">
                <Profile matricula={matricula} Carrera={Carrera} totalPuntos={totalPuntos}/>
                
              </div>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  )
}
  

  
  
  


export default Content
