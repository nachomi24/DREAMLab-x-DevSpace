import Navbar from './Components/Navbar/Navbar'
import Content from './Components/Content/Content'
import Info from './Components/Info/Info'
import Card from './Components/Card/Card'
import Profile from './Components/Profile/Profile'
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const matriculaKaren = 'A00835268';
  

function App() {
  
  
  //console.log(Carrera, Nombre, totalPuntos, totalUF)
  return (
    <div>
      <Navbar />
      <Content matricula={matriculaKaren}/>
    </div>
  )
}

export default App
