import './Tarjetas.css';
import './TarjetaInfo.css';
import Menu from '../Menu/Menu'; 

const Tarjeta = ({ imagen, titulo, nombre, hora }) => (

  <a href="#" className="tarjeta"> 
    <img src={iaia} alt={nombre} />
    <div className="tarjeta-info"> 
      <h2>{nombre}</h2>
      <div className="info-container">
        <p>{ubicacion}</p>
        <p>{hora_inicio}</p>
      </div>
    </div>
  </a>
);

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
