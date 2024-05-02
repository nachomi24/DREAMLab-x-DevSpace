import { useState, useEffect, useRef } from "react";
import "./chat.css";
import loadingChat from "../../../assets/chat_loading_4.gif";
import PopUp from "../detalle/Detalle";

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
  const [showPopUp, setShowPopUp] = useState(false);
  const [salaID, setSalaID] = useState("");
  const [dia, setDia] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [recursos, setRecursos] = useState("");
  const [personas, setPersonas] = useState("");
  const confirmada = 0;

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  };

  // Función para enviar un mensaje al chat y recibir una respuesta de la API
  const sendMessage = async (text, side) => {
    if (text.trim()) {
      const newMessage = { text, side };
      setMessages((messages) => [...messages, newMessage]);
      setInputText("");

      // Mostrar mensaje de carga
      const loadingMessage = {
        text: "Cargando...",
        side: "left",
      };
      setMessages((messages) => [...messages, loadingMessage]);

      // Enviar solicitud a la API
      try {
        const response = await fetch(
          `http://localhost:8000/api/chat_OpenAI/${text}`
        );
        const data = await response.json();

        // Remover las comillas de la respuesta
        const cleanData = data.replace(/"/g, "");

        // Remover los caracteres de salto de línea y agregar saltos de línea reales
        const formattedData = cleanData.replace(/\\n/g, "\n");

        // Dividir la respuesta en pasos usando el delimitador "\n"
        // const steps = formattedData.split("\n");

        // Eliminar mensaje de carga y agregar respuesta del bot
        setMessages((messages) => [
          ...messages.filter((msg) => msg !== loadingMessage),
          { text: formattedData, side: "left" },
        ]);

        // Verificar si el mensaje contiene una matrícula
        const matriculaRegex = /(A0\d{7}|L0\d{7})/i;
        const match = text.match(matriculaRegex);

        if (match) {
          const nuevaMatricula = match[1]; // Obtener la matrícula del mensaje
          setMatriculita(nuevaMatricula);
          setMatricula(nuevaMatricula); // Actualizar el estado de la matrícula
          setLoggedIn(true); // Establecer el estado de inicio de sesión como verdadero

          // Guardar la matrícula y el estado de inicio de sesión en localStorage
          localStorage.setItem("matricula", nuevaMatricula);
          localStorage.setItem("loggedIn", true);
        } else if (formattedData.toLowerCase().includes("gracias")) {
          // Expresiones regulares para capturar las variables relevantes
          setMatriculita(localStorage.getItem("matricula"));
          console.log("Matrícula:", matriculita);
          const salaRegex = /sala (DL\d{3})/i;
          const fechaRegex = /(\d+ de \w+ de \d+)/i;
          const horarioRegex =
            /de (\d{1,2}(?::\d{2})?\w{2}) a (\d{1,2}(?::\d{2})?\w{2})|de (\d{1,2}(?::\d{2})?)\s*:\s*(\d{2})\s*a\s*(\d{1,2}(?::\d{2})?)/i;
          const recursosRegex = /con (\d+ \w+(?:,|\sy\s)\d+ \w+)/i;
          const personasRegex = /para (\d+) personas/i;

          // Capturar las variables utilizando las expresiones regulares
          const salaMatch = formattedData.match(salaRegex);
          const fechaMatch = formattedData.match(fechaRegex);
          const horarioMatch = formattedData.match(horarioRegex);
          const recursosMatch = formattedData.match(recursosRegex);
          const personasMatch = formattedData.match(personasRegex);

          console.log(
            salaMatch,
            fechaMatch,
            horarioMatch,
            recursosMatch,
            personasMatch
          );

          if (
            salaMatch &&
            fechaMatch &&
            horarioMatch &&
            recursosMatch &&
            personasMatch
          ) {
            const salaID = salaMatch[1];
            const fecha = fechaMatch[1];
            const horaInicio = horarioMatch[1];
            const horaFin = horarioMatch[2];
            const recursos = recursosMatch[1];
            const personas = parseInt(personasMatch[1]);

            console.log(salaID, fecha, horaInicio, horaFin, recursos, personas);

            setSalaID(salaID);
            setDia(convertirFecha(fecha));
            setHoraInicio(convertirHora(horaInicio));
            setHoraFin(convertirHora(horaFin));
            setRecursos(recursos);
            setPersonas(parseInt(personas));
            setShowButton(true);
            setShowMessageInput(false);
            togglePopUp();

            console.log("Sala ID:", salaID);
            console.log("Fecha:", convertirFecha(fecha));
            console.log("Hora de inicio:", convertirHora(horaInicio));
            console.log("Hora de fin:", convertirHora(horaFin));
            console.log("Recursos:", recursos);
            console.log("Personas:", parseInt(personas));
          }
        } else {
          console.log("El mensaje no contiene una matrícula.");
        }
      } catch (error) {
        console.error("Error al enviar solicitud a la API:", error);
      }
    }
  };

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
      const horaFormateada = horaNumero.toString().padStart(2, "0") + ":00:00";
      return horaFormateada;
    } else {
      // Si no se puede hacer coincidir el formato esperado, devuelve null o maneja el error de acuerdo a tus necesidades.
      return null;
    }
  };

  const handleMessageChange = (event) => {
    setInputText(event.target.value);
  };

  const handleMessageSubmit = () => {
    sendMessage(inputText, "right");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Asegura que no se envíe al presionar Enter y Shift simultáneamente.
      event.preventDefault(); // Previene el salto de línea en el textarea.
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
    // Guardar los mensajes en localStorage
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Mensaje de bienvenida inicial
    const welcomeMessage =
      "¡Hola soy Dreamy, tu acompañante en esta aventura! Para iniciar sesión, proporciona tu matrícula; después para reservar ingresa el ID de la sala que deseas reservar, el día, hora de inicio y hora de salida, los recursos que ocupas y la cantidad de personas que estarán en la sala. Para más información, pregúntame lo que quieras.";

    // Agregar el mensaje al chat si no hay mensajes guardados
    if (messages.length === 0) {
      setMessages([{ text: welcomeMessage, side: "left" }]);
    }
  }, [messages.length]);

  // localStorage.clear();

  return (
      <div className="chat_window">
        <div className="top_menu">
          <div className="title">RESERVA TU LUGAR</div>
        </div>
        <div className="error">
          <div id="error-title" className="title"></div>
        </div>
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
        <div className="bottom_wrapper clearfix">
          {showButton && (
            <button className="send_message2" onClick={togglePopUp}>
              Detalles Reserva
            </button>
          )}
          {showPopUp && (
            <>
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
            </>
          )}
          {showMessageInput && (
            <>
              <div className="message_input_wrapper">
                <textarea
                  style={{ resize: "none" }}
                  id="conversation_query"
                  className="message_input"
                  placeholder="Escribe aquí..."
                  value={inputText}
                  onChange={handleMessageChange}
                  onKeyPress={handleKeyPress}
                ></textarea>
              </div>
              <div
                id="button_send_message"
                className="send_message"
                onClick={handleMessageSubmit}
              >
                <div id="send_button" className="text">
                  Enviar
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  

export default Chat;
