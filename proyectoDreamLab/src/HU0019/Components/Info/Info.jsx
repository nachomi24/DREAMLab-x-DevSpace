import React from 'react'
import './Info.css'
import Garage from '../../../assets/Garage.png'
import Card from '../Card/Card'

const Info = () => {
  return (
    
    <div className='box'>
        <img src={Garage} alt="Garage" border="0" className='Garage container' />
        
       <Card />
    </div>  
  )
}

export default Info
