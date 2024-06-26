import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../HU025.css";
import fotodreamy from "../../assets/dreamy_escritor2.png";
import PopUp from "../../HU004/componentes/detalle/Detalle";
import PopUpProfesor from "../../HU004/componentes/detalle/DetalleProfesor";
import clockWait from "../../assets/clock.gif";
import checkmarkGif from "../../assets/checkmark.gif";
import crossmarkGif from "../../assets/crossmark.gif";

const apiSALAS = "https://dreamlabapidev.azurewebsites.net/api/salas";
const apiHORARIO = "https://dreamlabapidev.azurewebsites.net/api/horario/";
const apiRECURSOS = "https://dreamlabapidev.azurewebsites.net/api/recursos/";
const apiCUPO = "https://dreamlabapidev.azurewebsites.net/api/cupo/";
const apiRESERVACIONEstudiante =
  "https://dreamlabapidev.azurewebsites.net/api/reservacion/estudiante";
const apiRESERVACIONProfesor =
  "https://dreamlabapidev.azurewebsites.net/api/reservacion/profesor";

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
  const userType = localStorage.getItem("userType");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const obtenerSalas = async () => {
      try {
        const response = await axios.get(apiSALAS);
        const salasFiltradas = response.data.filter((sala) => {
          if (userType === "alumno") {
            return sala.Tipo === "Todos";
          } else if (userType === "profesor") {
            return sala.Tipo === "Todos" || sala.Tipo === "Profesor";
          }
          return false;
        });
        setSalas(salasFiltradas);
      } catch (error) {
        console.error("Error al obtener salas:", error);
      }
    };

    obtenerSalas();
  }, [userType]);

  useEffect(() => {
    if (selectedSala) {
      const obtenerDetallesSala = async () => {
        try {
          const responseHorario = await axios.get(
            `${apiHORARIO}${selectedSala}`
          );

          // Transformar el horario de HH:MM:SS a HH:MM
          const horariosTransformados = {
            HoraInicio: responseHorario.data.HoraInicio.slice(0, 5),
            HoraFin: responseHorario.data.HoraFin.slice(0, 5),
          };

          const procesarHora = (hora) => {
            // Obtener los primeros dos caracteres para comparar la hora
            const horaNum = parseInt(hora.slice(0, 2), 10);
          
            // Si la hora es menor a 10, usar slice(0, 4), si no, usar slice(0, 5)
            if (horaNum < 10) {
              return hora.slice(0, 4);
            } else {
              return hora.slice(0, 5);
            }
          };

          const horaInicioSplit = procesarHora(responseHorario.data.HoraInicio);
          const horaFinSplit = procesarHora(responseHorario.data.HoraFin);

          console.log(horariosTransformados);

          setHorarios(horariosTransformados);

          const responseRecursos = await axios.get(
            `${apiRECURSOS}${selectedSala}`
          );
          const recursosArray = responseRecursos.data.Recursos.split(",").map(
            (recurso) => {
              const [cantidad, nombre] = recurso.trim().split(" ");
              return { nombre, cantidad: parseInt(cantidad) };
            }
          );
          setRecursos(recursosArray);

          const responseCupo = await axios.get(`${apiCUPO}${selectedSala}`);
          setCupo(responseCupo.data.Cupo);

          setHoraInicio(horaInicioSplit);
          setHoraFin(horaFinSplit);
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

    if (
      !selectedSala ||
      !fechaSeleccionada ||
      !horaInicio ||
      !horaFin ||
      !cantidadPersonas
    ) {
      setErrorMessage("No has introducido todos los campos");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    const selectedResources =
      Object.entries(recursosSeleccionados)
        .filter(([recurso, cantidad]) => cantidad > 0)
        .map(([recurso, cantidad]) => `${cantidad} ${recurso}`)
        .join(", ") || "Ninguno";

    if (userType === "alumno") {
      if (!matricula) {
        alert("No se encontró la matrícula en el almacenamiento local.");
        return;
      }

      const data = {
        Matricula: matricula,
        SalaID: selectedSala || "",
        Dia: fechaSeleccionada
          ? fechaSeleccionada.toISOString().split("T")[0]
          : "",
        HoraInicio: horaInicio,
        HoraFin: horaFin,
        Recursos: selectedResources,
        Personas: cantidadPersonas,
        Confirmada: 0,
      };

      setReservaData(data);
      setShowPopUp(true);
    } else {
      if (!matricula) {
        alert("No se encontró la matrícula en el almacenamiento local.");
        return;
      }

      const data = {
        Nomina: matricula,
        SalaID: selectedSala || "",
        Dia: fechaSeleccionada
          ? fechaSeleccionada.toISOString().split("T")[0]
          : "",
        HoraInicio: horaInicio,
        HoraFin: horaFin,
        Recursos: selectedResources,
        Personas: cantidadPersonas,
        Confirmada: 0,
      };

      setReservaData(data);
      setShowPopUp(true);
    }
  };

  const handleConfirmReservation = async () => {
    setIsConfirming(true);
    if (userType === "alumno") {
      try {
        console.log("Data de la reserva:", reservaData);
        const response = await axios.post(
          apiRESERVACIONEstudiante,
          reservaData
        );
        console.log("Respuesta de la API:", response.data);
        setShowPopUp(false);
        setIsConfirming(false);
        setIsConfirmed(true);
        setTimeout(() => {
          setIsConfirmed(false);
          window.location.href = "/perfil";
        }, 2000);
      } catch (error) {
        if (error.response) {
          console.error("Error al realizar la reserva:", error.response.data);
          setIsConfirming(false);
          setIsCanceled(true);
          setTimeout(() => {
            setIsCanceled(false);
          }, 3000);
        } else {
          console.error("Error al realizar la reserva:", error.message);
          setIsConfirming(false);
          setIsCanceled(true);
          setTimeout(() => {
            setIsCanceled(false);
          }, 3000);
        }
      }
    } else {
      try {
        console.log("Data de la reserva:", reservaData);
        const response = await axios.post(apiRESERVACIONProfesor, reservaData);
        console.log("Respuesta de la API:", response.data);
        setShowPopUp(false);
        setIsConfirming(false);
        setIsConfirmed(true);
        setTimeout(() => {
          setIsConfirmed(false);
          window.location.href = "/perfil";
        }, 2000);
      } catch (error) {
        if (error.response) {
          console.error("Error al realizar la reserva:", error.response.data);
          alert(`Error al realizar la reserva: ${error.response.data.detail}`);
        } else {
          console.error("Error al realizar la reserva:", error.message);
          alert(
            "Error al realizar la reserva. Por favor, revise la consola para más detalles."
          );
        }
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
    setRecursosSeleccionados((prevState) => ({
      ...prevState,
      [recurso]: cantidad,
    }));
  };

  const generateTimeOptions = (
    start,
    end,
    startFrom = null,
    excludeStart = false
  ) => {
    const startHour = parseInt(start.split(":")[0], 10);
    const startMinute = parseInt(start.split(":")[1], 10);
    const endHour = parseInt(end.split(":")[0], 10);
    const endMinute = parseInt(end.split(":")[1], 10);

    const options = [];
    let hour = startFrom ? parseInt(startFrom.split(":")[0], 10) : startHour;
    let minute = startFrom
      ? parseInt(startFrom.split(":")[1], 10)
      : startMinute;

    if (excludeStart) {
      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
    }

    while (hour < endHour || (hour === endHour && minute <= endMinute)) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      options.push(timeString);

      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
    }

    return options;
  };

  const availableStartTimes = generateTimeOptions(
    horarios.HoraInicio,
    horarios.HoraFin
  );

  const availableEndTimes = horaInicio
    ? generateTimeOptions(horaInicio, horarios.HoraFin, horaInicio, true)
    : [];

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
        <h2 className="h2HU025">RESERVA TU LUGAR</h2>
        <div
          style={{ display: "flex", marginBottom: "20px", marginTop: "10px" }}
        >
          <a href="/reservar" className="reservation-link">
            Haz click aquí para reservar con Dreamy
          </a>
        </div>
        <form className="reservation-form-HU025" onSubmit={handleSubmit}>
          <label className="subtitulo-HU025">
            Sala:
            <select
              id="sala"
              value={selectedSala}
              onChange={(e) => setSelectedSala(e.target.value)}
            >
              <option value="" disabled>
                Selecciona una sala
              </option>
              {salas.map((sala) => (
                <option key={sala.SalaID} value={sala.SalaID}>
                  {sala.Nombre}
                </option>
              ))}
            </select>
          </label>
          <label className="subtitulo-HU025">
            Fecha:
            <DatePicker
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccione una fecha"
              selected={fechaSeleccionada}
              onChange={(date) => setFechaSeleccionada(date)}
              filterDate={(date) => !isWeekend(date)}
              closeOnScroll={true}
            />
          </label>
          <label className="subtitulo-HU025">
            Hora de Inicio:
            <select
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
            >
              {availableStartTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <label className="subtitulo-HU025">
            Hora de Fin:
            <select
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
            >
              {availableEndTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <label className="subtitulo-HU025">Recursos:</label>
          <div className="prev-fieldset">
            <fieldset>
              {recursos.map((recurso) => (
                <div key={recurso.nombre}>
                  <label>
                    {recurso.nombre}:
                    <div className="counter-HU025">
                      <button
                        type="button"
                        onClick={() =>
                          handleResourceChange(
                            recurso.nombre,
                            Math.max(
                              (recursosSeleccionados[recurso.nombre] || 0) - 1,
                              0
                            )
                          )
                        }
                      >
                        -
                      </button>
                      <span>{recursosSeleccionados[recurso.nombre] || 0}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleResourceChange(
                            recurso.nombre,
                            Math.min(
                              (recursosSeleccionados[recurso.nombre] || 0) + 1,
                              recurso.cantidad
                            )
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </label>
                </div>
              ))}
            </fieldset>
          </div>
          <label className="subtitulo-HU025">
            Cantidad de Personas:
            <div className="counter-HU025">
              <button
                type="button"
                onClick={() =>
                  setCantidadPersonas((prev) => Math.max(prev - 1, 1))
                }
              >
                -
              </button>
              <span>{cantidadPersonas}</span>
              <button
                type="button"
                onClick={() =>
                  setCantidadPersonas((prev) => Math.min(prev + 1, cupo))
                }
              >
                +
              </button>
            </div>
          </label>
          {errorMessage && (
            <div className="errorHU004 show">
              <div className="title">{errorMessage}</div>
            </div>
          )}
          <button className="submit-button-HU025" type="submit">
            RESERVAR
          </button>
        </form>
        {userType === "alumno" && showPopUp && (
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
        {userType === "profesor" && showPopUp && (
          <PopUpProfesor
            onClose={() => setShowPopUp(false)}
            Nomina={reservaData.Nomina}
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
        {isConfirming && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="loading-indicator">
                <img
                  style={{ width: "30%" }}
                  src={clockWait}
                  alt="Procesando"
                />
                <p>Procesando...</p>
              </div>
            </div>
          </div>
        )}
        {isConfirmed && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="confirmation-message">
                <img src={checkmarkGif} alt="Confirmación" />
                <p>
                  <b>RESERVACIÓN CONFIRMADA</b>
                </p>
              </div>
            </div>
          </div>
        )}
        {isCanceled && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="confirmation-message">
                <img src={crossmarkGif} alt="Cancelación" />
                <p>
                  <b>RESERVACIÓN ERRÓNEA</b>
                </p>
                <p>Ya cuentas con una reservación para ese día</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;
