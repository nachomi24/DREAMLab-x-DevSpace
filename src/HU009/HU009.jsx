import Navbar from '../Navbar/Navbar'
import Content from './Components/Content/Content'
import Info from './Components/Info/Info'
import React from 'react'
import './HU009.css'
import '../global.css'

const HU009 = () => {
  return (
    <div className="cuerpoHU009">
      <Navbar />
      <Content />
      <Info />
    </div>
  )
}

export default HU009;
