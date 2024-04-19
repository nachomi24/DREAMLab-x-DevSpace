import './Profile.css'
import karenProfile from '../../../assets/karenFoto.png'





function Profile ({matricula, Carrera, totalPuntos}) {
    return (
        <div className="image-container">
            <img className="image-container" src={karenProfile} alt="karenProfile" border="0" />
            <p className="matricula-text">{matricula}</p>
            <p className="descripcion-text">Estudiante - {Carrera}</p>
            <p className="puntos-text">Puntos de prioridad</p>
            <p className="puntos">{totalPuntos}</p>
        </div>
    )
}

export default Profile