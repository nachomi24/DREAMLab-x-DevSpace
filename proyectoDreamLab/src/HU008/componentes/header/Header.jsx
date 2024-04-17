import React from 'react'
import './Header.css'
import Boton from '../Boton/Boton'


const Header = () => {
  return (
    <div className='Header container'>
        <div className='Header-text'>
            <h1>SECCIONES</h1>
            <Boton />
        </div>
    </div>
  )
}

export default Header