import { useState } from "react";
import { uploadFile } from "../../../firebase/config";
import axios from "axios";
import checkmarkGif from "../../../assets/checkmark.gif";
import dreamyRegalito from "../../../assets/dreamy_regalito.png";

function Profile({ Matricula, Carrera, Foto, TotalPuntos }) {
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
  const [isUpdatedPhoto, setIsUpdatedPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [fileName, setFileName] = useState("Subir Foto");
  const [puntos, setPuntos] = useState(false);

  const handlePuntosClick = () => {
    setPuntos(true);
  };

  const closePuntosClick = () => {
    setPuntos(false);
  };

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
      <div
        style={{ backgroundImage: `url(${Foto})`, backgroundSize: "cover" }}
        id="foto-perfil"
        className="image-container"
      ></div>
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
        <button className="boton-puntos-prioridad" onClick={handlePuntosClick}>
          <i class="fa-solid fa-circle-question button-question"></i>
          <p className="puntos">{TotalPuntos}</p>
        </button>
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
      {puntos && (
        <div className="popup-overlay">
          <div className="popup-content-puntos-prioridad">
            <img
              className="dreamy-regalito"
              src={dreamyRegalito}
              alt="Dreamy Regalito"
            ></img>
            <div className="puntos-prioridad-message">
              <div className="puntos-prioridad-message-inside">
                <h1>PUNTOS DE PRIORIDAD</h1>
                <div className="puntos-prioridad-message-inside-div">
                  <p>
                    Los puntos de prioridad determinan el orden en el que se
                    asignan las reservaciones de salas. Cuantos más puntos de
                    prioridad tengas, mayor será tu ventaja competitiva a la
                    hora de intentar reservar un espacio en un horario
                    específico. Estos puntos te permiten asegurar con mayor
                    facilidad el lugar y el tiempo que deseas, superando a otros
                    usuarios con menos puntos en el proceso de selección de
                    reservaciones.
                  </p>
                  <h2>¿Por qué esa cantidad de puntos?</h2>
                  <p>La cantidad de puntos están distribuidas de dos formas:</p>
                  <p>
                    1. Los puntos que recibes por estar cursando Unidades de
                    Formación (UF) en tu semestre, los cuales están calculados
                    por la cantidad de créditos que se deben de cursar al
                    semestre.
                  </p>
                </div>
              </div>
              <div className="puntos-prioridad-buttons">
                <button
                  className="popup-button-cerrar"
                  onClick={closePuntosClick}
                >
                  CERRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
