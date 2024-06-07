import { useState } from "react";
import { uploadFile } from "../../../firebase/config";
import axios from "axios";
import checkmarkGif from "../../../assets/checkmark.gif";

function Profile({ Matricula, Carrera, Foto, TotalPuntos, onPhotoUpdate }) {
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
  const [isUpdatedPhoto, setIsUpdatedPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  const handleUpdatePhotoClick = () => {
    setIsUpdatingPhoto(true);
  };

  const handleCancelClick = () => {
    setIsUpdatingPhoto(false);
    setNewPhoto(null);
  };

  const handleConfirmClick = async () => {
    if (newPhoto) {
      try {
        const photoURL = await uploadFile(newPhoto);

        await axios.put(
          `https://dreamlabapidev.azurewebsites.net/api/actualizar_foto`,
          null,
          {
            params: {
              matricula: Matricula,
              foto: photoURL,
            },
          }
        );

        setIsUpdatingPhoto(false);
        setNewPhoto(null);
        setIsUpdatedPhoto(true);

        showPopupAndRedirect();
      } catch (error) {
        console.error("Error al actualizar la foto:", error);
        alert("Error al actualizar la foto");
      }
    } else {
      alert("No se ingresó ninguna foto");
    }
  };

  const handlePhotoChange = (event) => {
    setNewPhoto(event.target.files[0]);
  };

  const showPopupAndRedirect = () => {
    // Mostrar el popup
    setIsUpdatingPhoto(false);
    setNewPhoto(null);

    // Redirigir a localhost:8080/perfil después de 2 segundos
    setTimeout(() => {
      window.location.href = "/perfil";
    }, 2000);
  };

  return (
    <div className="image-container">
      <img className="image-container" src={Foto} alt={Matricula} border="0" />
      <div className="photo-update-section">
        {isUpdatingPhoto ? (
          <>
            <input type="file" onChange={handlePhotoChange} />
            <button className="botoncitofotito" onClick={handleCancelClick}>
              Cancelar
            </button>
            <button onClick={handleConfirmClick}>Confirmar</button>
          </>
        ) : (
          <button className="botoncitofotito" onClick={handleUpdatePhotoClick}>
            Actualizar Foto
          </button>
        )}
      </div>
      <p className="descripcion-text">Estudiante - {Carrera}</p>
      <div className="puntos-perfil">
        <p className="puntos-text">Puntos de prioridad</p>
        <p className="puntos">{TotalPuntos}</p>
      </div>
      {isUpdatedPhoto && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="confirmation-message">
              <img src={checkmarkGif} alt="Confirmación" />
              <p>
                <b>FOTO ACTUALIZADA</b>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
