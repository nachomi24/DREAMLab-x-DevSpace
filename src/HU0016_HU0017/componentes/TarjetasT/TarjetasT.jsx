import { useState } from "react";
import "../../HU0016_HU0017.css";
import Menu from "../Menu/Menu";
import Modal from "../Modal/Modal";

const ContenedorTarjetas = ({ datos, onMenuClick, activeMenu }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuClick = (index) => {
    onMenuClick(index);
  };

  const filteredDatos = datos.filter((dato) =>
    dato.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contenedor-tarjeta-general016">
      <Menu
        onMenuClick={handleMenuClick}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        toggleSearch={toggleSearch}
        searchVisible={searchVisible}
        activeIndex={activeMenu} // Pasar activeMenu como prop
      />
      <div className="contenedor-principal-tarjetas016">
        <div className="contenedor-tarjetas016">
          <div></div>
          {filteredDatos.map((dato, index) => (
            <Tarjeta key={index} {...dato} imagenAleatoria={dato.Imagen} />
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
  Imagen,
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
      <div onClick={handleOpenModal} className="tarjeta016">
        <div>
          <img className="tarjeta-img-inside016" src={Imagen} alt={Ubicacion} />
        </div>
        <div className="tarjeta-info016">
          <h2>{Nombre}</h2>
          <div className="info-container016">
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
            Imagen,
          }}
          onClose={handleCloseModal}
          imagen={Imagen}
        />
      )}
    </>
  );
};

export default ContenedorTarjetas;
