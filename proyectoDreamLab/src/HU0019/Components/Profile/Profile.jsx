import './Profile.css'
import karenProfile from '../../../assets/karenFoto.png'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Profile = () => {
    return (
        <div class="image-container">
            <img class="image-container" src={karenProfile} alt="karenProfile" border="0" className='Profile container' />
            <p class="matricula-text">A00835268</p>
            <p class="descripcion-text">Estudiante - ITC</p>
            <p class="puntos-text">Puntos de prioridad</p>
            <p class="puntos">82</p>
        </div>
    )
}

export default Profile