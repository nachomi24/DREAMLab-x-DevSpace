import { useState, useEffect } from "react";
import "../../HU0016_HU0017.css";
import Menu from "../Menu/Menu";
import Modal from "../Modal/ModalS";

const ContenedorTarjetasSalas = ({ datos, onMenuClick, activeMenu }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuClick = (index) => {
    console.log("handleMenuClick index:", index); // Verificar que index se pase correctamente
    onMenuClick(index);
  };

  const filteredDatos = datos.filter((dato) =>
    dato.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contenedor-tarjeta-general-s">
      <Menu
        onMenuClick={handleMenuClick}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        toggleSearch={toggleSearch}
        searchVisible={searchVisible}
        activeIndex={activeMenu}
      />
      <div className="contenedor-principal-tarjetas-s">
        <div className="contenedor-tarjetas-s">
          {filteredDatos.map((dato, index) => (
            <Tarjeta key={dato.id} {...dato} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Tarjeta = ({ SalaID, Nombre, Cupo, HoraInicio, HoraFin, Foto }) => {
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
      <div onClick={handleOpenModal} className="tarjeta-s">
        <div>
          <img className="tarjeta-img-inside-s" src={Foto} alt={SalaID} />
        </div>
        <div className="tarjeta-info-s">
          <h2>{Nombre}</h2>
          <div className="info-container-s">
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
            Foto,
          }}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ContenedorTarjetasSalas;
