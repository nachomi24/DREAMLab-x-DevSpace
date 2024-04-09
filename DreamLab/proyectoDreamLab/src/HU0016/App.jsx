import './App.css'
import Navbar from './Navbar';
import Tarjetas from './TarjetasT'; 
import foto1 from './tallerIA.png';
import { Helmet } from 'react-helmet';

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
    titulo: 'Título 3',
    nombre: 'Nombre 2',
    hora: '11:45 AM',
  },
];

function App() {

  return (  
    <div className="container">
    <Helmet>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Mina:wght@400;700&display=swap" rel="stylesheet" />
    </Helmet>
    <Navbar />
    <Tarjetas datos={datosEjemplo} />
  </div>
  );
}

export default App
