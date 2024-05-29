import '../../HU0019.css';

function Profile({ Matricula, Carrera, Foto, TotalPuntos }) {
  return (
    <div className="image-container">
      <img className="image-container" src={Foto} alt={Matricula} border="0" />
      <p className="descripcion-text">Estudiante - {Carrera}</p>
      <div className="puntos-perfil">
        <p className="puntos-text">Puntos de prioridad</p>
        <p className="puntos">{TotalPuntos}</p>
      </div>
    </div>
  );
}

export default Profile;
