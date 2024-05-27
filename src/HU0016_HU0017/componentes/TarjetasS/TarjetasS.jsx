import { useState, useEffect } from "react";
import "./TarjetasSalas.css";
import "./TarjetaInfoS.css";
import Menu from "../Menu/Menu";
import Modal from "../Modal/ModalS";
import foto1 from "../../../assets/sala1.png";
import foto2 from "../../../assets/sala2.png";

const obtenerImagenAleatoria = () => {
  const imagenes = [foto1, foto2];
  const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
  return imagenes[indiceAleatorio];
};

const ContenedorTarjetasSalas = ({ datos, onMenuClick }) => {
  const [imagenesAleatorias, setImagenesAleatorias] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  useEffect(() => {
    const imagenes = datos.map(() => obtenerImagenAleatoria());
    setImagenesAleatorias(imagenes);
  }, [datos]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDatos = datos.filter((dato) =>
    dato.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contenedor-tarjeta-general">
      <Menu onMenuClick={onMenuClick} />
      
      <div className="contenedor-principal-tarjetas">
        
        <div className="contenedor-tarjetas">
        <input
              id="search"
              className={`search_input ${searchVisible ? "" : "hidden"}`}
              placeholder="Escribe aquí..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <a className="search-icon" onClick={toggleSearch}>
              <i className="fa-solid fa-magnifying-glass search-img"></i>
            </a>
            
          
          {filteredDatos.map((dato, index) => (
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
  SalaID,
  Nombre,
  Cupo,
  HoraInicio,
  HoraFin,
  imagenAleatoria,
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
            alt={SalaID}
          />
        </div>
        <div className="tarjeta-info">
          <h2>{Nombre}</h2>
          <div className="info-container">
            <p>{SalaID}</p>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          data={{
            SalaID,
            Nombre,
            Cupo,
            HoraInicio,
            HoraFin,
            imagenAleatoria,
          }}
          onClose={handleCloseModal}
          imagen={imagenAleatoria}
        />
      )}
    </>
  );
};

export default ContenedorTarjetasSalas;
