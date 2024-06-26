import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../Menu/Menu";
import Modal from "../Modal/Modal";

const ContenedorTarjetas = ({ datos, onMenuClick, activeMenu }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [reservados, setReservados] = useState([]);
  const [cancelados, setCancelados] = useState([]);

  const matricula = localStorage.getItem("matricula");
  const nomina = localStorage.getItem("matricula");

  useEffect(() => {
    const userType = localStorage.getItem("userType");

    if (userType === "alumno") {
      const fetchReservados = async () => {
        try {
          const response = await axios.get(
            "https://dreamlabapidev.azurewebsites.net/api/talleres/reservacion/estudiante",
            { params: { matricula } }
          );

          console.log(response);

          const reservadosData = response.data.filter(
            (reservacion) => reservacion.Estatus === "Reservado"
          );

          const canceladosData = response.data.filter(
            (reservacion) => reservacion.Estatus === "Cancelado"
          );

          setReservados(reservadosData);
          setCancelados(canceladosData);
        } catch (error) {
          console.error("Error al obtener los talleres:", error);
        }
      };

      if (matricula) {
        fetchReservados();
      }
    } else if (userType === "profesor") {
      const fetchReservadosProfesor = async () => {
        try {
          const response = await axios.get(
            "https://dreamlabapidev.azurewebsites.net/api/talleres/reservacion/profesor",
            { params: { nomina } }
          );

          console.log(response);

          const reservadosData = response.data.filter(
            (reservacion) => reservacion.Estatus === "Reservado"
          );

          const canceladosData = response.data.filter(
            (reservacion) => reservacion.Estatus === "Cancelado"
          );

          setReservados(reservadosData);
          setCancelados(canceladosData);
        } catch (error) {
          console.error("Error al obtener los talleres:", error);
        }
      };

      if (nomina) {
        fetchReservadosProfesor();
      }
    }
  }, [matricula, nomina]);

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
        activeIndex={activeMenu}
      />
      <div className="contenedor-principal-tarjetas016">
        <div className="contenedor-tarjetas016">
          <div></div>
          {filteredDatos.map((dato, index) => (
            <Tarjeta
              key={index}
              {...dato}
              imagenAleatoria={dato.Imagen}
              reservados={reservados}
              cancelados={cancelados}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Tarjeta = ({
  TallerID,
  Nomina,
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
  reservados,
  cancelados,
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

  const isReservado = reservados.some(
    (reservado) => reservado.TallerID === TallerID
  );

  const isCancelado = cancelados.some(
    (cancelado) => cancelado.TallerID === TallerID
  );

  return (
    <>
      <div onClick={handleOpenModal} className="tarjeta016">
        <div>
          <img className="tarjeta-img-inside016" src={Imagen} alt={Ubicacion} />
        </div>
        {isReservado && <div className="reservadoverde016">RESERVADO</div>}
        {isCancelado && <div className="canceladorojo016">CANCELADO</div>}
        {Cupo === "No hay cupo" && (
          <div className="reservadorojo016">AGOTADO</div>
        )}
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
            Nomina,
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
          isReservado={isReservado}
          isCancelado={isCancelado}
        />
      )}
    </>
  );
};

export default ContenedorTarjetas;
