import React, { useState, useEffect } from "react";
import axios from "axios";
import "../HU026.css";
import EditModal from "../Componentes/ModalEditar/ModalEditar";
import Modal from "../Componentes/Modal/Modal";
import CancelPopUp from "../Componentes/PopUpCancel/PopUpCancel"; // Asegúrate de ajustar la ruta según tu estructura de archivos

function TarjetasTalleres({ datos }) {
  const [talleresPendientes, setTalleresPendientes] = useState([]);
  const [selectedTaller, setSelectedTaller] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCancelPopUpOpen, setIsCancelPopUpOpen] = useState(false); // Nuevo estado para el pop-up de cancelación

  useEffect(() => {
    console.log("Datos iniciales:", datos);
    const talleresConId = datos.map((dato, index) => {
      console.log(`Taller ${index + 1}:`, dato);
      return {
        _id: dato.TallerID,
        ...dato,
      };
    });
    setTalleresPendientes(talleresConId);
  }, [datos]);

  const handleOpenModal = (taller) => {
    setSelectedTaller(taller);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTaller(null);
    setIsEditModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTaller = (newTaller) => {
    if (newTaller._id) {
      setTalleresPendientes([...talleresPendientes, newTaller]);
    } else {
      console.error("El nuevo taller no tiene un ID definido:", newTaller);
    }
  };

  const handleUpdateTaller = (updatedTaller) => {
    setTalleresPendientes((prev) =>
      prev.map((taller) =>
        taller._id === updatedTaller._id ? updatedTaller : taller
      )
    );
  };

  const confirmarTaller = (id, taller) => {
    handleOpenModal(taller);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTaller) {
      console.error("Taller no seleccionado");
      return Promise.reject(new Error("Taller no seleccionado"));
    }
  
    const id = selectedTaller.TallerID;
  
    try {
      console.log("Datos enviados para rechazar:", { tallerId: id });
      const response = await axios.delete(
        `https://dreamlabapidev.azurewebsites.net/api/eliminar_taller?TallerID=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
      setTalleresPendientes((prev) =>
        prev.filter((taller) => taller.TallerID !== id)
      );
      setSelectedTaller(null);
      return Promise.resolve();
    } catch (error) {
      console.error("Error al rechazar el taller", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        if (error.response.data.detail) {
          console.error("Detalles específicos del error:", error.response.data.detail);
        }
      }
      return Promise.reject(error);
    }
  };
  

  const formatearFecha = (fecha) => {
    const opciones = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(fecha).toLocaleString("es-ES", opciones);
  };

  const toggleActiva = async (taller) => {
    try {
      const updatedTaller = {
        ...taller,
        activa: !taller.activa,
      };

      const response = await axios.put(
        `https://dreamlabapidev.azurewebsites.net/api/info_talleres/${taller._id}`,
        updatedTaller,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta del servidor al actualizar:", response.data);

      handleUpdateTaller(updatedTaller);
    } catch (error) {
      console.error("Error al actualizar el estado del taller", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
      }
    }
  };

  const Tarjeta = ({
    TallerID,
    NombreProfesor,
    UFID,
    NombreUF,
    Nombre,
    Cupo,
    SalaID,
    Fecha,
    HoraInicio,
    HoraFin,
    Imagen,
    HoraCreado
  }) => {
    const handleToggleActiva = () => {
      toggleActiva({
        TallerID,
        NombreProfesor,
        UFID,
        NombreUF,
        Nombre,
        Cupo,
        SalaID,
        Fecha,
        HoraInicio,
        HoraFin,
        Imagen,
        HoraCreado
      });
    };

    return (
      <div className="tarjeta-reserva026">
        <div className="info-container-HU026">
          <div className="tarjeta-reserva026-info">
            <h2 className="h2-titulo">{NombreUF}</h2>
            <p>{Nombre}</p>
            <p className="desc-2">{formatearFecha(Fecha)}</p>
          </div>
          <div className="tarjeta-reserva026-botones">
            <button
              onClick={() =>
                confirmarTaller(TallerID, {
                  TallerID,
                  NombreProfesor,
                  UFID,
                  NombreUF,
                  Nombre,
                  Cupo,
                  SalaID,
                  Fecha,
                  HoraInicio,
                  HoraFin,
                  Imagen,
                  HoraCreado
                })
              }
            >
              EDITAR
            </button>
            <button onClick={() => { setSelectedTaller({
                TallerID,
                NombreProfesor,
                UFID,
                NombreUF,
                Nombre,
                Cupo,
                SalaID,
                Fecha,
                HoraInicio,
                HoraFin,
                HoraCreado
              }); setIsCancelPopUpOpen(true); }}>ELIMINAR</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="contenedor-tarjeta-general026">
      <div className="contenedor-principal-tarjetas026">
        <div className="contenedor-tarjetas026">
          <h1 className="h1-publicaciones">TALLERES</h1>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button className="boton-agregar" onClick={handleOpenAddModal}>
              AGREGAR TALLER
            </button>
          </div>
          <div className="contenedor-filtros026">
            {/* Puedes agregar filtros aquí si es necesario */}
          </div>
          {talleresPendientes.map((dato) => (
            <Tarjeta key={dato._id} {...dato} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseAddModal} onAdd={handleAddTaller} />
      )}
      {isEditModalOpen && (
        <EditModal
          taller={selectedTaller}
          onClose={handleCloseModal}
          onUpdate={handleUpdateTaller}
        />
      )}
      {isCancelPopUpOpen && (
        <CancelPopUp
          onClose={() => setIsCancelPopUpOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default TarjetasTalleres;
