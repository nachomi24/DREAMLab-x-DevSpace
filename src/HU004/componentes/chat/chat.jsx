import { useState, useEffect, useRef } from "react";
import axios, { isCancel } from "axios";
import "../../HU004.css";
import loadingChat from "../../../assets/chat_loading_4.gif";
import PopUp from "../detalle/Detalle";
import clockWait from "../../../assets/clock.gif";
import checkmarkGif from "../../../assets/checkmark.gif";
import crossmarkGif from "../../../assets/crossmark.gif";
import envioDreamy from "../../../assets/envio_dreamy.mp3";
import notificacionDreamy from "../../../assets/notificacion_dreamy.mp3";

const Chat = ({ setCurrentImage, images }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [inputText, setInputText] = useState("");
  const [prevInputText, setPrevInputText] = useState(""); // Estado para almacenar el estado anterior del input
  const messagesEndRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(true);

  const matriculita = localStorage.getItem("matricula");
  const [salaID, setSalaID] = useState("");
  const [dia, setDia] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [recursos, setRecursos] = useState("");
  const [personas, setPersonas] = useState("");
  const confirmada = 0;
  const [showPopUp, setShowPopUp] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const [threadID, setThreadID] = useState("");
  const [inputError, setInputError] = useState("");

  const envioSound = new Audio(envioDreamy);
  const notificacionSound = new Audio(notificacionDreamy);

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  };

  const toggleBotonDreamy = () => {
    setShowButton(false);
    setShowMessageInput(true);
  };

  const sendMessage = async (text, side) => {
    if (text.trim() === "") {
      setInputError("No has ingresado ninguna solicitud a Dreamy");
      setTimeout(() => {
        setInputError("");
      }, 3000);
      return;
    }

    setInputError(""); // Clear previous error if any

    const newMessage = { text, side };
    setMessages((messages) => [...messages, newMessage]);
    setInputText("");

    // Reproducir el sonido de envío
    envioSound.play();

    // Mostrar mensaje de carga
    const loadingMessage = {
      text: <img style={{ width: "40px" }} src={loadingChat} alt="Loading" />,
      side: "left",
    };
    const loadingMessageIndex = messages.length + 1; // Añadimos +1 porque ya hemos añadido el mensaje del usuario.
    setMessages((messages) => [...messages, loadingMessage]);

    // Cambiar la imagen a dreamyCelular cuando se envía el mensaje
    setCurrentImage(images.dreamyCelular);
    setMessageSent(true);

    // Enviar solicitud a la API
    try {
      let response;
      if (!threadID) {
        // Primera interacción, crear thread
        response = await axios.post(
          "https://dreamlabapidev.azurewebsites.net/api/crear_thread",
          { question: text }
        );
        const newThreadID = response.data.thread_id;
        setThreadID(newThreadID);
        localStorage.setItem("threadID", newThreadID);
      } else {
        const thread_ID = localStorage.getItem("threadID");
        // Interacciones subsecuentes, interactuar con thread existente
        response = await axios.post(
          "https://dreamlabapidev.azurewebsites.net/api/interactuar_thread",
          { thread_id: thread_ID, question: text }
        );
      }

      // Formatear el mensaje del bot
      const formattedText = response.data.message.content;

      const botResponse = {
        text: formattedText,
        side: "left",
      };

      // Reproducir el sonido de notificación
      notificacionSound.play();

      // Cambiar la imagen a dreamyFeliz cuando se recibe la respuesta
      setCurrentImage(images.dreamyFeliz);

      // Reemplazar el mensaje de "Cargando..." con la respuesta del bot
      setMessages((messages) => {
        const updatedMessages = [...messages];
        updatedMessages[loadingMessageIndex] = botResponse;

        // Verificar si la respuesta contiene "enviada para ser procesada"
        if (botResponse.text.toLowerCase().includes("enviada")) {
          const recursos = [
            "Mouse",
            "mouse",
            "Mouses",
            "mouses",
            "Apple Vision Pro",
            "Lectores de huella",
            "lectores de huella",
            "Lector de huella",
            "lector de huella",
            "Lectores",
            "lectores",
            "Lector",
            "lector",
            "Robots",
            "robots",
            "Robot",
            "robot",
            "Routers",
            "routers",
            "Router",
            "router",
            "Cautines",
            "Cautin",
            "cautin",
            "cautines",
            "Cautín",
            "cautín",
            "Computadoras",
            "computadoras",
            "Computadora",
            "computadora",
            "Switches",
            "Switch",
            "switches",
            "switch",
            "Diodos Led",
            "Diodo Led",
            "diodos led",
            "diodo led",
            "diodos",
            "Diodos",
            "diodo",
            "Diodo",
            "Laptops",
            "laptops",
            "Laptop",
            "laptop",
            "Calculadoras",
            "calculadoras",
            "Calculadora",
            "calculadora",
          ];
          // Crear una expresión regular para buscar recursos y cantidades
          const recursoRegex = new RegExp(
            `(\\d+)\\s+(${recursos.join("|")})`,
            "gi"
          );

          // Buscar coincidencias en el texto de la respuesta del bot
          const recursosEncontrados = [];
          let match;
          while ((match = recursoRegex.exec(botResponse.text)) !== null) {
            recursosEncontrados.push(`${match[1]} ${match[2]}`);
          }

          // Set recursos o "Ninguno" si no se encontraron
          setRecursos(
            recursosEncontrados.length > 0
              ? recursosEncontrados.join(", ")
              : "Ninguno"
          );

          // Usar expresiones regulares para extraer la información
          const salaRegex = /sala (\w+)/i;
          const fechaRegex = /(\d+ de \w+ de \d+)/i;
          const horaRegex =
            /(\d{1,2}(?::\d{2})?\w{2}) a (\d{1,2}(?::\d{2})?\w{2})|(\d{1,2}(?::\d{2})?)\s*:\s*(\d{2}) hasta las (\d{1,2}(?::\d{2})?)|(?:desde las\s*)?(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*hasta las\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i;
          const personasRegex = /(\d+) personas/i;

          const salaMatch = botResponse.text.match(salaRegex);
          const fechaMatch = botResponse.text.match(fechaRegex);
          const horaMatch = botResponse.text.match(horaRegex);
          const personasMatch = botResponse.text.match(personasRegex);

          console.log(salaMatch, fechaMatch, horaMatch, personasMatch);

          if (salaMatch && fechaMatch && horaMatch && personasMatch) {
            const horaInicio = horaMatch[1] || horaMatch[6] || horaMatch[4];
            const horaFin = horaMatch[2] || horaMatch[7] || horaMatch[5];

            if (
              botResponse.text
                .toLowerCase()
                .includes("sin recursos adicionales") ||
              botResponse.text.toLowerCase().includes("sin recursos") ||
              botResponse.text
                .toLowerCase()
                .includes("sin requerir recursos adicionales") ||
              botResponse.text
                .toLowerCase()
                .includes("sin requerir recursos") ||
              botResponse.text
                .toLowerCase()
                .includes("No se requieren recursos adicionales") ||
              botResponse.text
                .toLowerCase()
                .includes("no se requieren recursos adicionales") ||
              botResponse.text
                .toLowerCase()
                .includes("no se requieren recursos") ||
              botResponse.text
                .toLowerCase()
                .includes("No se requieren recursos") ||
              botResponse.text
                .toLowerCase()
                .includes("sin ningún recurso adicional") ||
              botResponse.text.toLowerCase().includes("sin ningún recurso") ||
              botResponse.text
                .toLowerCase()
                .includes("sin requerir ningún recurso adicional") ||
              botResponse.text.toLowerCase().includes("ningún recurso") ||
              botResponse.text
                .toLowerCase()
                .includes("ningún recurso adicional") ||
              botResponse.text
                .toLowerCase()
                .includes("sin necesidad de recursos")
            ) {
              setRecursos("Ninguno");
            }

            setSalaID(salaMatch[1]);
            setDia(convertirFecha(fechaMatch[1]));
            setHoraInicio(convertirHora(horaInicio));
            setHoraFin(convertirHora(horaFin));
            setPersonas(parseInt(personasMatch[1]));

            setShowButton(true);
            setShowMessageInput(false);
          }
        }

        return updatedMessages;
      });
    } catch (error) {
      console.error("Error al enviar solicitud a la API:", error);
      // Opcional: podrías manejar el error aquí, como eliminar el mensaje de "Cargando..."
      setMessages((messages) =>
        messages.filter((_, index) => index !== loadingMessageIndex)
      );
    }
  };

  useEffect(() => {
    const savedThreadID = localStorage.getItem("threadID");
    if (savedThreadID) {
      setThreadID(savedThreadID);
    }
  }, []);

  useEffect(() => {
    const savedMatricula = localStorage.getItem("matricula");

    fetch(
      `https://dreamlabapidev.azurewebsites.net/api/perfil_estudiante/${savedMatricula}`
    )
      .then((response) => response.json())
      .then((data) => {
        const fotoUrl = data.Foto;
        document.documentElement.style.setProperty(
          "--right-avatar",
          `url(${fotoUrl})`
        );
      })
      .catch((error) => {
        console.error("Error al obtener la foto del perfil:", error);
      });
  }, []);

  const convertirFecha = (fecha) => {
    // Extraer el día, mes y año del texto de la fecha
    const [, dia, mes, año] = fecha.match(/(\d+) de (\w+) de (\d+)/);

    // Mapear el nombre del mes a su número correspondiente
    const meses = {
      enero: "01",
      febrero: "02",
      marzo: "03",
      abril: "04",
      mayo: "05",
      junio: "06",
      julio: "07",
      agosto: "08",
      septiembre: "09",
      octubre: "10",
      noviembre: "11",
      diciembre: "12",
    };

    // Obtener el número del mes a partir del nombre
    const mesNumero = meses[mes.toLowerCase()];

    // Formatear la fecha en el formato deseado (AAAA-MM-DD)
    const fechaFormateada = `${año}-${mesNumero.padStart(
      2,
      "0"
    )}-${dia.padStart(2, "0")}`;
    return fechaFormateada;
  };

  const convertirHora = (hora) => {
    // Extraer la hora, los minutos y am/pm del texto de la hora
    const match = hora.match(/(\d{1,2}):?(\d{2})?\s*(am|pm|AM|PM)/i);

    if (match) {
      let horaNumero = parseInt(match[1], 10);
      let minutos = match[2] ? parseInt(match[2], 10) : 0;
      const ampm = match[3].toLowerCase();

      // Convertir la hora a formato de 24 horas si es necesario
      if (ampm === "pm" && horaNumero !== 12) {
        horaNumero += 12;
      } else if (ampm === "am" && horaNumero === 12) {
        horaNumero = 0;
      }

      // Formatear la hora y los minutos en el formato deseado (HH:mm:ss)
      const horaFormateada = `${horaNumero
        .toString()
        .padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
      return horaFormateada;
    }

    // Si la hora no coincide con el formato esperado, devolverla como está
    return hora;
  };

  const handleConfirmReservation = () => {
    const reservationData = {
      SalaID: salaID,
      Matricula: matriculita,
      Dia: dia,
      HoraInicio: horaInicio,
      HoraFin: horaFin,
      Recursos: recursos,
      Personas: personas,
      Confirmada: confirmada,
    };

    togglePopUp();
    setIsConfirming(true);
    axios
      .post(
        "https://dreamlabapidev.azurewebsites.net/api/reservacion/estudiante",
        reservationData
      )
      .then((response) => {
        console.log("Reservación confirmada:", response.data);
        setIsConfirming(false);
        setIsConfirmed(true);
        localStorage.removeItem("chatMessages");
        localStorage.removeItem("threadID");
        setTimeout(() => {
          setIsConfirmed(false);
          window.location.href = "/perfil";
        }, 2000);
      })
      .catch((error) => {
        setIsConfirming(false);
        setIsCanceled(true);
        setTimeout(() => {
          setIsCanceled(false);
        }, 3000);
        console.error("Error al confirmar la reservación:", error);
      });
  };

  const handleMessageChange = (event) => {
    setInputText(event.target.value);
  };

  const handleMessageSubmit = () => {
    sendMessage(inputText, "right");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(inputText, "right");
    }
  };

  useEffect(() => {
    const scrollElement = messagesEndRef.current?.parentNode;
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const welcomeMessage =
      "¡Hola soy Dreamy, tu acompañante en esta aventura! Para reservar ingresa el ID de la sala que deseas reservar, el día, hora de inicio y hora de salida, los recursos que ocupas y la cantidad de personas que estarán en la sala. Para más información, pregúntame lo que quieras.";

    if (messages.length === 0) {
      setMessages([{ text: welcomeMessage, side: "left" }]);
    }
  }, [messages.length]);

  // useEffect para actualizar la imagen en función del estado del inputText
  useEffect(() => {
    if (inputText.trim() !== "" && prevInputText.trim() === "") {
      setCurrentImage(images.dreamyBuscador); // Cambiar la imagen a dreamyBuscador cuando se escribe un mensaje
    } else if (
      inputText.trim() === "" &&
      prevInputText.trim() !== "" &&
      !messageSent
    ) {
      setCurrentImage(images.dreamy); // Restablecer la imagen cuando el input esté vacío
    }
    setPrevInputText(inputText); // Actualizar el estado anterior del inputText
    setMessageSent(false); // Resetear el estado del mensaje enviado
  }, [
    inputText,
    prevInputText,
    setCurrentImage,
    images.dreamyBuscador,
    messageSent,
  ]);

  return (
    <div className="HU004">
      <div className="chat_container">
        <div className="chat_window">
          <div className="top_menuHU004">
            <div className="title">RESERVA TU LUGAR</div>
            <div style={{ display: "flex" }}>
              <a href="/reservar_normal" className="reservation-link">
                Haz click aquí para reservar de manera normal
              </a>
            </div>
          </div>
          {inputError && (
            <div className="errorHU004 show">
              <div className="title">{inputError}</div>
            </div>
          )}
          <ul className="messages" id="all_messages">
            {messages.map((msg, index) => (
              <li key={index} className={`message ${msg.side} appeared`}>
                <div className={`avatar ${msg.side}`}></div>
                <div className="text_wrapper">
                  <div className="text">{msg.text}</div>
                </div>
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>
          {showButton && (
            <div className="bottom_wrapperHU004">
              <button className="send_message2" onClick={togglePopUp}>
                Detalles de Solicitud
              </button>
              <button className="send_message2" onClick={toggleBotonDreamy}>
                Volver con Dreamy
              </button>
            </div>
          )}
          {showMessageInput && (
            <div className="bottom_wrapperHU004 clearfix">
              <div className="message_input_wrapper">
                <textarea
                  id="message_input"
                  className="message_input"
                  placeholder="Escribe tu mensaje"
                  value={inputText}
                  onChange={handleMessageChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="send_message" onClick={handleMessageSubmit}>
                <div className="icon"></div>
                <div className="text">Enviar</div>
              </div>
            </div>
          )}
        </div>
        {showPopUp && (
          <PopUp
            onClose={togglePopUp}
            Matricula={matriculita}
            SalaID={salaID}
            Dia={dia}
            HoraInicio={horaInicio}
            HoraFin={horaFin}
            Recursos={recursos}
            Personas={personas}
            Confirmada={confirmada}
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

export default Chat;
