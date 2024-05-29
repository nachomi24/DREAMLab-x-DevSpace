import Menu from '../Navbar/Navbar'
import Header from './componentes/header/Header'
import Secciones from './componentes/secciones/Secciones'
import Secciones2 from './componentes/secciones2/Secciones2'
import Descripcion from './componentes/descripcion/Descripcion'
import React from 'react'
import './HU008.css'
import '../global.css'

const HU008 = () => {
  return (
    <div className="cuerpoHU008" >
      <Menu />
      <Header />
      <Descripcion />
      <Secciones />
      <Secciones2 />
    </div>
  )
}

export default HU008;