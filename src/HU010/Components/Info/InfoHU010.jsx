import React from 'react'
import '../../HU010.css';
import OpenSpaces from '../../../assets/openspacessala.png'
import Card from '../Card/CardHU010'

const Info = () => {
  return (
    <div className='boxHU010'>
      <div>
        <img src={OpenSpaces} alt="Garage" className='GarageHU010 container' />
      </div>
      <Card />
    </div>  
  )
}

export default Info
