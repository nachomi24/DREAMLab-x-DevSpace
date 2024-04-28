import "./Profile.css";
import karenProfile from "../../../assets/karenFoto.png";

function Profile({ matricula, Carrera, totalPuntos }) {
  return (
    <div className="image-container">
      <img
        className="image-container"
        src={karenProfile}
        alt="karenProfile"
        border="0"
      />
      <p className="descripcion-text">Estudiante - {Carrera}</p>
      <div className="puntos-perfil">
        <p className="puntos-text">Puntos de prioridad</p>
        <p className="puntos">{totalPuntos}</p>
      </div>
    </div>
  );
}

export default Profile;
