import React, { useState } from 'react';
import './dreamy.css';
import fotodreamy from '../../../assets/dreamy.png';
import PopUp from '../detalle/Detalle';

const Bot = () => {
    const [showPopUp, setShowPopUp] = useState(false);

    const togglePopUp = () => {
        setShowPopUp(!showPopUp);
    };

    return (
        <div className="bot-container">
             {/* Borrar esto cuando se implemente el boton correcto */}
            <br></br> <br></br><br></br> <br></br>
            <button onClick={togglePopUp}>DETALLE RESERVA</button> <br/>
            {showPopUp && <PopUp onClose={togglePopUp} />}
            <img src={fotodreamy} alt="foto de dreamy" />
        </div>
    );
};

export default Bot;