import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import '../HU025.css';
import fotodreamy from '../../assets/dreamy.png';

const apiSALAS = "https://dreamlabapidev.azurewebsites.net/api/salas";
const apiHORARIO = "https://dreamlabapidev.azurewebsites.net/api/horario/";
const apiRECURSOS = "https://dreamlabapidev.azurewebsites.net/api/recursos/";
const apiCUPO = "https://dreamlabapidev.azurewebsites.net/api/cupo/";
const apiRESERVACION = "https://dreamlabapidev.azurewebsites.net/api/reservacion";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            Matricula: "A01027008", // Matrícula por defecto
            SalaID: selectedSala?.value || "",
            Dia: fechaSeleccionada ? fechaSeleccionada.toISOString().split('T')[0] : "",
            HoraInicio: horaInicio,
            HoraFin: horaFin,
            Recursos: Object.entries(recursosSeleccionados).map(([recurso, cantidad]) => `${cantidad} ${recurso}`).join(', '),
            Personas: cantidadPersonas,
            Confirmada: 0 // Confirmada por defecto
        };
        console.log("Datos a enviar:", data); // Añadir este log para ver los datos antes de enviarlos
        try {
            const response = await axios.post(apiRESERVACION, data);
            console.log("Respuesta de la API:", response.data);
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
        const day = date.getDay();
        return day === 0 || day === 6; // Para deshabilitar sábados y domingos
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
                        <Select
                            options={optionsSalas}
                            placeholder="Selecciona una sala"
                            value={selectedSala}
                            onChange={setSelectedSala}
                        />
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
                            {timeOptions.map(time => (
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
                            {timeOptions.map(time => (
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
                        <div className="counter-HU025">
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
