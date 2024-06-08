import { useState } from "react";
import { uploadFile } from "../../../firebase/config";
import axios from "axios";
import checkmarkGif from "../../../assets/checkmark.gif";

function Profile({ Matricula, Carrera, Foto, TotalPuntos }) {
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
  const [isUpdatedPhoto, setIsUpdatedPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [fileName, setFileName] = useState("Subir Foto");

  const handleUpdatePhotoClick = () => {
    setIsUpdatingPhoto(true);
  };

  const handleCancelClick = () => {
    setIsUpdatingPhoto(false);
    setNewPhoto(null);
    setFileName("Subir Foto");
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
    if (event.target.files && event.target.files[0]) {
      setNewPhoto(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const showPopupAndRedirect = () => {
    setIsUpdatingPhoto(false);
    setNewPhoto(null);

    setTimeout(() => {
      window.location.href = "/perfil";
    }, 2000);
  };

  return (
    <div className="image-container">
      <img className="image-container" src={Foto} alt={Matricula} border="0" />
      {isUpdatingPhoto ? (
        <>
          <div className="photo-update-section">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput" className="custom-file-upload">
              {fileName}
            </label>
          </div>
          <div className="photo-update-section">
            <button
              style={{ marginRight: "1vh" }}
              className="botoncitofotito"
              onClick={handleCancelClick}
            >
              Cancelar
            </button>
            <button
              style={{ marginLeft: "1vh" }}
              className="botoncitofotitoconfirmar"
              onClick={handleConfirmClick}
            >
              Confirmar
            </button>
          </div>
        </>
      ) : (
        <div className="photo-update-section">
          <button
            className="custom-file-upload"
            onClick={handleUpdatePhotoClick}
          >
            Actualizar Foto
          </button>
        </div>
      )}
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
