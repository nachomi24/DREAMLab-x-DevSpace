import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../HU004.css";
import loadingChat from "../../../assets/chat_loading_4.gif";
import PopUp from "../detalle/Detalle";
import adperfil from "../../../assets/adperfil.png";

const Chat = ({ setLoggedIn, setMatricula }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(true);

  const [matriculita, setMatriculita] = useState("");
  const [salaID, setSalaID] = useState("");
  const [dia, setDia] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [recursos, setRecursos] = useState("");
  const [personas, setPersonas] = useState("");
  const confirmada = 0;
  const [showPopUp, setShowPopUp] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    return savedLoginStatus === "true";
  });
  const [matricula, setMatriculaInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("");
  const [threadID, setThreadID] = useState("");
  const [inputError, setInputError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://dreamlabapidev.azurewebsites.net/api/loginNormal",
        {
          Matricula: matricula,
          Contrasena: password,
        }
      );

      if (response.data && response.status === 200) {
        const { Matricula, Tipo } = response.data;
        const normalizedTipo = Tipo.trim().toLowerCase();

        if (normalizedTipo === "admin") {
          window.location.replace(
            "https://green-ground-02320f30f.5.azurestaticapps.net/admin/reservaciones"
          );
        }
        else if (normalizedTipo === "profesor") {
          localStorage.setItem("userType", normalizedTipo);
          window.location.replace(
            "https://green-ground-02320f30f.5.azurestaticapps.net/talleres"
          );
          
        }

        setLoggedIn(true);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        setMatriculita(Matricula);
        setMatricula(Matricula);
        localStorage.setItem("matricula", Matricula);
        setUserType(normalizedTipo);
        setErrorMessage("");
      } else {
        setErrorMessage("Matrícula o contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setErrorMessage("Matrícula o contraseña incorrecta");
    }
  };

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
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

    // Mostrar mensaje de carga
    const loadingMessage = {
      text: "Cargando...",
      side: "left",
    };
    const loadingMessageIndex = messages.length + 1; // Añadimos +1 porque ya hemos añadido el mensaje del usuario.
    setMessages((messages) => [...messages, loadingMessage]);

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

      const botResponse = {
        text: response.data.message.content,
        side: "left",
      };

      // Reemplazar el mensaje de "Cargando..." con la respuesta del bot
      setMessages((messages) => {
        const updatedMessages = [...messages];
        updatedMessages[loadingMessageIndex] = botResponse;

        // Verificar si la respuesta contiene "enviada para ser procesada"
        if (botResponse.text.toLowerCase().includes("enviada")) {
          // Usar expresiones regulares para extraer la información
          const salaRegex = /sala (\w+)/i;
          const fechaRegex = /(\d+ de \w+ de \d+)/i;
          const horaRegex =
            /(\d{1,2}(?::\d{2})?\w{2}) a (\d{1,2}(?::\d{2})?\w{2})|(\d{1,2}(?::\d{2})?)\s*:\s*(\d{2}) hasta las (\d{1,2}(?::\d{2})?)|(?:desde las\s*)?(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*hasta las\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i;
          const recursosRegex =
            /con (\d+ \w+(?:,|\sy\s)\d+ \w+)|(\d+ \w+(?:,|\sy\s)\d+ \w+)|con los recursos de ([^,]+(?:, [^,]+)* y [^,]+)/i;
          const personasRegex = /(\d+) personas/i;

          const salaMatch = botResponse.text.match(salaRegex);
          const fechaMatch = botResponse.text.match(fechaRegex);
          const horaMatch = botResponse.text.match(horaRegex);
          const recursosMatch = botResponse.text.match(recursosRegex);
          const personasMatch = botResponse.text.match(personasRegex);

          console.log(
            salaMatch,
            fechaMatch,
            horaMatch,
            recursosMatch,
            personasMatch
          );

          if (
            salaMatch &&
            fechaMatch &&
            horaMatch &&
            recursosMatch &&
            personasMatch
          ) {
            const horaInicio = horaMatch[1] || horaMatch[6] || horaMatch[4];
            const horaFin = horaMatch[2] || horaMatch[7] || horaMatch[5];
            const recursos =
              recursosMatch[1] || recursosMatch[2] || recursosMatch[3];

            setSalaID(salaMatch[1]);
            setDia(convertirFecha(fechaMatch[1]));
            setHoraInicio(convertirHora(horaInicio));
            setHoraFin(convertirHora(horaFin));
            setRecursos(recursos);
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
    if (isLoggedIn && matriculita) {
      fetch(
        `https://dreamlabapidev.azurewebsites.net/api/perfil/${matriculita}`
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
    }
  }, [isLoggedIn, matriculita]);

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
    // Extraer la hora y am/pm del texto de la hora
    const match = hora.match(/(\d{1,2})\s*(am|pm|AM|PM)/i);

    if (match) {
      let horaNumero = parseInt(match[1], 10);
      const ampm = match[2].toLowerCase();

      // Convertir la hora a formato de 24 horas si es necesario
      if (ampm === "pm" && horaNumero !== 12) {
        horaNumero += 12;
      } else if (ampm === "am" && horaNumero === 12) {
        horaNumero = 0;
      }

      // Formatear la hora en el formato deseado (HH:mm:ss)
      const horaFormateada = `${horaNumero.toString().padStart(2, "0")}:00:00`;
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

    axios
      .post(
        "https://dreamlabapidev.azurewebsites.net/api/reservaciones",
        reservationData
      )
      .then((response) => {
        console.log("Reservación confirmada:", response.data);
      })
      .catch((error) => {
        console.error("Error al confirmar la reservación:", error);
      });

    setShowButton(false);
    setShowMessageInput(true);
    togglePopUp();
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

  return (
    <div className="HU004">
      {!isLoggedIn ? (
        <div className="login_formHU004">
          <h2>INICIA SESIÓN</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Matrícula:</label>
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatriculaInput(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Iniciar Sesión</button>
            {errorMessage && (
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      ) : (
        <div className="chat_container">
          <div className="chat_window">
            <div className="top_menuHU004">
              <div className="title">RESERVA TU LUGAR</div>
              <div style={{ display: "flex" }}>
                <a href="/reservationform" className="reservation-link">
                  Haz click aquí para reservar de otra manera.
                </a>
              </div>
            </div>
            {inputError && (
              <div className="errorHU004 show">
                <div className="title">{inputError}</div>
              </div>
            )}
            <ul id="all_messages" className="messages">
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
              </div>
            )}
            {showMessageInput && (
              <div className="bottom_wrapperHU004 clearfix">
                <div className="message_input_wrapper">
                  <textarea
                    id="message_input"
                    className="message_input"
                    placeholder="Escribe tu mensaje aquí..."
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
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;
