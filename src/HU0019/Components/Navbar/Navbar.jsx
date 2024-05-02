import React from 'react'
import './Navbar.css'
import logo from '../../../assets/logo1.0.png'
import perfil from '../../../assets/perfil.png'
import search from '../../../assets/search.png'

const Navbar = () => {
  return (
    <nav className='container'>
        <img src={logo} alt="logo" className='logo' />
      
        <ul>
            <li>INICIO</li>
            <li>RESERVAR</li>
            <li>SECCIONES</li>
        </ul>
        
         
        <div className='search-icon'> 
          <img className ='search-icon'src={search} />
        </div>

        

        <img src={perfil} alt="logo" className='perfil' />
      
    </nav>
  )
}

export default Navbar
