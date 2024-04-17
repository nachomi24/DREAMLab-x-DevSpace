import './Tarjetas.css';
import './TarjetaInfo.css';
import Menu from '../Menu/Menu'; 

const Tarjeta = ({ imagen, titulo, nombre, hora }) => (

  <a href="#" className="tarjeta"> 
    <img src={imagen} alt={titulo} />
    <div className="tarjeta-info"> 
      <h2>{titulo}</h2>
      <div className="info-container">
        <p>{nombre}</p>
        <p>{hora}</p>
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
