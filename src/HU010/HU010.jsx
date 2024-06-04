import Navbar from '../Navbar/Navbar'
import Content from './Components/Content/HU010'
import Info from './Components/Info/InfoHU010'
import React from 'react'
import './HU010.css'
import '../global.css'

const HU010 = () => {
  return (
    <div className="cuerpoHU010">
      <Navbar />
      <Content />
      <Info />
    </div>
  )
}

export default HU010;
