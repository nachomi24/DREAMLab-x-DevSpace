import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../HU025.css';
import fotodreamy from '../../assets/dreamy.png';
import PopUp from "../../HU004/componentes/detalle/Detalle";

const apiSALAS = "https://dreamlabapidev.azurewebsites.net/api/salas";
const apiHORARIO = "https://dreamlabapidev.azurewebsites.net/api/horario/";
const apiRECURSOS = "https://dreamlabapidev.azurewebsites.net/api/recursos/";
const apiCUPO = "https://dreamlabapidev.azurewebsites.net/api/cupo/";
const apiRESERVACION = "https://dreamlabapidev.azurewebsites.net/api/reservacion";

const ReservationForm = () => {
    const [salas, setSalas] = useState([]);
    const [selectedSala, setSelectedSala] = useState("");
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [cantidadPersonas, setCantidadPersonas] = useState(1);
    const [horarios, setHorarios] = useState({ HoraInicio: "", HoraFin: "" });
    const [recursos, setRecursos] = useState([]);
    const [cupo, setCupo] = useState(1);
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [recursosSeleccionados, setRecursosSeleccionados] = useState({});
    const [showPopUp, setShowPopUp] = useState(false);
    const [reservaData, setReservaData] = useState({});

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
                    const responseHorario = await axios.get(`${apiHORARIO}${selectedSala}`);
                    setHorarios(responseHorario.data);

                    const responseRecursos = await axios.get(`${apiRECURSOS}${selectedSala}`);
                    const recursosArray = responseRecursos.data.Recursos.split(',').map(recurso => {
                        const [cantidad, nombre] = recurso.trim().split(' ');
                        return { nombre, cantidad: parseInt(cantidad) };
                    });
                    setRecursos(recursosArray);

                    const responseCupo = await axios.get(`${apiCUPO}${selectedSala}`);
                    setCupo(responseCupo.data.Cupo);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const matricula = localStorage.getItem("matricula");

        if (!matricula) {
            alert("No se encontró la matrícula en el almacenamiento local.");
            return;
        }

        const data = {
            Matricula: matricula,
            SalaID: selectedSala || "",
            Dia: fechaSeleccionada ? fechaSeleccionada.toISOString().split('T')[0] : "",
            HoraInicio: horaInicio,
            HoraFin: horaFin,
            Recursos: Object.entries(recursosSeleccionados).map(([recurso, cantidad]) => `${cantidad} ${recurso}`).join(', '),
            Personas: cantidadPersonas,
            Confirmada: 0 
        };

        setReservaData(data);
        setShowPopUp(true);
    };

    const handleConfirmReservation = async () => {
        try {
            const response = await axios.post(apiRESERVACION, reservaData);
            console.log("Respuesta de la API:", response.data);
            setShowPopUp(false);
            alert("Reserva realizada con éxito");
        } catch (error) {
            if (error.response) {
                console.error("Error al realizar la reserva:", error.response.data);
                alert(`Error al realizar la reserva: ${error.response.data.detail}`);
            } else {
                console.error("Error al realizar la reserva:", error.message);
                alert("Error al realizar la reserva. Por favor, revise la consola para más detalles.");
            }
        }
    };

    const isWeekend = (date) => {
        const today = new Date();        
        today.setHours(0, 0, 0, 0);
    
        date.setHours(0, 0, 0, 0);
        if (date <= today) {
            return 1;
        }
    
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const handleResourceChange = (recurso, cantidad) => {
        setRecursosSeleccionados(prevState => ({
            ...prevState,
            [recurso]: cantidad
        }));
    };

    const generateTimeOptions = (start, end, startFrom = null, excludeStart = false) => {
        const startHour = parseInt(start.split(':')[0], 10);
        const startMinute = parseInt(start.split(':')[1], 10);
        const endHour = parseInt(end.split(':')[0], 10);
        const endMinute = parseInt(end.split(':')[1], 10);

        const options = [];
        let hour = startFrom ? parseInt(startFrom.split(':')[0], 10) : startHour;
        let minute = startFrom ? parseInt(startFrom.split(':')[1], 10) : startMinute;

        if (excludeStart) {
            minute += 30;
            if (minute >= 60) {
                minute = 0;
                hour += 1;
            }
        }

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

    const timeOptionsStart = generateTimeOptions(horarios.HoraInicio, horarios.HoraFin);
    const timeOptionsEnd = generateTimeOptions(horarios.HoraInicio, horarios.HoraFin, horaInicio, true);

    return (
        <div className="containerHU025">
            <div className="left-HU025">
                <br />
                <br />
                <br />
                <br />
                <img src={fotodreamy} className="dreamy-HU025" alt="foto de dreamy" />
            </div>
            <div className="right-HU025">
                <br />
                <br />
                <br />
                <br />
                <h2 className='h2HU025'>RESERVA TU LUGAR</h2>
                <form className="reservation-form-HU025" onSubmit={handleSubmit}>
                    <label className='subtitulo-HU025'>
                        Sala:
                        <select
                            value={selectedSala}
                            onChange={(e) => setSelectedSala(e.target.value)}
                        >
                            <option value="" disabled>Selecciona una sala</option>
                            {salas.map(sala => (
                                <option key={sala.SalaID} value={sala.SalaID}>
                                    {sala.Nombre}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='subtitulo-HU025'>
                        Fecha:
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Seleccione una fecha"
                            selected={fechaSeleccionada}
                            onChange={(date) => setFechaSeleccionada(date)}
                            filterDate={(date) => !isWeekend(date)}
                        />
                    </label>
                    <label className='subtitulo-HU025'>
                        Hora de Inicio:
                        <select
                            value={horaInicio}
                            onChange={(e) => setHoraInicio(e.target.value)}
                        >
                            {timeOptionsStart.map(time => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='subtitulo-HU025'>
                        Hora de Fin:
                        <select
                            value={horaFin}
                            onChange={(e) => setHoraFin(e.target.value)}
                        >
                            {timeOptionsEnd.map(time => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='subtitulo-HU025'>
                        Recursos:
                    </label>
                    <fieldset>
                        {recursos.map(recurso => (
                            <div key={recurso.nombre}>
                                <label>
                                    {recurso.nombre}:
                                    <div className="counter-HU025">
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
                    <label className='subtitulo-HU025'>
                        Cantidad de Personas:
                        <input
                            type="number"
                            value={cantidadPersonas}
                            onChange={(e) => setCantidadPersonas(Math.min(Math.max(e.target.value, 1), cupo))}
                            min="1"
                            max={cupo}
                        />
                    </label>
                    <button className="submit-button-HU025" type="submit">RESERVAR</button>
                </form>
                {showPopUp && (
                    <PopUp
                        onClose={() => setShowPopUp(false)}
                        Matricula={reservaData.Matricula}
                        SalaID={reservaData.SalaID}
                        Dia={reservaData.Dia}
                        HoraInicio={reservaData.HoraInicio}
                        HoraFin={reservaData.HoraFin}
                        Recursos={reservaData.Recursos}
                        Personas={reservaData.Personas}
                        Confirmada={reservaData.Confirmada}
                        onConfirm={handleConfirmReservation}
                    />
                )}
            </div>
        </div>
    );
};

export default ReservationForm;
