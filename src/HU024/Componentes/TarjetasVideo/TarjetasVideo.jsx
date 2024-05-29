import { useState, useEffect } from "react";
import axios from "axios";
import "../../HU0024.css";
import Modal from "../Modal/Modal";
import EditModal from "../EditModal/EditModal";

function TarjetasPublicaciones({ datos }) {
  const [publicacionesPendientes, setPublicacionesPendientes] = useState([]);
  const [selectedPublicacion, setSelectedPublicacion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    console.log("Datos iniciales:", datos);
    const publicacionesConId = datos.map((dato, index) => {
      console.log(`Publicación ${index + 1}:`, dato);
      return {
        _id: dato._id || dato.id,
        ...dato,
      };
    });
    setPublicacionesPendientes(publicacionesConId);
  }, [datos]);

  const handleOpenModal = (publicacion) => {
    setSelectedPublicacion(publicacion);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPublicacion(null);
    setIsEditModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsModalOpen(false);
  };

  const handleAddPublication = (newPublication) => {
    if (newPublication._id) {
      setPublicacionesPendientes([...publicacionesPendientes, newPublication]);
    } else {
      console.error(
        "La nueva publicación no tiene un ID definido:",
        newPublication
      );
    }
  };

  const handleUpdatePublication = (updatedPublication) => {
    setPublicacionesPendientes((prev) =>
      prev.map((pub) =>
        pub._id === updatedPublication._id ? updatedPublication : pub
      )
    );
  };

  const confirmarPublicacion = (id, publicacion) => {
    handleOpenModal(publicacion);
  };

  const rechazarPublicacion = async (id) => {
    if (!id) {
      console.error("ID de publicación indefinido");
      return;
    }

    try {
      console.log("Datos enviados para rechazar:", { publicacionId: id });
      const response = await axios.delete(
        `https://dreamlabapidev.azurewebsites.net/api/publicaciones/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
      setPublicacionesPendientes((prev) =>
        prev.filter((pub) => pub._id !== id)
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error al rechazar la publicación", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        if (error.response.data.detail) {
          console.error(
            "Detalles específicos del error:",
            error.response.data.detail
          );
        }
      }
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

  const toggleActiva = async (publicacion) => {
    try {
      const updatedPublication = {
        ...publicacion,
        activa: !publicacion.activa,
      };

      const response = await axios.put(
        `https://dreamlabapidev.azurewebsites.net/api/publicaciones/${publicacion._id}`,
        updatedPublication,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta del servidor al actualizar:", response.data);

      handleUpdatePublication(updatedPublication);
    } catch (error) {
      console.error("Error al actualizar el estado de la publicación", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
      }
    }
  };

  const Tarjeta = ({
    _id,
    activa,
    titulo,
    descripcion,
    autor,
    fecha,
    imagen,
    liga,
  }) => {
    console.log("Publicación ID:", _id);

    const handleToggleActiva = () => {
      toggleActiva({
        _id,
        activa,
        titulo,
        descripcion,
        autor,
        fecha,
        imagen,
        liga,
      });
    };

    return (
      <div className="tarjeta-reserva024">
        <div
          className={`estado-publicacion ${activa ? "activa" : "inactiva"}`}
          onClick={handleToggleActiva}
        ></div>
        <div className="info-container-HU024">
          <div className="tarjeta-reserva024-info">
            <h2 className="h2-titulo">{titulo}</h2>
            <p>{autor}</p>
            <p className="desc-2">{formatearFecha(fecha)}</p>
          </div>
          <div className="tarjeta-reserva024-botones">
            <button
              onClick={() =>
                confirmarPublicacion(_id, {
                  _id,
                  activa,
                  titulo,
                  descripcion,
                  autor,
                  fecha,
                  imagen,
                  liga,
                })
              }
            >
              EDITAR
            </button>
            <button onClick={() => rechazarPublicacion(_id)}>ELIMINAR</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="contenedor-tarjeta-general024">
      <div className="contenedor-principal-tarjetas024">
        <div className="contenedor-tarjetas024">
          <h1 className="h1-publicaciones">PUBLICACIONES</h1>
          <button className="boton-agregar" onClick={handleOpenAddModal}>
            AGREGAR PUBLICACIÓN
          </button>
          <div className="contenedor-filtros024">
            {/* Puedes agregar filtros aquí si es necesario */}
          </div>
          {publicacionesPendientes.map((dato) => (
            <Tarjeta key={dato._id} {...dato} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseAddModal} onAdd={handleAddPublication} />
      )}
      {isEditModalOpen && (
        <EditModal
          publicacion={selectedPublicacion}
          onClose={handleCloseModal}
          onUpdate={handleUpdatePublication}
        />
      )}
    </div>
  );
}

export default TarjetasPublicaciones;
