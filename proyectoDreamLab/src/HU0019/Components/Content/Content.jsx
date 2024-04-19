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
  const [Reservaciones, setReservaciones] = useState([]);

  const obtenerPerfilCarrerayNombre = async () => {
    try {
      const response = await axios.get(apiURLPerfilCarrera);
      setCarrera(response.data['Carrera']);
      setNombre(response.data['Nombre']);
      console.log(response.data['Carrera']);
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
  useEffect(() => {
    obtenerPerfilCarrerayNombre();
    obtenerPerfilPuntosyUfCursando();
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
