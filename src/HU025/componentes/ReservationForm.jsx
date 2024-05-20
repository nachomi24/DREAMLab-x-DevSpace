import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationForm.css';
import fotodreamy from '../../assets/dreamy.png';

const apiSALAS = "https://devspaceapi2.azurewebsites.net/api/salas";
const apiHORARIO = "https://devspaceapi2.azurewebsites.net/api/horario/";
const apiRECURSOS = "https://devspaceapi2.azurewebsites.net/api/recursos/";
const apiCUPO = "https://devspaceapi2.azurewebsites.net/api/cupo/";

const ReservationForm = () => {
    const [salas, setSalas] = useState([]);
    const [selectedSala, setSelectedSala] = useState(null);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [cantidadPersonas, setCantidadPersonas] = useState(1);
    const [horarios, setHorarios] = useState({ HoraInicio: "", HoraFin: "" });
    const [recursos, setRecursos] = useState([]);
    const [cupo, setCupo] = useState(1);
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [recursosSeleccionados, setRecursosSeleccionados] = useState({});

    useEffect(() => {
        const obtenerSalas = async () => {
            try {
                const response = await axios.get(apiSALAS);
                setSalas(response.data);
            } catch (error) {
                console.error("Error al obtener salas:", error);
            }
        };

        obtenerSalas();
    }, []);

    useEffect(() => {
        if (selectedSala) {
            const obtenerDetallesSala = async () => {
                try {
                    const responseHorario = await axios.get(`${apiHORARIO}${selectedSala.value}`);
                    setHorarios(responseHorario.data);

                    const responseRecursos = await axios.get(`${apiRECURSOS}${selectedSala.value}`);
                    const recursosArray = responseRecursos.data.Recursos.split(',').map(recurso => {
                        const [cantidad, nombre] = recurso.trim().split(' ');
                        return { nombre, cantidad: parseInt(cantidad) };
                    });
                    setRecursos(recursosArray);

                    const responseCupo = await axios.get(`${apiCUPO}${selectedSala.value}`);
                    setCupo(responseCupo.data.Cupo);

                    // Reiniciar horas seleccionadas y recursos seleccionados
                    setHoraInicio(responseHorario.data.HoraInicio);
                    setHoraFin(responseHorario.data.HoraFin);
                    setRecursosSeleccionados({});
                } catch (error) {
                    console.error("Error al obtener detalles de la sala:", error);
                }
            };

            obtenerDetallesSala();
        }
    }, [selectedSala]);

    const optionsSalas = salas.map(sala => ({
        value: sala.SalaID,
        label: sala.Nombre
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            sala: selectedSala,
            fecha: fechaSeleccionada,
            cantidadPersonas,
            horaInicio,
            horaFin,
            recursosSeleccionados
        });
    };

    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6; // Para desabilitar sabados y domingos
    };

    const handleResourceChange = (recurso, cantidad) => {
        setRecursosSeleccionados(prevState => ({
            ...prevState,
            [recurso]: cantidad
        }));
    };

    const generateTimeOptions = (start, end) => {
        const startHour = parseInt(start.split(':')[0], 10);
        const startMinute = parseInt(start.split(':')[1], 10);
        const endHour = parseInt(end.split(':')[0], 10);
        const endMinute = parseInt(end.split(':')[1], 10);

        const options = [];
        let hour = startHour;
        let minute = startMinute;

        while (hour < endHour || (hour === endHour && minute <= endMinute)) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            options.push(timeString);

            minute += 30;
            if (minute >= 60) {
                minute = 0;
                hour += 1;
            }
        }

        return options;
    };

    const timeOptions = generateTimeOptions(horarios.HoraInicio, horarios.HoraFin);

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
                <form className="reservation-form" onSubmit={handleSubmit}>
                    <label className='subtitulo'>
                        Sala:
                        <Select
                            options={optionsSalas}
                            placeholder="Seleccione una sala"
                            value={selectedSala}
                            onChange={setSelectedSala}
                        />
                    </label>
                    <label className='subtitulo'>
                        Fecha:
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Seleccione una fecha"
                            selected={fechaSeleccionada}
                            onChange={(date) => setFechaSeleccionada(date)}
                            filterDate={(date) => !isWeekend(date)}
                        />
                    </label>
                    <label className='subtitulo'>
                        Hora de Inicio:
                        <select
                            value={horaInicio}
                            onChange={(e) => setHoraInicio(e.target.value)}
                        >
                            {timeOptions.map(time => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='subtitulo'>
                        Hora de Fin:
                        <select
                            value={horaFin}
                            onChange={(e) => setHoraFin(e.target.value)}
                        >
                            {timeOptions.map(time => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='subtitulo'>
                        Recursos:
                    </label>
                    <fieldset>
                        {recursos.map(recurso => (
                            <div key={recurso.nombre}>
                                <label>
                                    {recurso.nombre}:
                                    <div className="counter">
                                        <button
                                            type="button"
                                            onClick={() => handleResourceChange(recurso.nombre, Math.max((recursosSeleccionados[recurso.nombre] || 0) - 1, 0))}
                                        >
                                            -
                                        </button>
                                        <span>{recursosSeleccionados[recurso.nombre] || 0}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleResourceChange(recurso.nombre, Math.min((recursosSeleccionados[recurso.nombre] || 0) + 1, recurso.cantidad))}
                                        >
                                            +
                                        </button>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </fieldset>
                    <label className='subtitulo'>
                        Cantidad de Personas:
                        <div className="counter">
                            <button
                                type="button"
                                onClick={() => setCantidadPersonas(prevCount => prevCount > 1 ? prevCount - 1 : 1)}
                            >
                                -
                            </button>
                            <span>{cantidadPersonas}</span>
                            <button
                                type="button"
                                onClick={() => setCantidadPersonas(prevCount => prevCount < cupo ? prevCount + 1 : prevCount)}
                            >
                                +
                            </button>
                        </div>
                    </label>
                    <button type="submit">Reservar</button>
                </form>
            </div>
        </div>
    );
};

export default ReservationForm;
