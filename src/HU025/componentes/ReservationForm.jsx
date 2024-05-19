import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationForm.css'; // Para estilos personalizados
import fotodreamy from '../../assets/dreamy.png';

const ReservationForm = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  
  const rooms = [
    { value: 'sala1', label: 'Sala 1' },
    { value: 'sala2', label: 'Sala 2' },
    { value: 'sala3', label: 'Sala 3' },
  ];

  const resources = [
    ' Proyector',
    ' Pizarra',
    ' WiFi',
    ' Cafetera',
  ];

  return (
    <div className="container">
        <div className="left">
            <br />
            <br />
            <br />
            <br />
            <img src={fotodreamy} className="dreamy" alt="foto de dreamy" />
        </div>
        <div className="right">
            <br />
            <br />
            <br />
            <br />
            <h2>RESERVA TU LUGAR</h2>
            <form className="reservation-form">
                <label className='subtitulo'>
                Sala:
                <Select
                    options={rooms}
                    placeholder="Seleccione una sala"
                />
                </label>
                <label className='subtitulo'>
                Fecha:
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Seleccione una fecha"
                    selected={fechaSeleccionada}
                    onChange={(date) => setFechaSeleccionada(date)}
                />
                </label>
                <label className='subtitulo'>
                Hora de Inicio:
                <input
                    type="time"
                />
                </label>
                <label className='subtitulo'>
                Hora de Fin:
                <input
                    type="time"
                />
                </label>
                <label className='subtitulo'>
                Recursos:
                </label>
                <fieldset>
                {resources.map(resource => (
                    <div key={resource}>
                    <label>
                        <input
                        type="checkbox"
                        />
                        {resource}
                    </label>
                    </div>
                ))}
                </fieldset>
                <label className='subtitulo'>
                Cantidad de Personas:
                <div className="counter">
                    <button type="button" onClick={() => setCantidadPersonas(prevCount => prevCount > 1 ? prevCount - 1 : 1)}>-</button>
                    <span>{cantidadPersonas}</span>
                    <button type="button" onClick={() => setCantidadPersonas(prevCount => prevCount + 1)}>+</button>
                </div>
                </label>
                <button type="submit">Reservar</button>
            </form>
        </div>
    </div>
    );
};

export default ReservationForm;
