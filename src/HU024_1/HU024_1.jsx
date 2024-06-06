import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Autoplay } from "swiper/modules";
import Marquee from "react-fast-marquee";
import Card from "./Componentes/Card/Card.jsx";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "./HU024_1.css";
import DreamLab from "../assets/DreamLab.png";
import Dreamy from "../assets/dreamy2.png";

const HU024_1 = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [shuffledPublicaciones, setShuffledPublicaciones] = useState([]);
  const [fechaActual, setFechaActual] = useState("");
  const [pausedColumns, setPausedColumns] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchReservaciones = async () => {
      try {
        const response = await axios.get(
          "https://dreamlabapidev.azurewebsites.net/api/reservaciones_confirmadas"
        );
        setReservaciones(response.data);
      } catch (error) {
        console.error("Error fetching reservaciones:", error);
      }
    };

    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get(
          "https://dreamlabapidev.azurewebsites.net/api/publicaciones_activas"
        );
        setShuffledPublicaciones(shufflePublicaciones(response.data));
      } catch (error) {
        console.error("Error fetching publicaciones:", error);
      }
    };

    fetchReservaciones();
    fetchPublicaciones();

    const actualizarFecha = () => {
      const fecha = new Date();
      const diasSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const diaSemana = diasSemana[fecha.getDay()];
      const dia = fecha.getDate();
      const mes = meses[fecha.getMonth()];
      const año = fecha.getFullYear();
      const hora = fecha.getHours();
      const minutos = fecha.getMinutes().toString().padStart(2, "0");
      const ampm = hora >= 12 ? "PM" : "AM";
      const hora12 = hora % 12 || 12;

      setFechaActual({
        diaSemana,
        fecha: `${dia} de ${mes} de ${año}`,
        hora: `${hora12}:${minutos} ${ampm}`,
      });
    };

    actualizarFecha();
    const interval = setInterval(actualizarFecha, 1000); // Actualiza cada minuto

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.focus();
    }

    return () => clearInterval(interval);
  }, []);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const shufflePublicaciones = (publicaciones) => {
    const numColumns = 7;
    const shuffled = [];
    for (let i = 0; i < numColumns; i++) {
      shuffled.push(shuffleArray(publicaciones));
    }
    return shuffled;
  };

  const convertirHora = (hora) => {
    const [hour, minute] = hora.split(":");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const handleCardClick = (columnIndex, cardIndex) => {
    setPausedColumns((prevPausedColumns) => {
      const isColumnPaused = prevPausedColumns.includes(columnIndex);
      if (isColumnPaused) {
        return prevPausedColumns.filter((index) => index !== columnIndex);
      } else {
        return [...prevPausedColumns, columnIndex];
      }
    });
  };

  const renderVerticalCarousel = (columnIndex) => {
    const isPaused = pausedColumns.includes(columnIndex);
    const direction = columnIndex % 2 === 0 ? "up" : "down";
    const columnPublicaciones = shuffledPublicaciones[columnIndex] || [];

    return (
      <div className={`vertical-carousel ${isPaused ? "paused" : ""}`}>
        <Marquee
          direction={direction}
          gradient={false}
          play={!isPaused}
          speed={50}
          style={{ height: "100%" }}
        >
          {columnPublicaciones.map((publicacion, index) => (
            <div
              key={index}
              className={`carousel-slide`}
              style={{ animationDelay: `${index * 5}s` }}
            >
              <Card
                publicacion={publicacion}
                onClick={() => handleCardClick(columnIndex, index)}
                isPaused={isPaused}
              />
            </div>
          ))}
        </Marquee>
      </div>
    );
  };

  const renderHorizontalSwiper = () => {
    const slidesPerView = 4;
    const loop = reservaciones.length > slidesPerView;

    return (
      <Swiper
        modules={[FreeMode, Mousewheel, Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={20}
        loop={loop}
        mousewheel={true}
        freeMode={true}
        speed={7000}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {reservaciones.map((reservacion, index) => {
          const textLength = reservacion.NombreEstudiante.length;
          const percentage = Math.min(textLength * 0.55, 100); // Porcentaje máximo de 100%
          const duration = Math.min(textLength * 0.2, 10); // Duración mínima de 10 segundos

          return (
            <SwiperSlide key={index}>
              <div className="reservation-card">
                <p
                  className="student-name animated-text"
                  style={{
                    "--duration": `${duration}s`,
                    "--percentage": `${percentage}%`,
                  }}
                >
                  {reservacion.NombreEstudiante}
                </p>
                <p className="room-name">{reservacion.NombreSala}</p>
                <p className="time-range">
                  {convertirHora(reservacion.HoraInicio)} -{" "}
                  {convertirHora(reservacion.HoraFin)}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      const RFID = event.target.value;
      try {
        const response = await axios.post(
          "https://dreamlabapidev.azurewebsites.net/api/loginCredencial",
          { RFID }
        );
        const data = response.data;
        event.target.value = "";
        if (data.Mensaje) {
          setMensaje(
            <>
              <p style={{ color: "lightgreen" }} className="bienvenida">
                HOLA
              </p>
              <p style={{ color: "lightgreen" }} className="bienvenida">
                Dreamer
              </p>
              <p style={{ marginBottom: "5vh" }} className="bienvenida-peque">
                Para conocer más sobre D.R.E.A.M. LAB consulta el siguiente QR
              </p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=https://dreamlabspace.world/open_spaces&size=150x150`}
                alt="QR Code"
                className="qr-code"
              />
            </>
          );
        } else if (data.TipoUsuario === "Admin") {
          const nombre = data.Nombre.split(" ")[0];
          setMensaje(
            <>
              <p style={{ color: "skyblue" }} className="bienvenida">
                HOLA
              </p>
              <p
                style={{
                  color: "skyblue",
                  textTransform: "uppercase",
                  marginBottom: "5vh",
                }}
                className="bienvenida"
              >
                {nombre}
              </p>
              <p style={{ marginBottom: "5vh" }} className="bienvenida-peque">
                Agradecemos tu servicio en D.R.E.A.M. LAB
              </p>
              <img src={Dreamy} alt="Dreamy" className="dreamy" />
            </>
          );
        } else if (data.TipoUsuario === "Profesor") {
          const nombre = data.Nombre.split(" ")[0];
          const numReservaciones = data.Reservaciones.length;
          const qrLink =
            numReservaciones === 0
              ? "https://dreamlabspace.world/reservar"
              : "https://dreamlabspace.world/perfil";
          setMensaje(
            <>
              <p style={{ color: "lightpink" }} className="bienvenida">
                HOLA
              </p>
              <p
                style={{ color: "lightpink", textTransform: "uppercase" }}
                className="bienvenida"
              >
                {nombre}
              </p>
              <p className="bienvenida-mas-peque">cuentas con</p>
              <p style={{ color: "lightpink" }} className="bienvenidota">
                {numReservaciones}
              </p>
              <p style={{ marginBottom: "5vh" }} className="bienvenida-peque">
                {numReservaciones === 1 ? "RESERVACIÓN" : "RESERVACIONES"}
              </p>
              <p
                style={{ marginBottom: "5vh" }}
                className="bienvenida-mas-peque"
              >
                Para{" "}
                {numReservaciones === 1
                  ? "consultar tu reservación"
                  : numReservaciones > 1
                  ? "consultar tus reservaciones"
                  : "realizar una reservación"}{" "}
                consulta el siguiente QR
              </p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrLink}&size=150x150`}
                alt="QR Code"
                className="qr-code"
              />
            </>
          );
        } else {
          const nombre = data.Nombre.split(" ")[0];
          const numReservaciones = data.Reservaciones.length;
          const qrLink =
            numReservaciones === 0
              ? "https://dreamlabspace.world/reservar"
              : "https://dreamlabspace.world/perfil";
          setMensaje(
            <>
              <p style={{ color: "yellow" }} className="bienvenida">
                HOLA
              </p>
              <p
                style={{ color: "yellow", textTransform: "uppercase" }}
                className="bienvenida"
              >
                {nombre}
              </p>
              <p className="bienvenida-mas-peque">cuentas con</p>
              <p style={{ color: "yellow" }} className="bienvenidota">
                {numReservaciones}
              </p>
              <p style={{ marginBottom: "5vh" }} className="bienvenida-peque">
                {numReservaciones === 1 ? "RESERVACIÓN" : "RESERVACIONES"}
              </p>
              <p
                style={{ marginBottom: "5vh" }}
                className="bienvenida-mas-peque"
              >
                Para{" "}
                {numReservaciones === 1
                  ? "consultar tu reservación"
                  : numReservaciones > 1
                  ? "consultar tus reservaciones"
                  : "realizar una reservación"}{" "}
                consulta el siguiente QR
              </p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrLink}&size=150x150`}
                alt="QR Code"
                className="qr-code"
              />
            </>
          );
        }
        setTimeout(() => setMensaje(null), 15000);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-cols-8">
        <div className="col-span-7">
          {reservaciones && reservaciones.length > 0 ? (
            <div className="overflow-hidden">{renderHorizontalSwiper()}</div>
          ) : (
            <div
              style={{ height: "100%", color: "white" }}
              className="flex items-center justify-center manejo-reservas"
            >
              <p className="no-reservations">
                No hay reservaciones para el día de hoy
              </p>
            </div>
          )}
        </div>
        <div className="col-span-1 flex items-center justify-center relative">
          <div className="text-white text-center p-4 z-10">
            <p className="fecha-dia">{fechaActual.diaSemana}</p>
            <p className="fecha-fecha">{fechaActual.fecha}</p>
            <p className="fecha-hora">{fechaActual.hora}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 flex-1" style={{ maxHeight: "100%" }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div className="overflow-hidden" key={i}>
            <div className="column">{renderVerticalCarousel(i)}</div>
          </div>
        ))}
        <div className="col-span-1 flex items-start justify-center relative">
          <div className="text-white text-center p-4 z-10 justify-center items-center">
            {mensaje || (
              <>
                <p className="bienvenida">WELCOME</p>
                <p className="bienvenida-peque">TO</p>
                <img src={DreamLab} alt="DreamLab" className="dreamlab" />
                <p style={{ marginBottom: "5vh" }} className="bienvenida">
                  D.R.E.A.M. LAB
                </p>
                <img src={Dreamy} alt="Dreamy" className="dreamy" />
              </>
            )}
          </div>
        </div>
      </div>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        ref={inputRef}
        style={{ position: "absolute", left: "-9999px" }}
      />
    </div>
  );
};

export default HU024_1;
