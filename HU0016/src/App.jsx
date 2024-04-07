import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar';
import Tarjetas from './TarjetasT'; 
import foto1 from './tallerIA.png';

const datosEjemplo = [
  {
    id: 1,
    imagen: foto1,
    titulo: 'Taller IA',
    nombre: 'Lego Room',
    hora: '10:00 AM',
  },
  {
    id: 2,
    imagen: foto1,
    titulo: 'Título 2',
    nombre: 'Nombre 2',
    hora: '2:30 PM',
  },
  {
    id: 3,
    imagen: foto1,
    titulo: 'Título 2',
    nombre: 'Nombre 2',
    hora: '2:30 PM',
  },
];

function App() {

  return (  
    <div className="container">
    <Navbar/>
    <Tarjetas datos={datosEjemplo} />
    </div>
  );
}

export default App
