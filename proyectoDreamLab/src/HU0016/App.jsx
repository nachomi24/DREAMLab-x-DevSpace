import './App.css'
import Navbar from '../Navbar/Navbar';
import Tarjetas from './componentes/TarjetasT/TarjetasT'; 
import foto1 from '../assets/iaia.png';
import foto2 from '../assets/itit.png';
import foto3 from '../assets/vrvr.png';
import foto4 from '../assets/construye.png';

const datosEjemplo = [
  {
    id: 1,
    imagen: foto1,
    titulo: 'Taller IA',
    nombre: 'Dimension Forge',
    hora: '10:00 AM',
  },
  {
    id: 2,
    imagen: foto2,
    titulo: 'Desarrolla IT',
    nombre: 'Electric Garage',
    hora: '2:30 PM',
  },
  {
    id: 3,
    imagen: foto3,
    titulo: 'Experiencia VR',
    nombre: 'Beyond Digits',
    hora: '5:30 PM',
  },
  {
    id: 4,
    imagen: foto4,
    titulo: 'ConstruyeTec',
    nombre: 'The Matrix Digital',
    hora: '7:00 PM',
  },
  // {
  //   id: 5,
  //   imagen: foto1,
  //   titulo: 'Título 2',
  //   nombre: 'Nombre 2',
  //   hora: '2:30 PM',
  // },
  // {
  //   id: 6,
  //   imagen: foto1,
  //   titulo: 'Título 2',
  //   nombre: 'Nombre 2',
  //   hora: '2:30 PM',
  // },
  // {
  //   id: 7,
  //   imagen: foto1,
  //   titulo: 'Título 2',
  //   nombre: 'Nombre 2',
  //   hora: '2:30 PM',
  // },
];

function App() {
  const [datos, setDatos] = useState([]);
  //conseguir datos del API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/talleres', {
  mode: 'no-cors'})
      .then((res) => {
        setDatos(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (  

    <>
      <Navbar />
      <Tarjetas datos={datosEjemplo} />
    </>
  );
}

export default App;
