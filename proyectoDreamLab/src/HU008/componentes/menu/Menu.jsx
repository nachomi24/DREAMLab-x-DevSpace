import React from 'react'
import './Menu.css'
import logo from '../../assets/logo1.0.png'
import perfil from '../../assets/perfil.png'
import search from '../../assets/search.png'

const Menu = () => {
  return (
    <nav className='container'>
        <img src={logo} alt="logo" className='logo' />
      
        <ul>
            <li>INICIO</li>
            <li>RESERVAR</li>
            <li>SECCIONES</li>
        </ul>
        
        <div className='search-icon'> 
          <img xlassName ='search-icon'src={search} />
        </div>
        
        <img src={perfil} alt="logo" className='perfil' />
      
    </nav>
  )
}
export default Menu