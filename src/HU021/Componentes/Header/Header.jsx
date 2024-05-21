import React from 'react';
import './Header.css';
import adperfil from '../../../assets/adperfil.png';

const Header = () => {
  return (
    <div className='Header'>
      <div className='Header-content'>
        <div className='Header-text'>
          <h1>INICIA SESIÓN</h1>
          <img src={adperfil} className='botonnav' alt='adperfil' />
          <div className='text-container'>
            <input type='text' placeholder='Usuario' />
            <input type='password' placeholder='Contraseña' />
            <a href='/reservar' className='boton3'>Continuar</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
