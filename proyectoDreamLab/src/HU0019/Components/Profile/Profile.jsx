import './Profile.css'
import karenProfile from '../../../assets/karenFoto.png'





const Profile = () => {
    return (
        <div class="image-container">
            <img class="image-container" src={karenProfile} alt="karenProfile" border="0" className='Profile container' />
            <p class="matricula-text">{matricula}</p>
            <p class="descripcion-text">Estudiante - ITC</p>
            <p class="puntos-text">Puntos de prioridad</p>
            <p class="puntos">82</p>
        </div>
    )
}

export default Profile