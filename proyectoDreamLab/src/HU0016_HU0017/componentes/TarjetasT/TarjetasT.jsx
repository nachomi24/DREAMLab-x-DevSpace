import { useState, useEffect } from "react";
import "./Tarjetas.css";
import "./TarjetaInfo.css";
import Menu from "../Menu/Menu";
import Modal from "../Modal/Modal";
import foto1 from "../../../assets/iaia.png";
import foto2 from "../../../assets/itit.png";
import foto3 from "../../../assets/vrvr.png";
import foto4 from "../../../assets/construye.png";

const obtenerImagenAleatoria = () => {
  const imagenes = [foto1, foto2, foto3, foto4];
  const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
  return imagenes[indiceAleatorio];
};

const ContenedorTarjetas = ({ datos }) => {
  const [imagenesAleatorias, setImagenesAleatorias] = useState([]);

  useEffect(() => {
    // Generar las imágenes aleatorias una vez al cargar la página
    const imagenes = datos.map(() => obtenerImagenAleatoria());
    setImagenesAleatorias(imagenes);
  }, [datos]);

  return (
    <div className="contenedor-tarjeta-general">
      <Menu />
      <div className="contenedor-principal-tarjetas">
        <div className="contenedor-tarjetas">
          {datos.map((dato, index) => (
            <Tarjeta
              key={dato.id}
              {...dato}
              imagenAleatoria={imagenesAleatorias[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Tarjeta = ({
  TallerID,
  NombreProfesor,
  UFID,
  NombreUF,
  Nombre,
  Cupo,
  Ubicacion,
  Fecha,
  HoraInicio,
  HoraFin,
  HoraCreado,
  imagenAleatoria, // Pasar la imagen aleatoria como prop
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <>
      <div onClick={handleOpenModal} className="tarjeta">
        <div>
          <img
            className="tarjeta-img-inside"
            src={imagenAleatoria}
            alt={Ubicacion}
          />
        </div>
        <div className="tarjeta-info">
          <h2>{Nombre}</h2>
          <div className="info-container">
            <p>{Ubicacion}</p>
            <p>{convertirHora(HoraInicio)}</p>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          data={{
            TallerID,
            NombreProfesor,
            UFID,
            NombreUF,
            Nombre,
            Cupo,
            Ubicacion,
            Fecha,
            HoraInicio,
            HoraFin,
            HoraCreado,
          }}
          onClose={handleCloseModal}
          imagen={imagenAleatoria}
        />
      )}
    </>
  );
};

export default ContenedorTarjetas;
