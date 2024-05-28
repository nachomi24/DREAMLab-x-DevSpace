import React from 'react'
import '../../HU0019.css';
import Garage from '../../../assets/Garage.png'
import Card from '../Card/Card'

const Info = () => {
  return (
    
    <div className='info-box'>
        <img src={Garage} alt="Garage" border="0" className='Garage container' />
        
       <Card />
    </div>  
  )
}

export default Info
