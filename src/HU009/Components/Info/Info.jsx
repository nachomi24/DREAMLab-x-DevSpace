import React from 'react'
import '../../HU009.css';
import Garage from '../../../assets/Garage.png'
import Card from '../Card/Card'

const Info = () => {
  return (
    <div className='boxHU009'>
      <div>
        <img src={Garage} alt="Garage" className='Garage container' />
      </div>
      <Card />
    </div>  
  )
}

export default Info
