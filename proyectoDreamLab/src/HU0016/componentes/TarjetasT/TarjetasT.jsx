import './Tarjetas.css';
import './TarjetaInfo.css';
import Menu from '../Menu/Menu'; 
import foto1 from '../../../assets/iaia.png';
import foto2 from '../../../assets/itit.png';
import foto3 from '../../../assets/vrvr.png';
import foto4 from '../../../assets/construye.png';

const obtenerImagenAleatoria = () => {
  const imagenes = [foto1, foto2, foto3, foto4];
  const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
  return imagenes[indiceAleatorio];
};


const Tarjeta = ({ nombre, ubicacion, hora_inicio }) => {
  // Obtener una imagen aleatoria
  const imagenAleatoria = obtenerImagenAleatoria();

  return (
    <a href="#" className="tarjeta"> 
      <img src={imagenAleatoria} alt={ubicacion} />
      <div className="tarjeta-info"> 
        <h2>{nombre}</h2>
        <div className="info-container">
          <p>{ubicacion}</p>
          <p>{hora_inicio}</p>
        </div>
      </div>
    </a>
  );
};

const ContenedorTarjetas = ({ datos }) => (
  <div className='contenedor-tarjeta-general'>
    <Menu />
    <div className='contenedor-principal-tarjetas'>
      <div className="contenedor-tarjetas">
        {datos.map((dato) => (
          <Tarjeta key={dato.id} {...dato} />
        ))}
      </div>
    </div>
  </div>
);

export default ContenedorTarjetas;
