import Navbar from './Components/Navbar/Navbar'
import Content from './Components/Content/Content'
import Info from './Components/Info/Info'
import Card from './Components/Card/Card'
import Profile from './Components/Profile/Profile'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App({ matricula}) {
  const apiURLPerfil = "https://devspaceapi.azurewebsites.net/api/perfil/" + matricula;
  const apiURLReservaciones = "https://devspaceapi.azurewebsites.net/api/consulta-reservacion/" + matricula;
  const [carrera, setCarrera] = useState('');
  const [puntos, setPuntos] = useState(0);
  const [nombre, setNombre] = useState('');
  const [ufCursando, setUfCursando] = useState(0);
  const [reservaciones, setReservaciones] = useState([]);

  return (
    <div>
      <Navbar />
      <Content />
      
    </div>
  )
}

export default App
